import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
// import Brazil from '../views/Brazil.vue';
// import Hawaii from '../views/Hawaii.vue';
// import Jamaica from '../views/Jamaica.vue';
// import Panama from '../views/Panama.vue';

Vue.use(VueRouter);
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
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
		path: '/details/:slug',
		name: 'DestinationDetails',
		component: () =>
			import(/* webpackChunkName: "DestinationDetails" */ '../views/DestinationDetails.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	linkExactActiveClass: 'vue-school-active-class',
	routes,
});

export default router;
