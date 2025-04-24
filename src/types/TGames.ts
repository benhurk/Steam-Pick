export interface SteamGame {
    appid: number;
    name: string;
    playtime: number;
    recentlyPlayed: boolean;
    total_achievements?: number;
    unlocked_achievements?: {
        name: string;
        player_percent_unlocked: string;
    }[];
}

export interface GameData extends SteamGame {
    tags: number[];
}

export interface GameWeight extends GameData {
    weight: number;
}

export type TRecommendations = {
    id: number;
    name: string;
    matchingTags: {
        count: number;
        tags: string[];
    };
}[];
