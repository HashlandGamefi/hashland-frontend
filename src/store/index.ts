import Vue from 'vue'
import Vuex from 'vuex'
import common from "../utils/common";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account:localStorage.getItem("setSDK") || '',//完整账号
    HashMenuActive: sessionStorage.getItem('HashMenu') || -1, // 导航栏菜单索引
  },
  getters: {
    // 获取导航栏状态
    getMenuIndex(state) {
      return state.HashMenuActive;
    },
    getAccount(state) {
      return state.account
    },
    getSubtringAccount(state) {
      return common.getSubStr(state.account,4)
    },
  },
  mutations: {
    // 设置导航栏状态
    HashMenu(state, isMenu) {
      state.HashMenuActive = isMenu;
    },
    // 接收sdk返回的账号以及链信息
    setSDK(state, data) {
      state.account = data;
    }
  },
  actions: {
  }
})
