/* eslint-disable @typescript-eslint/no-unused-vars */
import getDislikedGenres from './helpers/getDislikedGenres';
import getTagsCount from './helpers/getTagsCount';

export default function checkGamesTags(
    completedGamesTags: string[],
    droppedGamesTags: string[]
) {
    const completedTagsCount = getTagsCount(completedGamesTags);

    const topGenres = [...completedTagsCount.genresCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .filter(([tag, count]) => count >= 3)
        .slice(0, 4)
        .map(([tag, count]) => tag);

    const topGameplayStyles = [
        ...completedTagsCount.gameplayStylesCount.entries(),
    ]
        .sort((a, b) => b[1] - a[1])
        .filter(([tag, count]) => count >= 3)
        .slice(0, 4)
        .map(([tag, count]) => tag);

    const topThemes = [...completedTagsCount.themesCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .filter(([tag, count]) => count >= 3)
        .slice(0, 4)
        .map(([tag, count]) => tag);

    const topMoods = [...completedTagsCount.moodsCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .filter(([tag, count]) => count >= 3)
        .slice(0, 4)
        .map(([tag, count]) => tag);

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

    return {
        topGenres,
        topGameplayStyles,
        topThemes,
        topMoods,
        dislikedGenres,
    };
}
