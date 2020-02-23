const path = require('path')
const webpack = require('webpack')

const config = require('./default')

module.exports = {
	entry: ['@babel/polyfill'],
	output: {
		path: path.join(__dirname, '..build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							plugins: ['lodash'],
							presets: [['env', { modules: false, targets: { node: 4 } }]],
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				loader: 'awesome-typescript-loader',
				enforce: 'pre',
				options: {
					useCache: false, // Use internal file cache
					useBabel: true, // Invoke Babel to transpile files
					babelCore: '@babel/core'
				}
			},
			{
				test: /\.css$/,
				use: [{loader: 'style-loader'}, {loader: 'css-loader'}],
			},
			{
				test: /\.less$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					{loader: 'less-loader'},
				],
				include: /node_modules/,
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							mimetype: 'image/png',
							name: `${config.projectName}/images/[name].[ext]`,
						},
					},
				],
			},
			{
				test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							mimetype: 'application/octet-stream',
							name: `${config.projectName}/fonts/[name].[ext]`,
						},
					},
				],
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192,
							mimetype: 'image/svg+xml',
							name: `${config.projectName}/images/[name].[ext]`,
						},
					},
				],
			},
		],
	},
}
