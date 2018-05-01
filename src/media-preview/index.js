import { on, off } from 'delegated-events'
import { onSettingChange, applyStyleWhenSettingIsTrue } from '../module-utils'
import { htmlToElement } from '../helpers/htmlToElement'
import styles from './styles'

const mediaLinksSelector =
  'a[href$=".webm"], a[href^="/away.php"][href*=".webm&"], ' +
  'a[href$=".mp4"], a[href^="/away.php"][href*=".mp4&"]'

const scrollMediaIntoView = mediaEl => {
  if (!document.querySelector('.im-page--chat-body').contains(mediaEl)) {
    return
  }

  const scrollContainer = document.querySelector('.im-page--chat-body .ui_scroll_outer')
  const scrollContainerBottom = scrollContainer.getBoundingClientRect().bottom
  const mediaBottom = mediaEl.getBoundingClientRect().bottom

  if (mediaBottom > scrollContainerBottom) {
    scrollContainer.scrollTop += mediaBottom - scrollContainerBottom + 20
  }
}

const mediaLinkMouseDownHandler = function (event) {
  this.setAttribute('vkx-visited-media-link', '')

  // Preserve normal behavior with right click or Ctrl/Alt.
  if (event.ctrlKey || event.altKey || event.which !== 1) {
    this.removeAttribute('onclick')
    return
  }

  // Prevent default behavior otherwise.
  this.setAttribute('onclick', 'return false')

  if (!this.querySelector('[vkx-media-expanded]')) {
    const media = htmlToElement(`<video vkx-media-expanded loading src="${this.href}" autoplay loop />`)

    media.addEventListener('play', () => {
      if (media.hasAttribute('loading')) {
        scrollMediaIntoView(media)
        media.removeAttribute('loading')
      }
    })

    this.appendChild(media)
    this.classList.add('vkx-expanded')
  } else {
    this.querySelector('[vkx-media-expanded]').remove()
    this.classList.remove('vkx-expanded')
  }
}

export default {
  defineSettings: () => ({
    'common.previewMediaLinks': {
      defaultValue: true
    }
  }),

  runBeforeDom: () => {
    applyStyleWhenSettingIsTrue('common.previewMediaLinks', styles)
  },

  run () {
    onSettingChange('common.previewMediaLinks', {
      true: () => {
        on('mousedown', mediaLinksSelector, mediaLinkMouseDownHandler)
      },

      false: () => {
        off('mousedown', mediaLinksSelector, mediaLinkMouseDownHandler)

        document.querySelectorAll('[vkx-visited-media-link]').forEach(el => {
          el.removeAttr('onclick')
          el.removeClass('vkx-expanded')
          el.removeAttr('vkx-visited-media-link')
        })

        document.querySelectorAll('[vkx-media-expanded]').forEach(el => el.remove())
      }
    })
  }
}
