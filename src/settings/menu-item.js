import settings from './index'
import utils from '../module-utils'
import justInstalledStyles from './just-installed'

export default {
  defineSettings: () => ({
    'internal.isNew': {
      defaultValue: true
    }
  }),

  run () {
    document.querySelector('#top_support_link').insertAdjacentHTML('afterend', '<a class="top_profile_mrow vkx-popup-link">vk-x</a>')

    // Wait for sync down. Otherwise isNew will be true on a new machine when it shouldn't be.
    settings.on('fetch.remote', () => {
      utils.runConditional('internal.isNew', {
        true () { window.TopMenu.show() }
      })

      utils.styleConditional('internal.isNew', justInstalledStyles)

      document.querySelector('.vkx-popup-link').addEventListener('click', () => {
        settings.set('internal.isNew', false)
      })
    })
  }
}
