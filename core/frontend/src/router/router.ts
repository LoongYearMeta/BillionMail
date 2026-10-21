import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { is } from '@/utils'

// Routes reflect list
const routesReflectList = [
	'Overview',
	'MailDomain',
	'MailBoxes',
	'SMTP',
	'Logs',
	'Settings',
]

// Import routes from modules
const modules = import.meta.webpackContext('./modules', {
	// Whether to search for subdirectories
	recursive: false,
	// Keys look like "./overview.ts"; skip "./overview.test.ts"
	regExp: /^\.\/[^.]+\.ts$/,
})

// Module routes
export let menuList: RouteRecordRaw[] = []

// Iterate through the module list to generate module routes
for (const path of modules.keys()) {
	const mod = modules(path)
	if (is<{ default: RouteRecordRaw }>(mod, 'Module')) {
		menuList.push(mod.default)
	}
}

// Sort module routes, modules missing from the list go last
const routeRank = (route: RouteRecordRaw) => {
	const index = routesReflectList.indexOf(route.meta?.title as string)
	return index === -1 ? routesReflectList.length : index
}
menuList.sort((a, b) => routeRank(a) - routeRank(b))

export const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
	},
	{
		path: '/',
		redirect: '/overview',
	},
	...menuList,
]

const router = createRouter({
	history: createWebHistory('/'),
	routes,
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 }),
})

export default router
