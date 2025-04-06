/* eslint-disable @typescript-eslint/no-unused-vars */
import getDislikedTags from './helpers/getDislikedTags';
import getTagsCount from './helpers/getTagsCount';

export default function checkGamesTags(
    completedGamesTags: string[],
    droppedGamesTags: string[]
) {
    const completedTagsCount = getTagsCount(completedGamesTags);
    const droppedTagsCount = getTagsCount(droppedGamesTags);

    //Top tags
    const topGenres = [...completedTagsCount.genresCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .filter(([tag, count]) => count > 3)
        .slice(0, 5);

    const topGameplayStyles = [
        ...completedTagsCount.gameplayStylesCount.entries(),
    ]
        .sort((a, b) => b[1] - a[1])
        .filter(([tag, count]) => count > 3)
        .slice(0, 5);

    const topThemes = [...completedTagsCount.themesCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .filter(([tag, count]) => count > 3)
        .slice(0, 5);

    const topMoods = [...completedTagsCount.moodsCount.entries()]
        .sort((a, b) => b[1] - a[1])
        .filter(([tag, count]) => count > 3)
        .slice(0, 5);

    const topDifficulty = [
        ...completedTagsCount.difficultyCount.entries(),
    ].sort((a, b) => b[1] - a[1])[0];

    console.log('Favorite genres:', topGenres);
    console.log('Favorite gameplay styles:', topGameplayStyles);
    console.log('Favorite themes:', topThemes);
    console.log('Favorite moods:', topMoods);
    console.log('Prefered difficulty:', topDifficulty);

    getDislikedTags(droppedGamesTags, completedGamesTags);
}
