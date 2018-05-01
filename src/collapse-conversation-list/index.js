// Collapse the list of conversations to widen the chat area. See #13.

import { applyStyleWhenSettingIsTrue, wrapStyle } from '../module-utils'
import styles from './styles'
import compatFix from './compat-fix'

export default {
  defineSettings: () => ({
    'messages.collapseList': {
      defaultValue: false
    }
  }),

  runBeforeDom () {
    applyStyleWhenSettingIsTrue('messages.collapseList', styles)
    wrapStyle(compatFix).use()
  }
}
