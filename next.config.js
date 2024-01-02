const nextConfig = {
  reactStrictMode: false,
  env: {
    DEFAULT_PATH: process.env.DEFAULT_PATH, // Provide a default value
    LOCAL_HOST: process.env.LOCAL_HOST,
  },
};

module.exports = nextConfig;