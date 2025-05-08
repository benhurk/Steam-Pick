import { redirect } from 'next/navigation';

import getGamesData from '@/functions/getGamesData';
import analyseGamesWeight from '@/functions/analyseGamesWeight';
import checkGamesTags from '@/functions/checkGamesTags';
import getRecommendations from '@/functions/getRecommendations';

import { TUserGames } from '@/types/TApi';

import GameRecommendationCard from '@/components/GameRecommendationCard';
import getTagNames from '@/functions/utils/getTagNames';
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
                        <li>Preferences: {prefs}</li>
                        <li>
                            Your favorite genres are:{' '}
                            {getTagNames(
                                taste.favoriteGenres.map(([tag]) => tag)
                            ).join(', ')}
                            .
                        </li>
                        <li>
                            {`There are ${
                                userGames.unplayed.length
                            } unplayed games
                            in your library. ${
                                recommendations.owned.length
                            } that
                            fit your taste${
                                [...preferences.exclude, ...preferences.include]
                                    .length > 0
                                    ? ' and preferences'
                                    : ''
                            }.`}
                        </li>
                    </ul>
                </section>
                <section>
                    {[...recommendations.owned, ...recommendations.discover]
                        .length > 0 ? (
                        <>
                            <h2
                                className='mb-8 text-center text-4xl font-bold text-transparent 
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
                                        {recommendations.discover.length >
                                            0 && (
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
                                                Want something new?
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
            </div>
        </main>
    );
}
