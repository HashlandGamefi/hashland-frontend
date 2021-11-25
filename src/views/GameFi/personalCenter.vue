<template>
  <div class="page">
    <ul>
      <li>个人中心</li>
      <li>快速修改密码等安全设置</li>
      <li>
        <span>昵称：</span>
        <span>234567890</span>
      </li>
      <li>
        <span>邮箱绑定：</span>
        <span>34567899876</span>
      </li>
      <li>
        <span>绑定钱包地址：</span>
        <span>345678998763456789987634567899876</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 150px 0;
  ul {
    width: 845px;
    li {
      overflow: hidden;
      &:nth-child(1),
      &:nth-child(2) {
        text-align: center;
        font-size: 22px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 40px;
      }
      &:nth-child(2) {
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 30px;
      }
      &:nth-child(3),
      &:nth-child(4),
      &:nth-child(5) {
        padding: 30px 0;
        font-size: 22px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 30px;
        display: flex;
        border-bottom: 1px solid;
        border-image: linear-gradient(
            22deg,
            rgba(43, 217, 229, 0),
            rgba(43, 217, 229, 1),
            rgba(23, 184, 203, 0.17),
            rgba(19, 177, 198, 0)
          )
          1 1;
        span {
          &:nth-child(1) {
            width: 20%;
            min-width: 155px;
          }
          &:nth-child(2) {
            width: 80%;
            min-width: calc(100% - 155px);
            text-align: center;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 981px) {
}
@media screen and (max-width: 980px) {
  .page {
    padding: 80px 0;
    ul {
      width: 90vw;
      li {
        overflow: hidden;
        &:nth-child(1) {
          font-size: 18px;
        }
        &:nth-child(2) {
          font-size: 10px;
        }

        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(5) {
          font-size: 14px;
          span {
            &:nth-child(1) {
              width: 20%;
              min-width: 100px;
            }
          }
        }
      }
    }
  }
}
</style>
