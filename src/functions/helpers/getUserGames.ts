import GamesApiResponse from '@/types/GamesApiResponse';

export default async function getUserGames(steamId: string) {
    const res = await fetch(`${process.env.SITE_BASE_URL}/api/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ steamId }),
    });

    if (!res.ok) {
        throw new Error("Failed to get user's games.");
    }

    const data: GamesApiResponse = await res.json();

    return data;
}
