import HelpDialog from '@/components/HelpDialog';
import PreferencesMenu from '@/components/PreferencesMenu';
import SteamIDInput from '@/components/SteamIDInput';

export default function Home() {
    return (
        <main className='container relative flex flex-col grow justify-center items-center'>
            <div className='w-fit'>
                <span
                    className='block mb-4 text-center text-lg font-semibold text-transparent 
                    bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                    Enter a SteamID below to find games
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
