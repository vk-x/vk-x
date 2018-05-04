import { applyStyleWhenSettingIsTrue } from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'messages.darkerUnread': {
      defaultValue: false
    }
  }),

  runBeforeDom () {
    applyStyleWhenSettingIsTrue('messages.darkerUnread', styles)
  }
}
