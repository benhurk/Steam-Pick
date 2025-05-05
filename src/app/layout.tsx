import './globals.css';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Background from '@/components/Background';
import { BsGithub } from 'react-icons/bs';
import { PreferencesProvider } from '@/contexts/Preferences';

export const metadata: Metadata = {
    title: 'Steam Unbacklog',
    description: 'A tool to help you choose your next game.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className='relative flex flex-col min-h-screen antialiased font-sans'>
                <Background />
                <header
                    className='relative py-6 text-white before:absolute before:inset-0 z-10
                        before:bg-slate-950 before:opacity-60'>
                    <div className='relative container flex justify-between items-center'>
                        <Link href={'/'}>
                            <h1 className='flex gap-4 items-center text-5xl font-bold'>
                                <Image
                                    width={48}
                                    height={48}
                                    src='./steamlogo.svg'
                                    alt='Steam'
                                />
                                Pick
                            </h1>
                        </Link>
                        <nav className='font-semibold text-lg'>
                            <ul className='flex items-center gap-16'>
                                <li>
                                    <Link href={'/'}>About</Link>
                                </li>
                                <li>
                                    <Link
                                        href={
                                            'https://github.com/benhurk/Steam-Pick'
                                        }
                                        target='_blank'
                                        className='text-white text-4xl'>
                                        <BsGithub />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <PreferencesProvider>{children}</PreferencesProvider>
            </body>
        </html>
    );
}
