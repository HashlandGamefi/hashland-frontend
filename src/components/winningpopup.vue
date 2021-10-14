<template>
  <div class="record_page" v-if="minserdis" @click="closepage">
    <img src="../assets/images/win.png" class="win_img" />
    <div class="boxarr">
      <div class="onebox" v-for="(item,index) in boxarr" :key="index">
        <img :src="item.src" class="img_card" />
        <div class="bottom">
          <span class="span1">HC增长系数 {{item.hc}}</span>
          <span class="span1">BTC增长系数 {{item.btc}}</span>
        </div>
      </div>
    </div>
    <span class="bottom_title">购买的NFT卡牌可前往“NFT挖矿”中质押挖矿</span>
    <div class="connect_box">确认</div>
  </div>
</template>

<script>
export default {
  props: {
    minserdis: {
      type: Boolean,
      default: false
    },
    boxarr: {
      type: [],
      default: []
    }
  },
  methods: {
    // 弹窗关闭
    closepage () {
      this.$emit('closepage')
    }
  }
}
</script>

<style lang='scss' scoped>
.record_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 149px;
  .win_img{
    width: 470px;
    object-fit: contain;
  }
  .boxarr{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 90px;
    padding-right: 40px;
    margin-top: 70px;
    max-height: 980px;
    overflow-y: auto;
    .onebox{
      width: 214px;
      height: 305px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-right: calc((100% - 1075px) / 5);
      margin-bottom: 80px;
      .img_card{
        width: 100%;
        object-fit: contain;
      }
      .bottom{
        width: 100%;
        background: rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        padding:6px;
        .span1{
          font-size: 22px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 37px;
        }
      }
    }
  }
  .bottom_title{
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 32px;
    letter-spacing: 1px;
  }
  .connect_box {
    width: 533px;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background-image: url("../assets/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    margin-top: 30px;
    cursor: pointer;
  }
}
</style>
