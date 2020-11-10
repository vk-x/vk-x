const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
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
      use: ['babel-loader']
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
        { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
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
      new TerserPlugin({
        cache: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            ecma: 8,
            passes: 2,
            pure_getters: 'strict',
            unsafe: false,
            unsafe_comps: true,
            unsafe_math: true,
            unsafe_methods: true,
            unsafe_proto: true,
            unsafe_regexp: true
          },
          output: {
            ecma: 8,
            comments: false,
            preamble: `/*! vk-x v${packageInfo.version} (c) vk-x contributors, https://git.io/vwRaE */`
          }
        }
      })
    ]
  },

  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
}
