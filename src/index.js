import settings from './settings'
import i18n from './i18n'

import awayPhp from './away-php'
import collapseConversationList from './collapse-conversation-list'
import fixedLeftMenu from './fixed-left-menu'
import hidePeopleYouMightKnow from './hide-people-you-might-know'
import mediaPreview from './media-preview'
import menuClock from './menu-clock'
import messageBackground from './message-background'
import messageTimestamps from './message-timestamps'
import myVideosByDefault from './my-videos-by-default'
import noLinkPreviews from './no-link-previews'
import onlineFriendsByDefault from './online-friends-by-default'
import removePhotoLike from './remove-photo-like'
import settingsMenuItem from './settings/menu-item'
import settingsPopup from './settings/popup'

import languageEn from './i18n/en'
import languageRu from './i18n/ru'
import languageUk from './i18n/uk'
import languageSoviet from './i18n/soviet'

const modules = [
  awayPhp,
  collapseConversationList,
  fixedLeftMenu,
  hidePeopleYouMightKnow,
  mediaPreview,
  menuClock,
  messageBackground,
  messageTimestamps,
  myVideosByDefault,
  noLinkPreviews,
  onlineFriendsByDefault,
  removePhotoLike,
  settingsMenuItem,
  settingsPopup
]

const settingsReady = settings.fetchLocal().then(() => {
  modules.forEach(m => {
    m.defineSettings && settings.add(m.defineSettings())
    m.runBeforeDom && m.runBeforeDom()
  })
})

// Defer this to not do too much at the same time and freeze the browser.
const i18nReady = new Promise(resolve => {
  setTimeout(() => {
    i18n.add(languageEn)
    i18n.add(languageRu)
    i18n.add(languageUk)
    i18n.add(languageSoviet)
    resolve()
  })
})

const domReady = new Promise(resolve => {
  document.addEventListener('DOMContentLoaded', resolve)
})

// Local settings are fetched faster than the DOM with a high level of certainty,
// but it's still not guaranteed that they'll be ready before the DOM.
// So we need to wait for both here to be sure, not only for DOM.
// i18n messages are generally ready long before DOM, but not always. See #32.
Promise.all([ settingsReady, domReady, i18nReady ]).then(() => {
  i18n.setLanguage(window.vk.lang)

  modules.forEach(m => {
    m.run && m.run()
  })

  // Start fetching remote settings after the DOM is ready so the page
  // doesn't load slower.
  settings.fetchRemote().then(() => settings.saveLocal())
})
