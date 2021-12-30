<template>
  <div class="banner_page" v-if="bannershow == 'istrue' && isbackstage">
    <div class="banner_box">
      <img src="https://cdn.hashland.com/images/compositecard.png" class="bannerimg" @click="BesureClick"/>
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="closeimg" @click="closeBannerClick" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bannershow: {
      type: String,
      default: '',
    }
  },
  data(){
    return{
      src:'',
      isbackstage:false,//此变量用来判断后台是否返回banner图,返回则蒙层显示,没有则不显示
    }
  },
  methods: {
    closeBannerClick() {
      this.$emit("closebanner");
    },
    BesureClick(){
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
  z-index: 9999999;
  .banner_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 846px;
    height: 475px;
    border-radius: 32px;
    .bannerimg {
      width: 100%;
      border-radius: 32px;
      cursor: pointer;
    }
    .closeimg{
      position: absolute;
      right: 32px;
      top: 32px;
      width: 44px;
      height: 44px;
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
