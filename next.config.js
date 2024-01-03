const nextConfig = {
  reactStrictMode: false,
  env: {
    DEFAULT_PATH: process.env.DEFAULT_PATH, // Provide a default value
    LOCAL_HOST: process.env.LOCAL_HOST,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/768px-Stack_Overflow_icon.svg.png',
      },
    ],
  },
};

module.exports = nextConfig;