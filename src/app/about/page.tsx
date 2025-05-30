import { Metadata } from 'next';
import PrivacyPolicySection from '@/components/PrivacyPolicySection';

export const metadata: Metadata = {
    title: 'Steam Pick | About',
};

export default function About() {
    return (
        <main className='container text-white grow py-14 flex flex-col gap-12'>
            <section>
                <h2
                    className='mb-6 text-4xl text-center font-semibold text-transparent 
                    bg-gradient-to-br from-cyan-100 via-sky-200 to-blue-300 bg-clip-text'>
                    About
                </h2>
                <div className='flex flex-col gap-4'>
                    <p>
                        Steam Pick is a tool that helps you pick games for you
                        or for gifting someone. It analyzes a Steam profile and
                        provides personalized recommendations by using data from
                        the official Steam Web API and{' '}
                        <a
                            href='https://steamspy.com/about'
                            target='_blank'
                            className='underline text-sky-400'>
                            SteamSpy
                        </a>{' '}
                        API.
                    </p>
                    <p>
                        This is a passion project and is{' '}
                        <b className='font-semibold'>
                            not affiliated with Valve or Steam, or any game
                            publisher/developer.
                        </b>{' '}
                        It is open source, if you find bugs, have suggestions or
                        want to see how it works, go to the{' '}
                        <a
                            href='https://github.com/benhurk/Steam-Pick'
                            target='_blank'
                            className='underline text-sky-400'>
                            GitHub repository
                        </a>
                        .
                    </p>
                    <p className='font-semibold'>
                        All displayed games are linked to their official Steam
                        store page.
                    </p>
                </div>
            </section>
            <PrivacyPolicySection />
        </main>
    );
}
