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
    width:362px;
    height: 430px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-image: url("../assets/images/proupbg.png");
    background-size: cover;
    background-repeat: no-repeat;
    .txt1 {
      width: 100%;
      text-align: center;
      font-family: PingFang SC;
      font-style: normal;
      font-weight: 600;
      font-size: 36px;
      color: #ffffff;
    }
    .txt2 {
      width: 100%;
      text-align: center;
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
        background-image: url("../assets/images/SpeciaBtn2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
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
      right: 0;
      top: 0;
      width: 50px;
      object-fit: contain;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 980px) {
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
      width:3rem;
      height: 3.6rem;
      padding: 0.5rem 0.1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background-image: url("../assets/images/proupbg.png");
      background-size: cover;
      background-repeat: no-repeat;
      .txt1 {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 0.2rem;
        color: #ffffff;
      }
      .txt2 {
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 0.2rem;
        color: rgba(255, 255, 255, 0.8);
        margin-top: 0.1rem;
      }
      .txt4{
        font-size: 0.14rem;
      }
      .btn_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        justify-content: center;
        margin-top: 0.2rem;
        .txt3 {
          width: 2.28rem;
          background-image: url("../assets/images/SpeciaBtn2.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          line-height: 0.56rem;
          font-family: PingFang SC;
          font-style: normal;
          font-weight: 500;
          font-size: 0.2rem;
          color: #ffffff;
          cursor: pointer;
        }
        .width50{
          width: 49%;
        }
      }
      .close{
        position: absolute;
        right: 0;
        top: 0;
        width: 0.44rem;
        object-fit: contain;
      }
    }
  }
}
</style>
