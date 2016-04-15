module.exports =

  entry:
    "index": "./src/index.coffee"

  output:
    path: "./"
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
    ]
