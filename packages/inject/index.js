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
  tag.src = chrome.extension.getURL(script)
  tag.onload = () => tag.parentNode.removeChild(tag)

  return tag
}

const sourceToTag = source => {
  const tag = window.document.createElement('script')
  tag.charset = 'UTF-8'
  tag.textContent = script
  setTimeout(() => tag.parentNode.removeChild(tag))

  return tag
}
