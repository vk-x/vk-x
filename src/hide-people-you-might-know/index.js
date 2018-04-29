import utils from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'friends.noPeopleYouMightKnow': {
      defaultValue: true
    }
  }),

  runBeforeDom () {
    utils.styleConditional('friends.noPeopleYouMightKnow', styles)
  }
}
