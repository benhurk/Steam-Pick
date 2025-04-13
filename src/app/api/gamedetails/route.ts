import { AppDetailsRes } from '@/types/SteamDataRes';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get('id');

    if (!gameId) {
        return NextResponse.json(
            { error: 'No game ID was provided' },
            { status: 400 }
        );
    }

    try {
        const res = await fetch(
            `https://store.steampowered.com/api/appdetails?appids=${gameId}`,
            { next: { revalidate: 86400 } }
        );

        const data: AppDetailsRes = await res.json();

        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: 'Failed to fetch Steam data' },
            { status: 500 }
        );
    }
}
