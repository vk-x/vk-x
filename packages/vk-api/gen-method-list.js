// Generate `src/method-list.json` by parsing https://vk.com/dev/methods
// Usage: `npm run gen-methods`

// Notice: make sure `src/client-method-list.json` is up to date manually
// by going to https://vk.com/dev/clientapi

import fs from 'fs'
import request from 'request'
import R from 'ramda'

request('https://vk.com/dev/methods', function (err, res, body) {
  if (err) return

  const namespaces = R.pipe(
    str => str.match(/cur\.sections = ({.*?});/)[1],
    json => JSON.parse(json), // { namespace: { list: [ ['namespace.method', ''], ... ] }, ... }
    R.dissoc('execute'), // special namespace with method 'execute' (not following 'foo.bar' pattern)
    R.pluck('list'), // { namespace: [ ['namespace.method', ''], ... ], ... }
    R.filter(R.identity), // remove keys with undefined values (no `list` key on previous step)
    R.map(R.map(R.head)), // { namespace: [ 'namespace.method', ... ], ... }
    R.map(R.map(R.split('.'))), // { namespace: [ [ 'namespace', 'method' ], ... ], ... }
    R.map(R.map(R.last)) // { namespace: [ 'method', ... ], ... }
  )(body)

  const code = JSON.stringify(namespaces, null, 2) + '\n'
  fs.writeFile('./src/method-list.json', code, 'utf8', () => console.log('Done!'))
})
