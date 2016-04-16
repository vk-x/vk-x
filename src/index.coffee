DEFAULT_API_VERSION = "5.50"
DEFAULT_WINDOW_STYLE = "popup"
REDIRECT_URI = "https%3A%2F%2Foauth.vk.com%2Fblank.html"


module.exports =

  authUrl: ( appId, permissions = [], apiVersion = DEFAULT_API_VERSION, windowStyle = DEFAULT_WINDOW_STYLE ) ->
    scope = if permissions.length
      "&scope=" + permissions.join ","
    else
      ""

    "https://oauth.vk.com/authorize?client_id=#{appId}#{scope}&redirect_uri=#{REDIRECT_URI}&display=#{windowStyle}&" +
    "v=#{apiVersion}&response_type=token"


  request: ( url, params, callback ) ->
    xhr = new XMLHttpRequest
    xhr.onload = ->
      callback JSON.parse @responseText

    serializedParams = ( "#{encodeURIComponent(key)}=#{encodeURIComponent(val)}" for own key, val of params ).join "&"
    xhr.open "POST", url
    xhr.send serializedParams


  method: ( methodName, params, callback = -> ) ->
    new Promise ( resolve, reject ) =>
      @request "https://api.vk.com/method/#{methodName}", params, ({ error, response }) ->
        callback error, response
        if error?
          reject error
        else
          resolve response
