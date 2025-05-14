import { allTags } from '@/consts/gameTags';

export default function getTagIds(tagNames: string[]) {
    return allTags
        .filter((obj) => tagNames.some((name) => name === obj.name))
        .map((tag) => tag.tagid);
}
