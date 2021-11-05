<template>
  <div class="footer_page">
    <div class="pc_box">
      <div class="left_center">
        <img :src="`${$store.state.imgUrl}footer1.png`" class="footer1img" />
      </div>
      <div class="center_box">
        <img :src="`${$store.state.imgUrl}logo.png`" class="footer3img" />
        <div class="btnbox">
          <div class="btn1 fontsize14" @click="footerClick('Power')">
            <img :src="`${$store.state.imgUrl}power.png`" class="certick_img" />
            KUCOIN
          </div>
          <div class="btn1 fontsize14" @click="footerClick('Certik')">
            <img
              :src="`${$store.state.imgUrl}certick.png`"
              class="certick_img"
            />
            Certik
          </div>
          <div class="btn1 fontsize14" @click="footerClick('Gitbook')">
            <img
              :src="`${$store.state.imgUrl}addfooter.png`"
              class="addfooter_img"
            />
            GitBook
          </div>
        </div>
        <div class="btnbox">
          <img
            :src="`${$store.state.imgUrl}m.png`"
            class="img"
            @click="footerClick('Medium')"
          />
          <img
            :src="`${$store.state.imgUrl}twiterr.png`"
            class="img"
            @click="footerClick('Twitter')"
          />
          <img
            :src="`${$store.state.imgUrl}tel.png`"
            class="img"
            @click="footerClick('Telegram')"
          />
          <img
            :src="`${$store.state.imgUrl}discord.png`"
            class="img"
            @click="footerClick('Discord')"
          />
        </div>
        <div class="line_txt fontsize14">
          Copyright 2021 HashLand Dapp Maker All rights reserved.
        </div>
      </div>
      <div class="right_center">
        <img :src="`${$store.state.imgUrl}footer2.png`" class="footer2img" />
      </div>
    </div>
    <div class="mobile_line_txt fontsize14">
      Copyright 2021 HashLand Dapp Maker All rights reserved.
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    footerClick (data) {
      switch (data) {
        // case 'Power':
        //   window.location.href = 'https://www.kucoin.center/mining-pool/observer?sign=fd93932b4b614241858a6ecba0adc5af'
        //   break;
        case 'Certik':
          window.location.href = 'https://www.certik.org/projects/hashland'
          break;
        case 'Gitbook':
          window.location.href = 'https://land-hash.gitbook.io/official/'
          break;
        case 'Medium':
          window.location.href = 'https://medium.com/@hashland_'
          break;
        case 'Twitter':
          window.location.href = 'https://twitter.com/HashLand_NFT'
          break;
        case 'Telegram':
          window.location.href = 'https://t.me/HashLand_NFT'
          break;
        case 'Discord':
          window.location.href = 'https://discord.gg/9zdtNrpQbP'
          break;
        default:
          break;
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.footer_page {
  width: 100%;
  .pc_box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left_center {
      width: 400px;
      display: flex;
      align-items: center;
      .footer1img {
        width: 346px;
        object-fit: contain;
      }
    }
    .center_box {
      width: calc(100% - 800px);
      display: flex;
      flex-direction: column;
      align-items: center;
      .footer3img {
        width: 166px;
        object-fit: contain;
      }
      .btnbox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .btn1 {
          width: 155px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 49px;
          background: #fff;
          margin-right: 10px;
          cursor: pointer;
          color: #052247;
          box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
            -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
          border-radius: 7px;
          .addfooter_img {
            width: 30px;
            margin-right: 5px;
          }
          .certick_img {
            width: 22px;
            margin-right: 5px;
          }
        }
        .img {
          width: 44px;
          object-fit: contain;
          margin-right: 12px;
          cursor: pointer;
        }
      }
      .line_txt {
        width: 100%;
        text-align: center;
        color: #ffffff;
        margin-top: 10px;
      }
    }
    .right_center {
      width: 400px;
      display: flex;
      justify-content: flex-end;
      .footer2img {
        width: 263px;
        object-fit: contain;
      }
    }
  }
  .mobile_line_txt {
    display: none;
  }
}
@media screen and (max-width: 980px) {
  .footer_page {
    width: 100%;
    padding-bottom: 0.05rem;
    margin-top: 0.2rem;
    .pc_box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left_center {
        width: 0.9rem;
        display: flex;
        align-items: center;
        .footer1img {
          width: 100%;
          object-fit: contain;
        }
      }
      .center_box {
        width: calc(100% - 1.63rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        .footer3img {
          width: 0.52rem;
          object-fit: contain;
        }
        .btnbox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.12rem;
          .btn1 {
            width: 0.56rem;
            border-radius: 0.1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.21rem;
            font-size: 0.09rem;
            background: #fff;
            margin-right: 0.1rem;
            cursor: pointer;
            color: #052247;
            box-shadow:none;
            .addfooter_img {
              width: 0.09rem;
              margin-right: 0;
            }
            .certick_img {
              width: 0.09rem;
              margin-right: 0;
            }
          }
          .img {
            width: 0.23rem;
            object-fit: contain;
            margin-right: 0.07rem;
            cursor: pointer;
          }
        }
        .line_txt {
          display: none;
        }
      }
      .right_center {
        width: 0.73rem;
        .footer2img {
          width: 100%;
          object-fit: contain;
        }
      }
    }
    .mobile_line_txt{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.12rem;
      transform: scale(0.8);
      color: #FFFFFF;
      margin-top: 0.06rem;
    }
  }
}
</style>
