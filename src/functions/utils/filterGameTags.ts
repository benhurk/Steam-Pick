import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';

export default function filterGameTags(tags: { [key: string]: number }) {
    let filteredTags: number[] = [];

    const gameSpecificGenres = specificGenres
        .filter((g) => Object.keys(tags).some((t) => t === g.name))
        .map((g) => g.tagid);

    if (gameSpecificGenres.length > 0) {
        filteredTags = [...filteredTags, ...gameSpecificGenres];
    } else {
        const gameBroadGenres = broadGenres
            .filter((g) => Object.keys(tags).some((t) => t === g.name))
            .map((g) => g.tagid);

        filteredTags = [...filteredTags, ...gameBroadGenres];
    }

    const gameStyles = gameplayStyles
        .filter((g) => Object.keys(tags).some((t) => t === g.name))
        .map((g) => g.tagid);

    const gameThemes = themes
        .filter((g) => Object.keys(tags).some((t) => t === g.name))
        .map((g) => g.tagid);

    const gameMoods = moods
        .filter((g) => Object.keys(tags).some((t) => t === g.name))
        .map((g) => g.tagid);

    filteredTags = [
        ...filteredTags,
        ...gameStyles,
        ...gameThemes,
        ...gameMoods,
    ];

    return filteredTags.flat();
}
