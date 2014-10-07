module.exports = {
	entry: './index.js',
	output: {
		filename: 'index.js',
		path: './build'
	},
	module: {
		loaders: [
			{ test: /\.jpg$/, loader: "url" },
			{ test: /\.less$/, loaders: ['style', 'css', 'less'] } // use ! to chain loaders
		]
	}
};