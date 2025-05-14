import { GameWeight } from '@/types/TGames';
import getTagsToExclude from './helpers/getTagsToExclude';
import getTagsCount from './helpers/getTagsCount';
import getTopTags from './helpers/getTopTags';
import getTagNames from './utils/getTagNames';
import { TPreferences } from '@/types/TPreferences';

export default function parseTags(
    gamesWeight: GameWeight[],
    preferences: TPreferences
) {
    const tagsCount = getTagsCount(gamesWeight.filter((g) => g.weight > 0));

    const favoriteGenres = getTopTags([...tagsCount.genres.entries()]);
    const favoriteGameplay = getTopTags([...tagsCount.gameplay.entries()]);
    const favoriteThemes = getTopTags([...tagsCount.themes.entries()]);
    const favoriteMoods = getTopTags([...tagsCount.moods.entries()]);
    const excludedTags = getTagsToExclude(gamesWeight, preferences);

    console.log(
        'Favorite genres:',
        favoriteGenres.map(([tag, count]) => ({
            tag: getTagNames([tag]),
            count,
        }))
    );
    console.log(
        'Favorite gameplay styles:',
        favoriteGameplay.map(([tag, count]) => ({
            tag: getTagNames([tag]),
            count,
        }))
    );
    console.log(
        'Favorite themes:',
        favoriteThemes.map(([tag, count]) => ({
            tag: getTagNames([tag]),
            count,
        }))
    );
    console.log(
        'Favorite moods:',
        favoriteMoods.map(([tag, count]) => ({
            tag: getTagNames([tag]),
            count,
        }))
    );
    console.log('Excluded tags:', getTagNames(excludedTags));

    return {
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        excludedTags,
    };
}
