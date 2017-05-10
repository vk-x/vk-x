# vk-api — JavaScript Driver for vk.com API

An alternative library for interacting with vk.com with solid and exceptionally convenient API.

## Install

The driver is packaged as an [UMD](https://github.com/umdjs/umd) and is published to:

- [NPM](https://www.npmjs.com/package/@vk-x/vk-api): `npm install --save @vk-x/vk-api`
- [Bower](http://bower.io/search/?q=vk-api): `bower install vk-api`
- [jsDelivr CDN](http://www.jsdelivr.com/projects/vk-api): `https://cdn.jsdelivr.net/vk-api/latest/vk-api.min.js`
- A smaller version without method shortcuts is also available: `https://cdn.jsdelivr.net/vk-api/latest/vk-api-no-shortcuts.min.js`

## Use

After you've included and loaded the script, you can use it either with Promises or with callbacks.

```JavaScript

// Authenticate on your website.
vk.authWebsite("app-id", ["permissions"]).then(function() {
  vk.users.get()
}).then(function(currentUser) {
  // https://vk.com/dev/users.get
})

// Alternatively, obtain the access token yourself.
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
