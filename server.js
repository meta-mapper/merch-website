const express = require('express');
const { createProxyMiddleware, responseInterceptor } = require('http-proxy-middleware');

const app = express();

const cache = {};

const proxy = createProxyMiddleware({
	target: 'https://madeformerch.framer.website',
	changeOrigin: true,
	selfHandleResponse: true,
	on: {
		proxyRes: responseInterceptor(async (responseBuffer) => {
			//
			let response = responseBuffer.toString('utf8');

			response = response.replace(
				'<div id="__framer-badge-container">',
				'<div id="__framer-badge-container" style="display: none;">'
			);

			response = response.replace(
				'<link href="https://framerusercontent.com/sites/icons/default-favicon-light.v1.png" rel="icon" media="(prefers-color-scheme: light)">',
				'<link href="https://dashboard.madeformerch.com/images/favicon.png" rel="icon" media="(prefers-color-scheme: light)">'
			);

			response = response.replace(
				'<link href="https://framerusercontent.com/sites/icons/default-favicon-dark.v1.png" rel="icon" media="(prefers-color-scheme: dark)">',
				'<link href="https://dashboard.madeformerch.com/images/favicon.png" rel="icon" media="(prefers-color-scheme: dark)">'
			);

			response = response.replace(
				'<link rel="apple-touch-icon" href="https://framerusercontent.com/sites/icons/default-touch-icon.v3.png">',
				'<link rel="apple-touch-icon" href="https://dashboard.madeformerch.com/images/favicon.png">'
			);

			return response;
		}),
	},
});

app.use('/', proxy);

app.listen(8080, () => {
	console.log('Proxy running for http://madeformerch.framer.website at http://localhost:8080');
});
