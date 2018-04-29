// Show digital clock in the left menu, see #22.

import moment from 'moment'
import utils from '../module-utils'
import styles from './styles'
import clockTemplate from './clock-template'

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
        document.querySelector('#side_bar_inner').insertAdjacentHTML('beforeend', clockTemplate())

        const updateClock = () => {
          document.querySelector('.vkx-time').innerHTML = moment().format('HH:mm:ss')
          document.querySelector('.vkx-date').innerHTML = moment().format('DD.MM.YYYY')
        }

        updateClock()
        intervalHandler = window.setInterval(updateClock, 1000)
      },

      false () {
        document.querySelector('.vkx-clock').remove()
        clearInterval(intervalHandler)
      }
    })
  }
}
