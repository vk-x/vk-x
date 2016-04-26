# vk-api — JavaScript Driver for vk.com API

An alternative library for interacting with vk.com with solid and exceptionally convenient API.

```JavaScript

url = vk.getAuthUrl("app-id", ["permissions"])
window.open(url)
// After the user authenticates your app, get `access_token` query parameter from that window.
vk.accessToken = "obtained-access-token"

vk.users.get().then(function(currentUser) {
  // https://vk.com/dev/users.get
})

```

## Documentation

- [Driver API](docs/api.md)
- [API Documentation (vk.com)](https://vk.com/dev/methods)


## Roadmap

- [x] Basic `vk.method()` support with callbacks
- [x] Promises
- [x] Method aliases: `vk.users.get()` instead of `vk.method("users.get")`
- [x] Documentation
- [x] Release to npm, Bower, jsDelivr
- [x] Separate builds with and without method aliases
- [x] Auto-retry on 'too many requests' error
- [ ] Queue requests to avoid spamming retries
- [ ] API error handling (meanwhile, here's [a list of error codes](https://vk.com/dev/errors))
- [ ] Full-fledged server-side support, including `vk.getAuthUrl()` and aliases for secure methods
- [ ] Better website-type apps support, including automated authentication
- [ ] Build size optimization


## License — [MIT](LICENSE.md)
