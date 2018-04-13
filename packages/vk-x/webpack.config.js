const webpack = require('webpack')
const path = require('path')
const packageInfo = require('./package.json')

module.exports = {
  entry: {
    'content-script': ['babel-polyfill', './src/content-script.js'],
    'injected': ['babel-polyfill', './src/index.js']
  },

  output: {
    path: path.resolve(__dirname, 'extension'),
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.html$/,
      loader: 'underscore-template-loader',
      query: {
        attributes: [],
        interpolate: '\\{\\{(.+?)\\}\\}'
      }
    }, {
      test: /\.styl$/,
      loader: 'style-loader/useable!raw-loader!stylus-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },

  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ],

    alias: {
      'i18n': 'src/i18n',
      'settings': 'src/settings',
      'utils': 'src/module-utils',
      'package.json': 'package.json'
    },

    extensions: [
      '.html',
      '.styl',
      '.js'
    ]
  },

  plugins: [
    new webpack.BannerPlugin(`vk-x v${packageInfo.version} (c) vk-x contributors, git.io/vwRaE`)
  ]
}
