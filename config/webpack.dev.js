const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base')
const config = require('./default')

module.exports = merge(baseConfig, {
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
		// 'react-hot-loader/patch',
		path.resolve(__dirname, '../index.tsx')
	],
	devtool: '#cheap-module-source-map',
	mode: 'development',
	plugins: [
		new HtmlWebpackPlugin({
			title: config.title,
			template: path.resolve(__dirname, '../index.html'),
		}),
		new ErrorOverlayPlugin(),
		new CheckerPlugin(),
		new LodashModuleReplacementPlugin,
		new webpack.HotModuleReplacementPlugin()
	]
})
