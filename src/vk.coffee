DEFAULT_API_VERSION = "5.50"
DEFAULT_WINDOW_STYLE = "popup"
REDIRECT_URI = "https%3A%2F%2Foauth.vk.com%2Fblank.html"

ERROR_TOO_MANY_REQUESTS = 6


module.exports =

  version: DEFAULT_API_VERSION


  authUrl: ( appId, permissions, @version = DEFAULT_API_VERSION, windowStyle = DEFAULT_WINDOW_STYLE ) ->
    "https://oauth.vk.com/authorize?client_id=#{appId}&scope=#{permissions.join ','}&redirect_uri=#{REDIRECT_URI}&" +
    "display=#{windowStyle}&v=#{@version}&response_type=token"


  request: ( url, params, callback ) ->
    xhr = new XMLHttpRequest
    xhr.onload = ->
      callback JSON.parse @responseText

    serializedParams = ( "#{encodeURIComponent(key)}=#{encodeURIComponent(val)}" for own key, val of params ).join "&"
    xhr.open "POST", url
    xhr.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"
    xhr.send serializedParams


  method: ( methodName, params, callback = -> ) ->
    params.access_token = @accessToken
    params.v = @version

    new Promise ( resolve, reject ) =>
      do retry = =>
        @request "https://api.vk.com/method/#{methodName}", params, ({ error, response }) ->
          if error?
            if error.error_code is ERROR_TOO_MANY_REQUESTS
              setTimeout retry, 300
            else
              callback error, response
              reject error
          else
            callback error, response
            resolve response
