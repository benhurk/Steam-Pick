import getDislikedGenres from './helpers/getDislikedGenres';
import getTagsCount from './helpers/getTagsCount';
import getTopTags from './helpers/getTopTags';

export default function checkGamesTags(
    completedGamesTags: number[],
    droppedGamesTags: number[]
) {
    const completedTagsCount = getTagsCount(completedGamesTags);

    const favoriteGenres = getTopTags([
        ...completedTagsCount.genresCount.entries(),
    ]);

    const favoriteGameplay = getTopTags([
        ...completedTagsCount.gameplayStylesCount.entries(),
    ]);

    const favoriteThemes = getTopTags([
        ...completedTagsCount.themesCount.entries(),
    ]);

    const favoriteMoods = getTopTags([
        ...completedTagsCount.moodsCount.entries(),
    ]);

    const dislikedGenres = getDislikedGenres(
        droppedGamesTags,
        completedGamesTags
    );

    console.log('Favorite genres:', favoriteGenres);
    console.log('Favorite gameplay styles:', favoriteGameplay);
    console.log('Favorite themes:', favoriteThemes);
    console.log('Favorite moods:', favoriteMoods);
    console.log('Disliked genres:', dislikedGenres);

    return {
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
    };
}
