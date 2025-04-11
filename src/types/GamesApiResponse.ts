import { SteamGame } from '@/types/SteamGame';

type GamesApiResponse = {
    ownedGames: SteamGame[];
    unplayedGames: SteamGame[];
    completedGames: string[];
    droppedGames: string[];
};

export default GamesApiResponse;
