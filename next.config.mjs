/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            'photo.teamrabbil.com',
            'media.cnn.com'
        ]
    }
};

export default nextConfig;
