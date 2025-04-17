import { redirect } from 'next/navigation';

import getGamesData from '@/functions/getGamesData';
import checkGamesTags from '@/functions/checkGamesTags';
import getOwnedRecomendations from '@/functions/getOwnedRecommendations';
import getUserGames from '@/functions/helpers/getUserGames';
import GameRecommendationCard from '@/components/GameRecommendationCard';
import Background from '@/components/Background';
import getNewRecommendations from '@/functions/getNewRecommendations';

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
    } = checkGamesTags(completedGamesTags, droppedGamesTags);

    //Get recommendations
    const ownedGamesRecommendations = getOwnedRecomendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
        unplayedGamesData
    );

    const newGamesRecommendations = await getNewRecommendations(
        favoriteGenres,
        favoriteGameplay,
        favoriteThemes,
        favoriteMoods,
        dislikedGenres,
        ownedGames
    );

    return (
        <main className='relative min-h-screen'>
            <Background />
            <div className='max-w-3xl mx-auto py-8'>
                <section>
                    <h2
                        className='mb-12 text-center text-5xl font-bold text-transparent 
                                        bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                        Recommendations
                    </h2>

                    <div className='flex justify-between'>
                        {ownedGamesRecommendations.length > 0 && (
                            <div className='w-min'>
                                <h3
                                    className='block mb-2 text-transparent text-2xl text-center font-bold
                                                bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                                    Already in your library
                                </h3>
                                <p className='mb-4 text-slate-50 font-semibold text-center'>
                                    There is {unplayedGames.length} unplayed
                                    games in your library.
                                </p>
                                {ownedGamesRecommendations && (
                                    <GameRecommendationCard
                                        recommendationsArray={
                                            ownedGamesRecommendations
                                        }
                                    />
                                )}
                            </div>
                        )}
                        <span className='text-slate-50 font-semibold text-xl'>
                            or
                        </span>
                        {newGamesRecommendations.length > 0 && (
                            <div className='w-min'>
                                <h3
                                    className='block mb-2 text-transparent text-2xl text-center font-bold
                                                bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                                    Want something new?
                                </h3>
                                <p className='mb-4 text-slate-50 font-semibold text-center'>
                                    Here are some games that fit your taste.
                                </p>
                                {newGamesRecommendations && (
                                    <GameRecommendationCard
                                        recommendationsArray={
                                            newGamesRecommendations
                                        }
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}
