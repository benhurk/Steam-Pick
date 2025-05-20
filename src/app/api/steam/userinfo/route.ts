import { NextResponse } from 'next/server';

import { UserSummariesRes } from '@/types/TSteam';

const BASE_URL =
    'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2';

const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const steamId = searchParams.get('steamid');

    if (!steamId) {
        return NextResponse.json(
            { error: 'No SteamID provided.' },
            { status: 400 }
        );
    }

    try {
        let retryCount = 0;
        let data: UserSummariesRes | null = null;

        while (retryCount < MAX_RETRIES) {
            try {
                const res = await fetch(
                    `${BASE_URL}/?key=${process.env.STEAM_KEY}&steamids=${steamId}`
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                data = await res.json();

                if (
                    data?.response.players &&
                    data.response.players.length > 0
                ) {
                    break;
                } else {
                    throw new Error(
                        'Empty or invalid response from GetPlayerSummaries'
                    );
                }
            } catch (error) {
                console.error(
                    `Error during fetch attempt, retry ${retryCount}/${MAX_RETRIES}:`,
                    error
                );

                if (retryCount >= MAX_RETRIES) {
                    break; // No more retries
                }

                await new Promise((resolve) =>
                    setTimeout(resolve, RETRY_DELAY)
                );

                retryCount++;
            }
        }

        if (!data?.response?.players?.length) {
            console.error('All GetPlayerSummaries retries failed');
            return NextResponse.json(
                { error: 'Failed to GetPlayerSummaries after retries' },
                { status: 500 }
            );
        }

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
