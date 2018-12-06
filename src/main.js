import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//axios
import Axios from 'axios';
Vue.prototype.$http = Axios

//eventbus
Vue.prototype.$EventBus = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
