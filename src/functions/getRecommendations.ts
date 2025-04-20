import getOwnedRecomendations from './getOwnedRecommendations';
import { SteamGame } from '@/types/TSteam';
import getNewRecommendations from './getNewRecommendations';
import SteamSpyDataRes from '@/types/TSteamSpy';

export default async function getRecommendations(
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][],
    favoriteMoods: [number, number][],
    dislikedGenres: number[],
    ownedGames: SteamGame[],
    unplayedGamesData: SteamSpyDataRes
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
