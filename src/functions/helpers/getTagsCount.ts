import {
    difficulties,
    gameplayStyles,
    moods,
    themes,
} from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';

export default function getTagsCount(tagsArray: string[]) {
    const genresCount = new Map<string, number>();
    const gameplayStylesCount = new Map<string, number>();
    const themesCount = new Map<string, number>();
    const moodsCount = new Map<string, number>();
    const difficultyCount = new Map<string, number>();

    broadGenres.forEach((genre) => {
        const count = tagsArray.filter((tag) => tag === genre).length;
        genresCount.set(genre, count);
    });

    specificGenres.forEach((genre) => {
        const count = tagsArray.filter((tag) => tag === genre).length;
        genresCount.set(genre, count);
    });

    gameplayStyles.forEach((style) => {
        const count = tagsArray.filter((tag) => tag === style).length;
        gameplayStylesCount.set(style, count);
    });

    themes.forEach((theme) => {
        const count = tagsArray.filter((tag) => tag === theme).length;
        themesCount.set(theme, count);
    });

    moods.forEach((mood) => {
        const count = tagsArray.filter((tag) => tag === mood).length;
        moodsCount.set(mood, count);
    });

    difficulties.forEach((difficulty) => {
        const count = tagsArray.filter((tag) => tag === difficulty).length;
        difficultyCount.set(difficulty, count);
    });

    return {
        genresCount,
        gameplayStylesCount,
        themesCount,
        moodsCount,
        difficultyCount,
    };
}
