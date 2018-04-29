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
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.html$/,
      use: [{
        loader: 'underscore-template-loader',
        query: {
          attributes: [],
          interpolate: '\\{\\{(.+?)\\}\\}'
        }
      }]
    }, {
      test: /\.styl$/,
      use: [
        'style-loader/useable',
        'raw-loader',
        'stylus-loader'
      ]
    }]
  },

  resolve: {
    extensions: [
      '.html',
      '.styl',
      '.js'
    ]
  },

  mode: process.argv.includes('--watch') ? 'development' : 'production',
  devtool: process.argv.includes('--watch') ? 'eval-source-map' : 'source-map',
  optimization: {
    minimizer: [
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
  },

  plugins: [
    new webpack.BannerPlugin(`vk-x v${packageInfo.version} (c) vk-x contributors, https://git.io/vwRaE`),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
