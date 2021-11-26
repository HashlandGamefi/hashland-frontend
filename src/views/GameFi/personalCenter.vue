<template>
  <div class="page">
    <div>
      <div class="tiile">个人中心</div>
      <div class="tiile title_small">快速修改密码等安全设置</div>
      <ul>
        <li>
          <span>昵称：</span>
          <span>{{ nickName }}</span>
        </li>
        <li>
          <span>邮箱绑定：</span>
          <span>{{ mailAccount }}</span>
        </li>
        <template v-if="walletAddresses.length > 0">
          <li v-for="(item, index) in walletAddresses" :key="item">
            <span>钱包地址{{ index + 1 }}：</span>
            <span>{{ item }}</span>
          </li>
        </template>
      </ul>
      <div
        class="btn_img ban_select fontsize14"
        v-if="walletAddresses.length < 3"
        @click="bindingThePurse"
      >
        点击绑定钱包地址
      </div>
    </div>
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
    if (!localStorage.getItem("loginInfo")) return;
    const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    this.mailAccount = loginInfo.mailAccount;
    this.walletAddresses = loginInfo.walletAddresses;
  },
  methods: {
    /**绑定钱包 */
    bindingThePurse() {
      if (!localStorage.getItem("loginInfo")) return;
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
  padding: 150px 0 0 0;
  overflow: auto;
  .tiile {
    text-align: center;
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 40px;
  }
  .title_small {
    font-size: 12px;
    font-weight: 400;
  }
  ul {
    width: 845px;
    li {
      overflow: hidden;
      padding: 30px 0;
      font-size: 22px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
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
          min-width: 6em;
        }
        &:nth-child(2) {
          width: 80%;
          min-width: calc(100% - 6em);
          text-align: center;
        }
      }
    }
  }
  .btn_img {
    width: fit-content;
    margin: 30px auto;
    padding: 30px 40px;
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
@media screen and (min-width: 981px) {
}
@media screen and (max-width: 980px) {
  .page {
    padding: 80px 0 0 0;
    .tiile {
      font-size: 18px;
    }
    .title_small {
      font-size: 10px;
    }
    ul {
      width: 90vw;
      li {
        overflow: hidden;
        font-size: 14px;
        span {
          &:nth-child(1) {
            width: 20%;
            min-width: 6em;
          }
        }
      }
    }
    .btn_img {
      padding: 20px 30px;
    }
  }
}
</style>
