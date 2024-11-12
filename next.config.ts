import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', 
        destination: 'https://new-express-sample-server.vercel.app/api/:path*', 
      },
    ];
  },
};

export default nextConfig;
