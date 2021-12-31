/* global location */
if (document.contentType === 'text/markdown') {
  const marked = require('marked')

  // Might only work on Chromium
  const text = document.querySelector('pre').innerText

  const tokens = marked.lexer(text)
  const rendered = marked.parser(tokens)

  const firstHeading = tokens.find((token) => token.type === 'heading')
  const title = firstHeading?.text || location.href

  document.write(`
<!DOCTYPE html>
<title>${title}</title>
<meta charset="utf-8"/>
<meta http-equiv="Content-Type" content="text/html charset=utf-8"/>
<link rel="stylesheet" href="agregore://theme/style.css"/>
<link rel="stylesheet" href="agregore://theme/highlight.css"/>
${rendered}
<script src="agregore://theme/highlight.js"></script>
<script>
  if(window.hljs) hljs.initHighlightingOnLoad()

  const toAnchor = document.querySelectorAll('h1[id],h2[id],h3[id],h4[id]')
  console.log('Anchoring', toAnchor)

  for(let element of toAnchor) {
    const anchor = document.createElement('a')
    anchor.setAttribute('href', '#' + element.id)
    anchor.setAttribute('class', 'agregore-header-anchor')
    anchor.innerHTML = element.innerHTML
    element.innerHTML = anchor.outerHTML
  }
</script>`)
}
