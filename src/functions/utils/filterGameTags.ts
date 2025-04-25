import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';
import filterGroupedTags from './filterGroupedTag';

export default function filterGameTags(
    tags: { tagid: number; weight: number }[]
) {
    const filteredTags: number[] = [];

    const bestTags = filterGroupedTags(tags);

    const gameSpecificGenres = specificGenres
        .filter((g) => bestTags.some((t) => t.tagid === g.tagid))
        .map((g) => g.tagid);

    //Only add broad genres if there is no specific genre
    if (gameSpecificGenres.length > 0) {
        filteredTags.push(...gameSpecificGenres);
    } else {
        const gameBroadGenres = broadGenres
            .filter((g) => bestTags.some((t) => t.tagid === g.tagid))
            .map((g) => g.tagid);

        filteredTags.push(...gameBroadGenres);
    }

    const gameStyles = gameplayStyles
        .filter((gp) => bestTags.some((t) => t.tagid === gp.tagid))
        .map((gp) => gp.tagid);

    filteredTags.push(...gameStyles);

    const gameThemes = themes
        .filter((th) => bestTags.some((t) => t.tagid === th.tagid))
        .map((th) => th.tagid);

    filteredTags.push(...gameThemes);

    const gameMoods = moods
        .filter((m) => bestTags.some((t) => t.tagid === m.tagid))
        .map((m) => m.tagid);

    filteredTags.push(...gameMoods);

    return filteredTags;
}
