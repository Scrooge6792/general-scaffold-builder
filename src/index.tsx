import 'fastclick'
// import '@babel/polyfill'
import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Root from './root'
import App from './app'

const { projectName } = require('../config/default.json')

const render = (
	RootComponent: React.ComponentType,
	MainComponent: React.ComponentType
) => {
	ReactDOM.render(
		<BrowserRouter basename={projectName}>
			<>
				<RootComponent />
				<MainComponent />
			</>
		</BrowserRouter>,
		document.querySelector('#app')
	)
}

render(hot(Root), hot(App))

if (module.hot) {
	module.hot.accept()
}
