/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        formats: ['image/webp', 'image/avif'],
    },
};

module.exports = nextConfig;
