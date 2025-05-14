import getOwnedRecomendations from './getOwnedRecommendations';
// import getNewRecommendations from './getNewRecommendations';
import { SteamGame, GameData, TRecommendations } from '@/types/TGames';
import { TPreferences } from '@/types/TPreferences';

export default async function getRecommendations(
    favoriteGenres: [number, number][],
    favoriteGameplay: [number, number][],
    favoriteThemes: [number, number][],
    favoriteMoods: [number, number][],
    excludedTags: number[],
    ownedGames: SteamGame[],
    unplayedGamesData: GameData[],
    preferences: TPreferences
) {
    const owned = getOwnedRecomendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        excludedTags,
        unplayedGamesData,
        preferences
    );

    // const discover = await getNewRecommendations(
    //     favoriteGenres,
    //     favoriteGameplay,
    //     favoriteThemes,
    //     favoriteMoods,
    //     excludedTags,
    //     ownedGames,
    //     preferences
    // );

    const discover: TRecommendations = [];

    return { owned, discover };
}
