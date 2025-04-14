import checkPlaytimes from '@/functions/checkPlaytimes';
import getSteamGames from '@/functions/getSteamGames';
import GamesApiResponse from '@/types/GamesApiResponse';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const steamId = searchParams.get('steamid');

    if (!steamId) {
        return NextResponse.json(
            { error: 'A SteamId is required' },
            { status: 400 }
        );
    }

    const { ownedGames, playedGames, unplayedGames, recentlyPlayed } =
        await getSteamGames(steamId);

    const { completedGames, droppedGames } = await checkPlaytimes(
        playedGames,
        recentlyPlayed
    );

    const responseData: GamesApiResponse = {
        ownedGames,
        completedGames,
        droppedGames,
        unplayedGames,
    };

    const response = NextResponse.json(responseData);

    response.headers.set(
        'Cache-Control',
        `public, s-maxage=86400, stale-while-revalidate=86400, key=${steamId}`
    );

    return response;
}
