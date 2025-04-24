import getOwnedRecomendations from './getOwnedRecommendations';
import getNewRecommendations from './getNewRecommendations';
import { SteamGame, GameData } from '@/types/TGames';

export default async function getRecommendations(
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][],
    favoriteMoods: [number, number][],
    dislikedGenres: number[],
    ownedGames: SteamGame[],
    unplayedGamesData: GameData[]
) {
    const owned = getOwnedRecomendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
        unplayedGamesData
    );

    const discover = await getNewRecommendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
        ownedGames
    );

    return { owned, discover };
}
