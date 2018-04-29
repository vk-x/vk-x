import $ from 'jquery'
import settings from 'settings'
import packageInfo from 'package.json'
import popupTemplate from './popup-template'
import popupStyles from './styles'
import i18n from 'i18n'

export default {
  run () {
    const box = window.MessageBox({
      title: `vk-x ${packageInfo.version}`,
      grey: true,
      width: 720,
      hideButtons: true,
      selfDestruct: false,
      onHide () {
        settings.saveRemote()
      }
    })

    $(document).on('click', '.vkx-popup-link', function () {
      window.TopMenu.toggle(false)
      window.stManager.add('settings.css', () => box.show())
    })

    $(box.bodyNode).html(popupTemplate())

    $('[setting-id]', box.bodyNode).each(function () {
      $(this).toggleClass('on', settings.get($(this).attr('setting-id')))
    })

    $(box.bodyNode).addClass('vkx-popup')
    popupStyles.use()

    $(box.bodyNode).on('click', '.checkbox', function () {
      const key = $(this).attr('setting-id')
      settings.set(key, !settings.get(key))
    })

    $(box.bodyNode).on('mouseover', '.checkbox', function () {
      const key = $(this).attr('setting-id')
      const tooltipMessage = i18n.t(`settings.${key}.tooltip`)
      if (tooltipMessage) {
        window.showTooltip(this, {
          text: tooltipMessage,
          shift: [ -20, 8, 8 ],
          dir: 'auto',
          slide: 15,
          hasover: 1
        }
        )
      }
    })

    $('#vkx-reset-settings').on('click', () =>
      settings.reset().then(() => window.document.location.reload())
    )

    settings.on('set', ({ key, value }) => {
      $(`[setting-id='${key}']`, box.bodyNode).toggleClass('on', value)
    })
  }
}
