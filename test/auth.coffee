describe "authUrl", ->
  auth = null
  cleanAuth = require "inject!../src/auth"

  beforeEach ->
    auth = cleanAuth()


  it "should use passed app id, permissions, api version, and window style", ->
    url = auth.authUrl "12345", [ "audio", "photos" ], "5.10", "popup"

    url.should.equal "https://oauth.vk.com/authorize?client_id=12345&scope=audio,photos&" +
    "redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=5.10&response_type=token"


  it "should use sensible defaults", ->
    url = auth.authUrl "12345"

    url.should.equal "https://oauth.vk.com/authorize?client_id=12345&" +
    "redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=5.50&response_type=token"
