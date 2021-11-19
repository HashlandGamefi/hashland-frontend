<template>
  <div id="app">
    <Nav></Nav>
    <transition name="fade">
      <router-view v-if="isRouterAlive" />
    </transition>
    <Footer v-if="isshowFooter"></Footer>
    <WinningPopup :proupTitle="getrewardsInfo.proupTitle" :minserdis="getrewardsInfo.minserDis" :boxarr="getrewardsInfo.boxarr" @winbtnsure="winbtnsure" @closepage="closepageFun"></WinningPopup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Nav from './components/nav.vue'
import Footer from './components/footer.vue'
import WinningPopup from './components/winningpopup.vue'
export default {
  components: {
    Nav,
    Footer,
    WinningPopup
  },
  watch:{
    $route(to,from){
      if(to.path == '/synthesis'){
        this.isshowFooter = false
      }else{
        this.isshowFooter = true
      }
    }
  },
  computed: {
    ...mapGetters(["getrewardsInfo","getAccount"])
  },
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,//控制视图是否显示的变量
      isshowFooter:true,// 合成页面底部不显示变量
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
      const bodyWidth = document.body.clientWidth
      const rem375 = bodyWidth * 100 / 375
      if (bodyWidth <= 980) {
        document.getElementsByTagName('html')[0].style.fontSize = rem375 + 'px'
      }
    },
    winbtnsure(){
      this.closepageFun()
      this.$router.push('/nftmining')
    },
    closepageFun(){
      let obj = {
        minserDis:false,
        boxarr:[]
      }
      this.$common.newgetUserCardInfoFun(this.getAccount).then(res1 => {
        if(res1 > 1){
          sessionStorage.setItem("count",res1)
        }else{
          sessionStorage.setItem("count",1)
        }
      })
      // this.$common.getUserCardInfoFun(this.getAccount)
      this.$store.commit("setrewardsInfo", obj);
    },
    // 获取各种币的价格
    getCurrenciesPrices(){
      // 比特币价格
      this.$api.getCurrencyFun('0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c').then(res => {
        this.$api.getCurrencyFun('0xA6e78aD3c9B4a79A01366D01ec4016EB3075d7A0').then(res1 => {
          this.$store.commit("setCurrenciesPrice",{'btc':this.$common.getBit(res.price),'hc':this.$common.getBit(res1.price)})
          sessionStorage.setItem('btcprice',this.$common.getBit(res.price))
          sessionStorage.setItem('hcprice',this.$common.getBit(res1.price))
        })
      }).catch(err => {
        console.log('获取各种币的价格err:',err)
      })
      // hc价格
      // this.$api.getCurrencyFun('0xA6e78aD3c9B4a79A01366D01ec4016EB3075d7A0').then(res => {
      //   this.$store.commit("setCurrenciesPrice",{'hc':this.$common.getBit(res.price)})
      //   sessionStorage.setItem('hcprice',this.$common.getBit(res.price))
      // }).catch(err => {
      //   console.log('获取各种币的价格err:',err)
      // })
    }
  },
  created(){
    this.getCurrenciesPrices()
  },
  mounted () {
    window.addEventListener('load', this.setRem)
    window.addEventListener('resize', this.setRem)
  }
}
</script>
<style lang="scss">
@media screen and (min-width: 981px) {
  #app {
    width: 100%;
    min-height: 100%;
    // background: #011A31;
    // background-image: url("//cdn.hashland.com/images/pagehome.png");
    // background-size: 100% 100%;
    // background-repeat: no-repeat;
    background: linear-gradient(180deg, #011020 0%, #022954 37%, #012958 56%, #00162E 100%);
  }
}
@media screen and (max-width: 980px) {
  #app {
    width: 100%;
    min-height: 100%;
    background: linear-gradient(180deg, #011020 0%, #022954 37%, #012958 56%, #00162E 100%);
  }
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
