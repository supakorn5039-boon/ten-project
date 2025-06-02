/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        turbo: true,
        workerThreads: false,
        cpus: 1,
    },

    swcMinify: true,

    images: {
        formats: ['image/webp', 'image/avif'],
    },

    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
};

module.exports = nextConfig;
