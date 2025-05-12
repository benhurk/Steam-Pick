'use client';

import HelpMenu from '@/components/HelpDialog';
import PreferencesMenu from '@/components/PreferencesDialog';
import SteamIDInput from '@/components/SteamIDInput';
import { FaCircleInfo } from 'react-icons/fa6';

export default function Home() {
    return (
        <main className='relative flex flex-col grow justify-center items-center'>
            <div>
                <div className='mb-4'>
                    <span className='flex items-center gap-1 text-xl font-extrabold text-blue-300'>
                        <FaCircleInfo /> NOTE:
                    </span>
                    <p className='text-white text-lg'>
                        Make sure your profile and games are{' '}
                        <a
                            href='https://help.steampowered.com/en/faqs/view/588C-C67D-0251-C276'
                            target='_blank'
                            className='text-blue-300 font-semibold underline'>
                            publicly visible
                        </a>
                        .
                    </p>
                </div>
                <SteamIDInput />
                <div className='flex justify-center gap-4'>
                    <PreferencesMenu />
                    <HelpMenu />
                </div>
            </div>
        </main>
    );
}
