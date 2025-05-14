import { SteamGame } from './TGames';

export type TUserInfo = {
    personaname: string;
    avatar: string;
};

export type TUserGames = {
    owned: SteamGame[];
    played: SteamGame[];
    unplayed: SteamGame[];
};

export type TQueryData = {
    appid: number;
    name: string;
    tagids: number[];
}[];

export type TQueryFilters = {
    includeTags: number[];
    excludeTags: number[];
    minRating: {
        count: number;
        percentPositive: number;
    };
};
