import getMatchingTags from './helpers/getMatchingTags';
import { SteamGame } from '@/types/TGames';
import { TQueryData, TQueryFilters } from '@/types/TApi';
import getTagNames from './utils/getTagNames';
import { TPreferences } from '@/types/TPreferences';
import recommendConditions from './utils/recommendConditions';
import { TTaste } from '@/types/TTaste';

export default async function getNewRecommendations(
    taste: TTaste,
    ownedGames: SteamGame[],
    preferences: TPreferences
) {
    const recommendations = [];

    for (const [genre] of taste.favoriteGenres) {
        try {
            const filtersBody: TQueryFilters = {
                includeTags: [...preferences.include, genre],
                excludeTags: taste.excludedTags,
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
                //Remove owned games
                .filter(
                    (game) =>
                        !ownedGames.some(
                            (og) => og.name === game.name.toLowerCase()
                        )
                )
                //Parse tags
                .map((game) => {
                    const {
                        matchingGenres,
                        matchingGameplay,
                        matchingThemes,
                        matchingMoods,
                    } = getMatchingTags(
                        game.tagids,
                        taste.favoriteGenres,
                        taste.favoriteGameplay,
                        taste.favoriteThemes,
                        taste.favoriteMoods
                    );

                    const nonGenreMatchingTags =
                        matchingGameplay.count +
                        matchingThemes.count +
                        matchingMoods.count;

                    return {
                        game,
                        score: matchingGenres.count * 2 + nonGenreMatchingTags, //Weight genres higher
                        matchingGenres,
                        matchingGameplay,
                        matchingThemes,
                        matchingMoods,
                    };
                })
                //Get best matches
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
                            matchingThemes.count,
                            matchingMoods.count,
                            preferences
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
                                ...preferences.include,
                            ]),
                        },
                    })
                )
            );

            // Add delay between requests to avoid rate limiting
            await new Promise((resolve) => setTimeout(resolve, 1500));
        } catch (error) {
            console.error(`Error processing genre ${genre}:`, error);
            continue;
        }
    }

    // Remove duplicates (in case same game appears for multiple genres)
    const uniqueRecommendations = [
        ...new Map(recommendations.map((g) => [g.id, g])).values(),
    ].sort((a, b) => b.matchingTags.count - a.matchingTags.count);

    console.log('New games recommendations:', uniqueRecommendations);
    return uniqueRecommendations;
}
