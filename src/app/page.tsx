'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
    const router = useRouter();

    const [steamId, setSteamId] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/recommendations?steamId=${encodeURIComponent(steamId)}`);
    };

    return (
        <main className='flex flex-col h-screen justify-center items-center'>
            <h1 className='mb-4 text-3xl'>Unbacklog</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Your Steam ID'
                    className='mb-4 outline-0 w-full text-center py-2 border border-cyan-900 focus:border-blue-400 rounded-md
                    transition-colors duration-200 ease-in-out'
                    value={steamId}
                    onChange={(e) => setSteamId(e.target.value)}
                />
                <div>
                    <button
                        type='submit'
                        className='me-2 cursor-pointer w-fit bg-sky-950 hover:bg-sky-800 text-white py-2 px-4 rounded-lg 
                        transition-colors duration-200 ease-in-out'>
                        Submit
                    </button>
                    <button
                        type='button'
                        className='cursor-pointer w-fit bg-neutral-200 hover:bg-neutral-100 text-neutral-900 py-2 px-4 rounded-lg 
                        transition-colors duration-200 ease-in-out'>
                        Preferences
                    </button>
                </div>
            </form>
        </main>
    );
}
