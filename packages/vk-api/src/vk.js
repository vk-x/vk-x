const ERROR_TOO_MANY_REQUESTS = 6

export default {
  version: '5.74',

  getAuthUrl (appId, permissions = [], options = {}) {
    this.appId = appId || this.appId
    this.version = options.version || this.version
    const windowStyle = options.windowStyle || 'popup'
    const redirectUrl = options.redirectUrl || 'https://oauth.vk.com/blank.html'
    return `https://oauth.vk.com/authorize?client_id=${this.appId}&scope=${permissions.join(',')}&redirect_uri=${encodeURIComponent(redirectUrl)}&` +
    `display=${windowStyle}&v=${this.version}&response_type=token`
  },

  authWebsite (appId, permissions, windowStyle = 'popup', callback = () => {}) {
    return new Promise((resolve, reject) => {
      this.getAccessToken(appId).then(accessToken => {
        if (accessToken) {
          callback(accessToken)
          resolve(accessToken)
          return
        }

        const authUrl = this.getAuthUrl(appId, permissions, {
          windowStyle,
          redirectUrl: 'close.html'
        })

        const popup = window.open(authUrl, 'vk-api-auth', 'width=700,height=600')

        const intervalHandler = window.setInterval(() => {
          try {
            if (popup.closed) {
              window.clearInterval(intervalHandler)

              this.getAccessToken(appId).then(accessToken => {
                callback(accessToken)
                resolve(accessToken)
              })
            }
          } catch (e) {
            this.getAccessToken(appId).then(accessToken => {
              if (accessToken) {
                window.clearInterval(intervalHandler)
                callback(accessToken)
                resolve(accessToken)
              }
            })
          }
        }, 100)
      })
    })
  },

  authFrame (callback = function () {}) {
    return new Promise((resolve, reject) => {
      if (!window.VK || !window.VK.init) {
        callback(new Error('VK SDK is not loaded! https://vk.com/dev/Javascript_SDK'))
        reject(new Error('VK SDK is not loaded! https://vk.com/dev/Javascript_SDK'))
      }

      window.VK.init(() => {
        callback()
        resolve()
      }, () => {
        callback(new Error('Unknown error'))
        reject(new Error('Unknown error'))
      }, this.version)
    })
  },

  getAccessToken (appId, callback = () => {}) {
    this.appId = appId || this.appId
    return new Promise((resolve, reject) => {
      this.request({
        method: 'GET',
        url: 'https://login.vk.com/',
        params: {
          act: 'openapi',
          oauth: 1,
          new: 1,
          aid: this.appId,
          location: window.document.location.hostname
        },
        callback: ({ access_token: accessToken }) => {
          this.accessToken = accessToken || null
          callback(this.accessToken)
          resolve(this.accessToken)
        },
        withCredentials: true
      })
    })
  },

  request (options = {}) {
    const {
      method,
      url,
      params = {},
      callback = () => {},
      withCredentials = false
    } = options

    const xhr = new window.XMLHttpRequest()
    xhr.withCredentials = withCredentials
    xhr.onload = function () {
      callback(JSON.parse(this.responseText))
    }

    const serializedParams = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')

    switch (method) {
      case 'GET':
        xhr.open(method, `${url}?${serializedParams}`)
        return xhr.send()
      case 'POST':
        xhr.open(method, url)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        return xhr.send(serializedParams)
    }
  },

  method (methodName, params = {}, callback = () => {}) {
    return new Promise((resolve, reject) => {
      const retry = () => {
        const wrappedCallback = ({ error, response }) => {
          if (error != null) {
            if (error.error_code === ERROR_TOO_MANY_REQUESTS) {
              setTimeout(retry, 300)
            } else {
              callback(error, response)
              reject(error)
            }
          } else {
            callback(error, response)
            resolve(response)
          }
        }

        if (window.VK && window.VK.api) {
          window.VK.api(methodName, params, wrappedCallback)
        } else {
          this.request({
            method: 'POST',
            url: `https://api.vk.com/method/${methodName}`,
            params: {
              ...params,
              access_token: this.accessToken,
              v: this.version
            },
            callback: wrappedCallback
          })
        }
      }

      retry()
    })
  },

  clientMethod (...args) {
    return window.VK.callMethod.apply(window.VK, args)
  },

  on (event, listener) {
    return window.VK.addCallback(event, listener)
  },

  off (event, listener) {
    return window.VK.removeCallback(event, listener)
  }
}
