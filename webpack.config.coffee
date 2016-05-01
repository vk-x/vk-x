webpack = require "webpack"

packageInfo = require "./package.json"

module.exports =

  entry:
    "content-script": "./src/content-script.coffee"
    "injected": "./src/index.coffee"

  output:
    path: "extension"
    filename: "[name].js"

  module:
    loaders: [
      test: /\.coffee$/
      loader: "coffee"
    ,
      test: /\.html$/
      loader: "underscore-template"
      query:
        attributes: []
        interpolate: "\\{\\{(.+?)\\}\\}"
    ,
      test: /\.styl$/,
      loader: "style/useable!raw!stylus"
    ]

  resolve:
    extensions: [
      ""
      ".coffee"
      ".html"
      ".styl"
      ".js"
    ]

  plugins: [
    new webpack.BannerPlugin "vk-x v#{packageInfo.version} (c) Nikita Litvin, git.io/vwRaE"
  ]
