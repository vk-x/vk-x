ERROR_TOO_MANY_REQUESTS = 6


module.exports =

  version: "5.52"


  getAuthUrl: ( @appId = @appId, permissions = [], {
    @version = @version
    windowStyle = "popup"
    redirectUrl = "https://oauth.vk.com/blank.html"
  } = {}) ->
    "https://oauth.vk.com/authorize?client_id=#{@appId}&scope=#{permissions.join ','}&redirect_uri=#{encodeURIComponent redirectUrl}&" +
    "display=#{windowStyle}&v=#{@version}&response_type=token"


  authWebsite: ( appId, permissions, windowStyle = "popup", callback = -> ) ->
    new Promise ( resolve, reject ) =>
      @getAccessToken appId
      .then ( accessToken ) =>
        if accessToken
          callback accessToken
          resolve accessToken

        else
          authUrl = @getAuthUrl appId, permissions,
            windowStyle: windowStyle
            redirectUrl: "close.html"

          popup = window.open authUrl, "vk-api-auth", "width=700,height=600"

          intervalHandler = window.setInterval =>
            if popup.closed
              window.clearInterval intervalHandler

              @getAccessToken appId
              .then ( accessToken ) ->
                callback accessToken
                resolve accessToken

          , 100


  authFrame: ( callback = -> ) ->
    new Promise ( resolve, reject ) =>
      window.VK.init ->
        callback()
        resolve()
      , ->
        callback true
        reject()
      , @version


  getAccessToken: ( @appId = @appId, callback = -> ) ->
    new Promise ( resolve, reject ) =>
      @request
        method: "GET"
        url: "https://login.vk.com/"
        params:
          act: "openapi"
          oauth: 1
          new: 1
          aid: @appId
          location: window.document.location.hostname
        callback: ({ access_token }) =>
          @accessToken = access_token ? null
          callback @accessToken
          resolve @accessToken
        withCredentials: yes


  request: ({ method, url, params, callback, withCredentials = no }) ->
    xhr = new XMLHttpRequest
    xhr.withCredentials = withCredentials
    xhr.onload = ->
      callback JSON.parse @responseText

    serializedParams = ( "#{encodeURIComponent key}=#{encodeURIComponent val}" for own key, val of params ).join "&"
    switch method
      when "GET"
        xhr.open method, "#{url}?#{serializedParams}"
        xhr.send()
      when "POST"
        xhr.open method, url
        xhr.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
        xhr.send serializedParams


  method: ( methodName, params = {}, callback = -> ) ->
    new Promise ( resolve, reject ) =>
      do retry = =>
        wrappedCallback = ({ error, response }) ->
          if error?
            if error.error_code is ERROR_TOO_MANY_REQUESTS
              setTimeout retry, 300
            else
              callback error, response
              reject error
          else
            callback error, response
            resolve response

        if window.VK?.api?
          window.VK.api methodName, params, wrappedCallback

        else
          params.access_token = @accessToken
          params.v = @version
          @request
            method: "POST"
            url: "https://api.vk.com/method/#{methodName}"
            params: params
            callback: wrappedCallback


  clientMethod: ( args... ) ->
    window.VK.callMethod.apply window.VK, args
