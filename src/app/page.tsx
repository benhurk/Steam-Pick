import HelpDialog from '@/components/HelpDialog';
import PreferencesMenu from '@/components/PreferencesMenu';
import SteamIDInput from '@/components/SteamIDInput';

export default function Home() {
    return (
        <main className='container relative flex flex-col grow justify-center items-center'>
            <div className='w-fit'>
                <span className='block mb-4 text-white text-lg text-shadow-2xs text-shadow-gray-700'>
                    Enter your SteamID below to find your next game
                </span>
                <SteamIDInput />
                <div className='flex justify-center gap-4'>
                    <PreferencesMenu />
                    <HelpDialog />
                </div>
            </div>
        </main>
    );
}
