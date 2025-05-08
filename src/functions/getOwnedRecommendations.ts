import { TPreferences } from '@/types/TPreferences';
import getMatchingTags from './helpers/getMatchingTags';
import getTagNames from './utils/getTagNames';
import { GameData } from '@/types/TGames';
import recommendConditions from './utils/recommendConditions';

export default function getOwnedRecomendations(
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][],
    favoriteMoods: [number, number][],
    excludedTags: number[],
    unplayedGamesData: GameData[],
    preferences: TPreferences
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

            const hasPrefTags = preferences.include.every((tag) =>
                game.tags.includes(tag)
            );

            const nonGenreMatchingTags =
                matchingGameplay.count +
                matchingThemes.count +
                matchingMoods.count;

            const matchingTags =
                matchingGenres.count * 2 + nonGenreMatchingTags; //Weight genres higher

            if (
                recommendConditions(
                    matchingGenres.count,
                    matchingGameplay.count,
                    matchingThemes.count,
                    matchingMoods.count,
                    preferences,
                    hasPrefTags,
                    hasExcludedTag
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
                            ...preferences.include,
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
