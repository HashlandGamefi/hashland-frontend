import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    HashMenuActive: sessionStorage.getItem('HashMenu') || -1, // 导航栏菜单索引
  },
  getters: {
    // 获取导航栏状态
    getMenuIndex(state) {
      return state.HashMenuActive;
    }
  },
  mutations: {
    //  导航栏状态
    HashMenu(state, isMenu) {
      state.HashMenuActive = isMenu;
    }
  },
  actions: {
  }
})
