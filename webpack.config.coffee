webpack = require "webpack"

packageInfo = require "./package.json"

module.exports =

  entry:
    "content-script": "./src/index.coffee"

  output:
    path: "extension"
    filename: "[name].js"

  module:
    loaders: [
      test: /\.coffee$/
      loader: "coffee"
    ,
      test: /\.html$/
      loader: "underscore-template-loader"
      query:
        attributes: []
        interpolate: "\\{\\{(.+?)\\}\\}"
    ]

  resolve:
    extensions: [
      ""
      ".coffee"
      ".html"
      ".js"
    ]

  plugins: [
    new webpack.BannerPlugin "vk-x v#{packageInfo.version} (c) Nikita Litvin, git.io/vwRaE"
  ]
