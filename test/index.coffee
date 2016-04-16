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
    url = vk.authUrl "12345", [ "audio", "photos" ]

    url.should.equal "https://oauth.vk.com/authorize?client_id=12345&scope=audio,photos&" +
    "redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=5.50&response_type=token"


fakeMethod = "fake-method"
fakeUrl = "https://api.vk.com/method/fake-method"


describe "method", ->
  beforeEach ->
    vk.accessToken = "fake-token"

  it "calls @request and calls callback(error, data)", ( done ) ->
    fakeData =
      error: "fake error"
      response:
        foo: "bar"

    vk.request = ( url, params, callback ) ->
      url.should.equal fakeUrl
      params.should.deep.equal foo: "bar", access_token: "fake-token"

      callback fakeData

    vk.method fakeMethod, foo: "bar", ( error, response ) ->
      expect( error ).to.equal fakeData.error
      response.should.equal fakeData.response

      done()


  it "supports promises", ( done ) ->
    vk.request = ( url, params, callback ) ->
      callback response: "foo"

    vk.method fakeMethod, foo: "bar"
    .then ( response ) ->
      response.should.equal "foo"
      done()

    , ( error ) ->
      done "rejected!"


  it "rejects the promise when data.error exists", ( done ) ->
    vk.request = ( url, params, callback ) ->
      callback response: "foo", error: "exists"

    vk.method fakeMethod, foo: "bar"
    .then ( response ) ->
      done "resolved!"

    , ( error ) ->
      expect( error ).to.equal "exists"
      done()


describe "request", ->

  fakeXhr = null

  beforeEach ->
    fakeXhr = sinon.useFakeXMLHttpRequest()
    fakeXhr.requests = []
    fakeXhr.onCreate = ( xhr ) ->
      fakeXhr.requests.push xhr

  afterEach ->
    fakeXhr.restore()


  it "makes a post xhr, calls callback with parsed json", ( done ) ->
    fakeParams =
      foo: "foo 2"
      bar: "bar/2"

    fakeData =
      error: "fake error"
      response:
        foo: "bar"

    vk.request fakeUrl, fakeParams, ( data ) ->
      data.should.deep.equal fakeData

      done()

    fakeXhr.requests.length.should.equal 1
    expect( fakeXhr.requests[ 0 ].url ).to.equal fakeUrl
    expect( fakeXhr.requests[ 0 ].method ).to.equal "POST"
    expect( fakeXhr.requests[ 0 ].requestBody ).to.equal "foo=foo%202&bar=bar%2F2"

    fakeXhr.requests[ 0 ].respond 200, {}, JSON.stringify fakeData
