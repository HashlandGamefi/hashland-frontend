<template>
  <div class="page">
    <div class="outside_box">
      <div class="in_box">
        <img class="center_img" :src="`${$store.state.imgUrl}gamefibg1.png`" />
      </div>
    </div>
  </div>
</template>

<script>
// center服域名和端口号
// 内网测试 vov2021.mynatapp.cc
// 外网测试 47.57.191.195:8080
/**
 * 1、获取邮箱验证码接口
 * 请求url: http://center服域名:端口号/va_cent/get_mail_code
 * 请求示例：http://47.57.191.195:8080/va_cent/get_mail_code?mailAccount=123456@163.com
 * 请求参数：mailAccount 邮箱账号
 * 返回参数：result(值为SUCCESS 发送邮件验证码成功 FAIL表示发送邮件验证码失败)  msg(发送成功或者失败提示语)
 */
/**
 * 2、邮箱账号注册游戏接口
 * 请求url: http://center服域名:端口号/va_cent/mail_register
 * 请求示例：http://47.57.191.195:8080/va_cent/mail_register?mailAccount=123456@163.com&password=123456&verifyCode=123456
 * 请求参数：mailAccount 邮箱账号
 * 返回参数：result(值为SUCCESS注册成功  FAIL注册失败) msg (注册失败相关提示语)
 * 发送成功时会返回以下参数：mailAccount邮箱账号  password密码 time注册时间 token登录令牌 nonce(绑定钱包签名nonce)
 */
/**
 * 3、邮箱登录接口
 * 请求url: http://center服域名:端口号/va_cent/mail_login
 * 请求示例：http://47.57.191.195:8080/va_cent/mail_login?mailAccount=123456@163.com&token=注册时返回的token
 * 请求示例：http://47.57.191.195:8080/va_cent/mail_login?mailAccount=123456@163.com&password=注册时返回的password
 * 请求参数：mailAccount 邮箱账号 token 登录令牌
 * 返回参数：result(值为SUCCESS登录成功 FAIL表示登录失败)  msg(登录失败提示语)
 * 发送成功时会返回以下参数：mailAccount邮箱账号  newToken新的登录令牌 nonce(绑定钱包签名nonce)
 */
/**
 * 4、绑定钱包接口 请求url: http://center服域名:端口号/va_cent/bind_wallet
 * 请求示例：http://47.57.191.195:8080/va_cent/bind_wallet?mailAccount=123456@163.com&walletAddress=jdkvjig98jfidkjfkjf&signature=8dfdgjdkgjkdjg
 * 请求参数：mailAccount 邮箱账号 walletAddress 钱包地址 signature 前端签名
 * 返回参数：result(值为SUCCESS登录成功 FAIL表示绑定失败)  msg(绑定成功或者失败的提示语)
 * 发送成功时会返回以下参数：mailAccount邮箱账号  newToken新的登录令牌 walletAddress(请求时传入的绑定钱包地址)
 */
export default {};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 150px 0;
  font-size: 0;
  .outside_box {
    background: linear-gradient(rgba(139, 230, 254, 1), rgba(139, 230, 254, 0));
    box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38),
      -2px 1px 34px 0px rgba(255, 255, 255, 0.22);
    border-radius: 14px;
    padding: 1px;
    .in_box {
      border-radius: 14px;
      background: linear-gradient(180deg, #010f20 0%, #021c3b 100%);
      // padding: 25px;
      // .center_img {
      //   width: 785px;
      //   height: auto;
      // }
    }
  }
}
@media screen and (min-width: 981px) {
  .in_box {
    padding: 25px;
    .center_img {
      width: 785px;
      height: auto;
    }
  }
}
@media screen and (max-width: 980px) {
  .in_box {
    padding: 10px;
    .center_img {
      width: 310px;
      height: auto;
    }
  }
}
</style>
