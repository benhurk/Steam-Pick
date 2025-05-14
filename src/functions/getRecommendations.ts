import getOwnedRecomendations from './getOwnedRecommendations';
import getNewRecommendations from './getNewRecommendations';
import { SteamGame, GameData } from '@/types/TGames';
import { TPreferences } from '@/types/TPreferences';
import { TTaste } from '@/types/TTaste';

export default async function getRecommendations(
    taste: TTaste,
    ownedGames: SteamGame[],
    unplayedGamesData: GameData[],
    preferences: TPreferences
) {
    const owned = getOwnedRecomendations(taste, unplayedGamesData, preferences);

    const discover = await getNewRecommendations(
        taste,
        ownedGames,
        preferences
    );

    return { owned, discover };
}
