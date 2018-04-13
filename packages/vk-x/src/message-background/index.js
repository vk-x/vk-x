import utils from 'utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'messages.darkerUnread': {
      defaultValue: true
    }
  }),

  runBeforeDom () {
    utils.styleConditional('messages.darkerUnread', styles)
  }
}
