import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';

export default function getTagsCount(tagsArray: number[]) {
    const genresCount = new Map<number, number>();
    const gameplayStylesCount = new Map<number, number>();
    const themesCount = new Map<number, number>();
    const moodsCount = new Map<number, number>();

    broadGenres.forEach((genre) => {
        const count = tagsArray.filter((tag) => tag === genre.tagid).length;
        genresCount.set(genre.tagid, count);
    });

    specificGenres.forEach((genre) => {
        const count = tagsArray.filter((tag) => tag === genre.tagid).length;
        genresCount.set(genre.tagid, count);
    });

    gameplayStyles.forEach((style) => {
        const count = tagsArray.filter((tag) => tag === style.tagid).length;
        gameplayStylesCount.set(style.tagid, count);
    });

    themes.forEach((theme) => {
        const count = tagsArray.filter((tag) => tag === theme.tagid).length;
        themesCount.set(theme.tagid, count);
    });

    moods.forEach((mood) => {
        const count = tagsArray.filter((tag) => tag === mood.tagid).length;
        moodsCount.set(mood.tagid, count);
    });

    return {
        genresCount,
        gameplayStylesCount,
        themesCount,
        moodsCount,
    };
}
