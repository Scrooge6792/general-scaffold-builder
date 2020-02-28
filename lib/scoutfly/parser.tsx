import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from '@pages/loading'

type ConfigProps = {
	path: string;
	component: string;
	routes?: ConfigProps[];
}

function PipeComponent(props) {
	return props.children
}

function renderRoute(props: ConfigProps) {
	return (
		<Route exact path={props.path}>
			{Loadable({
				loader: () => import(props.component),
				loading: Loading,
			})}
			{props.routes && <Switch>{props.routes.map(renderRoute)}</Switch>}
		</Route>
	)
}

function Router(props: {
	config: ConfigProps[];
	globalLayout?: React.ComponentType;
}) {
	const GlobalLayout = props.globalLayout || PipeComponent
	return (
		<GlobalLayout>
			<BrowserRouter>
				<Switch>
					{props.config.map(renderRoute)}
				</Switch>
			</BrowserRouter>
		</GlobalLayout>
	)
}

export default Router
