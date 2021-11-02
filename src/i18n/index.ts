import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import common from '../utils/common'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale:'cn',//此处原先根据浏览器语言自动判断
  messages: {
    cn: require('./cn'),
    en: require('./en')
  }
})
export default i18n
