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

export type TQueryData = {
    appid: number;
    name: string;
    tagids: number[];
}[];

export type TQueryFilters = {
    includeTag: number;
    excludeTags: number[];
    minRating: {
        count: number;
        percentPositive: number;
    };
};
