// Collapse the list of conversations to widen the chat area. See #13.

import utils from 'utils'
import styles from './styles'
import compatFix from './compat-fix'

export default {
  defineSettings: () => ({
    'messages.collapseList': {
      defaultValue: false
    }
  }),

  runBeforeDom () {
    utils.styleConditional('messages.collapseList', styles)
    utils.wrapStyle(compatFix).use()
  }
}
