inject = require "@vk-x/inject"

inject ->
  box = MessageBox
    title: "vk-x"
    grey: true
    width: 600
    hideButtons: true
    selfDestruct: false
  .content "<div id='vkx-popup'></div>"

  document.addEventListener "click", ( event ) ->
    if event.target.matches ".vkx-popup-link"
      TopMenu.toggle off
      stManager.add "settings.css", ->
        box.show()
