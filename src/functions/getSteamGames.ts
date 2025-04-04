import { SteamGame } from '@/types/gamesData';
import { OwnedGamesRes, RecentlyPlayedRes } from '@/types/getGamesRes';

const BASE_URL = 'http://api.steampowered.com/IPlayerService';

export default async function getSteamGames(steamId: string) {
    const playedGames: SteamGame[] = await fetch(
        `${BASE_URL}/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games&format=json`
    )
        .then((res) => res.json())
        .then((data: OwnedGamesRes) =>
            data.response.games
                .filter((game) => game.playtime_forever > 120)
                .map((game) => {
                    return {
                        appid: game.appid,
                        name: game.name,
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
                new Set(data.response.games.map((game) => game.name))
        );

    return {
        playedGames,
        recentlyPlayed,
    };
}
