// Show digital clock in the left menu, see #22.

import $ from 'jquery'
import utils from 'utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'sideMenu.showTime': {
      defaultValue: false
    }
  }),

  runBeforeDom () {
    utils.styleConditional('sideMenu.showTime', styles)
  },

  run () {
    let intervalHandler

    utils.runConditional('sideMenu.showTime', {
      true () {
        const moment = require('moment')
        const clockTemplate = require('./clock-template')

        $('#side_bar_inner').append(clockTemplate())

        const updateClock = () => {
          $('.vkx-time').html(moment().format('HH:mm:ss'))
          $('.vkx-date').html(moment().format('DD.MM.YYYY'))
        }

        updateClock()
        intervalHandler = window.setInterval(updateClock, 1000)
      },

      false () {
        $('.vkx-clock').remove()
        clearInterval(intervalHandler)
      }
    })
  }
}
