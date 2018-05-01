import { applyStyleWhenSettingIsTrue } from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'friends.noPeopleYouMightKnow': {
      defaultValue: true
    }
  }),

  runBeforeDom () {
    applyStyleWhenSettingIsTrue('friends.noPeopleYouMightKnow', styles)
  }
}
