path = require "path"
webpack = require "webpack"

packageInfo = require "./package.json"

module.exports =

  entry:
    "vk-api": "./src/index.coffee"
    "vk-api.min": "./src/index.coffee"

  output:
    path: path.resolve __dirname, "dist"
    filename: "[name].js"
    library: "vk"
    libraryTarget: "umd"

  module:
    loaders: [
      test: /\.coffee$/
      loader: "coffee-loader"
    ]

  resolve:
    extensions: [
      ".coffee"
    ]

  plugins: [
    new webpack.optimize.UglifyJsPlugin
      test: /\.min\.js($|\?)/i

    new webpack.BannerPlugin "vk-api v#{packageInfo.version} (c) vk-x contributors, git.io/vwqn6"
  ]
