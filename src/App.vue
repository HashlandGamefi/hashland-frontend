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
    }
  },
  created(){
    this.$common.getUserCardInfoFun(this.getAccount) // 获取用户的卡牌信息
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
