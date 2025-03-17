export type OwnedGamesRes = {
    response: {
        game_count: number;
        games: {
            appid: number;
            has_community_visible_stats: boolean;
            img_icon_url: string;
            name: string;
            playtime_deck_forever: number;
            playtime_disconnected: number;
            playtime_forever: number;
            playtime_linux_forever: number;
            playtime_mac_forever: number;
            playtime_windows_forever: number;
            rtime_last_played: number;
        }[];
    };
};

export type RecentlyPlayedRes = {
    response: {
        total_count: number;
        games: {
            appid: number;
            img_icon_url: string;
            name: string;
            playtime_2weeks: number;
            playtime_deck_forever: number;
            playtime_forever: number;
            playtime_linux_forever: number;
            playtime_mac_forever: number;
            playtime_windows_forever: number;
        }[];
    };
};
