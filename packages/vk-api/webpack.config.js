const path = require('path')
const webpack = require('webpack')
const packageInfo = require('./package.json')

// Used here and in Karma config file.
const commonConfig = {
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }
    ]
  },

  resolve: {
    extensions: [
      '.js'
    ]
  }
}

module.exports = {
  ...commonConfig, // Use here,
  commonConfig, // Export for Karma.

  entry: {
    'vk-api': './src/index.js',
    'vk-api.min': './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'vk',
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({test: /\.min\.js($|\?)/i}),
    new webpack.BannerPlugin(`vk-api v${packageInfo.version} (c) vk-x contributors, git.io/vwqn6`)
  ]
}
