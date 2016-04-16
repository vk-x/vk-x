module.exports =

  authUrl: ( appId, permissions, apiVersion, windowStyle ) ->
    "https://oauth.vk.com/authorize?client_id=#{appId}&scope=#{permissions.join ','}&" +
    "redirect_uri=https%3A%2F%2Foauth.vk.com%2Fblank.html&display=#{windowStyle}&" +
    "v=#{apiVersion}&response_type=token"
