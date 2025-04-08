import { redirect } from 'next/navigation';

import checkPlaytimes from '@/functions/checkPlaytimes';
import getSteamGames from '@/functions/getSteamGames';
import getGamesData from '@/functions/getGamesData';
import checkGamesTags from '@/functions/checkGamesTags';
import getRecomendations from '@/functions/getRecommendations';

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

    const { ownedGames, playedGames, unplayedGames, recentlyPlayed } =
        await getSteamGames(steamId);

    const { completedGames, droppedGames } = await checkPlaytimes(
        playedGames,
        recentlyPlayed
    );

    const { completedGamesTags, droppedGamesTags, unplayedGamesData } =
        await getGamesData(
            ownedGames,
            completedGames,
            droppedGames,
            unplayedGames
        );

    const {
        topGenres,
        topGameplayStyles,
        topThemes,
        topMoods,
        dislikedGenres,
    } = checkGamesTags(completedGamesTags, droppedGamesTags);

    await getRecomendations(
        topGenres,
        topGameplayStyles,
        topThemes,
        topMoods,
        dislikedGenres,
        unplayedGamesData
    );

    return <div>Teste</div>;
}
