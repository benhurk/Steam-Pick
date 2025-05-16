import { TPreferences } from '@/types/TPreferences';
import getMatchingTags from './helpers/getMatchingTags';
import getTagNames from './utils/getTagNames';
import { GameData } from '@/types/TGames';
import recommendConditions from './utils/recommendConditions';
import { TTaste } from '@/types/TTaste';

export default function getOwnedRecomendations(
    taste: TTaste,
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
                taste.favoriteGenres,
                taste.favoriteGameplay,
                taste.favoriteThemes,
                taste.favoriteMoods
            );

            const hasExcludedTag =
                game.tags.filter((tag) =>
                    taste.excludedTags.some((genre) => genre === tag)
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
        .sort((a, b) => b.matchingTags.count - a.matchingTags.count)
        .slice(0, 9);

    console.log('Already owned game recommendations:', recommendations);

    return recommendations;
}
