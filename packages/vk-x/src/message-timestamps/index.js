import $ from 'jquery'
import moment from 'moment'
import 'arrive'

import utils from 'utils'
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

    const onNewMessage = function () {
      if ($(this).is(':first-child')) return
      if ($(this).find('.vkx-message-time').length) return // Fixes #47

      const rawTimestamp = $(this).data('ts')
      const parsedTime = moment.unix(rawTimestamp)
      const timeFormat = i18n.getCurrentLocale() === 'en' ? 'h:mm a' : 'HH:mm'
      const formattedTime = parsedTime.format(timeFormat)

      $(this).prepend(`<span class='vkx-message-time'>${formattedTime}</span>`)
    }

    utils.runConditional('messages.showTimestamps', {
      true () {
        document.arrive('.im-mess', onNewMessage)
        $('.im-mess').each(onNewMessage)
      },
      false () {
        document.unbindArrive(onNewMessage)
        $('.vkx-message-time').remove()
      }
    })
  }
}
