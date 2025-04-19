export const revalidate = 86400;

import { NextResponse } from 'next/server';
import pLimit from 'p-limit';
import checkHltbData from '../../../lib/hltb';
import { SteamGame } from '@/types/TSteam';

const limit = pLimit(10);

type BodyData = {
    playedGames: SteamGame[];
    recentlyPlayed: string[];
};

export async function POST(request: Request) {
    try {
        const { playedGames, recentlyPlayed }: BodyData = await request.json();

        if (!Array.isArray(playedGames) || !Array.isArray(recentlyPlayed)) {
            return NextResponse.json(
                { error: 'Invalid input format' },
                { status: 400 }
            );
        }

        const completed: string[] = [];
        const dropped: string[] = [];

        const hltbRequests = playedGames.map((game) =>
            limit(async () => {
                const gameName = game.name;
                const playtime = game.playtime;

                const gameIsCompleted = await checkHltbData(gameName, playtime);

                if (gameIsCompleted) {
                    completed.push(gameName);
                } else if (
                    !recentlyPlayed.some((r) => r === gameName) &&
                    playtime < 600
                ) {
                    dropped.push(gameName);
                }
            })
        );

        await Promise.all(hltbRequests);

        return NextResponse.json({ completed, dropped });
    } catch (error) {
        console.error('Error processing playtimes:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
