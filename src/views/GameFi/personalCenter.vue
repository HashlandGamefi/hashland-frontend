<template>
  <div class="page">
    <div class="main">
      <img class="return_img" :src="`${$store.state.imgUrl}proupclose.png`" @click="returnToPreviousPage" />
      <div class="main_tiile fontsize32">{{ $t("message.gameFi.text1") }}</div>
      <ul class="fontsize18">
        <li>
          <span>{{ $t("message.gameFi.text9") }}: </span>
          <span>{{ mailAccount | mailEllipsis }}</span>
        </li>
        <template v-if="walletAddresses.length > 0">
          <li v-for="(item, index) in walletAddresses" :key="item">
            <span v-if="index == 0">{{ $t("message.gameFi.text41") }}: </span>
            <span v-else>{{ $t("message.gameFi.text29") }} {{ index + 1 }}: </span>
            <span>{{ item | ellipsis }}</span>
          </li>
        </template>
      </ul>
      <div class="btn_img ban_select fontsize14" v-if="walletAddresses.length < 3" @click="bindingThePurse">
        <span>{{ $t("message.gameFi.text30") }}</span>
        <BtnLoading :isloading="bindingloading"></BtnLoading>
      </div>
      <div class="prompt_list fontsize12">
        <p>{{ $t("message.gameFi.text31") }}:</p>
        <p>{{ $t("message.gameFi.text42") }}</p>
        <p>{{ $t("message.gameFi.text43") }}</p>
        <p>{{ $t("message.gameFi.text44") }}</p>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSigner } from "hashland-sdk";
export default {
  data() {
    return {
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      nickName: "",
      mailAccount: "",
      walletAddresses: [],
      bindingloading: false,
    };
  },
  computed: {
    ...mapGetters(["getAccount"]),
  },
  created() {
    this.againAutoLogin();
  },
  methods: {
    /**再次自动登录 */
    againAutoLogin() {
      if (!localStorage.getItem("hashlandGameFiInfo")) return;
      const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
      if (gameFiInfo.mailAccount && gameFiInfo.newToken) {
        const url = `mailAccount=${gameFiInfo.mailAccount}&token=${gameFiInfo.newToken}`;
        this.$api
          .gameMailLogin(url)
          .then((res) => {
            if (res.data.result === "SUCCESS") {
              this.mailAccount = res.data.mailAccount;
              this.walletAddresses = res.data.walletAddresses;
              localStorage.setItem("hashlandGameFiInfo", JSON.stringify(res.data));
            } else if (res.data.result === "FAIL") {
              this.$common.selectLang(res.data.msg, res.data.msg, this);
            }
          })
          .catch((err) => {
            console.log("againAutoLogin", err);
          });
      }
    },
    /**绑定钱包 */
    bindingThePurse() {
      if (!localStorage.getItem("hashlandGameFiInfo")) return this.$common.selectLang("请先登录！", "please log in first!", this);
      if (!this.getAccount || this.getAccount == "no") return this.$common.selectLang("请连接钱包！", "Please connect to the wallet!", this);
      if (this.walletAddresses.some((item) => item === this.getAccount))
        return this.$common.selectLang("该钱包已绑定，请切换其他钱包！", "This wallet has been bound, please switch to another wallet!", this);
      if (this.bindingloading) return;
      this.bindingloading = true;
      const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
      // console.log("邮箱账号：", gameFiInfo.mailAccount);
      // console.log("钱包地址1：", this.getAccount);
      // console.log("nonce：", gameFiInfo.nonce);
      getSigner()
        .signMessage(gameFiInfo.nonce)
        .then((signature) => {
          // console.log("钱包地址2：", this.getAccount);
          if (!this.getAccount || this.getAccount == "no") {
            this.bindingloading = false;
            this.$common.selectLang("请连接钱包！", "Please connect to the wallet!", this);
            return;
          }
          // console.log("前端签名：", signature);
          const url = `mailAccount=${gameFiInfo.mailAccount}&walletAddress=${this.getAccount.toLowerCase()}&signature=${signature}`;
          this.$api
            .gameBindWallet(url)
            .then((res) => {
              this.bindingloading = false;
              // console.log("绑定钱包结果", res.data);
              if (res.data.result === "SUCCESS") {
                this.againAutoLogin();
              } else if (res.data.result === "FAIL") {
                this.$common.selectLang(res.data.msg, res.data.msg, this);
              }
            })
            .catch((err) => {
              console.log("gameBindWallet", err);
              this.bindingloading = false;
            });
        })
        .catch((err) => {
          console.log("signMessage", err);
          this.bindingloading = false;
        });
    },
    /**返回上一页 */
    returnToPreviousPage() {
      // this.$router.push("/gameFi");
      history.back();
    },
    /**公用提示框（关闭方法）*/
    CloseFun() {
      this.proupDis = false;
    },
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      const index = value.length;
      return value.slice(0, 6) + "..." + value.slice(index - 4, index);
    },
    mailEllipsis(value) {
      if (!value) return "";
      const index = value.length;
      const index2 = value.indexOf("@");
      return value.slice(0, 2) + "***" + value.slice(index2, index);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding-top: 130px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  color: #fff;
  font-size: 0;

  .main {
    position: relative;
    .return_img {
      cursor: pointer;
      width: 50px;
      height: auto;
      position: absolute;
      top: -25px;
      right: -50px;
    }
  }
  .main_tiile {
    text-align: center;
    padding: 20px 0;
  }
  .prompt_list {
    margin: 30px 0;
  }
  ul {
    li {
      display: flex;
      padding: 20px 0;
      overflow: hidden;
      border-bottom: 1px solid;
      border-image: linear-gradient(22deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
      &:last-child {
        border-bottom: none;
      }
      span {
        text-align: center;
        &:nth-child(1) {
          width: 35%;
        }
        &:nth-child(2) {
          width: 65%;
        }
      }
    }
  }
  .btn_img {
    cursor: pointer;
    width: fit-content;
    line-height: 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: url("//cdn.hashland.com/images/SpeciaBtn2.png") no-repeat center;
    background-size: 100% auto;
    text-shadow: 0px 2px 4px #a16c28;
  }
}
@media screen and (max-width: 980px) {
  .page {
    padding: 80px 5vw 0 5vw;
    .main {
      position: relative;
      .return_img {
        cursor: pointer;
        width: 0.4rem;
        height: auto;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .main_tiile {
      text-align: center;
      padding: 2vw 0;
    }
    .prompt_list {
      margin: 3vw 0;
    }
    ul {
      font-size: 12px;
      li {
        padding: 5vw 0;
      }
    }
    .btn_img {
      width: fit-content;
      line-height: 25vw;
    }
  }
}
</style>
