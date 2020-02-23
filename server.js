const path = require('path')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackDev = require('./config/webpack.dev')
const { createProxyMiddleware } = require('http-proxy-middleware')

const config = require('./config/default')
const PORT = process.env.PORT || config.HMR_PORT
const host =
	process.env.NODE_ENV === 'production' ? config.prod.host : config.dev.host

const app = express()
const compiler = require('webpack')(webpackDev)

const BUILD_PATH = path.resolve(__dirname, '../build')

app.engine('.html', require('ejs').__express)

app.set('views', BUILD_PATH)
app.set('view engine', 'html')

// 支持单页面的路由
app.use('/', require('connect-history-api-fallback')())

app.use(webpackDevMiddleware(compiler, {
	publicPath: webpackDev.output.publicPath,
}))

app.use(require('webpack-hot-middleware')(compiler))

app.use(express.static(BUILD_PATH))

app.get('/', (req, res) => {
	res.render(BUILD_PATH)
})

// app.use(`/${config.projectName}`, createProxyMiddleware({
// 	target: host,
// 	changeOrigin: true,
// }))

app.listen(PORT, () => {
	console.log(`Express app listening on port ${PORT}! \n`)
	console.log(`server run in ${process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'}`)
})
