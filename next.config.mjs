/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // wildcard: matches any HTTPS hostname
      },
    ],
  },
};

export default nextConfig;