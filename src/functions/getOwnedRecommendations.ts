import SteamSpyDataRes from '@/types/TSteamSpy';
import getMatchingTags from './helpers/getMatchingTags';
import getTagNames from './utils/getTagNames';
import recommendConditions from './utils/recommendConditions';
import getTagIds from './utils/getTagIds';

export default function getOwnedRecomendations(
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][],
    favoriteMoods: [number, number][],
    dislikedGenres: number[],
    unplayedGamesData: SteamSpyDataRes
) {
    const recommendations = unplayedGamesData
        .map((game) => {
            const gameTags = getTagIds(Object.keys(game.tags));

            const {
                matchingGenres,
                matchingGameplay,
                matchingThemes,
                matchingMoods,
            } = getMatchingTags(
                gameTags,
                favoriteGenres,
                favoriteGameplay,
                favoriteThemes,
                favoriteMoods
            );

            const hasDislikedGenre =
                gameTags.filter((tag) =>
                    dislikedGenres.some((genre) => genre === tag)
                ).length > 0;

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
                    matchingGenres.tags,
                    hasDislikedGenre
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

    console.log('Already owned game recommendations:', recommendations);

    return recommendations;
}
