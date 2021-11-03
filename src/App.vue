<template>
  <div id="app">
    <Nav></Nav>
    <transition name="fade">
      <router-view v-if="isRouterAlive" />
    </transition>
    <Footer></Footer>
    <WinningPopup :proupTitle="getrewardsInfo.proupTitle" :minserdis="getrewardsInfo.minserDis" :boxarr="getrewardsInfo.boxarr" @closepage="closepageFun"></WinningPopup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Nav from './components/nav.vue'
import Footer from './components/footer.vue'
import WinningPopup from './components/winningpopup.vue'
import { token } from 'hashland-sdk';
export default {
  components: {
    Nav,
    Footer,
    WinningPopup
  },
  computed: {
    ...mapGetters(["getrewardsInfo"])
  },
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true//控制视图是否显示的变量
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true//再打开
      })
    },
    setRem () {
      console.log('当前窗口宽度:', document.body.clientWidth)// 当前窗口的宽度
    },
    closepageFun(){
      let obj = {
        minserDis:false,
        boxarr:[]
      }
      this.$store.commit("setrewardsInfo", obj);
      this.$router.push('/nftmining')
    },
    // 获取各种币的价格
    getCurrenciesPrices(){
      console.log("获取各种币价格方法",token().BTC)
      // const datas = [token().BTC, token().HC]

      // const datas = ['0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c','0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56']
      // Promise.all(this.$api.getCurrencyFun(datas)).then(function (values) {
      //   console.log(values,'values')
      // })

      this.$api.getCurrencyFun('0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c').then(res => {
        console.log('this.$common.getBit(res.price): ', this.$common.getBit(res.price));
        this.$store.commit("setCurrenciesPrice",{'btc':this.$common.getBit(res.price)})
      }).catch(err => {
        console.log('获取各种币的价格err:',err)
      })
    }
  },
  created(){
    this.getCurrenciesPrices()
  },
  mounted () {
    localStorage.setItem("testitem",'测试缓存')
    window.addEventListener('load', this.setRem)
    window.addEventListener('resize', this.setRem)
    window.addEventListener('beforeunload', (event) => {
      console.log('event: ', event);
    });
  },
  beforeUnmount(){
    localStorage.clear()
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  min-height: 100%;
  // background: #011A31;
  background-image: url("//cdn.hashland.com/images/pagehome.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
