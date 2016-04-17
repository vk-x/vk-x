# vk-api — JavaScript Driver for vk.com API

Unofficial library for interacting with vk.com API.

```JavaScript

url = vk.authUrl("app-id", ["permissions"])
window.open(url)
// After the user authenticates your app, get `access_token` query parameter from that window.
vk.accessToken = "obtained-access-token"

vk.method("users.get", {fields: "online"}).then(function(response) {
  console.log(response.online)
})

```

## Documentation

- Driver API — not yet ready
- [API Documentation (vk.com)](https://vk.com/dev/methods)


## License — [MIT](LICENSE.md)
