import { broadGenres } from '@/arrays/genres';
import getDislikedGenres from './helpers/getDislikedGenres';
import getTagsCount from './helpers/getTagsCount';
import getTopTags from './helpers/getTopTags';

export default function checkGamesTags(
    completedGamesTags: string[],
    droppedGamesTags: string[]
) {
    const completedTagsCount = getTagsCount(completedGamesTags);
    const allTagsCount = getTagsCount([
        ...droppedGamesTags,
        ...completedGamesTags,
    ]);

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

    const unexploredGenres = [...allTagsCount.genresCount.entries()]
        .filter(
            ([tag, count]) =>
                count <= 1 && !broadGenres.some((genre) => genre.name === tag)
        )
        .map(([tag]) => tag);

    console.log('Favorite genres:', favoriteGenres);
    console.log('Favorite gameplay styles:', favoriteGameplay);
    console.log('Favorite themes:', favoriteThemes);
    console.log('Favorite moods:', favoriteMoods);
    console.log('Disliked genres:', dislikedGenres);
    console.log('Unexplored genres:', unexploredGenres);

    return {
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
        unexploredGenres,
    };
}
