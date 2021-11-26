<template>
  <div class="page">
    <ul>
      <li>个人中心</li>
      <li>快速修改密码等安全设置</li>
      <li>
        <span>昵称：</span>
        <span>{{ nickName }}</span>
      </li>
      <li>
        <span>邮箱绑定：</span>
        <span>{{ mailAccount }}</span>
      </li>
      <li>
        <span>绑定钱包地址：</span>
        <span>{{ 1 }}</span>
      </li>
      <li>
        <span>请先绑定钱包地址</span>
        <span @click="bindingThePurse">点击绑定</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hc, hn, token, getSigner } from "hashland-sdk";
export default {
  data() {
    return {
      nickName: "",
      mailAccount: "",
      walletAddresses: [],
    };
  },
  computed: {
    ...mapGetters(["getAccount"]),
  },
  created() {
    // if (!localStorage.getItem("loginInfo")) return;
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.mailAccount = loginInfo.mailAccount;
    this.walletAddresses = loginInfo.walletAddresses;
    if (this.walletAddresses !== 3) {
      // 显示绑定按钮
    } else {
      // 不显示绑定按钮
    }
  },
  methods: {
    /**绑定钱包 */
    bindingThePurse() {
      // if (!localStorage.getItem("loginInfo")) return;
      const haveThisWallet = this.walletAddresses.some(
        (item) => item === this.getAccount
      );
      if (haveThisWallet)
        return console.log("这个钱包已经绑定了，请切换钱包！");

      const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
      getSigner()
        .signMessage(loginInfo.nonce)
        .then((signature) => {
          console.log("💥 ~ nonce", loginInfo.nonce);
          console.log("💥 ~ 邮箱账号", loginInfo.mailAccount);
          console.log("💥 ~ 钱包地址", this.getAccount);
          console.log("💥 ~ 前端签名", signature);
          // walletAddress // 请求时传入的绑定钱包地址  this.getAccount
          const url = `http://vov2021.mynatapp.cc/va_cent/bind_wallet?mailAccount=${loginInfo.mailAccount}&walletAddress=${this.getAccount}&signature=${signature}`;
          this.$axios.get(url).then((res) => {
            console.log("💥 ~ 绑定钱包结果", res.data);
            if (res.data.result === "SUCCESS") {
            } else if (res.data.result === "FAIL") {
            }
          });
        })
        .catch((err) => {});
    },
  },
};
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
      &:nth-child(5),
      &:nth-child(6) {
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
            min-width: 8em;
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
        &:nth-child(5),
        &:nth-child(6) {
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
