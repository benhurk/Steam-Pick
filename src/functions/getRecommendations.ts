import SteamSpyDataRes from '@/types/TSteamSpy';
import getOwnedRecomendations from './getOwnedRecommendations';
import { SteamGame } from '@/types/TSteam';

export default async function getRecommendations(
    favoriteGenres: [string, number][],
    favoriteGameplay: [string, number][],
    favoriteThemes: [string, number][],
    favoriteMoods: [string, number][],
    dislikedGenres: string[],
    unplayedGamesData: SteamSpyDataRes,
    ownedGames: SteamGame[]
) {
    const owned = getOwnedRecomendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
        unplayedGamesData
    );

    return { owned };
}
