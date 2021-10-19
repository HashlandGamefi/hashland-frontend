<template>
  <div id="app">
    <Nav></Nav>
    <transition name="fade">
      <router-view v-if="isRouterAlive" />
    </transition>
    <Footer></Footer>
    <WinningPopup :minserdis="getrewardsInfo.minserDis" :boxarr="getrewardsInfo.boxarr" @closepage="closepageFun"></WinningPopup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Nav from './components/nav.vue'
import Footer from './components/footer.vue'
import WinningPopup from './components/winningpopup.vue'
import { hn } from 'hashland-sdk';
export default {
  components: {
    Nav,
    Footer,
    WinningPopup
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
    },
    // 获取用户的卡牌信息
    getUserCardInfo(){
      hn().tokensOfOwnerBySize(this.getAccount,0,100000000).then( async res => {//0代表第一次拿数据  100000000代表用户所拥有的全部卡的id
        // console.log('用户卡牌arr: ', res[0]);
        let arr = []
        for(let i = 0;i < res[0].length;i++){
          let obj = {}
          obj.level = (await hn().level(res[0][i])).toString() // 等级
          obj.hc = (await hn().hashrates(res[0][i], 0)).toString() // hc 算力
          obj.btc = (await hn().hashrates(res[0][i], 1)).toString()// btc 算力
          arr.push(obj)
        }
        this.$store.commit("setCardInfo",JSON.stringify(arr))
        localStorage.setItem("setCardInfo",JSON.stringify(arr))
      })
    }
  },
  created(){
    this.getUserCardInfo()
  },
  mounted () {
    window.addEventListener('load', this.setRem)
    window.addEventListener('resize', this.setRem)
  },
  destroyed () {
    localStorage.clear()
  }
}
</script>
<style lang="scss">
#app {
  width: 100%;
  min-height: 100%;
  background: #011A31;
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
