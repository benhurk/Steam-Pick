'use client';

import { AppDetailsRes } from '@/types/SteamDataRes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { SquareLoader } from 'react-spinners';

type Props = {
    recommendationsArray: {
        name: string;
        id: number;
        matchingTags: number;
    }[];
};

export default function GameRecommendationCard({
    recommendationsArray,
}: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [recommendationIndex, setRecommendationIndex] = useState<number>(0);
    const [gameInfo, setGameInfo] = useState<AppDetailsRes[string]>();

    useEffect(() => {
        const fetchGameDetails = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `http://localhost:3000/api/gamedetails?id=${recommendationsArray[recommendationIndex].id}`
                );

                const data: AppDetailsRes = await res.json();
                setGameInfo(data[recommendationsArray[recommendationIndex].id]);
            } catch (error) {
                console.error('Error fetching Steam Details data:', error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchGameDetails();
    }, [recommendationIndex, recommendationsArray]);

    const handleSkip = () => {
        if (recommendationIndex === recommendationsArray.length - 1) {
            setRecommendationIndex(0);
        } else if (recommendationIndex < recommendationsArray.length - 1) {
            setRecommendationIndex((prev) => prev + 1);
        }
    };

    return (
        <div className='relative h-[28rem] w-80 bg-slate-200 rounded-md overflow-hidden'>
            <AnimatePresence mode='wait'>
                {loading ? (
                    <motion.div
                        key='loading'
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='absolute inset-0 flex items-center justify-center'>
                        <SquareLoader color='#0f172b' />
                    </motion.div>
                ) : (
                    gameInfo && (
                        <motion.div
                            key='content'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='h-full flex flex-col justify-between'>
                            <div>
                                <a
                                    href={`https://store.steampowered.com/app/${gameInfo.data.steam_appid}`}
                                    target='_blank'
                                    className='block mb-4'>
                                    <Image
                                        src={gameInfo.data.header_image}
                                        alt={gameInfo.data.name}
                                        width={320}
                                        height={320}
                                        className='mb-2 border border-slate-200 rounded-t-md'
                                    />
                                    <h3 className='px-3 text-xl font-semibold text-center text-slate-900'>
                                        {gameInfo.data.name}
                                    </h3>
                                </a>
                                <p className='text-sm px-3 text-slate-700 mb-4 leading-6'>
                                    {gameInfo.data.short_description}
                                </p>
                            </div>
                            <div className='p-3 pt-0'>
                                <button
                                    type='button'
                                    onClick={handleSkip}
                                    className='w-full py-1.5 bg-slate-900 text-white rounded-md cursor-pointer
                                                    hover:bg-slate-700 transition-colors duration-200 ease-in-out'>
                                    Skip
                                </button>
                            </div>
                        </motion.div>
                    )
                )}
            </AnimatePresence>
        </div>
    );
}
