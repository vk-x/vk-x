# Generates src/method-list.coffee

fs = require "fs"
request = require "request"

getMethodsFromPage = ( url ) ->
  new Promise ( resolve, reject ) ->
    request url, ( err, res, body ) ->

      spans = body.match /<span class="dev_methods_list_span">.*\..*<\/span>/g
      list = for span in spans
        ( span.match /<span class="dev_methods_list_span">(.*)<\/span>/ )[ 1 ]

      resolve list

pages = [
  "https://vk.com/dev/methods"
  "https://vk.com/dev/ads"
]

promises = for page in pages
  getMethodsFromPage page


Promise.all promises
.then ( lists ) ->

  methods = []

  for list in lists
    methods = methods.concat list


  code = [ "methodList =" ]
  namespaces = []

  for method in methods

    [ namespace, name ] = method.split "."

    if ( -1 is namespaces.indexOf namespace ) and ( name? )
      if namespaces.length
        code.push "  ]"
      code.push ""
      code.push "  #{namespace}: ["
      namespaces.push namespace

    code.push "    \"#{name}\""

  code.push "  ]"
  code.push ""
  code.push ""
  code.push "module.exports = methodList"
  code.push ""

  code = code.join "\n"

  fs.writeFile "./src/method-list.coffee", code, "utf8", ->
    console.log "Done! #{methods.length} methods written to `src/method-list.coffee`."
