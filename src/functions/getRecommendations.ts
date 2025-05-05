import getOwnedRecomendations from './getOwnedRecommendations';
import getNewRecommendations from './getNewRecommendations';
import { SteamGame, GameData } from '@/types/TGames';

export default async function getRecommendations(
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][],
    favoriteMoods: [number, number][],
    excludedTags: number[],
    ownedGames: SteamGame[],
    unplayedGamesData: GameData[]
) {
    const owned = getOwnedRecomendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        excludedTags,
        unplayedGamesData
    );

    const discover = await getNewRecommendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        excludedTags,
        ownedGames
    );

    return { owned, discover };
}
