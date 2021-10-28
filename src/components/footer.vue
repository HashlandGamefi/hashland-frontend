<template>
  <div class="footer_page">
    <div class="pc_box">
      <img src="../assets/images/footer1.png" class="footer1img" />
      <div class="center_box">
        <img src="../assets/images/logo.png" class="footer3img" />
        <div class="btnbox">
          <div class="btn1" @click="footerClick('Certik')">
            <img src="../assets/images/certick.png" class="certick_img" />
            Certik
          </div>
          <div class="btn1" @click="footerClick('Gitbook')">
            <img src="../assets/images/addfooter.png" class="addfooter_img" />
            GitBook
          </div>
        </div>
        <div class="btnbox">
          <img src="../assets/images/m.png" class="img" @click="footerClick('Medium')" />
          <img src="../assets/images/twiterr.png" class="img" @click="footerClick('Twitter')" />
          <img src="../assets/images/tel.png" class="img" @click="footerClick('Telegram')" />
          <img src="../assets/images/discord.png" class="img" @click="footerClick('Discord')" />
        </div>
        <div class="line_txt">Copyright 2021 HashLand Dapp Maker All rights reserved.</div>
      </div>
      <img src="../assets/images/footer2.png" class="footer2img" />
    </div>
    <div class="mobile_line_txt">Copyright 2021 HashLand Dapp Maker All rights reserved.</div>
  </div>
</template>

<script>
export default {
  methods: {
    footerClick(data){
      switch (data) {
        case 'Certik':
          window.location.href = ''
          break;
        case 'Gitbook':
          window.location.href = ''
          break;
        case 'Medium':
          window.location.href = 'https://medium.com/@hashland_'
          break;
        case 'Twitter':
          window.location.href = 'https://twitter.com/hashland_'
          break;
        case 'Telegram':
          window.location.href = 'https://t.me/Hashland_EN'
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
.footer_page{
  width: 100%;
  .pc_box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .footer1img{
      width: 394px;
      object-fit: contain;
    }
    .center_box{
      width: calc(100% - 694px);
      display: flex;
      flex-direction: column;
      align-items: center;
      .footer3img{
        width: 166px;
        object-fit: contain;
      }
      .btnbox{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
        .btn1{
          padding: 0 8px;
          border-radius: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 34px;
          background: #fff;
          margin-right: 10px;
          cursor: pointer;
          font-size: 12px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #052247;
          line-height: 26px;
          .addfooter_img{
            width: 30px;
            margin-right:5px;
          }
          .certick_img{
            width: 22px;
            margin-right: 5px;
          }
        }
        .img{
          width: 32px;
          object-fit: contain;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .line_txt{
        width: 100%;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 33px;
        margin-top: 10px;
      }
    }
    .footer2img{
      width: 300px;
      object-fit: contain;
    }
  }
  .mobile_line_txt{
    display: none;
  }
}
@media screen and (max-width: 980px) {
  .footer_page{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 0.1rem;
    .pc_box{
      margin-bottom: 0.1rem;
      .footer1img{
        width: 0.97rem;
        object-fit: contain;
      }
      .center_box{
        width: calc(100% - 1.71rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        .footer3img{
          width: 0.52rem;
          object-fit: contain;
        }
        .btnbox{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.1rem;
          .btn1{
            height: 0.36rem;
            padding: 0 0.05rem;
            border-radius: 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            margin-right: 0.1rem;
            cursor: pointer;
            font-size: 0.18rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #052247;
            transform: scale(0.6);
            .addfooter_img{
              width: 0.3rem;
              object-fit: contain;
              margin-right: 0.05rem;
            }
            .certick_img{
              width: 0.22rem;
              object-fit: contain;
              margin-right: 0.05rem;
            }
          }
          .img{
            width: 0.24rem;
            object-fit: contain;
            margin-right: 10px;
            cursor: pointer;
          }
        }
        .line_txt{
          display: none;
        }
      }
      .footer2img{
        width: 0.74rem;
        object-fit: contain;
      }
    }
    .mobile_line_txt{
      display: flex;
      align-items: center;
      font-size: 0.12rem;
      transform: scale(0.75);
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 0.2rme;
      margin-top: 0.1rme;
    }
  }
}
</style>
