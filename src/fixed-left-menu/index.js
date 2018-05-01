// Fix menu on the page so it doesn't scroll out of view, see #6.

import { applyStyleWhenSettingIsTrue } from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'sideMenu.fixPosition': {
      defaultValue: true
    }
  }),

  runBeforeDom () {
    applyStyleWhenSettingIsTrue('sideMenu.fixPosition', styles)
  }
}
