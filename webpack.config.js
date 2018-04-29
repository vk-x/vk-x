const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const packageInfo = require('./package.json')

module.exports = {
  entry: {
    'extension/content-script.js': './src/content-script.js',
    'extension/injected.js': './src/index.js'
  },

  output: {
    path: __dirname,
    filename: '[name]'
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
    extensions: [
      '.html',
      '.styl',
      '.js'
    ]
  },

  devtool: process.argv.includes('--watch') ? undefined : 'source-map',

  plugins: process.argv.includes('--watch') ? [
    new webpack.BannerPlugin(`vk-x v${packageInfo.version} (c) vk-x contributors, https://git.io/vwRaE`),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ] : [
    new webpack.BannerPlugin(`vk-x v${packageInfo.version} (c) vk-x contributors, https://git.io/vwRaE`),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new UglifyPlugin({
      cache: true,
      sourceMap: true,
      uglifyOptions: {
        compress: {
          ecma: 8,
          passes: 2,
          pure_getters: 'strict',
          unsafe: true,
          unsafe_comps: true,
          unsafe_math: true,
          unsafe_methods: true,
          unsafe_proto: true,
          unsafe_regexp: true
        }
      }
    })
  ]
}
