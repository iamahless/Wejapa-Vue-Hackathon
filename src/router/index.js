import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Jobs from '../views/Jobs.vue';
import SingleJob from '../views/SingleJob.vue';
import PageNotFound from '../views/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/jobs/:id',
    name: 'SingleJob',
    component: SingleJob,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/page-not-found',
    name: 'PageNotFound',
    component: PageNotFound,
  },
  {
    path: '*',
    redirect: '/page-not-found',
  }
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;