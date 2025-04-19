import { SteamGame } from './TSteam';

export type TUserGames = {
    owned: SteamGame[];
    recentlyPlayed: string[];
    played: SteamGame[];
    unplayed: SteamGame[];
};

export type TPlaytimes = {
    completed: string[];
    dropped: string[];
};
