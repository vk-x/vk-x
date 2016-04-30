inject = require "@vk-x/inject"

inject ->
  box = MessageBox
    title: "vk-x"
    grey: true
    width: 700
    hideButtons: true
    selfDestruct: false

  box.bodyNode.id = "vkx-popup"

  document.addEventListener "click", ( event ) ->
    if event.target.matches ".vkx-popup-link"
      TopMenu.toggle off
      stManager.add "settings.css", ->
        box.show()

popupTemplate = require "./popup-template"
popupElement = document.querySelector "#vkx-popup"
popupElement.innerHTML = popupTemplate()

popupElement.addEventListener "click", ( event ) ->
    if event.target.matches ".checkbox"
      console.log event.target.getAttribute "setting-id"
