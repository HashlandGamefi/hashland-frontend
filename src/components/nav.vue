<template>
  <div class="nav_box">
    <div class="logo_img">
      <img src="../assets/images/logo.png" class="imgs" />
    </div>
    <div class="menu_box">
      <ul class="ul_">
        <li>首页</li>
        <li>首页</li>
        <li>首页</li>
      </ul>
    </div>
    <div class="connect_box">
      <span class="span1">登录</span>
      <div class="lang_box">
        <img src="../assets/images/cn.png" class="cnimg" />
        <span class="lang_txt">CN</span>
        <img src="../assets/images/accrow.png" class="downimg" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navarr: ['message.title1', 'message.title2', 'message.title3', 'message.title4', 'message.title6','message.title7']
    }
  }
}
</script>
<style lang="scss" scoped>
.nav_box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  padding-left: 250px;
  background-image: url("../assets/images/navbg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .logo_img{
    position: absolute;
    top: 0;
    left: 20px;
    width: 223px;
    .imgs{
      width: 100%;
      object-fit: contain;
    }
  }
  .menu_box{
    width: calc(100% - 200px);
    .ul_{
      width: 100%;
      display: flex;
      align-items: center;
      li{
        padding: 0 38px;
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
      }
    }
  }
  .connect_box{
    display: flex;
    align-items: center;
    .span1{
      font-size: 26px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 37px;
    }
    .lang_box{
      display: flex;
      align-items: center;
      margin-left: 20px;
      .cnimg{
        width: 50px;
        object-fit: contain;
      }
      .lang_txt{
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 37px;
        margin: 0 8px;
      }
      .downimg{
        width: 20px;
        object-fit: contain;
      }
    }
  }
}
@media screen and (min-width: 981px) and (max-width: 1439px) {

}
@media screen and (max-width: 980px) {

}
</style>
