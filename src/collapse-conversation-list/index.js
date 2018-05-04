// Collapse the list of conversations to widen the chat area. See #13.

import { applyStyleWhenSettingIsTrue } from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'messages.collapseList': {
      defaultValue: false
    }
  }),

  runBeforeDom () {
    applyStyleWhenSettingIsTrue('messages.collapseList', styles)
  }
}
