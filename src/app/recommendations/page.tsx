import { redirect } from 'next/navigation';

import { TUserGames, TUserInfo } from '@/types/TApi';
import { TPreferences } from '@/types/TPreferences';
import preferencesInitialState from '@/consts/preferencesInitialState';

import getGamesData from '@/functions/getGamesData';
import calculateGamesWeight from '@/functions/calculateGamesWeight';
import parseTags from '@/functions/parseTags';
import getRecommendations from '@/functions/getRecommendations';

import RecommendationCard from '@/components/RecommendationCard';
import UserInfoSection from '@/components/UserInfoSection';
import NothingFoundContent from '@/components/NothingFoundContent';

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

    //Get user info
    const userInfo: TUserInfo = await fetch(
        `${process.env.URL}/api/steam/userinfo?steamid=${steamId}`
    ).then((res) => res.json());

    if (!userInfo) {
        redirect('/');
    }

    //Get user games
    const userGames: TUserGames = await fetch(
        `${process.env.URL}/api/steam/usergames?steamid=${steamId}`
    ).then((res) => res.json());

    //Get game tags
    const gamesData = await getGamesData(userGames.played, userGames.unplayed);

    //Calculate the played games weight
    const gamesWeight = calculateGamesWeight(gamesData.played);

    //Get user's taste
    const taste = parseTags(gamesWeight, preferences);

    //Get recommendations
    const recommendations = await getRecommendations(
        taste,
        userGames.owned,
        gamesData.unplayed,
        preferences
    );

    return (
        <main className='container py-12 flex flex-col gap-16'>
            <UserInfoSection
                userInfo={userInfo}
                userTaste={taste}
                userGames={userGames}
            />
            <section>
                {[...recommendations.owned, ...recommendations.discover]
                    .length > 0 ? (
                    <>
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
                                        <RecommendationCard
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
                                        <RecommendationCard
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
                        <NothingFoundContent />
                    </div>
                )}
            </section>
        </main>
    );
}
