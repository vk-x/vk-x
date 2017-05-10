# cp1251

```JavaScript
cp1251 = require("@vk-x/cp1251")

str = "http%3A%2F%2F%F0%EE%F1%F1%E8%FF.%F0%F4"
decoded = cp1251.decode(str)

console.log(decoded) // http://россия.рф
```
