settings = require "./settings"


domReady = new Promise ( resolve ) ->
  window.document.addEventListener "DOMContentLoaded", resolve

# Load local settings initially. This is enough to get rolling.
settingsReady = settings.fetchLocal()

# We'll still need to sync up with remote.
settings.fetchRemote()


Promise.all [ settingsReady, domReady ]
.then ->

  require "./away-php"
  require "./fixed-left-menu/fixed-left-menu"
  require "./no-link-previews/no-link-previews"
  require "./menu-clock/menu-clock"
  require "./settings/menu-item"
  require "./settings/popup"
