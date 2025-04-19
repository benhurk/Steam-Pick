import { gameplayStyles, moods, themes } from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';
import SteamSpyDataRes from '@/types/TSteamSpy';

export default function filterGameTags(data: SteamSpyDataRes) {
    const filteredGamesData = data.map((game) => {
        let filteredTags: string[] = [];

        const gameSpecificGenres = Object.keys(game.tags).filter((tag) =>
            specificGenres.some((genre) => genre.name === tag)
        );

        if (gameSpecificGenres.length > 0) {
            filteredTags = [...filteredTags, ...gameSpecificGenres];
        } else {
            const gameBroadGenres = Object.keys(game.tags).filter((tag) =>
                broadGenres.some((genre) => genre.name === tag)
            );

            filteredTags = [...filteredTags, ...gameBroadGenres];
        }

        const gameStyles = Object.keys(game.tags).filter((tag) =>
            gameplayStyles.some((style) => style.name === tag)
        );

        const gameThemes = Object.keys(game.tags).filter((tag) =>
            themes.some((theme) => theme.name === tag)
        );

        const gameMoods = Object.keys(game.tags).filter((tag) =>
            moods.some((mood) => mood.name === tag)
        );

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
