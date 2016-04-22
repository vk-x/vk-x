webpack = require "webpack"

packageInfo = require "./package.json"

module.exports =

  entry:
    "content-script": "./src/content-script.coffee"

  output:
    path: "extension"
    filename: "[name].js"

  module:
    loaders: [
      test: /\.coffee$/
      loader: "coffee"
    ]

  resolve:
    extensions: [
      ""
      ".coffee"
      ".js"
    ]

  plugins: [
    new webpack.BannerPlugin "vk-x v#{packageInfo.version} (c) Nikita Litvin, git.io/vwqn6"
  ]
