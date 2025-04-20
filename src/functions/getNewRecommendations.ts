import pLimit from 'p-limit';
import getMatchingTags from './helpers/getMatchingTags';
import recommendConditions from './utils/recommendConditions';
import { SteamGame } from '@/types/TSteam';
import { TQueryData, TQueryFilters } from '@/types/TApi';
import getTagNames from './utils/getTagNames';

const limit = pLimit(1);

export default async function getNewRecommendations(
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][],
    favoriteMoods: [number, number][],
    dislikedGenres: number[],
    ownedGames: SteamGame[]
) {
    const requests = favoriteGenres.map(([genre]) =>
        limit(async () => {
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

            return data;
        })
    );

    const favoriteGenresGames = (await Promise.all(requests)).flat();

    //Remove owned games
    const filteredGames = favoriteGenresGames.filter(
        (game) => !ownedGames.some((og) => og.name === game.name.toLowerCase())
    );

    const recommendations = [...filteredGames]
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

            const matchingTags = matchingGenres.count + nonGenreMatchingTags;

            if (
                recommendConditions(
                    matchingGenres.count,
                    matchingGameplay.count,
                    nonGenreMatchingTags,
                    matchingGenres.tags
                )
            ) {
                return {
                    name: game.name,
                    id: game.appid,
                    matchingTags: {
                        count: matchingTags,
                        tags: getTagNames([
                            ...matchingGenres.tags,
                            ...matchingGameplay.tags,
                            ...matchingThemes.tags,
                            ...matchingMoods.tags,
                        ]),
                    },
                };
            }
        })
        .filter((r) => r != undefined)
        .sort((a, b) => b.matchingTags.count - a.matchingTags.count);

    console.log('New games recommendations:', recommendations);

    return recommendations;
}
