import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/reset.scss";
import "./style/style.scss";

import i18n from "./i18n/index";

import "swiper/dist/css/swiper.min.css";
import "swiper/dist/js/swiper.min";

import api from "./api/api";
Vue.prototype.$api = api;

import * as axios from "axios";
Vue.prototype.$axios = axios;

import common from "./utils/common";
Vue.prototype.$common = common;

import Input from "@/components/inputcomponents.vue";
Vue.component("Input", Input);

import Btn from "@/components/btn.vue";
Vue.component("Btn", Btn);

import Proup from "@/components/proup.vue";
Vue.component("Proup", Proup);

import NewLoading from "@/components/newloading.vue";
Vue.component("NewLoading", NewLoading);

import NoData from "@/components/nodata.vue";
Vue.component("NoData", NoData);

import BtnLoading from "./components/btnloading.vue";
Vue.component("BtnLoading", BtnLoading);
// @ts-ignore
import countTo from "vue-count-to";
Vue.component("countTo", countTo);

import Lottie from '@/components/lottie.vue'
Vue.component("Lottie", Lottie);

Vue.config.productionTip = false;
console.log = function() {}
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
