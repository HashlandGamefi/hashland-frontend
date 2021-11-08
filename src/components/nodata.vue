<template>
  <div class="nodata_page">
    <div class="defaultClass">
      <img :src="`${$store.state.imgUrl}defaultGraph.png`" />
      <span class="txt fontsize16">{{ $t("message.nothing") }}</span>
      <div class="connect_box fontsize18" @click.stop="nothingfun">{{$t("message.button2")}}</div>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    nothingfun () {
      this.$router.push('/buy')
      // this.$emit('nothingfun')
    },
  }
}
</script>
<style lang="scss" scoped>
.nodata_page{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .defaultClass {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    img {
      width: 193px;
      object-fit: contain;
      margin-top: 60px;
      margin-bottom: 15px;
    }
    .txt {
      color: #ffffff;
    }
    .connect_box {
      width: 274px;
      height: 59px;
      line-height: 49px;
      text-align: center;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: #ffffff;
      margin-top: 70px;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 980px){
  .nodata_page{
    .defaultClass {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 1rem;
      img {
        width: 1.42rem;
        object-fit: contain;
        margin-top: 0.3rem;
        margin-bottom: 0.1rem;
      }
      .txt {
        color: #ffffff;
      }
      .connect_box {
        width: 1.94rem;
        height: 0.38rem;
        text-align: center;
        line-height: 0.38rem;
        background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #ffffff;
        margin-top: 0.53rem;
        cursor: pointer;
      }
    }
  }
}
</style>
