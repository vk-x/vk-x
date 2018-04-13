import $ from 'jquery'
import settings from 'settings'
import utils from 'utils'
import justInstalledStyles from './just-installed'

export default {
  defineSettings: () => ({
    'internal.isNew': {
      defaultValue: true
    }
  }),

  run () {
    $('#top_support_link').after("<a class='top_profile_mrow vkx-popup-link'>vk-x</a>")

    // Wait for sync down. Otherwise isNew will be true on a new machine when it shouldn't be.
    return settings.on('fetch.remote', function () {
      utils.runConditional('internal.isNew', {
        true () { return window.TopMenu.show() }
      })

      utils.styleConditional('internal.isNew', justInstalledStyles)

      return $('.vkx-popup-link').on('click', () => settings.set('internal.isNew', false))
    })
  }
}
