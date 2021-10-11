<template>
  <div id="app">
    <Nav></Nav>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer></Footer>
  </div>
</template>
<script>
import Nav from './components/nav.vue'
import Footer from './components/footer.vue'
export default {
  components: {
    Nav,
    Footer
  },

  methods: {
    setRem () {
      console.log('当前窗口宽度:', document.body.clientWidth)// 当前窗口的宽度
    }
  },
  mounted () {
    window.addEventListener('load', this.setRem)
    window.addEventListener('resize', this.setRem)
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
