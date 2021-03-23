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
	routes,
});

export default router;
