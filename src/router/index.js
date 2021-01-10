import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Brazil from '../views/Brazil.vue';
import Hawaii from '../views/Hawaii.vue';
import Jamaica from '../views/Jamaica.vue';
import Panama from '../views/Panama.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/brazil',
		name: 'brazil',
		component: () => import('../views/Brazil.vue'),
	},
	{
		path: '/jamaica',
		name: 'jamaica',
		component: () => import('../views/Jamaica.vue'),
	},
	{
		path: '/panama',
		name: 'panama',
		component: () => import('../views/Panama.vue'),
	},
	{
		path: '/hawaii',
		name: 'hawaii',
		component: () => import('../views/Hawaii.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
