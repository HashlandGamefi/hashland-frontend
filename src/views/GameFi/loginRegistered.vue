<template>
  <div class="login_registered" @click.self="$parent.closeLoginRegistered()">
    <div class="outside_box">
      <img class="close" :src="`${$store.state.imgUrl}proupclose.png`" @click="$parent.closeLoginRegistered()" />
      <ul class="in_box" v-if="showLogin">
        <li class="header_title ban_select fontsize22">Email login</li>
        <li class="logo_img"></li>
        <li class="prompt ban_select fontsize12">Limited to games</li>
        <li class="input_box fontsize16">
          <div class="input_title">Email</div>
          <div class="input_box_box" :class="{ active: loginForm.prompt1 }">
            <input type="text" placeholder="please enter your email" v-model="loginForm.mailAccount" />
          </div>
          <div class="input_prompt fontsize12" v-show="loginForm.prompt1">* {{ loginForm.prompt1 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">Password</div>
          <div class="input_box_box" :class="{ active: loginForm.prompt2 }">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              placeholder="Please fill in the password"
              v-model="loginForm.password"
            />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="loginForm.prompt2">* {{ loginForm.prompt2 }}</div>
        </li>
        <li class="btn ban_select fontsize14" @click="manuallyLogin">
          <span>Log in</span>
          <BtnLoading :isloading="loginbtnloading"></BtnLoading>
        </li>
        <li class="login_footer ban_select">
          <span class="fontsize16" @click="registerNow"> No account? Sign up now </span>
          <!-- <span class="fontsize16" @click="forgotPassword">忘记密码</span> -->
        </li>
      </ul>
      <ul class="in_box" v-if="!showLogin">
        <li class="header_title ban_select fontsize22">Register an account</li>
        <li class="logo_img"></li>
        <li class="prompt ban_select fontsize12">Register an account</li>
        <li class="input_box fontsize16">
          <div class="input_title">Email</div>
          <div class="input_box_box" :class="{ active: registerForm.prompt1 }">
            <input type="text" placeholder="please enter your email" v-model="registerForm.mailAccount" />
          </div>
          <div class="input_prompt fontsize12" v-show="registerForm.prompt1">* {{ registerForm.prompt1 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">Verification code</div>
          <div class="input_box_box" :class="{ active: registerForm.prompt2 }">
            <input type="text" placeholder="Please fill in the verification code" v-model="registerForm.verifyCode" />
            <div class="verification ban_select fontsize14" @click="getCode">
              <span>Obtain</span>
              <BtnLoading :isloading="codebtnloading"></BtnLoading>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="registerForm.prompt2">* {{ registerForm.prompt2 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">Password</div>
          <div class="input_box_box" :class="{ active: registerForm.prompt3 }">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              placeholder="Please fill in the password"
              v-model="registerForm.password"
            />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="registerForm.prompt3">* {{ registerForm.prompt3 }}</div>
        </li>
        <li class="checkoutside_box ban_select" @click="readTheTreaty">
          <div>
            <div v-if="isRead"></div>
          </div>
          <div class="fontsize12">
            I have read
            <span @click="openTreaty"> "HashLand GameFi License and Service Agreement" </span>
          </div>
        </li>
        <li class="btn ban_select fontsize16" @click="toRegistered">
          <span>register</span>
          <BtnLoading :isloading="registerbtnloading"></BtnLoading>
        </li>
      </ul>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
// const mailReg = /^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$/; // 后台邮箱校验
const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // 邮箱校验
const pwReg = /^[a-zA-Z0-9]{6,16}$/; //校验密码： 6-16位字符,可包含数字，字母(区分大小写)
import { mapGetters } from "vuex";
export default {
  // props: {
  //   showLR: { type: String, default: "login" }
  // },
  data() {
    return {
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      isShowPassword: false,
      isRead: false,
      showLogin: true,
      loginForm: {
        // mailAccount: "641160771@qq.com",
        // password: "123456",
        mailAccount: "",
        password: "",
        prompt1: "",
        prompt2: "",
      },
      registerForm: {
        // mailAccount: "641160771@qq.com",
        // password: "123456",
        mailAccount: "",
        password: "",
        verifyCode: "",
        prompt1: "",
        prompt2: "",
        prompt3: "",
      },
      loginbtnloading: false,
      codebtnloading: false,
      registerbtnloading: false,
    };
  },
  computed: {
    ...mapGetters(["getAccount"]),
  },

  methods: {
    /**注册账号 */
    toRegistered() {
      if (this.registerbtnloading) return;
      if (this.registerForm.mailAccount) {
        if (mailReg.test(this.registerForm.mailAccount)) {
          this.registerForm.prompt1 = "";
        } else {
          this.registerForm.prompt1 = "Invalid email"; // 邮箱不合法
        }
      } else {
        this.registerForm.prompt1 = "please enter your email"; // 请填写邮箱
      }
      if (!this.registerForm.verifyCode) {
        this.registerForm.prompt2 = "Please fill in the verification code"; // 请填写验证码
      }
      if (this.registerForm.password) {
        if (pwReg.test(this.registerForm.password)) {
          this.registerForm.prompt3 = "";
        } else {
          this.registerForm.prompt3 = "Invalid password"; // 密码不合法
        }
      } else {
        this.registerForm.prompt3 = "Please fill in the password"; // 请填写密码
      }
      if (!this.isRead) {
        this.$common.selectLang("请先阅读条约", "Please read the treaty first", this);
      }
      if (
        this.registerForm.mailAccount &&
        this.registerForm.verifyCode &&
        this.registerForm.password &&
        mailReg.test(this.registerForm.mailAccount) &&
        pwReg.test(this.registerForm.password) &&
        this.isRead
      ) {
        this.registerbtnloading = true;
        const url = `mailAccount=${this.registerForm.mailAccount}&password=${this.registerForm.password}&verifyCode=${this.registerForm.verifyCode}`;
        this.$api
          .gameMailRegister(url)
          .then((res) => {
            // console.log("注册账号：", res.data);
            this.registerbtnloading = false;
            if (res.data.result === "SUCCESS") {
              this.firstAutoLogin(res.data.mailAccount, res.data.token);
            } else if (res.data.result === "FAIL") {
              this.$common.selectLang(res.data.msg, res.data.msg, this);
            }
          })
          .catch((err) => {
            this.registerbtnloading = false;
          });
      }
    },
    /**注册后自动登录，使用邮箱账号和token令牌 */
    firstAutoLogin(mailAccount, token) {
      const url = `mailAccount=${mailAccount}&token=${token}`;
      this.$api
        .gameMailLogin(url)
        .then((res) => {
          // console.log("注册后自动登录，使用邮箱账号和token令牌：", res.data);
          if (res.data.result === "SUCCESS") {
            localStorage.setItem("hashlandGameFiInfo", JSON.stringify(res.data));
            this.loginRegisteredSucc(res.data.mailAccount);
          } else if (res.data.result === "FAIL") {
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          }
        })
        .catch((err) => {});
    },
    /**手动登录，使用账号和密码 */
    manuallyLogin() {
      if (this.loginbtnloading) return;
      if (this.loginForm.mailAccount) {
        if (mailReg.test(this.loginForm.mailAccount)) {
          this.loginForm.prompt1 = "";
        } else {
          this.loginForm.prompt1 = "Invalid account"; // 账号不合法
        }
      } else {
        this.loginForm.prompt1 = "Please fill in the account number"; // 请填写账号
      }
      if (this.loginForm.password) {
        if (pwReg.test(this.loginForm.password)) {
          this.loginForm.prompt2 = "";
        } else {
          this.loginForm.prompt2 = "Invalid password"; // 密码不合法
        }
      } else {
        this.loginForm.prompt2 = "Please fill in the password"; // 请填写密码
      }
      if (
        this.loginForm.mailAccount &&
        this.loginForm.password &&
        mailReg.test(this.loginForm.mailAccount) &&
        pwReg.test(this.loginForm.password)
      ) {
        this.loginbtnloading = true;
        const url = `mailAccount=${this.loginForm.mailAccount}&password=${this.loginForm.password}`;
        this.$api
          .gameMailLogin(url)
          .then((res) => {
            // console.log("手动登录，使用账号和密码：", res.data);
            this.loginbtnloading = false;
            if (res.data.result === "SUCCESS") {
              localStorage.setItem("hashlandGameFiInfo", JSON.stringify(res.data));
              this.loginRegisteredSucc(res.data.mailAccount);
              // this.$router.push("/personalCenter");
            } else if (res.data.result === "FAIL") {
              this.$common.selectLang(res.data.msg, res.data.msg, this);
            }
          })
          .catch((err) => {
            this.loginbtnloading = false;
          });
      }
    },
    /**没有账号？立即注册 */
    registerNow() {
      this.showLogin = false;
    },
    /**忘记密码 */
    // forgotPassword() {
    //   this.$common.selectLang("忘记密码", "Forgot Password", this);
    // },
    /**获取验证码 */
    getCode() {
      if (this.registerForm.mailAccount) {
        if (mailReg.test(this.registerForm.mailAccount)) {
          this.registerForm.prompt1 = "";
        } else {
          this.registerForm.prompt1 = "Invalid account"; // 账号不合法
        }
      } else {
        this.registerForm.prompt1 = "Please fill in the account number"; // 请填写账号
      }
      if (this.registerForm.mailAccount && mailReg.test(this.registerForm.mailAccount)) {
        if (this.codebtnloading) return;
        this.codebtnloading = true;
        const url = `mailAccount=${this.registerForm.mailAccount}`;
        this.$api
          .gameMailCode(url)
          .then((res) => {
            // console.log("获取验证码：", res.data);
            this.codebtnloading = false;
            if (res.data.result === "SUCCESS") {
              // res.data.msg; // "已发送验证码邮件，请到邮箱中查收"
            } else if (res.data.result === "FAIL") {
              // res.data.msg; // "10分钟内只能发送一次确认码"
            }
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          })
          .catch((err) => {
            this.codebtnloading = false;
          });
      }
    },
    /**阅读条约 */
    readTheTreaty() {
      this.isRead = !this.isRead;
    },
    /**打开条约 */
    openTreaty() {
      const href = "//cdn.hashland.com/singlehtml/gameFi-register-treaty.html";
      window.open(href, "_blank");
    },
    /**是否显示密码 */
    showPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    /**登录成功，切换登录注册的状态，修改信息 */
    loginRegisteredSucc(mailAccount) {
      this.$parent.loginRegisteredStatus = true;
      this.$parent.showLoginRegistered = false;
      this.$parent.mailAccount = mailAccount;
    },
    /**公用提示框（关闭方法） closePopupPrompts */
    CloseFun() {
      this.proupDis = false;
    },
  },
};
</script>

<style lang="scss" scoped>
input {
  width: 100%;
  height: 100%;
  color: #ffffff;
  text-indent: 1em;
  background: transparent;
  border: none;
  outline: none;
}
input::-ms-input-placeholder,
input::-webkit-input-placeholder,
input::-moz-placeholder,
input:-moz-placeholder {
  color: #71787f;
  font-size: 10px !important;
}
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
  box-sizing: border-box;
  font-size: 0;
  color: #ffffff;
}
.outside_box {
  max-width: 500px;
  width: 80vw;
  position: relative;
  background: linear-gradient(rgba(139, 230, 254, 1), rgba(139, 230, 254, 0));
  box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22);
  border-radius: 14px;
  padding: 1px;
  .close {
    cursor: pointer;
    width: 40px;
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
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .input_box {
    margin: 0 auto;
    text-align: left;
    width: fit-content;
    padding-bottom: 20px;
    position: relative;
    .input_title {
      margin-bottom: 10px;
    }
    .input_prompt {
      text-align: right;
      color: #fb3e3e;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .input_box_box {
      width: 320px;
      height: 38px;
      background: rgba(11, 22, 43, 0.99);
      box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18), -2px 1px 8px 0px rgba(194, 190, 190, 0.52);
      border-radius: 18px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &.active {
        box-shadow: -2px 1px 8px 0px #fb3e3e;
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
        cursor: pointer;
        width: 40%;
        height: calc(100% * 1.2);
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url("//cdn.hashland.com/images/SpeciaBtn1.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-shadow: 0px 2px 4px #a16c28;
      }
    }
  }
  .checkoutside_box {
    width: fit-content;
    display: flex;
    align-items: center;
    margin: 20px auto;
    > div {
      cursor: pointer;
      &:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 25px;
        min-height: 25px;
        width: 25px;
        height: 25px;
        padding: 5px;
        border-radius: 50%;
        border: 1px solid #818386;
        > div {
          width: 100%;
          height: 100%;
          border-radius: 50%;
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
    cursor: pointer;
    width: 228px;
    height: 56px;
    margin: 20px auto;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-shadow: -1px 4px 4px #723104;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login_footer {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 980px) {
  .outside_box {
    .close {
      width: 0.3rem;
    }
    .in_box {
      padding: 0.3rem;
      .prompt {
        margin-bottom: 0.18rem;
      }
      .input_box {
        padding-bottom: 0.2rem;
        .input_title {
          margin-bottom: 0.1rem;
        }
        .input_prompt {
          bottom: 0.1rem;
        }
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
          width: 1.15rem;
          height: calc(100% * 1.2);
        }
      }
      .btn {
        width: 1.7rem;
        height: 0.4rem;
        line-height: 0.4rem;
      }
    }
  }
}
.checkoutside_box {
  margin: 0.2rem auto;
  > div {
    cursor: pointer;
    &:nth-child(1) {
      min-width: 0.25rem;
      min-height: 0.25rem;
      width: 0.25rem;
      height: 0.25rem;
      padding: 0.05rem;
    }
    &:nth-child(2) {
      margin-left: 0.05rem;
    }
  }
}
</style>
