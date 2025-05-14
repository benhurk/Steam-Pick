export const revalidate = 86400;

import { NextResponse } from 'next/server';

import { TQueryFilters, TQueryData } from '@/types/TApi';
import { QueryRes } from '@/types/TSteam';

import filterGameTags from '@/functions/utils/filterGameTags';

const BASE_URL = `https://api.steampowered.com/IStoreQueryService/Query/v1/?key=${process.env.STEAM_KEY}`;
const MAX_RETRIES = 5;
const RETRY_DELAY = 1500;

async function fetchUrl(url: string) {
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
        const { includeTags, excludeTags, minRating }: TQueryFilters =
            await request.json();

        const toInclude = includeTags
            .map((t) => JSON.stringify({ tagids: [`${t}`] }))
            .join(', ');

        const toExclude = excludeTags.join('","');

        let pagination = 0;
        let hasMorePages = true;

        const games: TQueryData = [];

        while (hasMorePages) {
            const QUERY = encodeURI(
                `&input_json={"query":{"start":"${pagination}","count":"1000","sort":"21","filters":{"released_only":true,"type_filters":{"include_games":true},"tagids_must_match":[${toInclude}],"tagids_exclude":["${toExclude}"],"global_top_n_sellers":"1000000"}},"context":{"country_code":"US"},"data_request":{"include_tag_count":"20","include_reviews":true}}`
            );

            try {
                const res = await fetchUrl(`${BASE_URL}${QUERY}`);
                const data: QueryRes = await res.json();

                // Handle empty response
                if (
                    !data?.response ||
                    Object.keys(data.response).length === 0
                ) {
                    console.log(
                        `Empty response for tag ${toInclude} pagination ${pagination}`
                    );
                    hasMorePages = false;
                    continue;
                }

                if (data && data.response.metadata.count > 0) {
                    const filteredGamesData = data.response.store_items
                        .filter(
                            (item) =>
                                item.reviews.summary_filtered.review_count >=
                                    minRating.count &&
                                item.reviews.summary_filtered
                                    .percent_positive >=
                                    minRating.percentPositive
                        )
                        .sort(
                            (a, b) =>
                                b.reviews.summary_filtered.review_count -
                                a.reviews.summary_filtered.review_count
                        )
                        .map((g) => ({
                            appid: g.appid,
                            name: g.name,
                            tagids: filterGameTags(g.tags),
                        }));

                    games.push(...filteredGamesData);

                    if (data.response.metadata.count < 1000) {
                        hasMorePages = false;
                    }
                } else {
                    hasMorePages = false;
                }

                //API returns a max of 1000 items per request. (pagination = 0: items [0]-[1000] | pagination = 1000: items[1000]-[2000]...)
                pagination += 1000;

                //Delay to avoid rate limits
                if (hasMorePages) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
            } catch (error) {
                console.error(
                    `Failed after ${MAX_RETRIES} retries for tags ${toInclude} pagination ${pagination}:`,
                    error
                );
                hasMorePages = false; // Stop pagination on persistent failure
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
