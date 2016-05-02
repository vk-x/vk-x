module.exports =

  run: ->
    beforeElement = window.document.querySelector "#top_support_link"
    beforeElement.insertAdjacentHTML "afterend", "<a class='top_profile_mrow vkx-popup-link'>vk-x</a>"
