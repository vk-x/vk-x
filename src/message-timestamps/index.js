import tinytime from 'tinytime'
import 'arrive'

import { onSettingChange, applyStyleWhenSettingIsTrue } from '../module-utils'
import i18n from '../i18n'
import styles from './styles'

const format12h = tinytime('{h}:{mm} {a}')
const format24h = tinytime('{H}:{mm}')

export default {
  defineSettings: () => ({
    'messages.showTimestamps': {
      defaultValue: true
    }
  }),

  run () {
    applyStyleWhenSettingIsTrue('messages.showTimestamps', styles)

    const onNewMessage = el => {
      if (el.matches(':first-child')) return
      if (el.querySelector('.vkx-message-time')) return // Fixes #47

      const rawTimestamp = el.getAttribute('data-ts')
      const parsedTime = new Date(rawTimestamp * 1000)
      const format = i18n.getCurrentLocale() === 'en' ? format12h : format24h
      const formattedTime = format.render(parsedTime).toLowerCase()

      el.insertAdjacentHTML('afterbegin', `<span class='vkx-message-time'>${formattedTime}</span>`)
    }

    onSettingChange('messages.showTimestamps', {
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
