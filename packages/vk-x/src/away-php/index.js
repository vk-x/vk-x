// Bypass away.php, see #3.

import $ from 'jquery'
import utils from 'utils'
import settings from 'settings'
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
    $(document).on('mousedown', "[href^='/away.php'], [href^='away.php']", function () {
      if (settings.get('common.awayPhp')) {
        // Save the original href to be able to revert when this feature
        // is disabled in the extension settings.
        $(this).attr('vkx-orig-href', $(this).attr('href'))
        const url = $(this).attr('href').match(/to=([^&]*)/)[1]
        $(this).attr('href', decode(url))
      }
    })

    $(document).on('mousedown', '[vkx-orig-href]', function () {
      if (!settings.get('common.awayPhp')) {
        $(this).attr('href', $(this).attr('vkx-orig-href'))
        $(this).removeAttr('vkx-orig-href')
      }
    })
  }
}
