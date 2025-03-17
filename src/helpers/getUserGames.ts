import { OwnedGamesRes, RecentlyPlayedRes } from '@/types/UserGamesRes';

const BASE_URL = 'http://api.steampowered.com/IPlayerService';

export default async function getUserGames(steamId: string) {
    const playedGames = await fetch(
        `${BASE_URL}/GetOwnedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamId}&include_appinfo=true&include_played_free_games&format=json`
    )
        .then((res) => res.json())
        .then((data: OwnedGamesRes) =>
            data.response.games
                .filter((game) => game.playtime_forever > 90)
                .map((game) => {
                    return { name: game.name, playtime: game.playtime_forever };
                })
        );

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
