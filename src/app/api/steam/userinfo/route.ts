import { UserSummariesRes } from '@/types/TSteam';
import { NextResponse } from 'next/server';

const BASE_URL =
    'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const steamId = searchParams.get('steamid');

    if (!steamId) {
        return NextResponse.json(
            { error: 'No Steam id provided.' },
            { status: 400 }
        );
    }

    try {
        const res = await fetch(
            `${BASE_URL}/?key=${process.env.STEAM_KEY}&steamids=${steamId}`
        );

        const data: UserSummariesRes = await res.json();

        return NextResponse.json(
            data.response.players.map((p) => ({
                personaname: p.personaname,
                avatar: p.avatarfull,
            }))[0]
        );
    } catch (error) {
        console.error('Error getting user info:', error);
        return NextResponse.json(
            { error: 'Failed to GetPlayerSummaries' },
            { status: 500 }
        );
    }
}
