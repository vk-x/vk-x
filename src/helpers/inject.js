/* eslint-env webextensions */

/**
 * Injects a JS script into the page context.
 *
 * File names are resolved using `chrome.extension.getURL()`.
 * ```
 * inject("path/to/file.js")
 * ```
 *
 * Functions are automatically stringified and wrapped into an IIFE.
 * ```
 * inject(function() { console.log("I'm injected!") })
 * ```
 *
 * Pass `true` as the second argument to inject the string itself as code.
 * ```
 * inject("console.log('Inline code')", true)
 * ```
 *
 * @param {Function|string} script Script source or link to inject
 * @param {boolean} isSource Set to `true` if `script` is source code and not a link.
 */
export const inject = (script, isSource) => {
  const target = window.document.head || window.document.documentElement

  if (typeof script === 'function') {
    target.appendChild(sourceToTag(`(${script.toString()})()`))
  } else if (isSource) {
    target.appendChild(sourceToTag(script))
  } else {
    target.appendChild(linkToTag(script))
  }
}

const linkToTag = link => {
  const tag = window.document.createElement('script')
  tag.charset = 'UTF-8'
  tag.src = chrome.extension.getURL(link)
  tag.onload = () => tag.parentNode.removeChild(tag)

  return tag
}

const sourceToTag = source => {
  const tag = window.document.createElement('script')
  tag.charset = 'UTF-8'
  tag.textContent = source
  setTimeout(() => tag.parentNode.removeChild(tag))

  return tag
}
