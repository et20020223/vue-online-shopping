import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css';

import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store'
import currencyFilter from  './filters/currency'
import dateFilter from  './filters/date' 


Vue.config.productionTip = false;
Vue.use(VueAxios,axios);
//允許跨源
axios.defaults.withCredentials =true;

Vue.component('Loading',Loading);
Vue.filter('currency',currencyFilter);
Vue.filter('date',dateFilter);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


router.beforeEach((to, from, next) => {
  console.log('beforeEach');
  if (to.meta.requiresAuth) {
    console.log('請驗證');
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    const vm = this;
    axios.post(api).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        next();
      } else {
        alert(response.data.message);
        next({ path: '/admin/products' })
      }
    });
  } else {
    next();
  }
})