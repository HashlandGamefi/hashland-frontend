import Vue from 'vue'
import Vuex from 'vuex'
import common from "../utils/common";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account:localStorage.getItem("setAccount") || '',// 账号
    chain:localStorage.getItem("setChain") || '',//链
    HashMenuActive: sessionStorage.getItem('HashMenu') || -1, // 导航栏菜单索引
  },
  getters: {
    // 获取导航栏状态
    getMenuIndex(state) {
      return state.HashMenuActive;
    },
    // 获取完整账号
    getAccount(state) {
      return state.account
    },
    // 截取过后的账号
    getSubtringAccount(state) {
      return common.getSubStr(state.account,4)
    },
    // 获取链接的链
    getChain(state) {
      return state.chain
    },
    // 获取是否已连接且网络状态正确
    getIstrue(state) {
      if(state.chain && state.account && state.account !='no'){
        return true
      }else{
        return false
      }
    },
  },
  mutations: {
    // 设置导航栏状态
    HashMenu(state, isMenu) {
      state.HashMenuActive = isMenu;
    },
    // 接收sdk返回的账号
    setAccount(state, data) {
      state.account = data;
    },
    // 接收sdk返回的链
    setChain(state, data) {
      state.chain = data;
    },
  },
  actions: {
  }
})
