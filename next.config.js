/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@injectivelabs/token-metadata': false,
      '@injectivelabs/sdk-ts': false,
    };

    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };

    return config;
  },

  transpilePackages: [
    '@certusone/wormhole-sdk',
    '@coinbase/onchainkit',
  ],
};

module.exports = nextConfig;

