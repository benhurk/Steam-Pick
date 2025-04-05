import filterGamesData from '@/functions/filterGamesData';
import filterGames from '@/functions/filterGames';
import getSteamGames from '@/functions/getSteamGames';

import { redirect } from 'next/navigation';
import getGamesTags from '@/functions/getGamesTags';

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

    const { completedGamesTags, droppedGamesTags } = await getGamesTags(
        completedGames,
        droppedGames
    );

    // filterGamesData(completedGamesData, droppedGamesData);

    return <div>Teste</div>;
}
