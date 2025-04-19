import SteamSpyDataRes from '@/types/TSteamSpy';
import getMatchingTags from './helpers/getMatchingTags';
import recommendConditions from './utils/recommendConditions';

export default function getOwnedRecomendations(
    favoriteGenres: [string, number][],
    favoriteGameplay: [string, number][],
    favoriteThemes: [string, number][],
    favoriteMoods: [string, number][],
    dislikedGenres: string[],
    unplayedGamesData: SteamSpyDataRes
) {
    const recommendations = unplayedGamesData
        .map((game) => {
            const gameTags = Object.keys(game.tags);

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
                    hasDislikedGenre,
                    matchingGenres.tags
                )
            ) {
                return {
                    name: game.name,
                    id: game.appid,
                    matchingTags: {
                        count: matchingTags,
                        tags: [
                            ...matchingGenres.tags,
                            ...matchingGameplay.tags,
                            ...matchingThemes.tags,
                            ...matchingMoods.tags,
                        ],
                    },
                };
            }
        })
        .filter((r) => r != undefined)
        .sort((a, b) => b.matchingTags.count - a.matchingTags.count);

    console.log('Already owned game recommendations:', recommendations);

    return recommendations;
}
