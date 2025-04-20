import { specificGenres } from '@/arrays/genres';

export default function getDislikedGenres(
    droppedTags: number[],
    completedTags: number[]
) {
    const allTags = new Set([...droppedTags, ...completedTags]);
    const genres = [...allTags].filter((tag) =>
        specificGenres.some((genre) => genre.tagid === tag)
    );

    const dislikedGenres = genres.filter((tag) => {
        const droppedCount = droppedTags.filter((dt) => dt === tag).length;
        const completedCount = completedTags.filter((ct) => ct === tag).length;

        if (droppedCount >= 3 && droppedCount > completedCount) {
            return tag;
        }
    });

    return dislikedGenres;
}
