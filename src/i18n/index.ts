import Vue from 'vue'
import VueI18n from 'vue-i18n'
import common from '../utils/common'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale:common.isLang(),
  messages: {
    cn: require('./cn'),
    en: require('./en')
  }
})
export default i18n
