<template>
  <div class="login_registered" @click.self="closeLOrR">
    <div class="outside_box">
      <img
        class="close"
        :src="`${$store.state.imgUrl}proupclose.png`"
        @click="closeLOrR"
      />
      <ul class="in_box" v-if="loginOrRegister == 'login'">
        <li class="header_title ban_select fontsize22">账号登录</li>
        <li class="logo_img"></li>
        <li class="prompt ban_select fontsize12">仅限于游戏</li>
        <li class="input_box">
          <div class="input_title">
            <span class="fontsize16">账号</span>
            <span v-if="loginForm.prompt1">---{{ loginForm.prompt1 }}</span>
          </div>
          <div class="input_box_box">
            <input
              type="text"
              placeholder="请输入邮箱"
              v-model="loginForm.mailAccount"
            />
          </div>
        </li>
        <li class="input_box">
          <div class="input_title">
            <span class="fontsize16">密码</span>
            <span v-if="loginForm.prompt2">---{{ loginForm.prompt2 }}</span>
          </div>
          <div class="input_box_box">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              v-model="loginForm.password"
            />
            <div class="eye">
              <div
                @click="isShowPassword = !isShowPassword"
                :class="{ active: isShowPassword }"
              ></div>
            </div>
          </div>
        </li>
        <li class="btn login_btn ban_select fontsize14" @click="toLogin">
          登录
        </li>
        <li class="login_footer ban_select">
          <span class="fontsize16" @click="registerNow">
            没有账号？立即注册
          </span>
          <!-- <span class="fontsize16" @click="forgotPassword">忘记密码</span> -->
          <span class="fontsize16" @click="bindingThePurse">绑定钱包</span>
        </li>
      </ul>
      <ul class="in_box register_box" v-if="loginOrRegister == 'registered'">
        <li class="header_title ban_select fontsize22">账号注册</li>
        <li class="logo_img"></li>
        <li class="prompt ban_select fontsize16">账号注册</li>
        <li class="input_box">
          <div class="input_title fontsize16">邮箱</div>
          <div class="input_box_box">
            <input
              type="text"
              placeholder="请输入邮箱"
              v-model="registerForm.mailAccount"
            />
          </div>
        </li>
        <li class="input_box">
          <div class="input_title fontsize16">验证码</div>
          <div class="input_box_box">
            <input
              type="text"
              placeholder="请输入验证码"
              v-model="registerForm.verifyCode"
            />
            <div class="verification ban_select fontsize14" @click="getCode">
              获取
            </div>
          </div>
        </li>
        <li class="input_box">
          <div class="input_title fontsize16">密码</div>
          <div class="input_box_box">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              v-model="registerForm.password"
            />
            <div class="eye">
              <div
                @click="isShowPassword = !isShowPassword"
                :class="{ active: isShowPassword }"
              ></div>
            </div>
          </div>
        </li>
        <li class="checkoutside_box ban_select" @click="isRead = !isRead">
          <div><div v-if="isRead"></div></div>
          <div class="fontsize16">我已阅读了《某某某条约》</div>
        </li>
        <li
          class="btn registered_btn ban_select fontsize16"
          @click="toRegistered"
        >
          注册
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// const mailReg = /^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$/; // 邮箱校验
const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // 邮箱校验
const pwReg = /^[a-zA-Z0-9]{6,16}$/; //校验密码： 6-16位字符,可包含数字，字母(区分大小写)
import { mapGetters } from "vuex";
import { hc, hn, token, getSigner } from "hashland-sdk";
export default {
  props: {
    showLOrR: { type: String, default: "login" },
  },
  data() {
    return {
      isShowPassword: false,
      isRead: false,
      loginOrRegister: "",
      loginForm: {
        mailAccount: "641160771@qq.com",
        password: "123456",
        prompt1: "",
        prompt2: "",
      },
      registerForm: {
        mailAccount: "641160771@qq.com",
        password: "123456",
        verifyCode: "",
        prompt1: "",
        prompt2: "",
        prompt3: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getAccount"]),
  },
  created() {
    this.loginOrRegister = this.showLOrR;
  },
  methods: {
    /**
     * 1、获取邮箱验证码接口
     * 请求url: http://center服域名:端口号/va_cent/get_mail_code
     * 请求示例：http://vov2021.mynatapp.cc/va_cent/get_mail_code?mailAccount=123456@163.com
     * 请求参数：mailAccount 邮箱账号
     * 返回参数：result(值为SUCCESS 发送邮件验证码成功 FAIL表示发送邮件验证码失败)  msg(发送成功或者失败提示语)
     */
    /**
     * 2、邮箱账号注册游戏接口
     * 请求url: http://center服域名:端口号/va_cent/mail_register
     * 请求示例：http://vov2021.mynatapp.cc/va_cent/mail_register?mailAccount=123456@163.com&password=123456&verifyCode=123456
     * 请求参数：mailAccount 邮箱账号
     * 返回参数：result(值为SUCCESS注册成功  FAIL注册失败) msg (注册失败相关提示语)
     * 发送成功时会返回以下参数：mailAccount邮箱账号  password密码 time注册时间 token登录令牌 nonce(绑定钱包签名nonce)
     */
    /**
     * 3、邮箱登录接口
     * 请求url: http://center服域名:端口号/va_cent/mail_login
     * 请求示例：http://vov2021.mynatapp.cc/va_cent/mail_login?mailAccount=123456@163.com&token=注册时返回的token
     * 请求示例：http://vov2021.mynatapp.cc/va_cent/mail_login?mailAccount=123456@163.com&password=注册时返回的password
     * 请求参数：mailAccount 邮箱账号 token 登录令牌
     * 返回参数：result(值为SUCCESS登录成功 FAIL表示登录失败)  msg(登录失败提示语)
     * 发送成功时会返回以下参数：mailAccount邮箱账号  newToken新的登录令牌 nonce(绑定钱包签名nonce)
     */
    /**
     * 4、绑定钱包接口 请求url: http://center服域名:端口号/va_cent/bind_wallet
     * 请求示例：http://vov2021.mynatapp.cc/va_cent/bind_wallet?mailAccount=123456@163.com&walletAddress=jdkvjig98jfidkjfkjf&signature=8dfdgjdkgjkdjg
     * 请求参数：mailAccount 邮箱账号 walletAddress 钱包地址 signature 前端签名
     * 返回参数：result(值为SUCCESS登录成功 FAIL表示绑定失败)  msg(绑定成功或者失败的提示语)
     * 发送成功时会返回以下参数：mailAccount邮箱账号  newToken新的登录令牌 walletAddress(请求时传入的绑定钱包地址)
     */
    /**注册账号 */
    toRegistered() {
      if (this.registerForm.mailAccount) {
        if (mailReg.test(this.registerForm.mailAccount)) {
          this.registerForm.prompt1 = "";
        } else {
          this.registerForm.prompt1 = "账号不合法"; // 账号不合法
        }
      } else {
        this.registerForm.prompt1 = "请填写账号"; // 请填写账号
      }
      if (!this.registerForm.verifyCode) {
        this.registerForm.prompt2 = "请填写验证码"; // 请填写验证码
      }
      if (this.registerForm.password) {
        if (pwReg.test(this.registerForm.password)) {
          this.registerForm.prompt3 = "";
        } else {
          this.registerForm.prompt3 = "密码不合法"; // 密码不合法
        }
      } else {
        this.registerForm.prompt3 = "请填写密码"; // 请填写密码
      }
      if (!this.isRead) console.log("请先阅读《某某某条约》");
      if (
        this.registerForm.mailAccount &&
        this.registerForm.verifyCode &&
        this.registerForm.password &&
        mailReg.test(this.registerForm.mailAccount) &&
        pwReg.test(this.registerForm.password) &&
        this.isRead
      ) {
        const url = `http://vov2021.mynatapp.cc/va_cent/mail_register?mailAccount=${this.registerForm.mailAccount}&password=${this.registerForm.password}&verifyCode=${this.registerForm.verifyCode}`;
        this.$axios.get(url).then((res) => {
          console.log("toRegistered", res.data);
          if (res.data.result === "SUCCESS") {
            this.firstAutoLogin(res.data.mailAccount, res.data.token);
            // mailAccount: "641160771@qq.com"
            // nonce: 8614
            // password: "123456"
            // platformId: "163783660401000001"
            // sign: "44ce4c5721ad40237420d511fab090cf"
            // time: 1637836604015
            // token: "66b724f77bf796c22ccdef47aea0b4b8"
            // this.loginOrRegister = "login";
            // this.loginForm.mailAccount = res.data.mailAccount;
            // this.loginForm.password = res.data.password;
          } else if (res.data.result === "FAIL") {
          }
        });
      }
    },
    /**注册后自动登录，使用邮箱账号和token令牌 */
    firstAutoLogin(mailAccount, token) {
      const url = `http://vov2021.mynatapp.cc/va_cent/mail_login?mailAccount=${mailAccount}&token=${token}`;
      this.$axios.get(url).then((res) => {
        console.log("自动登录", res.data);
        if (res.data.result === "SUCCESS") {
          // const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
          // loginInfo.token = res.data.newToken;
          // 发送成功时会返回以下参数：mailAccount邮箱账号  newToken新的登录令牌 nonce(绑定钱包签名nonce)
          // mailAccount: "641160771@qq.com"
          // newToken: "45cf6ea175762dabfd71200fa895ca9c"
          // nonce: "4296"
          // result: "SUCCESS"
          localStorage.setItem("loginInfo", JSON.stringify(res.data));
          this.switchingLoginStatus(res.data.mailAccount);
          this.closeLOrR();
        } else if (res.data.result === "FAIL") {
        }
      });
    },
    /**手动登录，使用账号和密码 */
    toLogin() {
      if (this.loginForm.mailAccount) {
        if (mailReg.test(this.loginForm.mailAccount)) {
          this.loginForm.prompt1 = "";
        } else {
          this.loginForm.prompt1 = "账号不合法"; // 账号不合法
        }
      } else {
        this.loginForm.prompt1 = "请填写账号"; // 请填写账号
      }
      if (this.loginForm.password) {
        if (pwReg.test(this.loginForm.password)) {
          this.loginForm.prompt2 = "";
        } else {
          this.loginForm.prompt2 = "密码不合法"; // 密码不合法
        }
      } else {
        this.loginForm.prompt2 = "请填写密码"; // 请填写密码
      }
      if (
        this.loginForm.mailAccount &&
        this.loginForm.password &&
        mailReg.test(this.loginForm.mailAccount) &&
        pwReg.test(this.loginForm.password)
      ) {
        const url = `http://vov2021.mynatapp.cc/va_cent/mail_login?mailAccount=${this.loginForm.mailAccount}&password=${this.loginForm.password}`;
        this.$axios.get(url).then((res) => {
          console.log("toLogin", res.data);
          if (res.data.result === "SUCCESS") {
            localStorage.setItem("loginInfo", JSON.stringify(res.data));
            this.switchingLoginStatus(res.data.mailAccount);
            this.closeLOrR();
            this.$router.push("/personalCenter");
          } else if (res.data.result === "FAIL") {
          }
        });
      }
    },

    /**没有账号？立即注册 */
    registerNow() {
      this.loginOrRegister = "registered";
    },
    /**忘记密码 */
    forgotPassword() {},
    /**获取验证码 */
    getCode() {
      const url = `http://vov2021.mynatapp.cc/va_cent/get_mail_code?mailAccount=${this.registerForm.mailAccount}`;
      this.$axios.get(url).then((res) => {
        console.log("getCode", res.data);
        if (res.data.result === "SUCCESS") {
          // res.data.msg; // "已发送验证码邮件，请到邮箱中查收"
        } else if (res.data.result === "FAIL") {
          // res.data.msg; // "10分钟内只能发送一次确认码"
        }
      });
    },

    /**是否显示密码 */
    showPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    /**登录成功，切换登录注册的状态，修改信息 */
    switchingLoginStatus(mailAccount) {
      this.$parent.showLRP = 2;
      this.$parent.mailAccount = mailAccount;
    },
    /**关闭登录与注册 */
    closeLOrR() {
      this.$parent.showLOrR = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.login_registered {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.outside_box {
  position: relative;
  background: linear-gradient(rgba(139, 230, 254, 1), rgba(139, 230, 254, 0));
  box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38),
    -2px 1px 34px 0px rgba(255, 255, 255, 0.22);
  border-radius: 14px;
  padding: 1px;
  .close {
    cursor: pointer;
    width: 44px;
    height: auto;
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
.in_box {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background: linear-gradient(180deg, #010f20 0%, #021c3b 100%);
  padding: 30px 80px;
  text-align: center;
  > .header_title {
    color: #ffffff;
    letter-spacing: 1px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .logo_img {
    width: 96px;
    height: 96px;
    background-image: url("//cdn.hashland.com/images/logo2.png");
    background-size: contain;
    background-repeat: no-repeat;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .prompt {
    color: #ffffff;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .input_box {
    text-align: left;
    margin: 0 auto;
    margin-bottom: 15px;
    width: fit-content;
    .input_title {
      color: #ffffff;
      text-indent: 1em;
      margin-bottom: 10px;
    }
    .input_box_box {
      width: 320px;
      height: 38px;
      background: rgba(11, 22, 43, 0.99);
      box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18),
        -2px 1px 8px 0px rgba(194, 190, 190, 0.52);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        width: 100%;
        height: 100%;
        text-indent: 1em;
        border: none;
        outline: none;
        background: transparent;
        color: #fff;
      }
      input:-ms-input-placeholder,
      input::-webkit-input-placeholder,
      input::-moz-placeholder,
      input:-moz-placeholder {
        color: #71787f;
      }
      .eye {
        width: 20%;
        height: 100%;
        div {
          cursor: pointer;
          width: 30px;
          height: 100%;
          margin: 0 auto;
          background-image: url("//cdn.hashland.com/images/eye.png");
          background-size: 100%;
          background-repeat: no-repeat;
          background-position: center;
          &.active {
            background-image: url("//cdn.hashland.com/images/eye_active.png");
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: center;
          }
        }
      }
      .verification {
        width: 30%;
        height: calc(100% * 1.2);
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url("//cdn.hashland.com/images/SpeciaBtn1.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        cursor: pointer;
        color: #ffffff;
        text-shadow: 0px 2px 4px #a16c28;
      }
    }
  }
  .checkoutside_box {
    width: fit-content;
    display: flex;
    align-items: center;
    margin: 0 auto;
    div {
      cursor: pointer;
      &:nth-child(1) {
        border-radius: 50%;
        width: 14px;
        height: 14px;
        border: 1px solid #818386;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          width: 8px;
          height: 8px;
          background: #818386;
        }
      }
      &:nth-child(2) {
        margin-left: 5px;
        color: #818386;
      }
    }
  }
  .btn {
    width: 228px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
    color: #ffffff;
    letter-spacing: 1px;
    text-shadow: -1px 4px 4px #723104;
  }
  .login_btn {
    margin: 50px auto 30px auto;
  }
  .registered_btn {
    margin: 30px auto 0 auto;
  }

  .login_footer {
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      cursor: pointer;
    }
  }
}
.register_box {
  padding: 12px 80px;
}
@media screen and (min-width: 981px) {
}
@media screen and (max-width: 980px) {
  .outside_box {
    .close {
      width: 0.36rem;
      height: auto;
      top: 0.1rem;
      right: 0.1rem;
    }
    .in_box {
      padding: 0.2rem 0.5rem;
      .prompt {
        margin-bottom: 0.18rem;
      }
      .input_box {
        margin-bottom: 0.18rem;
      }
      .logo_img {
        width: 0.6rem;
        height: 0.6rem;
      }
      .input_box_box {
        width: 2.26rem;
        height: 0.38rem;
        .eye {
          div {
            width: 0.25rem;
            height: 100%;
          }
        }
        .verification {
          width: 100px;
          height: calc(100% * 1.2);
        }
      }
      .btn {
        width: 1.7rem;
        height: 0.4rem;
        line-height: 0.4rem;
      }
      .login_btn {
        margin: 0.3rem auto 0.2rem auto;
      }
    }
  }
}
</style>
