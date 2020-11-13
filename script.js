(async () => {
	const defaultTextPreSelector = "body>pre[style='word-wrap: break-word; white-space: pre-wrap;']",
		markdownContentType = 'text/markdown',
		markdownAPILocation = 'api-render-markdown/index.js'

	let response

	if (document.querySelector(defaultTextPreSelector) !== undefined
	&& (response = await fetch(location.href)).headers.get('Content-Type') === markdownContentType) {
		const markdownAPI = await import(markdownAPILocation)
		const rendered = (markdownAPI.default.render(await response.text()))

		document.write(`
			<!DOCTYPE html>
			<meta charset="utf-8"/>
			<meta http-equiv="Content-Type" content="text/html charset=utf-8"/>
			<link rel="stylesheet" href="agregore://theme/style.css"/>
			<link rel="stylesheet" href="agregore://theme/highlight.css"/>
			${rendered}
			<script>
				document.title = document.querySelector('h1,h2,h3')?.innerText || location.href
			</script>
		`)
	}
})()
