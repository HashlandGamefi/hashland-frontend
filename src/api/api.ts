import axios from "axios";

const BASE_API = process.env.VUE_APP_BASE_API;
const GAME_API = process.env.VUE_APP_GAME_API;
// center服域名和端口号 GAME_API
// 内网测试 vov2021.mynatapp.cc
// 外网测试 hw-api.hashland.com
// console.log("BASE_API: ", BASE_API);
// console.log("GAME_API: ", GAME_API);
export default {
  // 获取币的价格
  getCurrencyFun: (data: any) => {
    return axios.get(`${BASE_API}/api/v3/simple/price/?ids=${data}&vs_currencies=usd`);
  },
  /**1、获取邮箱验证码接口 */
  gameMailCode: (data: any) => {
    return axios.get(`${GAME_API}/va_cent/get_mail_code?${data}`);
  },
  /**2、邮箱账号注册游戏接口 */
  gameMailRegister: (data: any) => {
    return axios.get(`${GAME_API}/va_cent/mail_register?${data}`);
  },
  /**3、邮箱登录接口 */
  gameMailLogin: (data: any) => {
    return axios.get(`${GAME_API}/va_cent/mail_login?${data}`);
  },
  /**4、绑定钱包接口 */
  gameBindWallet: (data: any) => {
    return axios.get(`${GAME_API}/va_cent/bind_wallet?${data}`);
  },
};
