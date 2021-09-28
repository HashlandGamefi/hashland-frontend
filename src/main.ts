import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/reset.scss'
import './style/style.scss'

import common from "./utils/common";
Vue.prototype.$common = common;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
