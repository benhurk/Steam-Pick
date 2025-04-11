import {
    difficulties,
    gameplayStyles,
    moods,
    themes,
} from '@/arrays/gameStyles';
import { broadGenres, specificGenres } from '@/arrays/genres';
import SteamSpyDataRes from '@/types/SteamSpyDataRes';

export default function filterGameTags(data: SteamSpyDataRes) {
    const filteredGamesData = data.map((game) => {
        let filteredTags: string[] = [];

        const gameSpecificGenres = Object.keys(game.tags).filter((tag) =>
            specificGenres.some((genre) => genre === tag)
        );

        if (gameSpecificGenres.length > 0) {
            filteredTags = [...filteredTags, ...gameSpecificGenres];
        } else {
            const gameBroadGenres = Object.keys(game.tags).filter((tag) =>
                broadGenres.some((genre) => genre === tag)
            );

            filteredTags = [...filteredTags, ...gameBroadGenres];
        }

        const gameStyles = Object.keys(game.tags).filter((tag) =>
            gameplayStyles.some((style) => style === tag)
        );

        const gameThemes = Object.keys(game.tags).filter((tag) =>
            themes.some((theme) => theme === tag)
        );

        const gameMoods = Object.keys(game.tags).filter((tag) =>
            moods.some((mood) => mood === tag)
        );

        const gameDifficulty = Object.keys(game.tags).filter((tag) =>
            difficulties.some((mood) => mood === tag)
        );

        filteredTags = [
            ...filteredTags,
            ...gameStyles,
            ...gameThemes,
            ...gameMoods,
            ...gameDifficulty,
        ];

        return filteredTags;
    });

    return filteredGamesData.flat();
}
