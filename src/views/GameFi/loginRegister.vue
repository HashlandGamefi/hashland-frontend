<template>
  <div class="login_registered">
    <div class="outside_box">
      <img class="close" :src="`${$store.state.imgUrl}proupclose.png`" @click="closeLoginRegister" />
      <ul class="in_box" v-if="showLogin">
        <li class="header_title ban_select fontsize22">{{ $t("message.gameFi.text13") }}</li>
        <li class="logo_img"></li>
        <li class="prompt ban_select fontsize12">{{ $t("message.gameFi.text8") }}</li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text9") }}</div>
          <div class="input_box_box" :class="{ active: loginForm.prompt1 }">
            <input type="text" :placeholder="$t('message.gameFi.text10')" v-model="loginForm.mailAccount" />
          </div>
          <div class="input_prompt fontsize12" v-show="loginForm.prompt1">* {{ loginForm.prompt1 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text11") }}</div>
          <div class="input_box_box" :class="{ active: loginForm.prompt2 }">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              :placeholder="$t('message.gameFi.text12')"
              v-model="loginForm.password"
            />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="loginForm.prompt2">* {{ loginForm.prompt2 }}</div>
        </li>
        <li class="btn ban_select fontsize14" @click="manuallyLogin">
          <span>{{ $t("message.gameFi.text13") }}</span>
          <BtnLoading :isloading="loginbtnloading"></BtnLoading>
        </li>
        <!-- <li class="login_footer">
          <span class="fontsize16" @click="registerNow">
            <span>{{ $t("message.gameFi.text14") }} </span>
            <span> {{ $t("message.gameFi.text7") }}</span>
          </span>
        </li> -->
        <li>
          <span class="fontsize16">{{ $t("message.gameFi.text45") }} </span>
        </li>
      </ul>
      <ul class="in_box" v-if="!showLogin">
        <li class="header_title ban_select fontsize22">{{ $t("message.gameFi.text15") }}</li>
        <li class="logo_img"></li>
        <li class="prompt ban_select fontsize12">{{ $t("message.gameFi.text8") }}</li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text9") }}</div>
          <div class="input_box_box" :class="{ active: registerForm.prompt1 }">
            <input type="text" :placeholder="$t('message.gameFi.text10')" v-model="registerForm.mailAccount" />
          </div>
          <div class="input_prompt fontsize12" v-show="registerForm.prompt1">* {{ registerForm.prompt1 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text16") }}</div>
          <div class="input_box_box" :class="{ active: registerForm.prompt2 }">
            <input type="text" :placeholder="$t('message.gameFi.text17')" v-model="registerForm.verifyCode" />
            <div class="verification ban_select fontsize14" @click="getCode">
              <span v-if="showCountdown">{{ minutes + " : " + seconds }}</span>
              <span v-else>{{ $t("message.gameFi.text18") }}</span>
              <BtnLoading :isloading="codebtnloading"></BtnLoading>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="registerForm.prompt2">* {{ registerForm.prompt2 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text11") }}</div>
          <div class="input_box_box" :class="{ active: registerForm.prompt3 }">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              :placeholder="$t('message.gameFi.text12')"
              v-model="registerForm.password"
            />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="registerForm.prompt3">* {{ registerForm.prompt3 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text19") }}</div>
          <div class="input_box_box" :class="{ active: registerForm.prompt4 }">
            <input
              :type="isShowPassword2 ? 'text' : 'password'"
              :placeholder="$t('message.gameFi.text12')"
              v-model="registerForm.password2"
            />
            <div class="eye">
              <div @click="isShowPassword2 = !isShowPassword2" :class="{ active: isShowPassword2 }"></div>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="registerForm.prompt4">* {{ registerForm.prompt4 }}</div>
        </li>
        <li class="checkoutside_box ban_select" @click="readTheTreaty">
          <div>
            <div v-if="isRead"></div>
          </div>
          <div class="fontsize12">
            {{ $t("message.gameFi.text20") }}
            <!-- <span @click="openTreaty"> {{ $t("message.gameFi.text21") }}</span> -->
            <a href="//cdn.hashland.com/singlehtml/gameFi-register-treaty.html" target="_blank">
              {{ $t("message.gameFi.text21") }}
            </a>
          </div>
        </li>
        <li class="btn ban_select fontsize16" @click="toRegistered">
          <span>{{ $t("message.gameFi.text22") }}</span>
          <BtnLoading :isloading="registerbtnloading"></BtnLoading>
        </li>
      </ul>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/; // 邮箱输入校验
const pwReg = /^[a-zA-Z0-9]{6,16}$/; // 6-16位数字英文组合
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      isShowPassword: false,
      isShowPassword2: false,
      isRead: false,
      showLogin: true,
      loginForm: {
        mailAccount: "",
        password: "",
        prompt1: "",
        prompt2: "",
      },
      registerForm: {
        mailAccount: "",
        password: "",
        password2: "",
        verifyCode: "",
        prompt1: "",
        prompt2: "",
        prompt3: "",
        prompt4: "",
      },
      loginbtnloading: false,
      codebtnloading: false,
      registerbtnloading: false,
      showCountdown: false,
      minutes: 0,
      seconds: 0,
    };
  },
  computed: {
    ...mapGetters(["getAccount"]),
  },
  methods: {
    /**注册账号 */
    toRegistered() {
      if (this.registerbtnloading) return;
      if (!this.registerForm.mailAccount) return (this.registerForm.prompt1 = "Enter email"); // 填写邮箱
      if (!mailReg.test(this.registerForm.mailAccount)) return (this.registerForm.prompt1 = "Invalid email"); // 邮箱不合法
      this.registerForm.prompt1 = "";
      if (!this.registerForm.verifyCode) return (this.registerForm.prompt2 = "Enter verification code"); // 填写验证码
      this.registerForm.prompt2 = "";
      if (!this.registerForm.password) return (this.registerForm.prompt3 = "Enter password"); // 填写密码
      if (!pwReg.test(this.registerForm.password)) return (this.registerForm.prompt3 = "6-16 letters and numbers"); // 6-16位数字英文组合
      this.registerForm.prompt3 = "";
      if (!this.registerForm.password2) return (this.registerForm.prompt4 = "Repeat password"); // 再次填写密码
      if (!pwReg.test(this.registerForm.password2)) return (this.registerForm.prompt4 = "6-16 letters and numbers"); // 6-16位数字英文组合
      if (this.registerForm.password2 !== this.registerForm.password)
        return (this.registerForm.prompt3 = this.registerForm.prompt4 = "Password verification failed"); // 密码校验不通过
      this.registerForm.prompt3 = "";
      this.registerForm.prompt4 = "";
      if (!this.isRead) return this.$common.selectLang("请先确认条款！", "Please confirm terms first", this);

      this.registerbtnloading = true;
      const url = `mailAccount=${this.registerForm.mailAccount}&password=${this.registerForm.password}&verifyCode=${this.registerForm.verifyCode}`;
      this.$api
        .gameMailRegister(url)
        .then((res) => {
          // console.log("注册账号：", res.data);
          this.registerbtnloading = false;
          this.showCountdown = false; // console.log("倒计时结束");
          localStorage.removeItem("hashlandGameFiGetCodeEndTime");
          if (res.data.result === "SUCCESS") {
            this.firstAutoLogin(res.data.mailAccount, res.data.token);
          } else if (res.data.result === "FAIL") {
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          }
        })
        .catch((err) => {
          this.registerbtnloading = false;
        });
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
            this.loginRegisterSucc(res.data.mailAccount);
            this.$router.push("/gameFi-personalCenter");
          } else if (res.data.result === "FAIL") {
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          }
        })
        .catch((err) => {});
    },
    /**手动登录，使用账号和密码 */
    manuallyLogin() {
      if (this.loginbtnloading) return;
      if (!this.loginForm.mailAccount) return (this.loginForm.prompt1 = "Enter email"); // 填写邮箱
      if (!mailReg.test(this.loginForm.mailAccount)) return (this.loginForm.prompt1 = "Invalid email"); // 邮箱不合法
      this.loginForm.prompt1 = "";
      if (!this.loginForm.password) return (this.loginForm.prompt2 = "Enter password"); // 填写密码
      if (!pwReg.test(this.loginForm.password)) return (this.loginForm.prompt2 = "6-16 letters and numbers"); // 6-16位数字英文组合
      this.loginForm.prompt2 = "";
      this.loginbtnloading = true;
      const url = `mailAccount=${this.loginForm.mailAccount}&password=${this.loginForm.password}`;
      this.$api
        .gameMailLogin(url)
        .then((res) => {
          // console.log("手动登录，使用账号和密码：", res.data);
          this.loginbtnloading = false;
          if (res.data.result === "SUCCESS") {
            localStorage.setItem("hashlandGameFiInfo", JSON.stringify(res.data));
            this.loginRegisterSucc(res.data.mailAccount);
          } else if (res.data.result === "FAIL") {
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          }
        })
        .catch((err) => {
          this.loginbtnloading = false;
        });
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
      if (this.codebtnloading || this.showCountdown) return;
      if (!this.registerForm.mailAccount) return (this.registerForm.prompt1 = "Enter email"); // 填写邮箱
      if (!mailReg.test(this.registerForm.mailAccount)) return (this.registerForm.prompt1 = "Invalid email"); // 邮箱不合法
      this.registerForm.prompt1 = "";
      if (localStorage.getItem("hashlandGameFiGetCodeEndTime")) {
        this.showCountdown = true;
        const end = JSON.parse(localStorage.getItem("hashlandGameFiGetCodeEndTime"));
        this.countdown(end);
      } else {
        this.codebtnloading = true;
        const url = `mailAccount=${this.registerForm.mailAccount}`;
        this.$api
          .gameMailCode(url)
          .then((res) => {
            // console.log("获取验证码：", res.data);
            this.codebtnloading = false;
            if (res.data.result === "SUCCESS") {
              // res.data.msg; // "已发送验证码邮件，请到邮箱中查收"
              this.showCountdown = true;
              const end = Date.parse(new Date()) + 10 * 60 * 1000;
              localStorage.setItem("hashlandGameFiGetCodeEndTime", JSON.stringify(end));
              this.countdown(end);
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
    // openTreaty() {
    //   window.open("//cdn.hashland.com/singlehtml/gameFi-register-treaty.html", "_blank");
    // },
    /**是否显示密码 */
    showPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    /**登录成功*/
    loginRegisterSucc(mailAccount) {
      this.$parent.loginRegisterStatus = true;
      this.$parent.mailAccount = mailAccount;
      this.closeLoginRegister();
    },
    /**关闭本弹窗 */
    closeLoginRegister() {
      this.$parent.showLoginRegister = false;
      this.showCountdown = false;
    },
    //倒计时
    countdown(end) {
      const msec = end - Date.parse(new Date());
      console.log(msec);
      if (msec < 0) return;
      // let day = parseInt(msec / 1000 / 60 / 60 / 24);
      // let hr = parseInt((msec / 1000 / 60 / 60) % 24);
      let min = parseInt((msec / 1000 / 60) % 60);
      let sec = parseInt((msec / 1000) % 60);
      // this.day = day;
      // this.hr = hr > 9 ? hr : "0" + hr;
      this.minutes = min > 9 ? min : "0" + min;
      this.seconds = sec > 9 ? sec : "0" + sec;
      if (min >= 0 && sec >= 0) {
        if (min == 0 && sec == 0) {
          localStorage.removeItem("hashlandGameFiGetCodeEndTime");
          this.showCountdown = false; // console.log("倒计时结束");
          return;
        }
        setTimeout(() => {
          this.countdown(JSON.parse(localStorage.getItem("hashlandGameFiGetCodeEndTime")));
        }, 1000);
      }
    },
    /**公用提示框（关闭方法）*/
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
      width: 350px;
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
    a {
      color: #00e7f0;
      text-decoration: underline;
    }
    // span {
    //   color: #818386;
    //   text-decoration: underline;
    // }
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
      span {
        &:nth-child(2) {
          color: #00e7f0;
        }
      }
    }
  }
}

@media screen and (max-width: 980px) {
  .outside_box {
    .close {
      width: 0.3rem;
    }
    .in_box {
      padding: 0.1rem 0.3rem;
      .prompt {
        margin-bottom: 0.1rem;
      }
      .input_box {
        padding-bottom: 0.2rem;
        .input_title {
          margin-bottom: 0.05rem;
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
          width: 1.5rem;
          height: calc(100% * 1.2);
        }
      }
      .btn {
        width: 1.7rem;
        height: 0.4rem;
        line-height: 0.4rem;
        margin: 0.1rem auto;
      }
      .checkoutside_box {
        margin: 0.1rem auto;
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
    }
  }
}
</style>
