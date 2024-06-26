const config = {
  swcMinify: false,
  webpack: (config) => {
    config.optimization = config.optimization || {};
    config.optimization.minimize = false;
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // output: 'export',
  images: {
    unoptimized: true,
  },
};

require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
module.exports = config;
