process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = config => {
  config.set({
    frameworks: [ 'mocha', 'sinon-chai' ],

    files: [
      '{src,vk-api}/**/*.test.js'
    ],
    preprocessors: {
      '{src,vk-api}/**/*.test.js': [ 'webpack' ]
    },

    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }, {
          test: /\.html$/,
          loader: 'underscore-template-loader',
          query: {
            attributes: [],
            interpolate: '\\{\\{(.+?)\\}\\}'
          }
        }, {
          test: /\.styl$/,
          loader: 'style-loader/useable!raw-loader!stylus-loader'
        }, {
          test: /\.json$/,
          loader: 'json-loader'
        }]
      },

      resolve: {
        extensions: [
          '.html',
          '.styl',
          '.js'
        ]
      }
    },

    browsers: [ 'Chrome_headless' ],
    customLaunchers: {
      Chrome_headless: {
        base: 'ChromeHeadless',
        flags: [ '--no-sandbox' ] // Hack for Linux on Windows
      }
    }
  })
}
