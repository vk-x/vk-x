{ inject } = require "@vk-x/inject"
vk = require "@vk-x/vk-api"

# Compiled from src/index.coffee, see webpack.config.coffee
inject "injected.js"

vk.authWebsite "5419677"
.then ( accessToken ) ->
  window.postMessage vkxAccessToken: accessToken, "*"
