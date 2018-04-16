import $ from 'jquery'
import utils from '../module-utils'
import styles from './styles'

const mediaLinksSelector =
  'a[href$=".webm"], a[href^="/away.php"][href*=".webm&"], ' +
  'a[href$=".mp4"], a[href^="/away.php"][href*=".mp4&"]'

const scrollMediaIntoView = (mediaEl) => {
  if (!document.querySelector('.im-page--chat-body').contains(mediaEl)) {
    return
  }

  const scrollContainer = $('.im-page--chat-body .ui_scroll_outer')
  const scrollContainerBottom = scrollContainer.offset().top + scrollContainer.innerHeight()
  const mediaBottom = mediaEl.offset().top + mediaEl.outerHeight(true)

  if (mediaBottom > scrollContainerBottom) {
    scrollContainer.scrollTop(scrollContainer.scrollTop() + (mediaBottom - scrollContainerBottom) + 20)
  }
}

const mediaLinkMouseDownHandler = function (event) {
  $(this).attr('vkx-visited-media-link', '')

  // Preserve normal behavior with right click or Ctrl/Alt.
  if (event.ctrlKey || event.altKey || event.which !== 1) {
    $(this).removeAttr('onclick')
    return
  }

  // Prevent default behavior otherwise.
  $(this).attr('onclick', 'return false')

  if ($('[vkx-media-expanded]', this).length === 0) {
    const media = $(`<video vkx-media-expanded loading src="${this.href}" autoplay loop />`)

    media.one('play', () => {
      media.removeAttr('loading')
      scrollMediaIntoView(media)
    })

    $(this).append(media).addClass('vkx-expanded')
  } else {
    $('[vkx-media-expanded]', this).remove()
    $(this).removeClass('vkx-expanded')
  }
}

export default {
  defineSettings: () => ({
    'common.previewMediaLinks': {
      defaultValue: true
    }
  }),

  runBeforeDom: () => {
    utils.styleConditional('common.previewMediaLinks', styles)
  },

  run () {
    utils.runConditional('common.previewMediaLinks', {
      true: () => {
        $(document).on('mousedown', mediaLinksSelector, mediaLinkMouseDownHandler)
      },

      false: () => {
        $(document).off('mousedown', mediaLinksSelector, mediaLinkMouseDownHandler)

        $('[vkx-visited-media-link]')
          .removeAttr('onclick')
          .removeClass('vkx-expanded')
          .removeAttr('vkx-visited-media-link')

        $('[vkx-media-expanded]').remove()
      }
    })
  }
}
