import { allTags } from '@/arrays/groupedTags';

export default function getTagNames(tagIds: number[]) {
    return allTags
        .filter((obj) => tagIds.some((id) => id === obj.tagid))
        .map((tag) => tag.name);
}
