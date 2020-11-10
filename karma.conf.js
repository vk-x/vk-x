process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = config => {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],

    files: [
      '{src,vk-api}/**/*.test.js'
    ],
    preprocessors: {
      '{src,vk-api}/**/*.test.js': [ 'webpack' ]
    },

    webpack: {
      module: {
        rules: [{
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        }, {
          test: /\.html$/,
          use: [{
            loader: 'underscore-template-loader',
            query: {
              attributes: [],
              interpolate: '\\{\\{(.+?)\\}\\}'
            }
          }]
        }, {
          test: /\.styl$/,
          use: [
            'style-loader/useable',
            'raw-loader',
            'stylus-loader'
          ]
        }]
      },

      resolve: {
        extensions: [
          '.html',
          '.styl',
          '.js'
        ]
      },

      mode: 'none'
    },

    browsers: ['Chrome_headless'],
    customLaunchers: {
      Chrome_headless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'] // Hack for Linux on Windows
      }
    }
  })
}
