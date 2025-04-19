export const revalidate = 604800;

import { AppDetailsRes } from '@/types/TSteam';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get('id');

    if (!gameId) {
        return NextResponse.json(
            { error: 'No game ID provided' },
            { status: 400 }
        );
    }

    try {
        const res = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${gameId}`
        );

        const data: AppDetailsRes = await res.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error getting game details:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Steam data' },
            { status: 500 }
        );
    }
}
