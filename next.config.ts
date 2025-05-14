import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'shared.akamai.steamstatic.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatars.steamstatic.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
