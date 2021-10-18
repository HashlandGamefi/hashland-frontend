<template>
  <div class="basic_card_page">
    <!-- 卡牌 -->
    <div class="myCard">
      <div class="card_left">
        <span class="span1">我的钱包卡牌</span>
        <span class="span2">未插入卡槽不产生收益</span>
      </div>
      <!-- <div class="synthesis_btn">合成升级</div> -->
    </div>
    <!-- 我的钱包卡牌 -->
    <div class="myCardBox">
      <div class="occupationBitmap">
        <img src="../../assets/images/buybg.png" class="card_img" />
      </div>
      <div class="btn_box">购买NFT卡牌</div>
    </div>
    <!-- 卡槽 -->
    <div class="myCard margin_top_card">
      <div class="card_left">
        <span class="span1">我的卡槽卡牌</span>
        <span class="span2">卡槽有限，可合成后再质押</span>
      </div>
    </div>
    <!-- 卡槽轮播 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in cardsoltArr" :key="index">
          <div class="outbox">
            <div class="second-content_box">
              <img :src="item.src" class="swiper_img" />
              <img src="../../assets/images/privilege.png" class="base_img" />
            </div>
          </div>
        </div>
      </div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import Vue from 'vue'
export default {
  data () {
    return {
      cardsoltArr:[
        {
          src:'',//require("../../assets/images/record.png"),
          btnstatus:1,//1---插入卡槽 2----解除卡槽   3-----解锁卡槽
        },
        {
          src:require("../../assets/images/record.png"),
          btnstatus:2,//1---插入卡槽 2----解除卡槽   3-----解锁卡槽
        },
        {
          src:require("../../assets/images/cardlock.png"),
          btnstatus:3,//1---插入卡槽 2----解除卡槽   3-----解锁卡槽
        }
      ]
    }
  },
  methods: {
    Unlock(index){
      this.cardsoltArr[index].btnstatus = 1
      this.cardsoltArr[index].src = ''
      Vue.set(this.cardsoltArr,this.cardsoltArr.length,{
        src:require("../../assets/images/cardlock.png"),
        btnstatus:3,//1---插入卡槽 2----解除卡槽   3-----解锁卡槽
      })
      console.log('this.cardsoltArr: ', this.cardsoltArr);
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    new Swiper('.swiper-container', {
      // loop: true,//循环播放
      // pagination: '.swiper-pagination',// 如果需要分页器
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView : 3,
      // slidesOffsetBefore : 100,
      // centeredSlides : true,
      //如果需要自动切换海报
      // autoplay: {
      //   delay: 20000,//时间 毫秒
      //   disableOnInteraction: false,//用户操作之后是否停止自动轮播默认true
      // },
      observer:true, // 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
      observeParents:true,// 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
    })
  }
}
</script>

<style lang='scss' scoped>
.basic_card_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 160px;
  .myCard {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    .card_left {
      width: 320px;
      display: flex;
      flex-direction: column;
      .span1 {
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 56px;
        letter-spacing: 5px;
      }
      .span2 {
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ccbebe;
        line-height: 37px;
      }
    }
    .synthesis_btn {
      width: 196px;
      height: 84px;
      background-image: url("../../assets/images/nft_btn1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 84px;
    }
  }
  .myCardBox{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .occupationBitmap{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .card_img{
        width: 320px;
      }
    }
    .btn_box{
      width: 533px;
      height: 102px;
      text-align: center;
      line-height: 102px;
      background-image: url("../../assets/images/SpeciaBtn2.png");
      background-size:contain;
      background-repeat: no-repeat;
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      cursor: pointer;
      margin-top: 60px;
    }
  }
  .swiper-container{
    width: 100%;
    height: 475px;
    .swiper-wrapper{
      .swiper-slide{
        width: 100%;
        height: 100%;
        .outbox{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          margin-top: 50px;
          .second-content_box{
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            .swiper_img{
              position: absolute;
              top: 33%;
              left: 50%;
              transform: translate(-50%,-50%);
              width: 200px;
              object-fit: contain;
            }
            .base_img{
              width: 100%;
              object-fit: contain;
            }
          }
        }
      }
    }
  }
  .margin_top_card{
    margin-top: 30px;
  }
}
</style>
