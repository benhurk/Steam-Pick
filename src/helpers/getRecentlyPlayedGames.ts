import { RecentlyPlayedRes } from '@/types/UserGamesRes';

export default async function getRecentlyPlayedGames(steamId: string) {
    const res = await fetch(
        `http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_KEY}&steamid=${steamId}&format=json`
    );
    const { response: data }: { response: RecentlyPlayedRes } =
        await res.json();

    const recentlyPlayedGamesNames = new Set(
        data.games.map((game) => game.name)
    );
    return recentlyPlayedGamesNames;
}
