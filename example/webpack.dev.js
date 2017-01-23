module.exports = {
	devtool: 'cheap-module-source-map',
	entry: [
		'babel-polyfill',
		`${__dirname}/index.js`
	],
	output: {
		path: '/',
		filename: 'app.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ['babel'],
				exclude: /node_modules/
			}
		]
	}
}