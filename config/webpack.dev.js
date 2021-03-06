const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const baseConfig = require('./webpack.base')
const config = require('./default')

module.exports = merge(baseConfig, {
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
		path.resolve(__dirname, '../src/index.tsx')
	],
	devtool: '#cheap-module-source-map',
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			title: config.title,
			template: path.resolve(__dirname, '../src/index.html'),
		}),
		new StyleLintPlugin({ files: '**/*.less' }),
		new ErrorOverlayPlugin(),
		new CheckerPlugin(),
		new LodashModuleReplacementPlugin,
		new webpack.HotModuleReplacementPlugin(),
		new OpenBrowserPlugin({ url: `http://${config.localhost}:${config.HMR_PORT}/${config.projectName}` }),
	]
})
