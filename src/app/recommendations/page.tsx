import { redirect } from 'next/navigation';

import getGamesData from '@/functions/getGamesData';
import checkGamesTags from '@/functions/checkGamesTags';
import getRecomendations from '@/functions/getRecommendations';
import getUserGames from '@/functions/helpers/getUserGames';
import GameRecommendationCard from '@/components/GameRecommendationCard';

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
    const ownedGamesRecommendations = getRecomendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
        unplayedGamesData,
        unexploredGenres
    );

    return (
        <main className='py-9 bg-gray-800'>
            <div className='max-w-3xl mx-auto'>
                {(ownedGamesRecommendations.unplayed.length > 0 ||
                    ownedGamesRecommendations.unexplored.length > 0) && (
                    <section id='owned'>
                        <h2 className='mb-4 text-center text-5xl font-bold text-slate-100'>
                            Games you already own
                        </h2>
                        <p className='mb-12 text-slate-300 text-lg text-center'>
                            You have {unplayedGames.length} unplayed games in
                            your library. Here are some you may enjoy:
                        </p>
                        <div className='flex justify-between'>
                            <div>
                                <p className='mb-3 text-slate-100 text-lg text-center'>
                                    Similar to what you like:
                                </p>
                                {ownedGamesRecommendations.unplayed && (
                                    <GameRecommendationCard
                                        recommendationsArray={
                                            ownedGamesRecommendations.unplayed
                                        }
                                    />
                                )}
                            </div>
                            <span className='text-slate-300 text-lg'>or</span>
                            <div className='w-min'>
                                <p className='mb-3 text-slate-100 text-lg text-center'>
                                    If you want to try something different:
                                </p>
                                {ownedGamesRecommendations.unexplored && (
                                    <GameRecommendationCard
                                        recommendationsArray={
                                            ownedGamesRecommendations.unexplored
                                        }
                                    />
                                )}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
}
