import './globals.css';
import type { Metadata } from 'next';

import { PreferencesProvider } from '@/contexts/Preferences';

import Background from '@/components/Background';
import Header from '@/components/Header';

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
                <Header />
                <PreferencesProvider>{children}</PreferencesProvider>
            </body>
        </html>
    );
}
