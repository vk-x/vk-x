import { on } from 'delegated-events'
import settings from './index'
import packageInfo from '../../package.json'
import popupTemplate from './popup-template'
import popupStyles from './styles'
import i18n from '../i18n'

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

    on('click', '.vkx-popup-link', () => {
      window.TopMenu.toggle(false)
      window.stManager.add('settings.css', () => box.show())
    })

    box.bodyNode.innerHTML = popupTemplate()

    box.bodyNode.querySelectorAll('[vkx-setting]').forEach(el => {
      el.classList.toggle('on', settings.get(el.getAttribute('setting-id')))
    })

    box.bodyNode.classList.add('vkx-popup')
    popupStyles.use()

    on('click', '[vkx-setting]', function () {
      const key = this.getAttribute('setting-id')
      settings.set(key, !settings.get(key))
    })

    on('mouseover', '[vkx-setting]', function () {
      const key = this.getAttribute('setting-id')
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

    on('click', '#vkx-reset-settings', () =>
      settings.reset().then(() => window.document.location.reload())
    )

    settings.on('set', ({ key, value }) => {
      const settingEl = box.bodyNode.querySelector(`[vkx-setting][setting-id="${key}"]`)
      if (settingEl) {
        settingEl.classList.toggle('on', value)
      }
    })
  }
}
