export const revalidate = 86400;

import { OwnedGamesRes, RecentlyPlayedRes } from '@/types/TSteam';
import { SteamGame } from '@/types/TSteam';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const steamId = searchParams.get('steamid');

    if (!steamId) {
        return NextResponse.json(
            { error: 'No Steam id provided.' },
            { status: 400 }
        );
    }

    const BASE_URL = 'https://api.steampowered.com/IPlayerService';

    try {
        //Get owned games
        const owned: SteamGame[] = await fetch(
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
            .then((data: RecentlyPlayedRes) =>
                data.response.games.map((game) => game.name.toLowerCase())
            );

        //Filter played games
        const played = owned.filter((game) => game.playtime >= 120);

        //Filter unplayed games
        const unplayed = owned.filter(
            (g) =>
                g.playtime < 120 &&
                !recentlyPlayed.some((r) => r === g.name.toLowerCase())
        );

        return NextResponse.json({
            owned,
            recentlyPlayed,
            played,
            unplayed,
        });
    } catch (error) {
        console.error('Error getting user games:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Steam data' },
            { status: 500 }
        );
    }
}
