webpack = require "webpack"
path = require "path"

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
    ,
      test: /\.json$/,
      loader: "json"
    ]

  resolve:
    root: path.resolve __dirname
    alias:
      i18n: "src/i18n"
      settings: "src/settings"
      utils: "src/module-utils"
      "package.json": "package.json"

    extensions: [
      ""
      ".coffee"
      ".html"
      ".styl"
      ".js"
    ]

  plugins: [
    new webpack.ProvidePlugin
      $: "jquery"
  ,
    new webpack.BannerPlugin "vk-x v#{packageInfo.version} (c) Nikita Litvin, git.io/vwRaE"
  ]
