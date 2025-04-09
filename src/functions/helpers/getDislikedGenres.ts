import { specificGenres } from '@/arrays/genres';

export default function getDislikedGenres(
    droppedTags: string[],
    completedTags: string[]
) {
    const allTags = new Set([...droppedTags, ...completedTags]);
    const genres = [...allTags].filter((tag) =>
        specificGenres.some((genre) => genre === tag)
    );

    const dislikedGenres = genres.filter((tag) => {
        const droppedCount = droppedTags.filter((dt) => dt === tag).length;
        const completedCount = completedTags.filter((ct) => ct === tag).length;

        if (droppedCount >= 3 && droppedCount > completedCount) {
            return tag;
        }
    });

    console.log('Disliked genres:', dislikedGenres);
    return dislikedGenres;
}
