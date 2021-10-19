<template>
  <div class="record_page" v-if="minserdis">
    <div class="title">购买记录</div>
    <img src="../assets/images/closebg.png" class="close_img" @click="closepage"/>
    <div class="boxarr">
      <div class="onebox" v-for="(item,index) in boxarr" :key="index">
        <img src="../assets/images/card.png" class="imgcard" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img src="../assets/images/start.png" v-for="(item1,index1) in Number(item.level)" :key="index1" class="start_img" />
          </div>
          <div class="hc_coefficient">
            <img src="../assets/images/hclogo.png" class="imgcard" />
            <span class="span1">{{item.hc}}%</span>
          </div>
          <div class="hc_coefficient">
            <img src="../assets/images/btclogo.png" class="imgcard" />
            <span class="span1">{{item.btc}}%</span>
          </div>
        </div>
      </div>
    </div>
    <span class="bottom_title">购买的NFT卡牌可前往“NFT挖矿”中质押挖矿</span>
    <div class="connect_box" @click="closepage">确认</div>
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
      type: Array,
      default: function () { return [] }
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    margin-top: 60px;
    width: 100%;
    text-align: center;
    font-size: 40px;
    font-family: AaJXH;
    font-style: italic;
    color: #FFFFFF;
    line-height: 73px;
    letter-spacing: 4px;
    text-shadow: 0px 8px 17px rgba(52, 30, 2, 0.5);
    // -webkit-text-stroke: 2px #000000;
    // -webkit-text-fill-color: transparent;
  }
  .close_img{
    position: absolute;
    top: 40px;
    right: 80px;
    width: 73px;
    object-fit: contain;
  }
  .boxarr{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 40px;
    max-height: 980px;
    overflow-y: auto;
    .onebox{
      position: relative;
      width: 450px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: calc((100% - 1480px) / 5);
      .imgcard{
        width: 100%;
        object-fit: contain;
      }
      .bottom{
        position: absolute;
        top: 60px;
        background-image: url("../assets/images/cardtop.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        padding:10px 8px;
        transform: scale(0.7);
        .five_pointed_star{
          display: flex;
          align-items: center;
          .start_img{
            width: 26px;
            object-fit: contain;
          }
        }
        .hc_coefficient{
          display: flex;
          align-items: center;
          background: #302F2E;
          box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
          border-radius: 4px;
          margin-right: 5px;
          .imgcard{
            width: 43px;
            object-fit: contain;
          }
          .span1{
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
          }
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
