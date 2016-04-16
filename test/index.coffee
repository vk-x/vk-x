vk = null
cleanVk = require "inject!../src/index"

beforeEach ->
  vk = cleanVk()


describe "authUrl", ->

  it "should use passed app id, permissions, api version, and window style", ->
    url = vk.authUrl "12345", [ "audio", "photos" ], "5.10", "popup"

    url.should.equal "https://oauth.vk.com/authorize?client_id=12345&scope=audio,photos&" +
    "redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=5.10&response_type=token"


  it "should use sensible defaults", ->
    url = vk.authUrl "12345"

    url.should.equal "https://oauth.vk.com/authorize?client_id=12345&" +
    "redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=5.50&response_type=token"


describe "method", ->

  it "calls @request and calls callback(error, data)", ( done ) ->
    fakeParams =
      fake: "params"

    fakeData =
      error: "fake error"
      response:
        foo: "bar"

    vk.request = ( url, params, callback ) ->
      url.should.equal "https://api.vk.com/method/fake-method"
      params.should.equal fakeParams

      callback fakeData

    vk.method "fake-method", fakeParams, ( error, response ) ->
      expect( error ).to.equal fakeData.error
      response.should.equal fakeData.response

      done()
