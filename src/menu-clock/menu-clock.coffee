# Show digital clock in the left menu, see #22.

moment = require "moment"

leftMenu = document.querySelector "#side_bar_inner"
leftMenu.insertAdjacentHTML "beforeend", "
    <div class='vkx-clock'>
      <div class='vkx-time'></div>
      <div class='vkx-date'></div>
    </div>"

updateClock = ->
  document.querySelector( ".vkx-time" ).innerHTML = moment().format "HH:mm:ss"
  document.querySelector( ".vkx-date" ).innerHTML = moment().format "DD.MM.YYYY"

updateClock()
window.setInterval updateClock, 1000
