const path = require('path')
const config = require('./default')

module.exports = {
	entry: ['@babel/polyfill', 'react-hot-loader/patch'],
	output: {
		path: path.join(__dirname, '../build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
		alias: Object.entries(require('../tsconfig').compilerOptions.paths)
			.reduce((result, [alias, [dir]]) => ({
				...result,
				[alias.replace(/\/\*$/, '')]: path.resolve(__dirname, `../src/${dir.replace(/\*$/, '')}`),
			}), {}),
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
							presets: [['env', {modules: false, targets: {node: 4}}]],
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
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader'},
					// {loader: 'postcss-loader'}
				],
			},
			{
				test: /\.less$/,
				use: [
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							modules: {localIdentName: '[local]___[hash:base64:5]'},
							sourceMap: process.env.NODE_ENV === 'development'
						}
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: process.env.NODE_ENV === 'development'
						}
					},
					{loader: 'postcss-loader'},
					{loader: 'less-loader'},
				],
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
