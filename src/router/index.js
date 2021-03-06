import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';
// import Brazil from '../views/Brazil.vue';
// import Hawaii from '../views/Hawaii.vue';
// import Jamaica from '../views/Jamaica.vue';
// import Panama from '../views/Panama.vue';

Vue.use(VueRouter);
const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
		props: true,
	},
	// {
	// 	path: '/brazil',
	// 	name: 'brazil',
	// 	component: () => import(/* webpackChunkName: "brazil" */ '../views/Brazil.vue'),
	// },
	// {
	// 	path: '/jamaica',
	// 	name: 'jamaica',
	// 	component: () => import(/* webpackChunkName: "jamaica" */ '../views/Jamaica.vue'),
	// },
	// {
	// 	path: '/panama',
	// 	name: 'panama',
	// 	component: () => import(/* webpackChunkName: "panama" */ '../views/Panama.vue'),
	// },
	// {
	// 	path: '/hawaii',
	// 	name: 'hawaii',
	// 	component: () => import(/* webpackChunkName: "hawaii" */ '../views/Hawaii.vue'),
	// },
	{
		path: '/destinations/:slug',
		name: 'DestinationDetails',
		props: true,
		component: () =>
			import(/* webpackChunkName: "DestinationDetails" */ '../views/DestinationDetails.vue'),
		children: [
			{
				path: ':experienceSlug',
				name: 'experienceDetails',
				props: true,
				component: () =>
					import(/* webpackChunkName: "ExperienceDetails" */ '../views/ExperienceDetails.vue'),
			},
		],
		beforeEnter: (to, from, next) => {
			const exists = store.destinations.find((destination) => destination.slug === to.params.slug);
			if (exists) {
				next();
			} else {
				next({ name: 'notFound' });
			}
		},
	},
	{
		path: '/user',
		name: 'user',
		component: () =>
			import(
				/* webpackChunkName: "User" */
				'../views/User.vue'
			),
		meta: { requiresAuth: true },
	},
	{
		path: '/login',
		name: 'login',
		component: () =>
			import(
				/* webpackChunkName: "Login" */
				'../views/Login.vue'
			),
	},
	{
		path: '/invoices',
		name: 'invoices',
		component: () =>
			import(
				/* webpackChunkName: "Invoices" */
				'../views/Invoices.vue'
			),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/404',
		alias: '*',
		name: 'notFound',
		component: () =>
			import(
				/* webpackChunkName: "NotFound" */
				'../views/NotFound'
			),
	},
];

const router = new VueRouter({
	mode: 'history',
	linkExactActiveClass: 'vue-school-active-class',
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			const position = {};
			// se nao tiver um caminho para ir, retorna para a posi????o do sletor
			if (to.hash) {
				position.selector = to.hash;
				// modifica a posi????o para dar um folga do top da pagina
				if (to.hash === 'experience') {
					position.offset = { y: 140 };
				}
				if (document.querySelector(to.hash)) {
					return position;
				}

				return false;
			}
		}
	},
	routes,
});

router.beforeEach((to, from, next) => {
	// to and from are both route objects. must call `next`.
	// if (to.meta.requiresAuth) {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// need to login
		if (!store.user) {
			next({
				name: 'login',
				// aqui encomiunha para invoices
				query: { redirect: to.fullPath },
			});
		} else {
			next();
		}
	} else {
		next();
	}
});
export default router;
