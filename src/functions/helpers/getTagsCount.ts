import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';

export default function getTagsCount(tagsArray: string[]) {
    const genresCount = new Map<string, number>();
    const gameplayStylesCount = new Map<string, number>();
    const themesCount = new Map<string, number>();
    const moodsCount = new Map<string, number>();

    broadGenres.forEach((genre) => {
        const count = tagsArray.filter((tag) => tag === genre.name).length;
        genresCount.set(genre.name, count);
    });

    specificGenres.forEach((genre) => {
        const count = tagsArray.filter((tag) => tag === genre.name).length;
        genresCount.set(genre.name, count);
    });

    gameplayStyles.forEach((style) => {
        const count = tagsArray.filter((tag) => tag === style.name).length;
        gameplayStylesCount.set(style.name, count);
    });

    themes.forEach((theme) => {
        const count = tagsArray.filter((tag) => tag === theme.name).length;
        themesCount.set(theme.name, count);
    });

    moods.forEach((mood) => {
        const count = tagsArray.filter((tag) => tag === mood.name).length;
        moodsCount.set(mood.name, count);
    });

    return {
        genresCount,
        gameplayStylesCount,
        themesCount,
        moodsCount,
    };
}
