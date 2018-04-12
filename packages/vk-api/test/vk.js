/* eslint-env mocha */
/* global expect, sinon */

import cleanVk from 'inject-loader!../src/vk' // eslint-disable-line import/no-webpack-loader-syntax

describe('vk', () => {
  let vk = null

  beforeEach(() => {
    delete window.VK
    vk = cleanVk({}).default
  })

  describe('getAuthUrl', () => {
    it('should use passed app id, permissions and options', () => {
      const url = vk.getAuthUrl('12345', [ 'audio', 'photos' ], {
        version: '5.10',
        windowStyle: 'popup',
        redirectUrl: 'close.html'
      })

      url.should.equal(
        'https://oauth.vk.com/authorize?client_id=12345&scope=audio,photos&' +
        'redirect_uri=close.html&display=popup&v=5.10&response_type=token'
      )
    })

    it('should use correct redirect url for standalone apps', () => {
      const url = vk.getAuthUrl('12345', [ 'audio', 'photos' ], {
        version: '5.10',
        windowStyle: 'popup',
        redirectUrl: 'https://oauth.vk.com/blank.html'
      })

      url.should.equal('https://oauth.vk.com/authorize?client_id=12345&scope=audio,photos&' +
      'redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=5.10&response_type=token'
      )
    })

    it('should use sensible defaults', () => {
      const url = vk.getAuthUrl('12345')

      expect(vk.version).to.equal('5.74')
      url.should.equal('https://oauth.vk.com/authorize?client_id=12345&scope=&' +
      'redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=5.74&response_type=token'
      )
    })

    it('should set vk.version', () => {
      vk.getAuthUrl('12345', [ 'audio', 'photos' ],
        {version: '4.4'})

      expect(vk.version).to.equal('4.4')
    })

    it('should default to vk.version when version is not specified', () => {
      vk.version = '1.2.3'
      const url = vk.getAuthUrl('12345')

      expect(vk.version).to.equal('1.2.3')
      url.should.equal('https://oauth.vk.com/authorize?client_id=12345&scope=&' +
      'redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=1.2.3&response_type=token'
      )
    })

    it('should set vk.appId', () => {
      vk.getAuthUrl('12345')

      expect(vk.appId).to.equal('12345')
    })

    it('should default to vk.appId when appId is not specified', () => {
      vk.appId = '12345'
      const url = vk.getAuthUrl()

      url.should.equal('https://oauth.vk.com/authorize?client_id=12345&scope=&' +
      'redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=popup&v=5.74&response_type=token'
      )
    })

    it('vk.version should be initially set to default', () => {
      expect(vk.version).to.equal('5.74')
    })
  })

  describe('getAccessToken', () => {
    const fakeData = {
      auth: true,
      access_token: 'fake-token'
    }

    it('should get the access token from login.vk.com', done => {
      vk.request = ({ method, url, params, callback }) => {
        method.should.equal('GET')
        url.should.equal('https://login.vk.com/')
        params.should.deep.equal({
          act: 'openapi',
          oauth: 1,
          new: 1,
          aid: '12345',
          location: window.document.location.hostname
        })

        callback(fakeData)
      }

      vk.getAccessToken('12345', accessToken => {
        if (accessToken === 'fake-token') {
          done()
        }
      })
    })

    it('should set vk.accessToken', done => {
      vk.request = ({ method, url, params, callback }) => callback(fakeData)

      vk.getAccessToken('12345', () => {
        if (vk.accessToken === 'fake-token') {
          done()
        }
      })
    })

    it('should return null if app is not authenticated', done => {
      const fakeData = {auth: false}
      vk.request = ({ method, url, params, callback }) => callback(fakeData)

      vk.getAccessToken('12345', () => {
        if (vk.accessToken === null) {
          done()
        }
      })
    })

    it('should support promises', done => {
      vk.request = ({ method, url, params, callback }) => callback(fakeData)

      vk.getAccessToken('12345')
        .then(accessToken => {
          if ((vk.accessToken === 'fake-token') && (accessToken === 'fake-token')) {
            done()
          }
        })
    })

    it('should set vk.appId', () => {
      vk.request = () => {}
      vk.getAccessToken('12345')

      expect(vk.appId).to.equal('12345')
    })

    it('should default to vk.appId when appId is not specified', done => {
      vk.request = ({ method, url, params, callback }) => {
        params.aid.should.equal('12345')
        callback(fakeData)
      }

      vk.appId = '12345'
      vk.getAccessToken().then(accessToken => {
        if (accessToken === 'fake-token') {
          done()
        }
      })
    })
  })

  describe('authWebsite', () => {
    afterEach(() => {
      window.open.restore()
    })

    it('should open a popup, wait for it to close, get access token', done => {
      vk.getAuthUrl = (appId, permissions, options) => {
        appId.should.equal('12345')
        permissions.should.deep.equal([ 'foo', 'bar' ])
        options.should.deep.equal({
          windowStyle: 'popup',
          redirectUrl: 'close.html'
        })

        return 'fake-url'
      }

      sinon.stub(window, 'open').callsFake(url => {
        url.should.equal('fake-url')

        const fakeWindow = {closed: false}

        setTimeout(() => {
          fakeWindow.closed = true
        }, 300)

        return fakeWindow
      })

      vk.getAccessToken = () => Promise.resolve('fake-token')

      vk.authWebsite('12345', [ 'foo', 'bar' ], null, accessToken => {
        accessToken.should.equal('fake-token')
        done()
      })
    })

    it('should pass windowStyle to vk.getAuthUrl()', done => {
      vk.getAuthUrl = (appId, permissions, options) => {
        options.should.deep.equal({
          windowStyle: 'page',
          redirectUrl: 'close.html'
        })

        return 'fake-url'
      }

      sinon.stub(window, 'open').callsFake(() => ({closed: true}))

      vk.getAccessToken = () => Promise.resolve('fake-token')

      vk.authWebsite('12345', [ 'foo', 'bar' ], 'page', accessToken => {
        accessToken.should.equal('fake-token')
        done()
      })
    })

    it('should support promises', done => {
      vk.getAuthUrl = () => 'fake-url'

      sinon.stub(window, 'open').callsFake(() => ({closed: true}))

      vk.getAccessToken = () => Promise.resolve('fake-token')

      vk.authWebsite().then(accessToken => {
        accessToken.should.equal('fake-token')
        done()
      })
    })

    it('should try to get access token first and only login if no luck', done => {
      vk.getAuthUrl = () =>
        done(new Error('tried to log in!'))

      sinon.stub(window, 'open').callsFake(() =>
        done(new Error('tried to open a window!')))

      vk.getAccessToken = () => Promise.resolve('fake-token')

      vk.authWebsite().then(accessToken => {
        accessToken.should.equal('fake-token')
        done()
      })
    })
  })

  describe('authFrame', () => {
    it('should use VK.init', done => {
      window.VK = {
        init (onSuccess, onFail, version) {
          version.should.equal('5.74')
          onSuccess()
        }
      }

      vk.authFrame(error => {
        expect(error).to.not.be.ok // eslint-disable-line no-unused-expressions
        done()
      })
    })

    it('should pass error to callback when onFail is called', done => {
      window.VK = {
        init (onSuccess, onFail, version) {
          version.should.equal('5.74')
          onFail()
        }
      }

      vk.authFrame(error => {
        expect(error).to.be.instanceof(Error)
        done()
      })
    })

    it('should support promises', done => {
      window.VK = {
        init (onSuccess, onFail, version) {
          version.should.equal('5.74')
          onSuccess()
        }
      }

      vk.authFrame().then(
        () => done(),
        () => done(new Error('rejected!'))
      )
    })

    it('should reject when window.VK is undefined', done => {
      vk.authFrame().then(
        () => done(new Error('resolved!')),
        () => done()
      )
    })
  })

  describe('method', () => {
    const fakeMethod = 'fake-method'
    const fakeUrl = 'https://api.vk.com/method/fake-method'

    beforeEach(() => {
      vk.accessToken = 'fake-token'
      vk.version = 'fake-version'
    })

    it('should call @request and then callback(error, data)', done => {
      const fakeData = {
        error: 'fake error',
        response: {
          foo: 'bar'
        }
      }

      vk.request = ({ method, url, params, callback }) => {
        method.should.equal('POST')
        url.should.equal(fakeUrl)
        params.should.deep.equal({
          foo: 'bar',
          access_token: 'fake-token',
          v: 'fake-version'
        })

        callback(fakeData)
      }

      vk.method(fakeMethod, {foo: 'bar'}, (error, response) => {
        expect(error).to.equal(fakeData.error)
        response.should.equal(fakeData.response)

        done()
      })
    })

    it('should support promises', done => {
      const fakeResponse = {response: 'foo'}
      vk.request = ({ method, url, params, callback }) => callback(fakeResponse)

      vk.method(fakeMethod, {foo: 'bar'}).then(response => {
        response.should.equal('foo')
        done()
      }, error => done(new Error('rejected!', error)))
    })

    it('should default to {} when no params specified', done => {
      const fakeResponse = {response: 'foo'}

      vk.request = function ({ method, url, params, callback }) {
        params.should.deep.equal({
          access_token: 'fake-token',
          v: 'fake-version'
        })

        callback(fakeResponse)
      }

      vk.method(fakeMethod).then(response => {
        response.should.equal('foo')
        done()
      }, error => done(new Error('rejected!', error)))
    })

    it('should reject promise when data.error exists', done => {
      const fakeResponse = {response: 'foo', error: 'exists'}
      vk.request = ({ method, url, params, callback }) => callback(fakeResponse)

      vk.method(fakeMethod, {foo: 'bar'}).then(
        response => done(new Error('resolved!')),
        error => {
          expect(error).to.equal('exists')
          done()
        }
      )
    })

    it("should auto-retry on 'too many requests' error", done => {
      const ERROR_TOO_MANY_REQUESTS = 6
      const clock = sinon.useFakeTimers()
      const fakeError = {error: {error_code: ERROR_TOO_MANY_REQUESTS}}
      const fakeSuccess = {response: 'success'}

      let calls = 0
      vk.request = function ({ method, url, params, callback }) {
        calls += 1
        if (calls < 3) {
          callback(fakeError)
          clock.tick(310)
        } else {
          callback(fakeSuccess)
        }
      }

      vk.method(fakeMethod, {foo: 'bar'}).then(response => {
        clock.restore()
        response.should.equal('success')
        done()
      }, error => {
        clock.restore()
        done(new Error('rejected!', error))
      })
    })

    it('should proxy calls to VK.api when possible', done => {
      const fakeData = {
        error: 'fake error',
        response: {
          foo: 'bar'
        }
      }

      window.VK = {
        api (method, params, callback) {
          method.should.equal(fakeMethod)
          params.should.deep.equal({foo: 'bar'})
          callback(fakeData)
        }
      }

      vk.request = () => done(new Error('called vk.request!'))

      vk.method(fakeMethod, {foo: 'bar'}, (error, response) => {
        expect(error).to.equal(fakeData.error)
        response.should.equal(fakeData.response)
        done()
      })
    })
  })

  describe('request', () => {
    const fakeUrl = 'https://api.vk.com/method/fake-method'

    let fakeXhr = null

    const fakeParams = {
      foo: 'foo 2',
      bar: 'bar/2'
    }

    const fakeData = {
      error: 'fake error',
      response: {
        foo: 'bar'
      }
    }

    beforeEach(() => {
      fakeXhr = sinon.useFakeXMLHttpRequest()
      fakeXhr.requests = []
      fakeXhr.onCreate = xhr => {
        fakeXhr.requests.push(xhr)
      }
    })

    afterEach(() => {
      fakeXhr.restore()
    })

    it('should make a get xhr and call back with parsed json', done => {
      vk.request({
        method: 'GET',
        url: fakeUrl,
        params: fakeParams,
        callback (data) {
          data.should.deep.equal(fakeData)
          done()
        }
      })

      fakeXhr.requests.length.should.equal(1)
      expect(fakeXhr.requests[ 0 ].method).to.equal('GET')
      expect(fakeXhr.requests[ 0 ].withCredentials).to.equal(false)
      expect(fakeXhr.requests[ 0 ].url).to.equal(fakeUrl + '?foo=foo%202&bar=bar%2F2')

      fakeXhr.requests[ 0 ].respond(200, {}, JSON.stringify(fakeData))
    })

    it('should make a post xhr and call back with parsed json', done => {
      vk.request({
        method: 'POST',
        url: fakeUrl,
        params: fakeParams,
        callback (data) {
          data.should.deep.equal(fakeData)
          done()
        }
      })

      fakeXhr.requests.length.should.equal(1)
      expect(fakeXhr.requests[ 0 ].method).to.equal('POST')
      expect(fakeXhr.requests[ 0 ].withCredentials).to.equal(false)
      expect(fakeXhr.requests[ 0 ].url).to.equal(fakeUrl)
      expect(fakeXhr.requests[ 0 ].requestHeaders).to.have.property('Content-Type')
      expect(fakeXhr.requests[ 0 ].requestHeaders[ 'Content-Type' ]).to.contain('application/x-www-form-urlencoded')
      expect(fakeXhr.requests[ 0 ].requestBody).to.equal('foo=foo%202&bar=bar%2F2')

      fakeXhr.requests[ 0 ].respond(200, {}, JSON.stringify(fakeData))
    })

    it('should use credentials when specified', done => {
      vk.request({
        method: 'GET',
        url: fakeUrl,
        withCredentials: true,
        params: fakeParams,
        callback (data) {
          data.should.deep.equal(fakeData)
          done()
        }
      })

      fakeXhr.requests.length.should.equal(1)
      expect(fakeXhr.requests[ 0 ].method).to.equal('GET')
      expect(fakeXhr.requests[ 0 ].withCredentials).to.equal(true)
      expect(fakeXhr.requests[ 0 ].url).to.equal(fakeUrl + '?foo=foo%202&bar=bar%2F2')

      fakeXhr.requests[ 0 ].respond(200, {}, JSON.stringify(fakeData))
    })
  })

  describe('clientMethod', () =>

    it('should proxy calls to VK.callMethod', () => {
      window.VK = {
        callMethod (method, one, two) {
          method.should.equal('fake-method')
          one.should.equal(1)
          two.should.equal(2)

          return 'fake-result'
        }
      }

      const result = vk.clientMethod('fake-method', 1, 2)
      result.should.equal('fake-result')
    })
  )

  describe('on', () =>

    it('should proxy calls to VK.addCallback', done => {
      window.VK = {
        addCallback (event, listener) {
          event.should.equal('onApplicationAdded')

          listener('foo', 'bar')
        }
      }

      vk.on('onApplicationAdded', (foo, bar) => {
        foo.should.equal('foo')
        bar.should.equal('bar')
        done()
      })
    })
  )

  describe('off', () =>

    it('should proxy calls to VK.removeCallback', done => {
      const fakeListener = () => {}

      window.VK = {
        removeCallback (event, listener) {
          event.should.equal('onApplicationAdded')
          listener.should.equal(fakeListener)
          done()
        }
      }

      vk.off('onApplicationAdded', fakeListener)
    })
  )
})
