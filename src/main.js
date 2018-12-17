import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import VModal from 'vue-js-modal'
import dotenv from 'dotenv';

dotenv.config();

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes,
  mode : 'history'
});

//axios
import Axios from 'axios';
Vue.prototype.$http = Axios

//eventbus
Vue.prototype.$EventBus = new Vue();

//modal
Vue.use(VModal, { dynamic: true });


new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
