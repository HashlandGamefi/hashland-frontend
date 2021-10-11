<template>
  <div class="footer_page">
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
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {},
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style lang='scss' scoped>
.footer_page{
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
</style>
