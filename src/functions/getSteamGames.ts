import { SteamGame } from '@/types/SteamGame';
import { OwnedGamesRes, RecentlyPlayedRes } from '@/types/SteamDataRes';

const BASE_URL = 'http://api.steampowered.com/IPlayerService';

export default async function getSteamGames(steamId: string) {
    //Get owned games
    const ownedGames: SteamGame[] = await fetch(
        `${BASE_URL}/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games&format=json`
    )
        .then((res) => res.json())
        .then((data: OwnedGamesRes) =>
            data.response.games.map((game) => {
                return {
                    appid: game.appid,
                    name: game.name.toLowerCase(),
                    playtime: game.playtime_forever,
                };
            })
        );

    //Get recently played games names
    const recentlyPlayed = await fetch(
        `${BASE_URL}/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamId}&format=json`
    )
        .then((res) => res.json())
        .then(
            (data: RecentlyPlayedRes) =>
                new Set(
                    data.response.games.map((game) => game.name.toLowerCase())
                )
        );

    //Get played games
    const playedGames = ownedGames.filter((game) => game.playtime >= 120);

    //Get unplayed games
    const unplayedGames = ownedGames.filter(
        (g) => g.playtime < 120 && !recentlyPlayed.has(g.name.toLowerCase())
    );

    return {
        ownedGames,
        playedGames,
        unplayedGames,
        recentlyPlayed,
    };
}
