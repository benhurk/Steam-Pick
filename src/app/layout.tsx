import type { Metadata } from 'next';
import Image from 'next/image';
import './globals.css';
import Background from '@/components/Background';

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
                    className='relative py-6 before:absolute before:inset-0 z-10
                        before:bg-slate-950 before:opacity-60'>
                    <div className='container'>
                        <h1 className='relative flex gap-4 items-center text-4xl font-bold text-white pointer-events-none'>
                            <Image
                                width={36}
                                height={36}
                                src='./steamlogo.svg'
                                alt='Steam'
                            />
                            Picker
                        </h1>
                    </div>
                </header>
                {children}
            </body>
        </html>
    );
}
