webpack = require "webpack"

module.exports =

  entry:
    "index.js": "./src/index.coffee"
    "index.min.js": "./src/index.coffee"

  output:
    path: "./"
    filename: "[name]"
    library: "vk"

  module:
    loaders: [
      test: /\.coffee$/
      loader: "coffee"
    ]

  resolve:
    extensions: [
      ""
      ".coffee"
    ]

  plugins: [
    new webpack.optimize.UglifyJsPlugin
      test: /\.min\.js($|\?)/i
  ]
