import { allTags } from '@/consts/gameTags';

export default function getTagNames(tagIds: number[]) {
    const tagMap = new Map(allTags.map((tag) => [tag.tagid, tag.name]));

    return tagIds.map((id) => tagMap.get(id)).filter((t) => t != undefined);
}
