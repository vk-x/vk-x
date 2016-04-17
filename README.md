# vk-api — JavaScript Driver for vk.com API

An alternative library for interacting with vk.com with solid and exceptionally convenient API.

```JavaScript

url = vk.authUrl("app-id", ["permissions"])
window.open(url)
// After the user authenticates your app, get `access_token` query parameter from that window.
vk.accessToken = "obtained-access-token"

vk.users.get().then(function(currentUser) {
  // https://vk.com/dev/users.get
})

```

## Documentation

- Driver API — not yet ready
- [API Documentation (vk.com)](https://vk.com/dev/methods)


## License — [MIT](LICENSE.md)
