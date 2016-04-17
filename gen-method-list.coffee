# Generates src/method-list.coffee
# Run on https://vk.com/dev/methods

code = [ "methodList =" ]

namespaces = []

for span in document.querySelectorAll ".dev_methods_list_span"

  [ namespace, name ] = span.innerText.split "."

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

console.log code = code.join "\n"
