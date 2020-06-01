import Vue from 'vue';
import App from './App.vue';
import router from './router';
import toastr from 'vue-toastr';
import axios from 'axios';
import store from './store'

axios.defaults.baseURL = 'https://wejapabackend.herokuapp.com/api';

Vue.config.productionTip = false;
Vue.use(toastr);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'Login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'Jobs',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');