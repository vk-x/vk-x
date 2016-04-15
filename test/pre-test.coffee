cleanVkApi = require "inject!../src/index"

beforeEach ->
  window.vkApi = cleanVkApi()
