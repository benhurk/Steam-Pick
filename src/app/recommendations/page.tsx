import { redirect } from 'next/navigation';

import getGamesData from '@/functions/getGamesData';
import checkGamesTags from '@/functions/checkGamesTags';
import getRecomendations from '@/functions/getRecommendations';
import getUserGames from '@/functions/helpers/getUserGames';

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

    //Get the user's games
    const { ownedGames, completedGames, droppedGames, unplayedGames } =
        await getUserGames(steamId);

    //Get tags or other necessary data
    const { completedGamesTags, droppedGamesTags, unplayedGamesData } =
        await getGamesData(
            ownedGames,
            new Set(completedGames),
            new Set(droppedGames),
            unplayedGames
        );

    //Get user's taste and unexplored genres
    const {
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
        unexploredGenres,
    } = checkGamesTags(completedGamesTags, droppedGamesTags);

    //Get recommendations
    getRecomendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
        unplayedGamesData,
        unexploredGenres
    );

    return <div>Teste</div>;
}
