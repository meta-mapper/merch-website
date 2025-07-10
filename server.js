const express = require('express');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const app = express();

const proxy = createProxyMiddleware({
	target: 'https://madeformerch.framer.website',
	changeOrigin: true,
	selfHandleResponse: true,
	on: {
		proxyRes: responseInterceptor(async (responseBuffer) => {
			//
			const response = responseBuffer.toString('utf8');

			return response.replace(
				'<div id="__framer-badge-container"></div>',
				'<div id="__framer-badge-container" style="display: none;"></div>'
			);
		}),
	},
});

app.use('/', proxy);

app.listen(8080, () => {
	console.log('Proxy running for http://madeformerch.framer.website at http://localhost:8080');
});
