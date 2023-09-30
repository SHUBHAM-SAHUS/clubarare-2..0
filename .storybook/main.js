const path = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

/** @type {import('@storybook/core-common').StorybookConfig} */
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js'),
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: config => {
    /**
     * Add support for alias-imports
     * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
     */
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@': [path.resolve(__dirname, '../src/'), path.resolve(__dirname, '../')],
    }

    /**
     * Fixes font import with /
     * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
     */
    config.resolve.roots = [path.resolve(__dirname, '../public'), 'node_modules']

    /**
     * Add tsConfig plugin
     * @see https://github.com/storybookjs/storybook/issues/3291#issuecomment-379543197
     */
    config.resolve.plugins = config.resolve.plugins || []
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
      })
    )
    config.resolve.fallback = {
      fs: false,
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      zlib: require.resolve("browserify-zlib")
    }
    return config
  },
}
