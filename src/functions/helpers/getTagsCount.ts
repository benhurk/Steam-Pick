import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';
import { GameWeight } from '@/types/TGames';

export default function getTagsCount(games: GameWeight[]) {
    const genresCount = new Map<number, number>();
    const gameplayStylesCount = new Map<number, number>();
    const themesCount = new Map<number, number>();
    const moodsCount = new Map<number, number>();

    games.forEach((g) => {
        const tags = g.tags;
        const weight = g.weight;

        broadGenres.forEach((genre) => {
            const currentCount = genresCount.get(genre.tagid) || 0;
            const hasTag = tags.includes(genre.tagid);

            if (hasTag) {
                genresCount.set(genre.tagid, currentCount + 1 * weight);
            }
        });

        specificGenres.forEach((genre) => {
            const currentCount = genresCount.get(genre.tagid) || 0;
            const hasTag = tags.includes(genre.tagid);

            if (hasTag) {
                genresCount.set(genre.tagid, currentCount + 1 * weight);
            }
        });

        gameplayStyles.forEach((style) => {
            const currentCount = gameplayStylesCount.get(style.tagid) || 0;
            const hasTag = tags.includes(style.tagid);

            if (hasTag) {
                gameplayStylesCount.set(style.tagid, currentCount + 1 * weight);
            }
        });

        themes.forEach((theme) => {
            const currentCount = themesCount.get(theme.tagid) || 0;
            const hasTag = tags.includes(theme.tagid);

            if (hasTag) {
                themesCount.set(theme.tagid, currentCount + 1 * weight);
            }
        });

        moods.forEach((mood) => {
            const currentCount = moodsCount.get(mood.tagid) || 0;
            const hasTag = tags.includes(mood.tagid);

            if (hasTag) {
                moodsCount.set(mood.tagid, currentCount + 1 * weight);
            }
        });
    });

    return {
        genres: genresCount,
        gameplay: gameplayStylesCount,
        themes: themesCount,
        moods: moodsCount,
    };
}
