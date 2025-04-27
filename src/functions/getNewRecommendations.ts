import getMatchingTags from './helpers/getMatchingTags';
import recommendConditions from './utils/recommendConditions';
import { SteamGame } from '@/types/TGames';
import { TQueryData, TQueryFilters } from '@/types/TApi';
import getTagNames from './utils/getTagNames';

export default async function getNewRecommendations(
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][],
    favoriteMoods: [number, number][],
    dislikedGenres: number[],
    ownedGames: SteamGame[]
) {
    const recommendations = [];

    // Process genres sequentially to avoid rate limiting
    for (const [genre] of favoriteGenres) {
        try {
            const filtersBody: TQueryFilters = {
                includeTag: genre,
                excludeTags: dislikedGenres,
                minRating: { count: 2000, percentPositive: 85 },
            };

            const data: TQueryData = await fetch(
                `${process.env.URL}/api/steam/query`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(filtersBody),
                }
            ).then((res) => res.json());

            const processedGames = data
                .filter(
                    (game) =>
                        !ownedGames.some(
                            (og) => og.name === game.name.toLowerCase()
                        )
                )
                .map((game) => {
                    const {
                        matchingGenres,
                        matchingGameplay,
                        matchingThemes,
                        matchingMoods,
                    } = getMatchingTags(
                        game.tagids,
                        favoriteGenres,
                        favoriteGameplay,
                        favoriteThemes,
                        favoriteMoods
                    );

                    const nonGenreMatchingTags =
                        matchingGameplay.count +
                        matchingThemes.count +
                        matchingMoods.count;

                    return {
                        game,
                        score: matchingGenres.count + nonGenreMatchingTags,
                        matchingGenres,
                        matchingGameplay,
                        matchingThemes,
                        matchingMoods,
                    };
                })
                .filter(
                    ({
                        matchingGenres,
                        matchingGameplay,
                        matchingThemes,
                        matchingMoods,
                    }) =>
                        recommendConditions(
                            matchingGenres.count,
                            matchingGameplay.count,
                            matchingThemes.count + matchingMoods.count,
                            matchingGenres.tags
                        )
                )
                .sort((a, b) => b.score - a.score)
                .slice(0, 3);

            recommendations.push(
                ...processedGames.map(
                    ({
                        game,
                        score,
                        matchingGenres,
                        matchingGameplay,
                        matchingThemes,
                        matchingMoods,
                    }) => ({
                        name: game.name,
                        id: game.appid,
                        matchingTags: {
                            count: score,
                            tags: getTagNames([
                                ...matchingGenres.tags,
                                ...matchingGameplay.tags,
                                ...matchingThemes.tags,
                                ...matchingMoods.tags,
                            ]),
                        },
                    })
                )
            );

            // Add delay between genre requests to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
            console.error(`Error processing genre ${genre}:`, error);
            continue;
        }
    }

    // Remove duplicates (in case same game appears for multiple genres)
    const uniqueRecommendations = [
        ...new Map(recommendations.map((g) => [g.id, g])).values(),
    ];

    console.log('New games recommendations:', uniqueRecommendations);
    return uniqueRecommendations;
}
