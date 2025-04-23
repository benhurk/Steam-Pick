import getDislikedGenres from './helpers/getDislikedGenres';
import getTagsCount from './helpers/getTagsCount';
import getTopTags from './helpers/getTopTags';
import getTagNames from './utils/getTagNames';

export default function checkGamesTags(
    relevantGamesTags: number[],
    irrelevantGamesTags: number[]
) {
    const relevantTagsCount = getTagsCount(relevantGamesTags);

    const favoriteGenres = getTopTags([
        ...relevantTagsCount.genresCount.entries(),
    ]);

    const favoriteGameplay = getTopTags([
        ...relevantTagsCount.gameplayStylesCount.entries(),
    ]);

    const favoriteThemes = getTopTags([
        ...relevantTagsCount.themesCount.entries(),
    ]);

    const favoriteMoods = getTopTags([
        ...relevantTagsCount.moodsCount.entries(),
    ]);

    const dislikedGenres = getDislikedGenres(
        irrelevantGamesTags,
        relevantGamesTags
    );

    console.log(
        'Favorite genres:',
        getTagNames(favoriteGenres.map(([g]) => g))
    );
    console.log(
        'Favorite gameplay styles:',
        getTagNames(favoriteGameplay.map(([g]) => g))
    );
    console.log(
        'Favorite themes:',
        getTagNames(favoriteThemes.map(([g]) => g))
    );
    console.log('Favorite moods:', getTagNames(favoriteMoods.map(([g]) => g)));
    console.log('Disliked genres:', getTagNames(dislikedGenres));

    return {
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
    };
}
