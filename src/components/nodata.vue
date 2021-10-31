<template>
  <div class="nodata_page">
    <div class="defaultClass">
      <img :src="`${$store.state.imgUrl}defaultGraph.png`" />
      <span class="txt">{{ $t("message.nothing") }}</span>
      <div class="connect_box" @click.stop="nothingfun">{{$t("message.button2")}}</div>
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
      width: 406px;
      object-fit: contain;
    }
    .txt {
      font-size: 36px;
      color: #ffffff;
      line-height: 50px;
    }
    .connect_box {
      width: 393px;
      height: 82px;

      text-align: center;
      line-height: 70px;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: contain;
      background-repeat: no-repeat;
      font-size: 40px;
      color: #ffffff;
      margin-top: 30px;
      cursor: pointer;
    }
  }
}
</style>
