import { groupedTags } from '@/consts/groupedTags';

export default function filterGroupedTags(
    tags: { tagid: number; weight: number }[]
) {
    const groupedTagsFound = tags.filter((tag) =>
        groupedTags.some((set) => set.includes(tag.tagid))
    );

    if (groupedTagsFound.length < 2) {
        return tags;
    }

    const result = [...tags];

    for (const set of groupedTags) {
        const matches = groupedTagsFound
            .filter((found) => set.includes(found.tagid))
            .sort((a, b) => b.weight - a.weight);

        if (matches.length > 1) {
            // Keep only the highest weight tag from each group
            const tagsToRemove = matches.slice(1).map((t) => t.tagid);
            for (let i = result.length - 1; i >= 0; i--) {
                if (tagsToRemove.includes(result[i].tagid)) {
                    result.splice(i, 1);
                }
            }
        }
    }

    return result;
}
