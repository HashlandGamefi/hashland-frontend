<template>
  <div class="wallet_page" v-if="proupDis">
    <div class="wallet_box" @click.stop>
      <span class="txt1">{{$t('message.msg')}}</span>
      <span class="txt2">{{ word }}</span>
      <span class="txt2 txt4" v-if="iswordtrue">{{ wordtxt }}</span>
      <div class="btn_box">
        <div class="txt3" :class="{width50:isbtntrue}" v-if="isbtntrue" @click.stop="besurefun">{{cancletxt}}</div>
        <div class="txt3" :class="{width50:isbtntrue}" @click.stop="dispearfun">{{btntxt}}</div>
      </div>
      <img src="../assets/images/proupclose.png" class="close" @click.stop="dispearfun"/>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    proupDis: {
      type: Boolean,
      default: false
    },
    iswordtrue: {
      type: Boolean,
      default: false ,
    },
    isbtntrue: {
      type: Boolean,
      default: false // 第二个按钮是否显示的变量
    },
    word: {
      type: String,
      default: ''
    },
    wordtxt:{
      type: String,
      default: ''
    },
    btntxt:{
      type: String,
      default: ''
    },
    cancletxt:{
      type: String,
      default: ''
    },
  },
  methods: {
    // 弹窗关闭
    dispearfun () {
      console.log('弹窗关闭')
      this.$emit('closedis')
    },
    // 去绑定
    besurefun(){
      this.$emit('besurefun')
    }
  }
}
</script>
<style lang="scss" scoped>
.wallet_page {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99999;
  .wallet_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width:733px;
    // box-shadow: 0px 16px 80px rgba(0, 0, 0, 0.8);
    // border-radius: 32px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-image: url("../assets/images/proupbg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .txt1 {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 36px;
      color: #ffffff;
    }
    .txt2 {
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      color: rgba(255, 255, 255, 0.8);
      margin-top: 16px;
    }
    .txt4{
      font-size: 20px;
    }
    .btn_box{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      justify-content: center;
      margin-top: 25px;
      .txt3 {
        width: 281px;
        // width: 100%;
        // height: 58px;
        // background: #3f3d46;
        background-image: url("../assets/images/nft_btn2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        // border-radius: 16px;
        text-align: center;
        line-height: 60px;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        color: #ffffff;
        cursor: pointer;
      }
      .width50{
        width: 49%;
      }
    }
    .close{
      position: absolute;
      right: 30px;
      top: 0;
      width: 73px;
      object-fit: contain;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 979px) {
  .wallet_page {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    .wallet_box {
      margin: 0 auto;
      width: 3.43rem;
      height: auto;
      background: #232228;
      box-shadow: 0 0.16rem 0.8rem rgba(0, 0, 0, 0.8);
      border-radius: 0.16rem;
      padding: 0.16rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .txt1 {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 0.24rem;
        color: #ffffff;
      }
      .txt2 {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 0.16rem;
        color: rgba(255, 255, 255, 0.8);
        margin-top: 0.16rem;
      }
      .btn_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 0.16rem;
        .txt3 {
          width: 100%;
          height: 0.46rem;
          background: #3f3d46;
          border-radius: 0.16rem;
          text-align: center;
          line-height: 0.46rem;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: 500;
          font-size: 0.16rem;
          color: #ffffff;
        }
        .width50{
          width: 49%;
        }
      }
      .txt4{
        font-size: 0.12rem;
      }
    }
  }
}
</style>
