import axios from "axios";

const BASE_API = process.env.VUE_APP_BASE_API;
const GAME_API = process.env.VUE_APP_GAME_API;
const CARD_API = process.env.VUE_APP_NEWCARD;
// center服域名和端口号 GAME_API
// 内网测试服 vov2021.mynatapp.cc
// 外网测试服 https://hw-api-test.hashland.com
// 外网正式服 https://hw-api.hashland.com
export default {
  // 获取币的价格
  getCurrencyFun: (data: any) => {
    return axios.get(
      `${BASE_API}/api/v3/simple/price/?ids=${data}&vs_currencies=usd`
    );
  },
  getDataJson(data: any) {
    // console.log("${CARD_API}${data}",`${CARD_API}${data}`)
    return axios.get(`${CARD_API}${data}`);
  },
  /**获取邮箱验证码 */
  gameMailCode: (data: any) => {
    return axios.get(`${GAME_API}/va_cent/get_mail_code?${data}`);
  },
  /**邮箱注册游戏 */
  gameMailRegister: (data: any) => {
    return axios.get(`${GAME_API}/va_cent/mail_register?${data}`);
  },
  /**邮箱登录 */
  gameMailLogin: (data: any) => {
    return axios.get(`${GAME_API}/va_cent/mail_login?${data}`);
  },
  /**绑定钱包 */
  gameBindWallet: (data: any) => {
    return axios.get(`${GAME_API}/va_cent/bind_wallet?${data}`);
  },
  /**赛季信息 */
  gameIssueInfo(data: any) {
    return axios.get(`${GAME_API}/va_cent/hc_info?${data}`);
  },
  /**重置密码 */
  gameResetPassword(data: any) {
    return axios.get(`${GAME_API}/va_cent/password_reset?${data}`);
  },
};
