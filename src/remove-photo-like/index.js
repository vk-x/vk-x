import { applyStyleWhenSettingIsTrue } from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'photos.noLikeOverlay': {
      defaultValue: true
    }
  }),

  runBeforeDom () {
    applyStyleWhenSettingIsTrue('photos.noLikeOverlay', styles)
  }
}
