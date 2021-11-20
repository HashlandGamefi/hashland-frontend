<template>
  <div class="login_registered" @click.self="closeLR">
    <div class="outside_box">
      <img
        class="close"
        :src="`${$store.state.imgUrl}proupclose.png`"
        @click="closeLR"
      />
      <ul class="in_box" v-if="showLOrR == 'login'">
        <li class="header_title ban_select">账号登录</li>
        <li class="logo_img"></li>
        <li class="prompt ban_select">仅限于游戏</li>
        <li class="input_box">
          <div class="input_title">账号</div>
          <div class="input_box_box">
            <input type="text" placeholder="请输入邮箱或手机" />
          </div>
        </li>
        <li class="input_box">
          <div class="input_title">密码</div>
          <div class="input_box_box">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              placeholder="请输入密码"
            />
            <div class="eye">
              <div
                @click="isShowPassword = !isShowPassword"
                :class="{ active: isShowPassword }"
              ></div>
            </div>
          </div>
        </li>
        <li class="btn login_btn ban_select">登录</li>
        <li class="login_footer ban_select">
          <span>没有账号？立即注册</span> <span>忘记密码</span>
        </li>
      </ul>
      <ul class="in_box" v-if="showLOrR == 'registered'">
        <li class="header_title ban_select">账号注册</li>
        <li class="logo_img"></li>
        <li class="prompt ban_select">账号注册</li>
        <li class="input_box">
          <div class="input_title">邮箱</div>
          <div class="input_box_box">
            <input type="text" placeholder="请输入邮箱" />
          </div>
        </li>
        <li class="input_box">
          <div class="input_title">验证码</div>
          <div class="input_box_box">
            <input type="text" placeholder="请输入验证码" />
            <div class="verification ban_select">获取</div>
          </div>
        </li>
        <li class="input_box">
          <div class="input_title">密码</div>
          <div class="input_box_box">
            <input
              :type="isShowPassword ? 'text' : 'password'"
              placeholder="请输入密码"
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
          <div>我已阅读了《某某某条约》</div>
        </li>
        <li class="btn registered_btn ban_select">注册</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showLOrR: {
      type: String,
      default: "login",
    },
  },
  data() {
    return {
      isShowPassword: false,
      isRead: false,
    };
  },
  created() {
    console.log(this.showLOrR);
  },
  methods: {
    showPassword() {
      this.isShowPassword = !this.isShowPassword;
    },
    /**关闭弹窗 */
    closeLR() {
      this.$parent.closeLoginOrRegistered();
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
  border-radius: 14px;
  padding: 1px;
  position: relative;
  box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38),
    -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
  background: linear-gradient(180deg, #8be6fe 0%, rgba(139, 230, 254, 0) 100%);

  .close {
    cursor: pointer;
    width: 70px;
    height: auto;
    position: absolute;
    top: -100px;
    right: -100px;
  }
}
.in_box {
  width: 100%;
  height: 100%;
  border-radius: 14px;
  background: #011a31;
  padding: 30px 80px;
  text-align: center;
  > .header_title {
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
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
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .input_box {
    text-align: left;
    margin: 0 auto;
    margin-bottom: 30px;
    width: fit-content;
    .input_title {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
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
        font-size: 14px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
      }
      input:-ms-input-placeholder,
      input::-webkit-input-placeholder,
      input::-moz-placeholder,
      input:-moz-placeholder {
        font-size: 12px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
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
        height: calc(38px * 1.2);
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url("//cdn.hashland.com/images/SpeciaBtn1.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        cursor: pointer;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
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
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
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
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
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
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      cursor: pointer;
    }
  }
}
@media screen and (min-width: 981px) and (max-width: 1439px) {
}
</style>
