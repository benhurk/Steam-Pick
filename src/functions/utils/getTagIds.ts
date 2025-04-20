import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';

export default function getTagIds(tagNames: string[]) {
    const allTags = [
        ...specificGenres,
        ...broadGenres,
        ...gameplayStyles,
        ...themes,
        ...moods,
    ];

    return allTags
        .filter((obj) => tagNames.some((name) => name === obj.name))
        .map((tag) => tag.tagid);
}
