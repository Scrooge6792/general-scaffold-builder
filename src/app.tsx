import * as React from 'react'
import styles from './style/reset.less'

console.log('123')

class App extends React.PureComponent {
	render() {
		return <div className={styles.header}>Hello world!</div>
	}
}

export default App
