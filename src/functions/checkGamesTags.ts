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

    const topGenres = getTopTags([...completedTagsCount.genresCount.entries()]);

    const topGameplayStyles = getTopTags([
        ...completedTagsCount.gameplayStylesCount.entries(),
    ]);

    const topThemes = getTopTags([...completedTagsCount.themesCount.entries()]);

    const topMoods = getTopTags([...completedTagsCount.moodsCount.entries()]);

    const topDifficulty = [
        ...completedTagsCount.difficultyCount.entries(),
    ].sort((a, b) => b[1] - a[1])[0];

    console.log('Favorite genres:', topGenres);
    console.log('Favorite gameplay styles:', topGameplayStyles);
    console.log('Favorite themes:', topThemes);
    console.log('Favorite moods:', topMoods);
    console.log('Prefered difficulty:', topDifficulty);

    const dislikedGenres = getDislikedGenres(
        droppedGamesTags,
        completedGamesTags
    );

    const unexploredGenres = [...allTagsCount.genresCount.entries()]
        .filter(
            ([tag, count]) =>
                count <= 2 && !broadGenres.some((genre) => genre === tag)
        )
        .map(([tag]) => tag);

    return {
        topGenres,
        topGameplayStyles,
        topThemes,
        topMoods,
        dislikedGenres,
        unexploredGenres,
    };
}
