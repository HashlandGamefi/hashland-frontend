<template>
  <div class="footer_page">
    <div class="pc_box">
      <img src="../assets/images/footer1.png" class="footer1img" />
      <div class="center_box">
        <img src="../assets/images/logo.png" class="footer3img" />
        <div class="btnbox">
          <div class="btn1">算力检测</div>
          <div class="btn1">算力检测</div>
          <div class="btn1">算力检测</div>
          <div class="btn1">算力检测</div>
          <div class="btn1">算力检测</div>
        </div>
        <div class="btnbox">
          <img src="../assets/images/git.png" class="img" />
          <img src="../assets/images/m.png" class="img" />
          <img src="../assets/images/twiterr.png" class="img" />
          <img src="../assets/images/tel.png" class="img" />
        </div>
        <div class="line_txt">www.hashland@163.co;lid .aii rights reserved</div>
        <div class="line_txt">服务条款/隐私政策/联系我们</div>
      </div>
      <img src="../assets/images/footer2.png" class="footer2img" />
    </div>
    <div class="mobile_line_txt">www.hashland@163.co;lid .aii rights reserved</div>
    <div class="mobile_line_txt">服务条款/隐私政策/联系我们</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {}
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
          padding: 0 10px;
          border-radius: 30px;
          height: 48px;
          text-align: center;
          line-height: 48px;
          background: #fff;
          margin-right: 10px;
          cursor: pointer;
        }
        .img{
          width: 48px;
          object-fit: contain;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .line_txt{
        width: 100%;
        text-align: center;
        font-size: 24px;
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
          flex-wrap: wrap;
          align-items: center;
          margin-top: 0.1rem;
          .btn1{
            width: 0.56rem;
            padding: 0;
            border-radius: 0.1rem;
            height: 0.4rem;
            text-align: center;
            line-height: 0.4rem;
            background: #fff;
            cursor: pointer;
            font-size: 0.12rem;
            margin-bottom: 0.05rem;
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
