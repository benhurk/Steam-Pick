export const revalidate = 86400;

import filterGameTags from '@/functions/utils/filterGameTags';
import { TQueryFilters, TQueryData } from '@/types/TApi';
import { QueryRes } from '@/types/TSteam';
import { NextResponse } from 'next/server';

const BASE_URL = `https://api.steampowered.com/IStoreQueryService/Query/v1/?key=${process.env.STEAM_KEY}`;

export async function POST(request: Request) {
    try {
        const { includeTag, excludeTags, minRating }: TQueryFilters =
            await request.json();

        const games: TQueryData = [];

        let pagination = 0;
        let hasMorePages = true;

        while (hasMorePages) {
            const QUERY = encodeURI(
                `&input_json={"query":{"start":"${pagination}","count":"1000","sort":"21","filters":{"released_only":true,"type_filters":{"include_games":true},"tagids_must_match":[{"tagids":["${includeTag}"]}],"tagids_exclude":${JSON.stringify(
                    excludeTags
                )},"global_top_n_sellers":"1000000"}},"context":{"country_code":"US"},"data_request":{"include_tag_count":"20","include_reviews":true}}`
            );

            const res = await fetch(`${BASE_URL}${QUERY}`);

            if (!res.ok) {
                throw new Error(`IStoreQueryService error: ${res.status}`);
            }

            const data: QueryRes = await res.json();

            if (data && data.response.metadata.count > 0) {
                const filteredGamesData = data.response.store_items
                    .filter(
                        (item) =>
                            item.reviews.summary_filtered.review_count >=
                                minRating.count &&
                            item.reviews.summary_filtered.percent_positive >=
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
