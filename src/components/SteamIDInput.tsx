'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { usePreferences } from '@/contexts/Preferences';

import { LuPickaxe } from 'react-icons/lu';
import handleRecommendationsUrl from '@/functions/helpers/handleRecommendationsUrl';
import { FaCircleInfo } from 'react-icons/fa6';

export default function SteamIDInput() {
    const [steamId, setSteamId] = useState<string>('');
    const router = useRouter();
    const preferences = usePreferences().preferences;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (steamId.length === 17) {
            router.push(handleRecommendationsUrl(steamId, preferences));
        }
    };

    return (
        <form onSubmit={handleSubmit} className='w-full mb-4'>
            <div className='mb-2 flex font-semibold shadow-2xl shadow-neutral-800'>
                <div
                    className='relative w-full rounded-tl-md rounded-bl overflow-hidden 
                    before:absolute before:inset-0 before:-z-10 before:bg-slate-950 before:opacity-40'>
                    <input
                        type='text'
                        placeholder='Your SteamID'
                        maxLength={17}
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
            <div className='flex justify-center items-center gap-1 mb-2'>
                <FaCircleInfo className='text-sky-400' />
                <span className='text-slate-300 text-sm'>
                    Make sure your profile privacy settings are{' '}
                    <a
                        href='https://help.steampowered.com/en/faqs/view/588C-C67D-0251-C276'
                        target='_blank'
                        className='text-sky-400 font-semibold underline'>
                        set to public
                    </a>
                    .
                </span>
            </div>
        </form>
    );
}
