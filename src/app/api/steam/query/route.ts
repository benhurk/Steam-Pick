export const revalidate = 86400;

import { NextResponse } from 'next/server';

import { TQueryFilters, TQueryData } from '@/types/TApi';
import { QueryRes } from '@/types/TSteam';

import filterGameTags from '@/functions/utils/filterGameTags';
import getYearFromUnix from '@/functions/utils/getYearFromUnix';

const BASE_URL = `https://api.steampowered.com/IStoreQueryService/Query/v1/?key=${process.env.STEAM_KEY}`;
const RETRY_DELAY = 1500;

async function fetchUrl(url: string) {
    const MAX_RETRIES = 2;
    let retries = 0;
    let lastError: Error | null = null;

    while (retries < MAX_RETRIES) {
        try {
            const res = await fetch(url);

            if (res.ok) {
                return res;
            }

            // Log non-OK responses
            console.warn(
                `Attempt ${retries + 1} failed with status: ${res.status}`
            );
            lastError = new Error(`HTTP error! status: ${res.status}`);
        } catch (error) {
            console.warn(`Attempt ${retries + 1} failed with error:`, error);
            lastError =
                error instanceof Error ? error : new Error(String(error));
        }

        retries++;

        if (retries < MAX_RETRIES) {
            console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }

    throw lastError || new Error('Unknown error occurred after retries');
}

export async function POST(request: Request) {
    try {
        const {
            includeTags,
            excludeTags,
            minRating,
            minReleaseYear,
        }: TQueryFilters = await request.json();

        const toInclude = includeTags
            .map((t) => JSON.stringify({ tagids: [`${t}`] }))
            .join(', ');

        const toExclude = excludeTags.join('","');

        let pagination = 0;
        let hasMorePages = true;

        const games: TQueryData = [];

        while (hasMorePages) {
            const QUERY = encodeURI(
                `&input_json={"query":{"start":"${pagination}","count":"1000","sort":"21","filters":{"released_only":true,"type_filters":{"include_games":true},"tagids_must_match":[${toInclude}],"tagids_exclude":["${toExclude}"],"global_top_n_sellers":"50000"}},"context":{"country_code":"US"},"data_request":{"include_release":true,"include_tag_count":"20","include_reviews":true}}`
            );

            const MAX_EMPTY_RETRIES = 3;
            let retryCount = 0;
            let data: QueryRes;

            // Retry loop for empty response objects
            while (retryCount <= MAX_EMPTY_RETRIES) {
                try {
                    const res = await fetchUrl(`${BASE_URL}${QUERY}`);
                    data = await res.json();

                    if (
                        data?.response &&
                        Object.keys(data.response).length > 0
                    ) {
                        break; // We have data, exit retry loop
                    }

                    // If we get here, it's an empty response object
                    retryCount++;

                    console.warn(
                        `Empty response object received, retry ${retryCount}/${MAX_EMPTY_RETRIES}`
                    );

                    if (retryCount <= MAX_EMPTY_RETRIES) {
                        await new Promise((resolve) =>
                            setTimeout(resolve, RETRY_DELAY)
                        );
                    }
                } catch (error) {
                    console.error(
                        `Error during fetch attempt ${retryCount}:`,
                        error
                    );
                    retryCount = MAX_EMPTY_RETRIES + 1; // Force exit on fetch errors
                    break;
                }
            }

            // If we exhausted retries and still have empty response
            if (retryCount > MAX_EMPTY_RETRIES) {
                console.warn(
                    `Max empty retries reached for pagination ${pagination}`
                );
                hasMorePages = false;
                continue;
            }

            // Process the data as before
            if (data!.response.metadata.count > 0) {
                const filteredGamesData = data!.response.store_items
                    .filter(
                        (item) =>
                            item.reviews.summary_filtered.review_count >=
                                minRating.count &&
                            item.reviews.summary_filtered.percent_positive >=
                                minRating.percentPositive &&
                            getYearFromUnix(
                                item.release.original_release_date ??
                                    item.release.steam_release_date
                            ) >= minReleaseYear
                    )
                    .map((g) => ({
                        appid: g.appid,
                        name: g.name,
                        tagids: filterGameTags(g.tags),
                    }));

                games.push(...filteredGamesData);

                if (data!.response.metadata.count < 1000) {
                    hasMorePages = false;
                }
            } else {
                hasMorePages = false;
            }

            pagination += 1000;
            if (hasMorePages) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        }

        return NextResponse.json(games);
    } catch (error) {
        console.error('Error fetching Steam Query:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Steam data' },
            { status: 500 }
        );
    }
}
