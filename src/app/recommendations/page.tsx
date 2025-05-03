import { redirect } from 'next/navigation';

import getGamesData from '@/functions/getGamesData';
import analyseGamesWeight from '@/functions/analyseGamesWeight';
import checkGamesTags from '@/functions/checkGamesTags';
import getRecommendations from '@/functions/getRecommendations';

import { TUserGames } from '@/types/TApi';

import GameRecommendationCard from '@/components/GameRecommendationCard';
import getTagNames from '@/functions/utils/getTagNames';

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
            <div className='max-w-3xl mx-auto py-6'>
                <section className='mb-18'>
                    <h2
                        className='mb-8 text-center text-4xl font-bold text-transparent 
                                bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                        Overview
                    </h2>
                    <ul
                        className='text-white text-lg list-disc w-fit mx-auto shadow-lg
                    *:not-last:mb-1'>
                        <li>
                            Your favorite genres are:{' '}
                            {getTagNames(
                                taste.favoriteGenres.map(([tag]) => tag)
                            ).join(', ')}
                            .
                        </li>
                        <li>
                            {taste.dislikedGenres.length > 0
                                ? `Genres you don't seem to like: ${getTagNames(
                                      taste.dislikedGenres.map((tag) => tag)
                                  ).join(', ')}.`
                                : "There isn't any particular genre that you tried and didn't enjoy."}
                        </li>
                        <li>
                            There are {userGames.unplayed.length} unplayed games
                            in your library. {recommendations.owned.length} that
                            fit your taste.
                        </li>
                    </ul>
                </section>
                <section>
                    <h2
                        className='mb-8 text-center text-4xl font-bold text-transparent 
                                bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                        Picked Games
                    </h2>

                    <div
                        className={`flex ${
                            Object.keys(recommendations).length > 1
                                ? 'justify-between'
                                : 'justify-center'
                        }`}>
                        {recommendations.owned.length > 0 && (
                            <div className='w-min'>
                                <h3 className='block mb-4 text-xl text-center font-semibold text-white'>
                                    Already in your library
                                </h3>
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
                                <h3 className='block mb-4 text-xl text-center font-semibold text-white '>
                                    Want something new?
                                </h3>
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
