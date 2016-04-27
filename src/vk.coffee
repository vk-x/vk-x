ERROR_TOO_MANY_REQUESTS = 6


module.exports =

  version: "5.50"


  getAuthUrl: ( @appId = @appId, permissions = [], {
    @version = @version
    windowStyle = "popup"
    redirectUrl = "https://oauth.vk.com/blank.html"
  } = {}) ->
    "https://oauth.vk.com/authorize?client_id=#{@appId}&scope=#{permissions.join ','}&redirect_uri=#{encodeURIComponent redirectUrl}&" +
    "display=#{windowStyle}&v=#{@version}&response_type=token"


  request: ( method, url, params, callback ) ->
    xhr = new XMLHttpRequest
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
    params.access_token = @accessToken
    params.v = @version

    new Promise ( resolve, reject ) =>
      do retry = =>
        @request "POST", "https://api.vk.com/method/#{methodName}", params, ({ error, response }) ->
          if error?
            if error.error_code is ERROR_TOO_MANY_REQUESTS
              setTimeout retry, 300
            else
              callback error, response
              reject error
          else
            callback error, response
            resolve response
