# inject

For use inside Chrome extensions. Injects scripts into the page context.

```JavaScript
inject = require("@vk-x/inject")

// File name will be resolved with chrome.extension.getURL()
inject("path/to/file.js")

// Pass true as the second argument to inject the string itself as code.
inject("console.log('Inline code')", true)

// Functions are automatically stringified and wrapped into an IIFE.
inject(function() { console.log("I'm injected!") })
```
