import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';
import SteamSpyDataRes from '@/types/TSteamSpy';

export default function filterGameTags(data: SteamSpyDataRes) {
    const filteredGamesData = data.map((game) => {
        let filteredTags: number[] = [];

        const gameSpecificGenres = specificGenres
            .filter((g) => Object.keys(game.tags).some((t) => t === g.name))
            .map((g) => g.tagid);

        if (gameSpecificGenres.length > 0) {
            filteredTags = [...filteredTags, ...gameSpecificGenres];
        } else {
            const gameBroadGenres = broadGenres
                .filter((g) => Object.keys(game.tags).some((t) => t === g.name))
                .map((g) => g.tagid);

            filteredTags = [...filteredTags, ...gameBroadGenres];
        }

        const gameStyles = gameplayStyles
            .filter((g) => Object.keys(game.tags).some((t) => t === g.name))
            .map((g) => g.tagid);

        const gameThemes = themes
            .filter((g) => Object.keys(game.tags).some((t) => t === g.name))
            .map((g) => g.tagid);

        const gameMoods = moods
            .filter((g) => Object.keys(game.tags).some((t) => t === g.name))
            .map((g) => g.tagid);

        filteredTags = [
            ...filteredTags,
            ...gameStyles,
            ...gameThemes,
            ...gameMoods,
        ];

        return filteredTags;
    });

    return filteredGamesData.flat();
}
