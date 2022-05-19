<template>
  <div class="login_registered">
    <div class="outside_box">
      <img class="close" :src="`${$store.state.imgUrl}proupclose.png`" @click="closeLoginRegister" />
      <!-- 登录窗口 -->
      <ul class="in_box" v-if="showLogin == 1">
        <li class="header_title fontsize22">{{ $t("message.gameFi.text13") }}</li>
        <li class="logo_img"></li>
        <li class="prompt fontsize12">{{ $t("message.gameFi.text8") }}</li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text9") }}</div>
          <div class="input_box_box" :class="{ active: loginForm.prompt1 }">
            <input type="text" :placeholder="$t('message.gameFi.text10')" v-model.trim="loginForm.mailAccount" @keyup.enter="manuallyLogin" />
          </div>
          <div class="input_prompt fontsize12" v-show="loginForm.prompt1">* {{ loginForm.prompt1 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text11") }}</div>
          <div class="input_box_box" :class="{ active: loginForm.prompt2 }">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              :placeholder="$t('message.gameFi.text12')"
              v-model.trim="loginForm.password"
              @keyup.enter="manuallyLogin"
            />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="loginForm.prompt2">* {{ loginForm.prompt2 }}</div>
        </li>
        <li class="btn fontsize14" @click="manuallyLogin">
          <span>{{ $t("message.gameFi.text13") }}</span>
          <BtnLoading :isloading="loginbtnloading"></BtnLoading>
        </li>
        <li class="login_footer fontsize14">
          <span class="register_entrance">
            <span @click="registerNow">{{ $t("message.gameFi.text108") }} </span>
            <span @click="forgotPassword"> {{ $t("message.gameFi.text109") }}?</span>
          </span>
        </li>
      </ul>
      <!-- 注册窗口 -->
      <ul class="in_box" v-if="showLogin == 2">
        <li class="header_title fontsize22">{{ $t("message.gameFi.text15") }}</li>
        <li class="logo_img"></li>
        <li class="prompt fontsize12">{{ $t("message.gameFi.text8") }}</li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text9") }}</div>
          <div class="input_box_box" :class="{ active: registerForm.prompt1 }">
            <input type="text" :placeholder="$t('message.gameFi.text10')" v-model.trim="registerForm.mailAccount" @keyup.enter="toRegistered" />
          </div>
          <div class="input_prompt fontsize12" v-show="registerForm.prompt1">* {{ registerForm.prompt1 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text16") }}</div>
          <div class="input_box_box" :class="{ active: registerForm.prompt2 }">
            <input type="text" :placeholder="$t('message.gameFi.text17')" v-model.trim="registerForm.verifyCode" @keyup.enter="toRegistered" />
            <div class="verification fontsize14" @click="registerGetCode">
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
              v-model.trim="registerForm.password"
              @keyup.enter="toRegistered"
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
              :type="isShowPassword ? 'text' : 'password'"
              :placeholder="$t('message.gameFi.text12')"
              v-model.trim="registerForm.password2"
              @keyup.enter="toRegistered"
            />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="registerForm.prompt4">* {{ registerForm.prompt4 }}</div>
        </li>
        <li class="checkoutside_box" @click="readTheTreaty">
          <div><div v-if="isRead"></div></div>
          <div class="fontsize12">
            {{ $t("message.gameFi.text20") }}
            <a href="//cdn.hashland.com/singlehtml/gameFi-register-treaty.html" target="_blank">
              {{ $t("message.gameFi.text21") }}
            </a>
          </div>
        </li>
        <li class="btn fontsize16" @click="toRegistered">
          <span>{{ $t("message.gameFi.text22") }}</span>
          <BtnLoading :isloading="registerbtnloading"></BtnLoading>
        </li>
      </ul>
      <!-- 重置密码窗口 -->
      <ul class="in_box" v-if="showLogin == 3">
        <li class="header_title fontsize22">{{ $t("message.gameFi.text109") }}</li>
        <li class="logo_img"></li>
        <li class="prompt fontsize12">{{ $t("message.gameFi.text8") }}</li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text9") }}</div>
          <div class="input_box_box" :class="{ active: resetForm.prompt1 }">
            <input type="text" :placeholder="$t('message.gameFi.text10')" v-model.trim="resetForm.mailAccount" @keyup.enter="toReset" />
          </div>
          <div class="input_prompt fontsize12" v-show="resetForm.prompt1">* {{ resetForm.prompt1 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text16") }}</div>
          <div class="input_box_box" :class="{ active: resetForm.prompt2 }">
            <input type="text" :placeholder="$t('message.gameFi.text17')" v-model.trim="resetForm.verifyCode" @keyup.enter="toReset" />
            <div class="verification fontsize14" @click="resetGetCode">
              <span v-if="showCountdown">{{ minutes + " : " + seconds }}</span>
              <span v-else>{{ $t("message.gameFi.text18") }}</span>
              <BtnLoading :isloading="codebtnloading"></BtnLoading>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="resetForm.prompt2">* {{ resetForm.prompt2 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text11") }}</div>
          <div class="input_box_box" :class="{ active: resetForm.prompt3 }">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              :placeholder="$t('message.gameFi.text12')"
              v-model.trim="resetForm.password"
              @keyup.enter="toReset"
            />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="resetForm.prompt3">* {{ resetForm.prompt3 }}</div>
        </li>
        <li class="input_box fontsize16">
          <div class="input_title">{{ $t("message.gameFi.text19") }}</div>
          <div class="input_box_box" :class="{ active: resetForm.prompt4 }">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              :placeholder="$t('message.gameFi.text12')"
              v-model.trim="resetForm.password2"
              @keyup.enter="toReset"
            />
            <div class="eye">
              <div @click="isShowPassword = !isShowPassword" :class="{ active: isShowPassword }"></div>
            </div>
          </div>
          <div class="input_prompt fontsize12" v-show="resetForm.prompt4">* {{ resetForm.prompt4 }}</div>
        </li>
        <li class="btn fontsize16" @click="toReset">
          <span>{{ $t("message.gameFi.text110") }}</span>
          <BtnLoading :isloading="resetbtnloading"></BtnLoading>
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
      showLogin: 1,
      isShowPassword: false,
      isRead: false,
      loginbtnloading: false,
      registerbtnloading: false,
      resetbtnloading: false,
      codebtnloading: false,
      showCountdown: false,
      minutes: 0,
      seconds: 0,

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
      resetForm: {
        mailAccount: "",
        password: "",
        password2: "",
        verifyCode: "",
        prompt1: "",
        prompt2: "",
        prompt3: "",
        prompt4: "",
      },
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
          this.registerbtnloading = false;
          this.showCountdown = false; // console.log("倒计时结束");
          localStorage.removeItem("hashlandGameFiRegisterGetCode");
          if (res.data.result === "SUCCESS") {
            this.firstAutoLogin(res.data.mailAccount, res.data.token);
          } else if (res.data.result === "FAIL") {
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          }
        })
        .catch(() => {
          this.registerbtnloading = false;
        });
    },
    /**注册后自动登录，使用邮箱账号和token令牌 */
    firstAutoLogin(mailAccount, token) {
      const url = `mailAccount=${mailAccount}&token=${token}`;
      this.$api.gameMailLogin(url).then((res) => {
        if (res.data.result === "SUCCESS") {
          localStorage.setItem("hashlandGameFiInfo", JSON.stringify(res.data));
          this.loginRegisterSucc(res.data.mailAccount);
          this.$router.push("/gameFi-personalCenter");
        } else if (res.data.result === "FAIL") {
          this.$common.selectLang(res.data.msg, res.data.msg, this);
        }
      });
    },
    /**注册获取验证码 */
    registerGetCode() {
      if (this.codebtnloading || this.showCountdown) return;
      if (!this.registerForm.mailAccount) return (this.registerForm.prompt1 = "Enter email"); // 填写邮箱
      if (!mailReg.test(this.registerForm.mailAccount)) return (this.registerForm.prompt1 = "Invalid email"); // 邮箱不合法
      this.registerForm.prompt1 = "";
      if (localStorage.getItem("hashlandGameFiRegisterGetCode")) {
        const end = JSON.parse(localStorage.getItem("hashlandGameFiRegisterGetCode"));
        const msec = end - Date.parse(new Date());
        if (msec <= 0) {
          localStorage.removeItem("hashlandGameFiRegisterGetCode");
          this.registerGetCode();
        } else {
          this.showCountdown = true;
          this.countdownFun("register", end);
        }
      } else {
        this.codebtnloading = true;
        const url = `codeType=register&mailAccount=${this.registerForm.mailAccount}`;
        this.$api
          .gameMailCode(url)
          .then((res) => {
            this.codebtnloading = false;
            if (res.data.result === "SUCCESS") {
              this.showCountdown = true;
              const end = Date.parse(new Date()) + 10 * 60 * 1000;
              localStorage.setItem("hashlandGameFiRegisterGetCode", JSON.stringify(end));
              this.countdownFun("register", end);
            }
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          })
          .catch(() => {
            this.codebtnloading = false;
          });
      }
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
          this.loginbtnloading = false;
          if (res.data.result === "SUCCESS") {
            localStorage.setItem("hashlandGameFiInfo", JSON.stringify(res.data));
            this.loginRegisterSucc(res.data.mailAccount);
          } else if (res.data.result === "FAIL") {
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          }
        })
        .catch(() => {
          this.loginbtnloading = false;
        });
    },

    // 5、重置密码接口 请求 url: http://center服域名:端口号/va_cent/password_reset
    // 请求示例：http://vov2021.mynatapp.cc/va_cent/password_reset?mailAccount=123456@163.com&password=123456&verifyCode=123456
    // 请求参数：mailAccount 邮箱账号   password重置后的密码  verifyCode邮箱获取到的验证码
    // 返回参数：
    //  result(值为SUCCESS注册成功  FAIL注册失败) msg (注册失败相关提示语)
    //  发送成功时会返回以下参数：
    //  mailAccount邮箱账号  password密码
    // get_mail_code  增加一个参数  codeType ( 注册获取验证码传入 register  重置密码获取验证码传入 passwordReset )

    /**重置密码 */
    toReset() {
      if (this.resetbtnloading) return;
      if (!this.resetForm.mailAccount) return (this.resetForm.prompt1 = "Enter email"); // 填写邮箱
      if (!mailReg.test(this.resetForm.mailAccount)) return (this.resetForm.prompt1 = "Invalid email"); // 邮箱不合法
      this.resetForm.prompt1 = "";
      if (!this.resetForm.verifyCode) return (this.resetForm.prompt2 = "Enter verification code"); // 填写验证码
      this.resetForm.prompt2 = "";
      if (!this.resetForm.password) return (this.resetForm.prompt3 = "Enter password"); // 填写密码
      if (!pwReg.test(this.resetForm.password)) return (this.resetForm.prompt3 = "6-16 letters and numbers"); // 6-16位数字英文组合
      this.resetForm.prompt3 = "";
      if (!this.resetForm.password2) return (this.resetForm.prompt4 = "Repeat password"); // 再次填写密码
      if (!pwReg.test(this.resetForm.password2)) return (this.resetForm.prompt4 = "6-16 letters and numbers"); // 6-16位数字英文组合
      if (this.resetForm.password2 !== this.resetForm.password)
        return (this.resetForm.prompt3 = this.resetForm.prompt4 = "Password verification failed"); // 密码校验不通过
      this.resetForm.prompt3 = "";
      this.resetForm.prompt4 = "";
      this.resetbtnloading = true;
      const url = `mailAccount=${this.resetForm.mailAccount}&password=${this.resetForm.password}&verifyCode=${this.resetForm.verifyCode}`;
      this.$api
        .gameResetPassword(url)
        .then((res) => {
          this.resetbtnloading = false;
          this.showCountdown = false;
          localStorage.removeItem("hashlandGameFiResetGetCode");
          if (res.data.result === "SUCCESS") {
            this.isShowPassword = false;
            this.showLogin = 1;
            this.loginForm.mailAccount = res.data.mailAccount;
            this.loginForm.password = res.data.password;
          } else if (res.data.result === "FAIL") {
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          }
        })
        .catch(() => {
          this.resetbtnloading = false;
        });
    },

    /**重置验证码 */
    resetGetCode() {
      if (this.codebtnloading || this.showCountdown) return;
      if (!this.resetForm.mailAccount) return (this.resetForm.prompt1 = "Enter email"); // 填写邮箱
      if (!mailReg.test(this.resetForm.mailAccount)) return (this.resetForm.prompt1 = "Invalid email"); // 邮箱不合法
      this.resetForm.prompt1 = "";
      if (localStorage.getItem("hashlandGameFiResetGetCode")) {
        const end = JSON.parse(localStorage.getItem("hashlandGameFiResetGetCode"));
        const msec = end - Date.parse(new Date());
        if (msec <= 0) {
          localStorage.removeItem("hashlandGameFiResetGetCode");
          this.resetGetCode();
        } else {
          this.showCountdown = true;
          this.countdownFun("passwordReset", end);
        }
      } else {
        this.codebtnloading = true;
        const url = `codeType=passwordReset&mailAccount=${this.resetForm.mailAccount}`;
        this.$api
          .gameMailCode(url)
          .then((res) => {
            this.codebtnloading = false;
            if (res.data.result === "SUCCESS") {
              this.showCountdown = true;
              const end = Date.parse(new Date()) + 10 * 60 * 1000;
              localStorage.setItem("hashlandGameFiResetGetCode", JSON.stringify(end));
              this.countdownFun("passwordReset", end);
            }
            this.$common.selectLang(res.data.msg, res.data.msg, this);
          })
          .catch(() => {
            this.codebtnloading = false;
          });
      }
    },

    /**登录成功*/
    loginRegisterSucc(mailAccount) {
      localStorage.removeItem("hashlandGameFiRegisterGetCode");
      localStorage.removeItem("hashlandGameFiResetGetCode");
      this.$parent.loginRegisterStatus = true;
      this.$parent.mailAccount = mailAccount;
      this.closeLoginRegister();
      document.querySelector("#gamefi_top").scrollIntoView(true);
      this.$parent.isShowRewardRanking = false;
      this.$nextTick(() => {
        this.$parent.isShowRewardRanking = true;
      });
    },
    /**倒计时 */
    countdownFun(type, end) {
      const msec = end - Date.parse(new Date());
      // if (msec < 0) return;
      if (msec <= 0) {
        this.removeItemGetCode(type);
      } else {
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
            this.removeItemGetCode(type);
          } else {
            setTimeout(() => {
              if (type == "register") {
                this.countdownFun(type, JSON.parse(localStorage.getItem("hashlandGameFiRegisterGetCode")));
              } else if (type == "passwordReset") {
                this.countdownFun(type, JSON.parse(localStorage.getItem("hashlandGameFiResetGetCode")));
              }
            }, 1000);
          }
        }
      }
    },
    /**倒计时结束移除 */
    removeItemGetCode(type) {
      if (type == "register") {
        localStorage.removeItem("hashlandGameFiRegisterGetCode");
        this.showCountdown = false;
      } else if (type == "passwordReset") {
        localStorage.removeItem("hashlandGameFiResetGetCode");
        this.showCountdown = false;
      }
    },
    /**立即注册 */
    registerNow() {
      this.isShowPassword = false;
      this.showLogin = 2;
      this.registerForm = {
        mailAccount: "",
        password: "",
        password2: "",
        verifyCode: "",
        prompt1: "",
        prompt2: "",
        prompt3: "",
        prompt4: "",
      };
    },
    /**忘记密码 */
    forgotPassword() {
      this.isShowPassword = false;
      this.showLogin = 3;
      this.resetForm = {
        mailAccount: "",
        password: "",
        password2: "",
        verifyCode: "",
        prompt1: "",
        prompt2: "",
        prompt3: "",
        prompt4: "",
      };
    },
    /**阅读条约 */
    readTheTreaty() {
      this.isRead = !this.isRead;
    },
    /**关闭本弹窗 */
    closeLoginRegister() {
      this.showCountdown = false;
      this.$parent.showLoginRegister = false;
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
  padding: 30px 0;
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
    .register_entrance {
      display: flex;
      align-items: center;
      justify-content: space-around;
      span {
        cursor: pointer;
        font-weight: 100;
        text-decoration: underline;
        &:hover {
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
