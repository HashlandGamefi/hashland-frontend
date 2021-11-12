import Vue from 'vue'
import Vuex from 'vuex'
import common from "../utils/common";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuBG:sessionStorage.getItem("menuBG") || 'no',//导航栏背景是否展示
    CurrenciesInfo:{
      btc:sessionStorage.getItem("btcprice") || 0,
      hc:1.5
    },//各种币的价格
    imgUrl:'//cdn.hashland.com/images/',//图片前缀
    userCardInfo:sessionStorage.getItem('setCardInfo') || [],//用户卡牌信息
    rewardsInfo:{
      proupTitle:'',//标题
      minserDis:false,
      boxarr:[]
    },//中奖信息
    account:sessionStorage.getItem("setAccount") || '',// 账号
    chain:sessionStorage.getItem("setChain") || '',//链
    HashMenuActive: sessionStorage.getItem('HashMenu') || -1, // 导航栏菜单索引
  },
  getters: {
    // 获取导航栏背景状态
    getMenuBG(state){
      return state.menuBG;
    },
    // 获取币的价格
    getCoinPrice(state){
      return state.CurrenciesInfo;
    },
    getrewardsInfo(state){
      return state.rewardsInfo;
    },
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
    // 获取用户卡牌信息
    getUserCardInfo(state) {
      return state.userCardInfo
    },
    // 获取各种币的价格
    getCurrenciesPrice(state) {
      return state.CurrenciesInfo
    },
  },
  mutations: {
    // 设置导航栏背景是否显示
    menuBG(state, isMenu) {
      state.menuBG = isMenu;
    },
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
    // 设置中奖信息
    setrewardsInfo(state,data) {
      state.rewardsInfo = data;
    },
    // 设置用户卡牌信息
    setCardInfo(state,data) {
      state.userCardInfo = data;
    },
    // 各种币的价格
    setCurrenciesPrice(state,data){
      state.CurrenciesInfo = data;
    }
  }
})
