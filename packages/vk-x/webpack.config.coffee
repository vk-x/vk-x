webpack = require "webpack"
path = require "path"

packageInfo = require "./package.json"

module.exports =

  entry:
    "content-script": "./src/content-script.coffee"
    "injected": "./src/index.coffee"

  output:
    path: path.resolve __dirname, "extension"
    filename: "[name].js"

  module:
    loaders: [
      test: /\.coffee$/
      loader: "coffee-loader"
    ,
      test: /\.html$/
      loader: "underscore-template-loader"
      query:
        attributes: []
        interpolate: "\\{\\{(.+?)\\}\\}"
    ,
      test: /\.styl$/,
      loader: "style-loader/useable!raw-loader!stylus-loader"
    ,
      test: /\.json$/,
      loader: "json-loader"
    ]

  resolve:
    modules: [
      path.resolve __dirname
      "node_modules"
    ]

    alias:
      i18n: "src/i18n"
      settings: "src/settings"
      utils: "src/module-utils"
      "package.json": "package.json"

    extensions: [
      ".coffee"
      ".html"
      ".styl"
      ".js"
    ]

  plugins: [
    new webpack.ProvidePlugin
      $: "jquery"
  ,
    new webpack.BannerPlugin "vk-x v#{packageInfo.version} (c) vk-x contributors, git.io/vwRaE"
  ]
