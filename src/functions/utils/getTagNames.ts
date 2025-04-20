import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';

export default function getTagNames(tagIds: number[]) {
    const allTags = [
        ...specificGenres,
        ...broadGenres,
        ...gameplayStyles,
        ...themes,
        ...moods,
    ];

    return allTags
        .filter((obj) => tagIds.some((id) => id === obj.tagid))
        .map((tag) => tag.name);
}
