const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  env: true,
  entry: 'src/index.js',
  plugins: [
    require('@poi/plugin-bundle-report')(),
    require('@poi/plugin-eslint')(),
  ],
  chainWebpack(config) {
    // remove default svg loader
    config.module.rules.delete('svg');

    // prefixes css module classes with 'module__'
    ['css', 'scss', 'sass', 'less', 'stylus'].forEach(lang => {
      config.module
        .rule(lang)
        .oneOf('module-ext')
        .use('css-loader')
        .tap(option => ({
          ...option,
          localIdentName: 'module__[local]_[hash:base64:8]',
        }));
    });

    const isEnvProduction = config.get('mode') === 'production';
    if (isEnvProduction) {
      // PurgeCSS plugin
      config
        .plugin('purgecss')
        .use(require('purgecss-webpack-plugin'), [
          require('./purgecss.config'),
        ]);
      // replace UglifyJS with Terser, similar to create-react-app
      config.plugins.delete('uglifyjs');
      config.optimization.minimize(isEnvProduction);
      config.optimization.minimizer([
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          cache: true,
          sourceMap: false,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: require('postcss-safe-parser'),
            map: false,
          },
        }),
      ]);
    }
  },
  configureWebpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ({ resource }) => [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  cleanupIDs: {
                    prefix: `svg_${path.parse(resource).name}_${Math.random()
                      .toString(36)
                      .substr(2, 5)}_`,
                  },
                },
              ],
            },
          },
        },
        'url-loader',
      ],
    });

    if (config.mode === 'development') {
      config.module.rules.push({
        // match files to receive react-hot-loader functionality
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src/App.js'),
          path.resolve(__dirname, 'src/pages'),
        ],
        loader: require.resolve('react-hot-loader-loader'),
        enforce: 'post',
      });
    }

    return config;
  },
};
