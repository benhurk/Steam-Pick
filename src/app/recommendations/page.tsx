import { redirect } from 'next/navigation';

import getGamesData from '@/functions/getGamesData';
import analyseGamesWeight from '@/functions/analyseGamesWeight';
import checkGamesTags from '@/functions/checkGamesTags';
import getRecommendations from '@/functions/getRecommendations';

import { TUserGames } from '@/types/TApi';

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

    //Get user games
    const userGames: TUserGames = await fetch(
        `${process.env.URL}/api/steam/usergames?steamid=${steamId}`
    ).then((res) => res.json());

    //Get game tags
    const gamesData = await getGamesData(userGames.played, userGames.unplayed);

    //Calculate the played games weight
    const gamesWeight = analyseGamesWeight(gamesData.played);

    //Get user's taste
    const taste = checkGamesTags(gamesWeight);

    //Get recommendations
    const recommendations = await getRecommendations(
        taste.favoriteGenres,
        taste.favoriteGameplay,
        taste.favoriteThemes,
        taste.favoriteMoods,
        taste.dislikedGenres,
        userGames.owned,
        gamesData.unplayed
    );

    return (
        <main>
            <div className='max-w-3xl mx-auto py-8'>
                <section>
                    <h2
                        className='mb-12 text-center text-5xl font-bold text-transparent 
                                bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                        Recommendations
                    </h2>

                    <div
                        className={`flex ${
                            Object.keys(recommendations).length > 1
                                ? 'justify-between'
                                : 'justify-center'
                        }`}>
                        {recommendations.owned.length > 0 && (
                            <div className='w-min'>
                                <h3
                                    className='block mb-2 text-transparent text-2xl text-center font-bold
                                                bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                                    Already in your library
                                </h3>
                                <p className='mb-4 text-slate-50 font-semibold text-center'>
                                    There is {userGames.unplayed.length}{' '}
                                    unplayed games in your library.
                                </p>
                                {recommendations.owned && (
                                    <GameRecommendationCard
                                        recommendationsArray={
                                            recommendations.owned
                                        }
                                    />
                                )}
                            </div>
                        )}
                        {Object.values(recommendations).length > 1 && (
                            <span className='text-slate-50 font-semibold text-xl'>
                                or
                            </span>
                        )}
                        {recommendations.discover.length > 0 && (
                            <div className='w-min'>
                                <h3
                                    className='block mb-2 text-transparent text-2xl text-center font-bold
                                                bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                                    Want something new?
                                </h3>
                                <p className='mb-4 text-slate-50 font-semibold text-center'>
                                    Here are some games that fit your taste.
                                </p>
                                {recommendations.discover && (
                                    <GameRecommendationCard
                                        recommendationsArray={
                                            recommendations.discover
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
