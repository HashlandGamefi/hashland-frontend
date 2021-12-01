import service from "./service";
import axios from "axios";
// center服域名和端口号
// 内网测试 vov2021.mynatapp.cc
// 外网测试 hw-api.hashland.com:8080
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
let apiGame: string = ""; // 游戏账号登陆注册api
if (process.env.NODE_ENV == "development") {
  apiGame = `https://hw-api.hashland.com:8080`;
} else if (process.env.NODE_ENV == "production") {
  apiGame = `http://47.57.191.195:8080`;
}
console.log(process.env.NODE_ENV, apiGame);

export default {
  // 获取币的价格
  getCurrencyFun: (data: any) => {
    return service.get(`api/v2/tokens/${data}`);
  },

  gameMailCode: (data: any) => {
    return axios.get(`${apiGame}/va_cent/get_mail_code?${data}`);
  },
  gameMailRegister: (data: any) => {
    return axios.get(`${apiGame}/va_cent/mail_register?${data}`);
  },
  gameMailLogin: (data: any) => {
    return axios.get(`${apiGame}/va_cent/mail_login?${data}`);
  },
  gameBindWallet: (data: any) => {
    return axios.get(`${apiGame}/va_cent/bind_wallet?${data}`);
  },
};
