export const revalidate = 86400;

import { redirect } from 'next/navigation';

import { TUserGames } from '@/types/TApi';

import getGamesData from '@/functions/getGamesData';
import calculateGamesWeight from '@/functions/calculateGamesWeight';
import parseTags from '@/functions/parseTags';
import getRecommendations from '@/functions/getRecommendations';
import parsePreferences from '@/functions/utils/parsePreferences';

import RecommendationCard from '@/components/RecommendationCard';
import UserInfoSection from '@/components/UserInfoSection';
import NothingFoundContent from '@/components/NothingFoundContent';
import ErrorSection from '@/components/ErrorSection';

type SearchParams = {
    steamId?: string;
    include?: string;
    exclude?: string;
    popularity?: string;
    minrelease?: string;
};

export default async function Recommendations({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}) {
    const { steamId, include, exclude, popularity, minrelease } =
        await searchParams;

    if (!steamId) {
        redirect('/');
    }

    //Preferences
    let preferences;

    try {
        preferences = parsePreferences(
            popularity,
            minrelease,
            include,
            exclude
        );
    } catch {
        return <ErrorSection message='Invalid preferences URL format.' />;
    }

    //Get user games
    let userGames: TUserGames;

    try {
        const response = await fetch(
            `${process.env.URL}/api/steam/usergames?steamid=${steamId}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch user games data');
        }

        userGames = await response.json();
    } catch {
        return (
            <ErrorSection message='Failed to load data from your Steam profile, check your privacy settings and try again.' />
        );
    }

    //Get game tags
    let gamesData;

    try {
        gamesData = await getGamesData(userGames.played, userGames.unplayed);
    } catch {
        return (
            <ErrorSection message='Failed to load games data, try again later.' />
        );
    }

    //Calculate played games weight
    const gamesWeight = calculateGamesWeight(gamesData.played);

    //Get user's taste
    const taste = parseTags(gamesWeight);

    //Get recommendations
    let recommendations;

    try {
        recommendations = await getRecommendations(
            taste,
            userGames.owned,
            gamesData.unplayed,
            preferences
        );
    } catch {
        return (
            <ErrorSection message='An error ocurred while processing your recommendations, try again later.' />
        );
    }

    return (
        <main className='container py-14 flex flex-col gap-14'>
            <UserInfoSection
                steamID={steamId}
                userTaste={taste}
                userGames={userGames}
            />
            <section>
                {[...recommendations.owned, ...recommendations.discover]
                    .length > 0 ? (
                    <>
                        <div
                            className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center md:items-start ${
                                recommendations.owned.length > 0 &&
                                recommendations.discover.length > 0
                                    ? 'justify-between'
                                    : 'justify-center'
                            }`}>
                            {recommendations.owned.length > 0 && (
                                <div className='w-min'>
                                    {recommendations.discover.length > 0 && (
                                        <h3
                                            className='block mb-4 text-xl text-center font-semibold text-transparent 
                                            bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
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
                                        <h3
                                            className='block mb-4 text-xl text-center font-semibold text-transparent 
                                            bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
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
