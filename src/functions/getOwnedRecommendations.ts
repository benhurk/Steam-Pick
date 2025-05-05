import getMatchingTags from './helpers/getMatchingTags';
import getTagNames from './utils/getTagNames';
import { GameData } from '@/types/TGames';

export default function getOwnedRecomendations(
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][],
    favoriteMoods: [number, number][],
    excludedTags: number[],
    unplayedGamesData: GameData[]
) {
    const recommendations = unplayedGamesData
        .map((game) => {
            const {
                matchingGenres,
                matchingGameplay,
                matchingThemes,
                matchingMoods,
            } = getMatchingTags(
                game.tags,
                favoriteGenres,
                favoriteGameplay,
                favoriteThemes,
                favoriteMoods
            );

            const hasExcludedTag =
                game.tags.filter((tag) =>
                    excludedTags.some((genre) => genre === tag)
                ).length > 0;

            const nonGenreMatchingTags =
                matchingGameplay.count +
                matchingThemes.count +
                matchingMoods.count;

            const matchingTags = matchingGenres.count + nonGenreMatchingTags;

            if (
                matchingGenres.count > 0 &&
                matchingGameplay.count > 0 &&
                nonGenreMatchingTags > 2 &&
                !hasExcludedTag
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
