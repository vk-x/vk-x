import { applyStyleWhenSettingIsTrue } from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'photos.scrollThumbnails': {
      defaultValue: true
    }
  }),

  runBeforeDom () {
    applyStyleWhenSettingIsTrue('photos.scrollThumbnails', styles)
  }
}
