import filterGames from '@/functions/filterGames';
import getIgdbData from '@/functions/getIgdbData';
import getSteamGames from '@/functions/getSteamGames';

import { redirect } from 'next/navigation';

type Props = {
    searchParams: {
        steamId: string;
    };
};

export default async function Recommendations({ searchParams }: Props) {
    const { steamId } = await searchParams;

    if (!steamId) {
        redirect('/');
    }

    const { playedGames, recentlyPlayed } = await getSteamGames(steamId);
    const { completedGames, droppedGames } = await filterGames(
        playedGames,
        recentlyPlayed
    );
    const { genres, keywords, themes } = await getIgdbData(
        completedGames,
        droppedGames
    );

    console.log(keywords);

    return <div>Teste</div>;
}
