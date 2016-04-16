cleanAuth = require "inject!../src/auth"


describe "authUrl", ->

  it "should use passed app id, permissions, api version, and window style", ->
    auth = cleanAuth()

    url = auth.authUrl "12345", [ "audio", "photos" ], "5.10", "popup"

    url.should.equal "https://oauth.vk.com/authorize?client_id=12345&scope=audio,photos&" +
    "redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=5.10&response_type=token"
