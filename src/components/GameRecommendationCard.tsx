'use client';

import { AppDetailsRes } from '@/types/SteamDataRes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
                console.error('Error fetching Steam data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [recommendationIndex, recommendationsArray]);

    return (
        <div>
            {!loading && gameInfo && (
                <div>
                    <Image
                        src={gameInfo.data.header_image}
                        alt={gameInfo.data.name}
                        width={280}
                        height={280}
                    />
                    <h3>
                        <a
                            href={`https://store.steampowered.com/app/${gameInfo.data.steam_appid}`}
                            target='_blank'>
                            {recommendationsArray[recommendationIndex].name}
                        </a>
                    </h3>
                    <p>{gameInfo.data.short_description}</p>
                </div>
            )}
            <button
                type='button'
                onClick={() => setRecommendationIndex((prev) => prev + 1)}>
                Skip
            </button>
        </div>
    );
}
