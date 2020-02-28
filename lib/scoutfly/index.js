const fs = require('fs')
const path = require('path')

const base = process.cwd()
const config = require(path.resolve(base, '.scoutflyrc.js'))
const defaultOrigin = path.resolve(base, config.entryPath)

class Functor {
	static create(value) {
		return new Functor(value)
	}

	constructor(value) {
		this.value = value.split(path.sep)
	}

	get() {
		return this.value.join('/')
	}

	map(fun) {
		this.value = this.value.map(fun)
		return this
	}
}

function shouldExclude(name) {
	return [].concat(config.exclude || []).some(function (reg) {
		return reg.test(name)
	})
}

function dynamic(pathname) {
	return pathname
		.replace(/(^\$[^.]+)(\$)(\..+)?/, '$1?$3')
		.replace(/^\$/, ':')
}

function resolvePath(absolutePath, isLayout) {
	const functor = Functor.create(path.relative(defaultOrigin, absolutePath))
	const result = {
		path: '/' + functor
			.map(dynamic)
			.get()
			.replace(config.test, ''),
		component: './' + functor.get()
	}
	if (isLayout) {
		result.path = result.path
			.replace(`/${config.layoutName.replace(config.test, '')}`, '')
		result.routes = []
		return result
	}
	return result
}

function obtain(origin = defaultOrigin, src = []) {
	const dirFiles = fs.readdirSync(origin)
	const layout = dirFiles.includes(config.layoutName)
	let target
	if (layout) {
		const route = resolvePath(path.resolve(origin, config.layoutName), true)
		src.push(route)
		target = route.routes
	} else {
		target = src
	}
	for (let file of dirFiles) {
		const pathname = path.resolve(origin, file)
		if (shouldExclude(pathname)) {
			continue
		}
		if (fs.statSync(pathname).isDirectory()) {
			obtain(pathname, target)
		} else if (config.test.test(file) && file !== config.layoutName) {
			target.push(resolvePath(pathname))
		}
	}
	return src
}

function update(data) {
	const filepath = path.join(base, config.outputPath, 'routes.config.js')
	const str = data.reduce(
		function (result, current) {
			return result + JSON.stringify(current) + ',\n'
		},
		'export default [\n'
	) + ']'
	fs.writeFileSync(
		filepath,
		str.replace(/"([^"]+)":/g, '$1:'),
		'utf8'
	)
}

const paths = obtain()
update(paths)
