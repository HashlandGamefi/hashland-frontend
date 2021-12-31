<template>
  <div class="banner_page" v-if="bannershow == 'istrue'">
    <div class="banner_box">
      <div class="content">
        <div class="top_title fontsize26">{{$t("message.banner.txt1")}}</div>
        <!-- <img :src="`${$store.state.imgUrl}bindboximg.png`" class="bindbox_img"> -->
        <div class="level_box">
          <div class="onebox" v-for="(item,index) in list" :key="index">
            <span class="span1 fontsize14">$ {{item.num}}</span>
            <span class="span1 span2 fontsize12">Level {{index + 1}} ({{item.Probability}}%)</span>
          </div>
        </div>
        <div class="instruction fontsize18">{{$t("message.banner.txt2")}}</div>
        <div class="time_finsh">
          <span class="span1_radious">{{ timeData.h }}</span>
          <span class="span_txt">:</span>
          <span class="span1_radious">{{ timeData.m }}</span>
          <span class="span_txt">:</span>
          <span class="span1_radious">{{ timeData.s }}</span>
        </div>
        <div class="btn_box fontsize16" @click="ConfirClick">
          {{$t("message.banner.txt3")}}
        </div>
      </div>
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="closeimg" @click="closeBannerClick" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bannershow: {
      type: String,
      default: ''
    },
    starttime: {
      type: String,
      default: ''
    },
    timeData:{
      typeof:Object,
      default:{'h':'00','m':'00','s':'00'}
    }
  },
  data(){
    return {
      timeer:null,
      list:[
        {num:70,Probability:20},
        {num:640,Probability:62.2},
        {num:'4,000',Probability:16},
        {num:'21,760',Probability:1.5},
        {num:'100,000',Probability:0.3}
      ]
    }
  },
  methods: {
    closeBannerClick() {
      this.$emit("closebanner",this.timeer);
    },
    ConfirClick(){
      this.$emit("besureclcik",this.timeer);
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
    width: 773px;
    height: 585px;
    background-image: url("//cdn.hashland.com/testimgs/banner_proup1.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .content{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 30px 0 64px;
      .top_title{
        width: 100%;
        text-align: center;
        color: #fff;
        margin-bottom: 218px;
      }
      .level_box{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 78px;
        .onebox{
          width: 106px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background: #022C51;
          box-shadow: inset 0px 5px 16px 0px rgba(163, 252, 241, 0.54), inset 0px -2px 7px 0px rgba(145, 147, 221, 0.6);
          border-radius: 9px;
          padding: 6px 0;
          .span1{
            color: #fff;
          }
          .span2{
            margin-top: 5px;
          }
        }
      }
      .instruction{
        width: 100%;
        text-align: center;
        color: #fff;
        margin-top: 20px;
      }
      .time_finsh {
        display: flex;
        align-items: center;
        margin: 20px 0;
        .span1_radious {
          width: 40px;
          height: 40px;
          background: #061B2F;
          border-radius: 10px;
          color: #f5d719;
          text-align: center;
          line-height: 40px;
          margin-right: 5px;
          font-size: 20px;
          font-family: Impact;
        }
        .span_txt {
          font-size: 20px;
          color: #727272;
          line-height: 14px;
          margin-right: 5px;
        }
      }
      .btn_box {
        width: 274px;
        height: 59px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #ffffff;
        cursor: pointer;
      }
    }
    .closeimg{
      position: absolute;
      right: 60px;
      top: 40px;
      width: 44px;
      object-fit: contain;
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
      width: 3.2rem;
      // height: 4.85rem;
      height: auto;
      background-image: url("//cdn.hashland.com/testimgs/mobile_banner_proup1.png");
      background-size: 100% 100%;
      // background-size: initial;
      background-repeat: no-repeat;
      .content{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding: 0.3rem 0;
        .top_title{
          width: 100%;
          text-align: center;
          color: #fff;
          font-size: 0.2rem;
        }
        .level_box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          padding: 0 0.3rem;
          margin-top: -0.2rem;
          .onebox{
            width: 1.2rem;
            // height: auto;
            margin-bottom: 0.1rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            background: #022C51;
            box-shadow: inset 0px 5px 16px 0px rgba(163, 252, 241, 0.54), inset 0px -2px 7px 0px rgba(145, 147, 221, 0.6);
            border-radius: 0.09rem;
            padding: 0.1rem 0;
            .span1{
              color: #fff;
              // transform: scale(0.8);
            }
            .span2{
              margin-top: 0.05rem;
            }
          }
        }
        .instruction{
          width: 100%;
          text-align: center;
          color: #fff;
          margin-top: 0;
          font-size: 0.16rem;
        }
        .time_finsh {
          display: flex;
          align-items: center;
          margin: 0.15rem 0;
          .span1_radious {
            width: 0.4rem;
            height: 0.4rem;
            background: #061B2F;
            border-radius: 0.06rem;
            color: #f5d719;
            text-align: center;
            line-height: 0.4rem;
            margin-right: 0.05rem;
            font-size: 0.2rem;
          }
          .span_txt {
            font-size: 0.2rem;
            color: #727272;
            line-height: 0.14rem;
            margin-right: 0.05rem;
          }
        }
        .btn_box {
          width: 1.94rem;
          height: 0.38rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          color: #ffffff;
          cursor: pointer;
          margin-bottom:0.2rem;
        }
      }
      .closeimg{
        position: absolute;
        right: -0.1rem;
        top: -0.58rem;
        width: 0.4rem;
        object-fit: contain;
      }
    }
  }
}
</style>
