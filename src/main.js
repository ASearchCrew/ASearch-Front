import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode : 'history'
});

//axios
import Axios from 'axios';
var axios = require('axios');
var axiosInstance = axios.create({
  //  baseURL: 'http://192.168.0.7:8080',
 baseURL: 'http://192.168.0.11:8080',
  /* other custom settings */
})
Vue.prototype.$http = axiosInstance

//eventbus
Vue.prototype.$EventBus = new Vue();

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
