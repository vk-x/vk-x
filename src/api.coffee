vk = require "@vk-x/vk-api"

vk.ready = new Promise ( resolve ) ->
  window.addEventListener "message", ({ data } = {}) ->
    if data.vkxAccessToken
      vk.accessToken = data.vkxAccessToken
      resolve()

module.exports = vk
