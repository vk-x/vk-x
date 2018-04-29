// Bypass away.php, see #3.

import { on } from 'delegated-events'
import utils from '../module-utils'
import settings from '../settings'
import { decode } from '../helpers/cp1251'

export default {
  defineSettings: () => ({
    'common.awayPhp': {
      defaultValue: true
    }
  }),

  run () {
    // New <a> elements inserted by VK scripts may contain inline onclick handler:
    // `return goAway('url', {}, event);`
    // These elements also have the href set as below, so let's ignore this case
    // and fall through to the next case below.
    utils.setConditional('common.awayPhp', window, 'goAway', {
      true: () => {}
    })

    // <a> elements returned from server just have href: "away.php?to=url",
    // where url is uri-encoded.
    on('mousedown', '[href^="/away.php"], [href^="away.php"]', function () {
      if (settings.get('common.awayPhp')) {
        // Save the original href to be able to revert when this feature
        // is disabled in the extension settings.
        this.setAttribute('vkx-orig-href', this.getAttribute('href'))
        const url = this.getAttribute('href').match(/to=([^&]*)/)[1]
        this.setAttribute('href', decode(url))
      }
    })

    on('mousedown', '[vkx-orig-href]', function () {
      if (!settings.get('common.awayPhp')) {
        this.setAttribute('href', this.getAttribute('vkx-orig-href'))
        this.removeAttribute('vkx-orig-href')
      }
    })
  }
}
