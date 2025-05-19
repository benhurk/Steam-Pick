'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { usePreferences } from '@/contexts/Preferences';

import { LuPickaxe } from 'react-icons/lu';
import handleRecommendationsUrl from '@/functions/helpers/handleRecommendationsUrl';

export default function SteamIDInput() {
    const [steamId, setSteamId] = useState<string>('');
    const router = useRouter();
    const preferences = usePreferences().preferences;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(handleRecommendationsUrl(steamId, preferences));
    };

    return (
        <form onSubmit={handleSubmit} className='font-semibold'>
            <div className='flex mb-6 shadow-2xl shadow-neutral-800'>
                <div
                    className='relative w-full rounded-tl-md rounded-bl overflow-hidden before:absolute before:inset-0 z-10
                        before:bg-slate-950 before:opacity-40'>
                    <input
                        type='text'
                        placeholder='Your SteamID'
                        className='relative outline-0 w-full px-3 py-2.5 text-center text-slate-50 bg-transparent 
                                rounded-tl-md rounded-bl-md border-t border-b border-l border-sky-600
                                placeholder:text-slate-300 focus:placeholder:text-transparent
                                hover:placeholder:text-slate-100 hover:border-sky-500 transition-colors duration-300'
                        value={steamId}
                        onChange={(e) => setSteamId(e.target.value)}
                    />
                </div>
                <button
                    type='submit'
                    className='flex items-center gap-1 cursor-pointer w-fit text-white px-4 rounded-tr-md rounded-br-md
                        bg-gradient-to-bl from-sky-700 via-sky-600 to-sky-800 
                        hover:from-sky-600 hover:via-sky-500 hover:to-sky-700
                        transition-colors duration-300 ease-in-out'>
                    <LuPickaxe /> Pick
                </button>
            </div>
        </form>
    );
}
