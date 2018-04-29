import utils from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'photos.noLikeOverlay': {
      defaultValue: true
    }
  }),

  runBeforeDom () {
    utils.styleConditional('photos.noLikeOverlay', styles)
  }
}
