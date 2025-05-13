import { redirect } from 'next/navigation';

import getGamesData from '@/functions/getGamesData';
import analyseGamesWeight from '@/functions/analyseGamesWeight';
import checkGamesTags from '@/functions/checkGamesTags';
import getRecommendations from '@/functions/getRecommendations';

import { TUserGames } from '@/types/TApi';

import GameRecommendationCard from '@/components/GameRecommendationCard';
import { TPreferences } from '@/types/TPreferences';
import preferencesInitialState from '@/arrays/preferencesInitialState';
import NothingFoundCard from '@/components/NothingFoundCard';

type Props = {
    searchParams: {
        steamId: string;
        prefs?: string;
    };
};

export default async function Recommendations({ searchParams }: Props) {
    const { steamId, prefs } = await searchParams;

    if (!steamId) {
        redirect('/');
    }

    const preferences: TPreferences = prefs
        ? JSON.parse(decodeURIComponent(prefs))
        : preferencesInitialState;

    //Get user games
    const userGames: TUserGames = await fetch(
        `${process.env.URL}/api/steam/usergames?steamid=${steamId}`
    ).then((res) => res.json());

    //Get game tags
    const gamesData = await getGamesData(userGames.played, userGames.unplayed);

    //Calculate the played games weight
    const gamesWeight = analyseGamesWeight(gamesData.played);

    //Get user's taste
    const taste = checkGamesTags(gamesWeight, preferences);

    //Get recommendations
    const recommendations = await getRecommendations(
        taste.favoriteGenres,
        taste.favoriteGameplay,
        taste.favoriteThemes,
        taste.favoriteMoods,
        taste.excludedTags,
        userGames.owned,
        gamesData.unplayed,
        preferences
    );

    return (
        <main className='container flex flex-col grow justify-center'>
            <section>
                {[...recommendations.owned, ...recommendations.discover]
                    .length > 0 ? (
                    <>
                        <h2
                            className='mb-12 text-center text-4xl font-bold text-transparent 
                                bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                            Picked Games
                        </h2>

                        <div
                            className={`flex ${
                                recommendations.owned.length > 0 &&
                                recommendations.discover.length > 0
                                    ? 'justify-between'
                                    : 'justify-center'
                            }`}>
                            {recommendations.owned.length > 0 && (
                                <div className='w-min'>
                                    {recommendations.discover.length > 0 && (
                                        <h3 className='block mb-4 text-xl text-center font-semibold text-white'>
                                            Already in your library
                                        </h3>
                                    )}
                                    {recommendations.owned && (
                                        <GameRecommendationCard
                                            recommendationsArray={
                                                recommendations.owned
                                            }
                                        />
                                    )}
                                </div>
                            )}
                            {recommendations.owned.length > 0 &&
                                recommendations.discover.length > 0 && (
                                    <span className='text-slate-50 font-semibold text-xl'>
                                        or
                                    </span>
                                )}
                            {recommendations.discover.length > 0 && (
                                <div className='w-min'>
                                    {recommendations.owned.length > 0 && (
                                        <h3 className='block mb-4 text-xl text-center font-semibold text-white '>
                                            Discover something new
                                        </h3>
                                    )}
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
                    </>
                ) : (
                    <div className='w-fit mx-auto'>
                        <NothingFoundCard />
                    </div>
                )}
            </section>
        </main>
    );
}
