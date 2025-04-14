import type { Metadata } from 'next';
import './globals.css';

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
            <body className='antialiased font-sans'>{children}</body>
        </html>
    );
}
