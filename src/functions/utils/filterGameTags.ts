import gameTags, { allTags } from '@/consts/gameTags';
import filterGroupedTags from './filterGroupedTags';

export default function filterGameTags(
    tags: { tagid: number; weight: number }[]
) {
    const relevantTags = tags.filter((tag) =>
        allTags.some((t) => t.tagid === tag.tagid)
    );

    const bestTags = filterGroupedTags(relevantTags).map((tag) => tag.tagid);

    //Separate genre tags
    const gameBroadGenres = gameTags.broadGenres
        .filter((g) => bestTags.some((t) => t === g.tagid))
        .map((g) => g.tagid);

    const gameSpecificGenres = gameTags.specificGenres
        .filter((g) => bestTags.some((t) => t === g.tagid))
        .map((g) => g.tagid);

    const nonGenreTags = bestTags.filter(
        (tag) => ![...gameBroadGenres, ...gameSpecificGenres].includes(tag)
    );

    const filteredTags: number[] = [...nonGenreTags];

    //Only add broad genres if there is no specific genre
    if (gameSpecificGenres.length > 0) {
        filteredTags.push(...gameSpecificGenres);
    } else {
        filteredTags.push(...gameBroadGenres);
    }

    return filteredTags;
}
