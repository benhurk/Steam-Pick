import gameTags from '@/consts/gameTags';
import { GameWeight } from '@/types/TGames';

export default function getTagsCount(games: GameWeight[]) {
    const genresCount = new Map<number, number>();
    const gameplayStylesCount = new Map<number, number>();
    const themesCount = new Map<number, number>();

    games.forEach((g) => {
        const tags = g.tags;
        const weight = g.weight;

        gameTags.broadGenres.forEach((genre) => {
            const currentCount = genresCount.get(genre.tagid) || 0;
            const hasTag = tags.includes(genre.tagid);

            if (hasTag) {
                genresCount.set(genre.tagid, currentCount + 1 * weight);
            }
        });

        gameTags.specificGenres.forEach((genre) => {
            const currentCount = genresCount.get(genre.tagid) || 0;
            const hasTag = tags.includes(genre.tagid);

            if (hasTag) {
                genresCount.set(genre.tagid, currentCount + 1 * weight);
            }
        });

        gameTags.gameplay.forEach((style) => {
            const currentCount = gameplayStylesCount.get(style.tagid) || 0;
            const hasTag = tags.includes(style.tagid);

            if (hasTag) {
                gameplayStylesCount.set(style.tagid, currentCount + 1 * weight);
            }
        });

        gameTags.themes.forEach((theme) => {
            const currentCount = themesCount.get(theme.tagid) || 0;
            const hasTag = tags.includes(theme.tagid);

            if (hasTag) {
                themesCount.set(theme.tagid, currentCount + 1 * weight);
            }
        });
    });

    return {
        genres: genresCount,
        gameplay: gameplayStylesCount,
        themes: themesCount,
    };
}
