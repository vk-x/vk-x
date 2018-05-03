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

    const renderBoxBody = () => {
      box.bodyNode.innerHTML = popupTemplate({
        settings: settings.getAll(),
        expanded: box.bodyNode.classList.contains('expanded-settings')
      })
      box.updateBoxCoords()
    }

    renderBoxBody()

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

    on('click', '[vkx-expand-settings]', () => {
      box.bodyNode.classList.toggle('expanded-settings')
      renderBoxBody()
    })

    on('click', '[vkx-reset-settings]', async () => {
      await settings.reset()
      window.document.location.reload()
    })

    settings.on('set', renderBoxBody)
  }
}
