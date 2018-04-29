import moment from 'moment'
import 'arrive'

import utils from '../module-utils'
import i18n from '../i18n'
import styles from './styles'

export default {
  defineSettings: () => ({
    'messages.showTimestamps': {
      defaultValue: true
    }
  }),

  run () {
    utils.styleConditional('messages.showTimestamps', styles)

    const onNewMessage = el => {
      if (el.matches(':first-child')) return
      if (el.querySelector('.vkx-message-time')) return // Fixes #47

      const rawTimestamp = el.getAttribute('data-ts')
      const parsedTime = moment.unix(rawTimestamp)
      const timeFormat = i18n.getCurrentLocale() === 'en' ? 'h:mm a' : 'HH:mm'
      const formattedTime = parsedTime.format(timeFormat)

      el.insertAdjacentHTML('afterbegin', `<span class='vkx-message-time'>${formattedTime}</span>`)
    }

    utils.runConditional('messages.showTimestamps', {
      true () {
        document.arrive('.im-mess', onNewMessage)
        document.querySelectorAll('.im-mess').forEach(onNewMessage)
      },
      false () {
        document.unbindArrive(onNewMessage)
        document.querySelector('.vkx-message-time').remove()
      }
    })
  }
}
