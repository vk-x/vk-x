import { applyStyleWhenSettingIsTrue } from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'friends.noPeopleYouMightKnow': {
      defaultValue: false
    }
  }),

  runBeforeDom () {
    applyStyleWhenSettingIsTrue('friends.noPeopleYouMightKnow', styles)
  }
}
