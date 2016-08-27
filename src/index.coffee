settings = require "settings"
i18n = require "i18n"


modules = [
  require "./away-php"
  require "./fixed-left-menu"
  require "./hide-people-you-might-know"
  require "./media-preview"
  require "./menu-clock"
  require "./message-background"
  require "./message-timestamps"
  require "./my-videos-by-default"
  require "./no-link-previews"
  require "./online-friends-by-default"
  require "./remove-photo-like"
  require "./settings/menu-item"
  require "./settings/popup"
]


settingsReady = settings.fetchLocal()
.then ->
  for m in modules
    if m.defineSettings
      settings.add m.defineSettings()

    m.runBeforeDom?()


# Defer this to not do too much at the same time and freeze the browser.
i18nReady = new Promise ( resolve ) ->
  setTimeout ->
    i18n.add require "./i18n/en"
    i18n.add require "./i18n/ru"
    i18n.add require "./i18n/uk"
    i18n.add require "./i18n/soviet"
    resolve()


domReady = new Promise ( resolve ) ->
  $ resolve

# Local settings are fetched faster than the DOM with a high level of certainty,
# but it's still not guaranteed that they'll be ready before the DOM.
# So we need to wait for both here to be sure, not only for DOM.
# i18n messages are generally ready long before DOM, but not always. See #32.
Promise.all [ settingsReady, domReady, i18nReady ]
.then ->

  i18n.setLanguage window.vk.lang

  for m in modules
    m.run?()

  # Start fetching remote settings after the DOM is ready so the page
  # doesn't load slower.
  settings.fetchRemote()
  .then ->
    settings.saveLocal()
