const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const packageInfo = require('./package.json')

module.exports = {
  entry: {
    'dist/vk-api.js': './src/index.js',
    'dist/vk-api.min.js': './src/index.js'
  },

  output: {
    path: __dirname,
    filename: '[name]',
    library: 'vk',
    libraryTarget: 'umd'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },

  resolve: {
    extensions: [
      '.js'
    ]
  },

  mode: 'none',

  plugins: [
    new webpack.BannerPlugin(`vk-api v${packageInfo.version} (c) vk-x contributors, https://git.io/vpBko`),
    new UglifyPlugin({
      test: /\.min\.js$/i,
      uglifyOptions: {
        compress: {
          ecma: 5,
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
