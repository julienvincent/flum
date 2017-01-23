var express = require('express'),
	server = express(),
	path = require('path'),
	webpack = require('webpack'),
	config = require('./webpack.dev.js'),
	port = 8080

server.use(require('webpack-dev-middleware')(webpack(config), {
	noInfo: true,
	publicPath: config.output.publicPath
}))

server.use('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(port, function() {
	console.log(`Server listening at http://localhost:${port}/`)
})
