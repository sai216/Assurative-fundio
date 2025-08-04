/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        // Removed crypto-browserify
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
        util: require.resolve('util'),
        url: require.resolve('url'),
        assert: require.resolve('assert'),
      };

      config.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        })
      );
    }

    // Remove duplicate alias declaration
    config.resolve.alias = {
      ...config.resolve.alias,
      '@injectivelabs/token-metadata': false,
      '@injectivelabs/sdk-ts': false,
    };

    config.externals = [...(config.externals || [])];

    if (!isServer) {
      config.externals.push({
        '@injectivelabs/sdk-ts': 'commonjs @injectivelabs/sdk-ts',
        '@injectivelabs/token-metadata': 'commonjs @injectivelabs/token-metadata',
      });
    }

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

