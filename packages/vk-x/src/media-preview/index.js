import $ from 'jquery'
import utils from '../module-utils'
import styles from './styles'

export default {
  defineSettings: () => ({
    'common.previewMediaLinks': {
      defaultValue: true
    }
  }),

  runBeforeDom () {
    utils.styleConditional('common.previewMediaLinks', styles)
  },

  run () {
    const handler = function (event) {
      $(this).attr('vkx-media-link', '')

      // Allow to open the link normally with Ctrl.
      if (event.ctrlKey) {
        $(this).removeAttr('onclick')
      }

      // Prevent bubbling otherwise.
      $(this).attr('onclick', 'return false')

      if ($(this).children().last().is('video')) {
        $(this)
          .removeClass('vkx-expanded')
          .children().last().remove()
      } else {
        $(this)
          .addClass('vkx-expanded')
          .append(
            `<video vkx-media-expanded src="${this.href}" autoplay loop width="400"` +
            'onclick="if (!arguments[0].ctrlKey) this.parentNode.removeChild(this)">'
          )
      }
    }

    const selector = 'a[href$=".webm"], a[href$=".gifv"], a[href$=".mp4"], ' +
      'a[href^="/away.php"][href*=".webm&"], a[href^="/away.php"][href*=".gifv&"], ' +
      'a[href^="/away.php"][href*=".mp4&"]'

    utils.runConditional('common.previewMediaLinks', {
      true () {
        $(document).on('mousedown', selector, handler)
      },
      false () {
        $(document).off('mousedown', selector, handler)
        $('[vkx-media-link]')
          .removeAttr('onclick')
          .removeAttr('vkx-media-link')
          .removeClass('vkx-expanded')
        $('[vkx-media-expanded]').remove()
      }
    })
  }
}
