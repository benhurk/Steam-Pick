import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';
import { GameWeight } from '@/types/TGames';
import getTagNames from '../utils/getTagNames';

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
            const count = tags.filter((tag) => tag === genre.tagid).length;
            genresCount.set(genre.tagid, currentCount + count * weight);
        });

        specificGenres.forEach((genre) => {
            const currentCount = genresCount.get(genre.tagid) || 0;
            const count = tags.filter((tag) => tag === genre.tagid).length;
            genresCount.set(genre.tagid, currentCount + count * weight);
        });

        gameplayStyles.forEach((style) => {
            const currentCount = gameplayStylesCount.get(style.tagid) || 0;
            const count = tags.filter((tag) => tag === style.tagid).length;
            gameplayStylesCount.set(style.tagid, currentCount + count * weight);
        });

        themes.forEach((theme) => {
            const currentCount = themesCount.get(theme.tagid) || 0;
            const count = tags.filter((tag) => tag === theme.tagid).length;
            themesCount.set(theme.tagid, currentCount + count * weight);
        });

        moods.forEach((mood) => {
            const currentCount = moodsCount.get(mood.tagid) || 0;
            const count = tags.filter((tag) => tag === mood.tagid).length;
            moodsCount.set(mood.tagid, currentCount + count * weight);
        });
    });

    console.log(
        [...gameplayStylesCount.entries()]
            .map(([tag, count]) => ({
                name: getTagNames([tag]),
                count,
            }))
            .sort((a, b) => b.count - a.count)
    );

    return {
        genres: genresCount,
        gameplay: gameplayStylesCount,
        themes: themesCount,
        moods: moodsCount,
    };
}
