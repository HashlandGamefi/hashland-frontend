<template>
  <div class="basic_card_page">
    <!-- 卡牌 -->
    <div class="myCard">
      <div class="card_left">
        <span class="span1">{{$t("message.nftMining.txt3")}}</span>
        <span class="span2">{{$t("message.nftMining.txt4")}}</span>
      </div>
      <div class="synthesis_btn" @click="synthesisClick">{{$t("message.nftMining.txt5")}}</div>
    </div>
    <!-- 我的钱包卡牌 -->
    <div class="myCardBox">
      <div class="occupationBitmap">
        <img :src="`${$store.state.imgUrl}privilegebg.png`" class="privilegebgimg" />
        <img :src="`${$store.state.imgUrl}specialCard.png`" class="privilbg" />
      </div>
      <div class="btn_box">{{$t("message.buy2")}}</div>
    </div>
    <!-- 卡槽 -->
    <div class="myCard margin_top_card">
      <div class="card_left">
        <span class="span1">{{$t("message.nftMining.txt7")}}</span>
        <span class="span2">{{$t("message.nftMining.txt8")}}</span>
      </div>
    </div>
    <!-- 卡槽轮播 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in cardsoltArr"
          :key="index"
        >
          <div class="outbox">
            <div class="second-content_box">
              <img :src="item.src" class="swiper_img" />
              <img :src="`${$store.state.imgUrl}privilege.png`" class="base_img" />
            </div>
            <div
              class="btnbox remove_btnbox"
              v-if="item.btnstatus == 1"
            >
              {{$t("message.nftMining.txt15")}}
            </div>
            <div
              class="btnbox insert_btnbox"
              v-if="item.btnstatus == 2"
            >
              {{$t("message.nftMining.txt9")}}<BtnLoading :isloading="item.isloading"></BtnLoading>
            </div>
            <div
              class="btnbox lock_btnbox"
              v-if="item.btnstatus == 3"
            >
              {{$t("message.nftMining.txt10")}}<BtnLoading :isloading="item.isloading"></BtnLoading>
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
export default {
  data () {
    return {
      cardsoltArr: [
        {
          src: '',
          btnstatus: 1,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
          isloading: false
        },
        {
          src: '',
          btnstatus: 1,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
          isloading: false
        },
        {
          src: '',
          btnstatus: 3,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
          isloading: false
        }
      ]
    }
  },
  methods: {
    // 合成
    synthesisClick () {
      this.$router.push('/synthesis')
    }
  },
  mounted () {
    new Swiper('.swiper-container', {
      // loop: true,//循环播放
      // pagination: '.swiper-pagination',// 如果需要分页器
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView: 3,
      // slidesOffsetBefore : 100,
      // centeredSlides : true,
      //如果需要自动切换海报
      // autoplay: {
      //   delay: 20000,//时间 毫秒
      //   disableOnInteraction: false,//用户操作之后是否停止自动轮播默认true
      // },
      observer: true, // 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
      observeParents: true,// 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
    })
  }
}
</script>

<style lang='scss' scoped>
.basic_card_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  .myCard {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    .card_left {
      // width: 320px;
      display: flex;
      flex-direction: column;
      .span1 {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 56px;
        letter-spacing: 5px;
      }
      .span2 {
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ccbebe;
        line-height: 37px;
      }
    }
    .synthesis_btn {
      width: 115px;
      height: 56px;
      background-image: url("//cdn.hashland.com/images/nft_btn1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 56px;
      cursor: pointer;
    }
  }
  .myCardBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .occupationBitmap {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 196px;
      .privilegebgimg {
        width: 100%;
        object-fit: contain;
      }
      .privilbg{
        position: absolute;
        top: 35%;
        left: 49%;
        transform: translate(-50%,-50%);
        width: 404px;
        object-fit: contain;
      }
    }
    .btn_box {
      width: 533px;
      height: 102px;
      text-align: center;
      line-height: 102px;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: contain;
      background-repeat: no-repeat;
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      cursor: pointer;
      margin-top: 60px;
    }
  }
  .swiper-container {
    width: 100%;
    height: auto;
    .swiper-wrapper {
      .swiper-slide {
        width: 100%;
        height: 100%;
        .outbox {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          // margin-top: 130px;
          .second-content_box {
            position: relative;
            width: 100%;
            height: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 50px;
            .swiper_img {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 320px;
              object-fit: contain;
            }
            .base_img {
              width: 100%;
              object-fit: contain;
            }
          }
          .btnbox {
            width: 160px;
            text-align: center;
            line-height: 52px;
            background-size: contain;
            background-repeat: no-repeat;
            font-size: 16px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            cursor: pointer;
          }
          .remove_btnbox {
            background-image: url("//cdn.hashland.com/images/nft_btn1.png");
          }
          .insert_btnbox {
            background-image: url("//cdn.hashland.com/images/insert.png");
          }
          .lock_btnbox {
            background-image: url("//cdn.hashland.com/images/lock.png");
          }
        }
      }
    }
  }
  .margin_top_card {
    margin-bottom: 0.3rem;
  }
}
@media screen and (max-width: 980px) {
  .basic_card_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0.6rem;
    .myCard {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.2rem;
      .card_left {
        width: 2rem;
        display: flex;
        flex-direction: column;
        .span1 {
          font-size: 0.2rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 0.28rem;
        }
        .span2 {
          font-size: 0.14rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ccbebe;
          line-height: 0.2rem;
        }
      }
      .synthesis_btn {
        width: 1rem;
        height: 0.39rem;
        background-image: url("//cdn.hashland.com/images/nft_btn1.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        font-size: 0.18rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 0.39rem;
        cursor: pointer;
      }
    }
    .myCardBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .occupationBitmap {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        .privilegebgimg {
          width: 100%;
          object-fit: contain;
        }
        .privilbg{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          width: 1rem;
          object-fit: contain;
        }
      }
      .btn_box {
        width: 1.94rem;
        height: 0.38rem;
        text-align: center;
        line-height: 0.38rem;
        background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
        background-size: contain;
        background-repeat: no-repeat;
        font-size: 0.18rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        cursor: pointer;
        margin-top: 0.1rem;
      }
    }
    .swiper-container {
      width: 100%;
      height: auto;
      .swiper-wrapper {
        .swiper-slide {
          width: 100%;
          height: 100%;
          .outbox {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin-top: 0.3rem;
            .second-content_box {
              position: relative;
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-end;
              margin-bottom: 0.2rem;
              .swiper_img {
                position: absolute;
                top: 18%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1rem;
                object-fit: contain;
              }
              .base_img {
                width: 100%;
                object-fit: contain;
              }
            }
            .btnbox {
              width: 1rem;
              text-align: center;
              line-height: 0.24rem;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              font-size: 0.12rem;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #ffffff;
              cursor: pointer;
            }
            .remove_btnbox {
              background-image: url("//cdn.hashland.com/images/nft_btn1.png");
            }
            .insert_btnbox {
              background-image: url("//cdn.hashland.com/images/insert.png");
            }
            .lock_btnbox {
              background-image: url("//cdn.hashland.com/images/lock.png");
            }
          }
        }
      }
    }
    .margin_top_card {
      margin-top: 30px;
    }
  }
}
</style>
