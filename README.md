# inject

For use inside Chrome extensions. Injects scripts into the page context.

```JavaScript
inject = require("@vk-x/inject")

inject("path/to/file.js")
inject("console.log('Inline code')", true)
```
