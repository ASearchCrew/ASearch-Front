import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import VModal from 'vue-js-modal'
import dotenv from 'dotenv';

dotenv.config();

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
 baseURL: 'http://52.79.220.131:8080',
})
Vue.prototype.$http = axiosInstance

//eventbus
Vue.prototype.$EventBus = new Vue();

//modal
Vue.use(VModal, { dynamic: true });


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
