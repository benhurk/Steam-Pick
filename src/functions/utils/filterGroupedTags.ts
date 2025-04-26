import { groupedTags } from '@/arrays/groupedTags';

export default function filterGroupedTags(
    tags: { tagid: number; weight: number }[]
) {
    const groupedTagsFound = Object.values(tags).filter((tag) =>
        groupedTags.some((set) => set.has(tag.tagid))
    );

    if (groupedTagsFound.length < 2) {
        return tags;
    }

    const result = [];

    for (const set of groupedTags) {
        const matches = groupedTagsFound
            .filter((found) => [...set].filter((tag) => tag === found.tagid))
            .sort((a, b) => b.weight - a.weight);

        const toRemove = new Set(matches.slice(1));
        const newTagsArray = Object.values(tags).filter(
            (tag) => !toRemove.has(tag)
        );

        result.push(...newTagsArray);
    }

    return result;
}
