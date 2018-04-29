/**
 * @param {string} html HTML representing a single element.
 * @return {Element}
 */
export const htmlToElement = html => {
  const template = document.createElement('template')
  template.innerHTML = html.trim() // Never return a text node with whitespace
  return template.content.firstChild
}
