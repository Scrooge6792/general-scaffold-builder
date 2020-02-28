export default [
	{ path: '/404', component: './404.tsx' },
	{
		path: '/home',
		component: './home/_layout.tsx',
		routes: [
			{ path: '/home/:id', component: './home/:id.tsx' },
			{
				path: '/home/integral',
				component: './home/integral.tsx',
			},
		],
	},
]
