process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = config => {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],

    files: [
      '{src,vk-api}/**/*.test.js'
    ],
    preprocessors: {
      '{src,vk-api}/**/*.test.js': ['webpack', 'sourcemap']
    },

    webpack: {
      module: {
        rules: [{
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-object-rest-spread']
              }
            }
          ]
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
            { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
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

      mode: 'development',
      devtool: 'inline-source-map'
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
