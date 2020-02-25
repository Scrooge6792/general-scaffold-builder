module.exports = {
	parser: require('postcss-less'),
	plugins: [require('autoprefixer'), require('stylelint')],
}
