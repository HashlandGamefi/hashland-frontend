import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/reset.scss'
import './style/style.scss'

import common from "./utils/common";
Vue.prototype.$common = common;

import i18n from './i18n/index'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
