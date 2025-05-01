'use client';

import HelpMenu from '@/components/HelpMenu';
import PreferencesMenu from '@/components/PreferencesMenu';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaCircleInfo } from 'react-icons/fa6';
import { LuPickaxe } from 'react-icons/lu';

export default function Home() {
    const router = useRouter();

    const [steamId, setSteamId] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/recommendations?steamId=${encodeURIComponent(steamId)}`);
    };

    return (
        <main className='relative flex flex-col grow justify-center items-center'>
            <div>
                <div className='mb-4'>
                    <span className='flex items-center gap-1 text-xl font-extrabold text-blue-300'>
                        <FaCircleInfo /> NOTE:
                    </span>
                    <p className='text-white font-semibold text-lg'>
                        Make sure your profile and games are{' '}
                        <b className='text-blue-300'>publicly visible</b>.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className='font-semibold'>
                    <div className='flex mb-6 shadow-xl shadow-neutral-800'>
                        <div
                            className='relative w-full rounded-tl-md rounded-bl overflow-hidden before:absolute before:inset-0 z-10
                        before:bg-slate-950 before:opacity-40'>
                            <input
                                type='text'
                                placeholder='Your Steam ID'
                                className='relative outline-0 w-full px-4 py-2.5 text-center text-slate-50 bg-transparent 
                        rounded-tl-md rounded-bl-md border-t border-b border-l border-sky-600
                        placeholder:text-slate-300 focus:placeholder:text-transparent
                        hover:placeholder:text-slate-100 hover:border-sky-500 transition-colors duration-200'
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

                    <div className='flex justify-center gap-4'>
                        <PreferencesMenu />
                        <HelpMenu />
                    </div>
                </form>
            </div>
        </main>
    );
}
