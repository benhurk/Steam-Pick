export default function getDislikedTags(
    droppedTags: string[],
    completedTags: string[]
) {
    const allTags = new Set([...droppedTags, ...completedTags]);

    [...allTags].filter((tag) => {
        const droppedCount = droppedTags.filter((dt) => dt === tag).length;
        const completedCount = completedTags.filter((ct) => ct === tag).length;

        console.log({ tag, completedCount, droppedCount });
    });
}
