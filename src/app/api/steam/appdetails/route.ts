export const revalidate = 604800;

import { NextResponse } from 'next/server';

import { AppDetailsRes } from '@/types/TSteam';

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
