'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { AppDetailsRes } from '@/types/TSteam';
import { TRecommendations } from '@/types/TGames';

import Image from 'next/image';
import { SquareLoader } from 'react-spinners';

type Props = {
    recommendationsArray: TRecommendations;
};

export default function RecommendationCard({ recommendationsArray }: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [recommendationIndex, setRecommendationIndex] = useState<number>(0);
    const [gameInfo, setGameInfo] = useState<AppDetailsRes[string]>();

    useEffect(() => {
        const fetchGameDetails = async () => {
            try {
                const res = await fetch(
                    `/api/steam/appdetails?id=${recommendationsArray[recommendationIndex].id}`
                );

                const data: AppDetailsRes = await res.json();
                setGameInfo(data[recommendationsArray[recommendationIndex].id]);
            } catch (error) {
                console.error('Error fetching Steam Details data:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        };

        fetchGameDetails();
    }, [recommendationIndex, recommendationsArray]);

    const handleSkip = () => {
        setLoading(true);

        if (recommendationIndex === recommendationsArray.length - 1) {
            setRecommendationIndex(0);
        } else if (recommendationIndex < recommendationsArray.length - 1) {
            setRecommendationIndex((prev) => prev + 1);
        }
    };

    const handleNavPointClick = (index: number) => {
        if (recommendationIndex != index) {
            setLoading(true);
            setRecommendationIndex(index);
        }
    };

    return (
        <div>
            <div className='flex justify-center gap-2 mb-4'>
                {recommendationsArray.map((r, i) => (
                    <div
                        key={r.id}
                        className={`w-2.5 h-2.5 bg-white rounded-full cursor-pointer ${
                            recommendationIndex === i
                                ? 'opacity-100'
                                : 'opacity-50'
                        }`}
                        onClick={() => handleNavPointClick(i)}
                    />
                ))}
            </div>

            <div
                className='relative h-[32rem] w-80 border border-slate-300 rounded-sm overflow-hidden shadow-lg 
                bg-gradient-to-bl from-slate-950 via-slate-800 to-slate-950 shadow-sky-800
                hover:scale-105 hover:from-slate-900 hover:via-slate-700 hover:to-slate-900 hover:shadow-sky-700
                transition duration-200 ease-in-out'>
                <AnimatePresence mode='wait'>
                    {loading ? (
                        <motion.div
                            key='loading'
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='absolute inset-0 flex items-center justify-center'>
                            <SquareLoader color='#fff' />
                        </motion.div>
                    ) : (
                        gameInfo && (
                            <motion.div
                                key='content'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='h-full flex flex-col justify-between'>
                                <a
                                    href={`https://store.steampowered.com/app/${gameInfo.data.steam_appid}`}
                                    target='_blank'
                                    className='h-full'>
                                    <Image
                                        src={gameInfo.data.header_image}
                                        alt={gameInfo.data.name}
                                        width={320}
                                        height={0}
                                        className='mb-1'
                                    />
                                    <div className='px-3'>
                                        <h3 className='mb-2 text-xl font-semibold text-center text-slate-50'>
                                            {gameInfo.data.name}
                                        </h3>
                                        <p className='text-sm text-slate-300 leading-6'>
                                            {gameInfo.data.short_description}
                                        </p>
                                    </div>
                                </a>
                                <div className='p-3 pt-0'>
                                    <div className='flex gap-2 flex-wrap justify-center mb-4'>
                                        {recommendationsArray[
                                            recommendationIndex
                                        ].matchingTags.tags.map(
                                            (tag, index) => (
                                                <span
                                                    key={
                                                        tag +
                                                        index * Math.random()
                                                    }
                                                    className='block text-slate-50 bg-sky-800 text-xs py-0.5 px-1
                                                    rounded-sm shadow-sm shadow-gray-800'>
                                                    {tag}
                                                </span>
                                            )
                                        )}
                                    </div>
                                    <button
                                        type='button'
                                        onClick={handleSkip}
                                        disabled={
                                            recommendationsArray.length === 1
                                        }
                                        className='w-full py-1 bg-slate-200 text-slate-950 font-semibold rounded-md 
                                        cursor-pointer hover:bg-white transition-colors duration-200 ease-in-out
                                        disabled:opacity-60 disabled:cursor-default'>
                                        Next
                                    </button>
                                </div>
                            </motion.div>
                        )
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
