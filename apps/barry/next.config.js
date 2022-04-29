// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require("@nrwl/next/plugins/with-nx");
const { StatsWriterPlugin } = require("webpack-stats-plugin");

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  async exportPathMap() {
    return {
      "/": { page: "/" },
    };
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    if (process.env.PROFILE) {
      config.resolve.alias["react-dom$"] = "react-dom/profiling";
      config.resolve.alias["scheduler/tracing"] = "scheduler/tracing-profiling";
      config.optimization.minimize = false;
    }
    config.plugins.push(
      new StatsWriterPlugin({
        filename: "stats.json",
        stats: {
          context: ".", // optional, will improve readability of the paths
          assets: true,
          entrypoints: true,
          chunks: true,
          modules: true,
        },
      }),
    );

    return config;
  },
};

module.exports = withNx(nextConfig);
