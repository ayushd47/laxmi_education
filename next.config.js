const nextConfig = {
  output: 'standalone',
  eslint: {
    // Allow production builds to succeed even if there are ESLint errors
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
};

module.exports = nextConfig;
