```CoffeeScript

url = vk.authUrl 12345, [ "audio", "photos" ], "5.50", "popup"

# Obtain an access token...

vk.finishAuth "token"


vk.method "users.get", asdf: asdf, ( error, data ) ->

# or

vk.method "users.get", asdf: asdf
.then -> ...

```
