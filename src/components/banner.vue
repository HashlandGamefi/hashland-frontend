<template>
  <div class="banner_page" v-if="bannershow == 'istrue'">
    <div class="banner_box">
      <img :src="`${$store.state.imgUrl}bannerimg.png`" class="bannerimg" @click.stop="ConfirClick"/>
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="closeimg" @click.stop="closebanner"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bannershow: {
      type: String,
      default: ''
    }
  },
  methods: {
    closebanner() {
      this.$emit("closebanner");
    },
    ConfirClick(){
      this.$emit("besureclcik");
    }
  }
};
</script>
<style lang="scss" scoped>
.banner_page {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999999;
  .banner_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 766px;
    height: 437px;
    .bannerimg {
      width: 100%;
      cursor: pointer;
    }
    .closeimg{
      position: absolute;
      right: 32px;
      top: 32px;
      width: 44px;
      height: 44px;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 979px) {
  .banner_page {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    .banner_box {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 3.43rem;
      height: 1.92rem;
      border-radius: 0.32rem;
      .bannerimg {
        width: 100%;
        border-radius: 0.16rem;
        cursor: pointer;
      }
      .closeimg{
        position: absolute;
        right: 0.16rem;
        top: 0.16rem;
        width: 0.22rem;
        height: 0.22rem;
      }
    }
  }
}
</style>
