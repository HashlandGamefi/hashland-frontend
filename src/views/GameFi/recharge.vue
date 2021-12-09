<template>
  <div class="mask_layer" @click.self="closeCurrentPage">
    <div class="outline_box">
      <img class="close" :src="`${$store.state.imgUrl}proupclose.png`" @click="closeCurrentPage" />
      <div class="inside_box">
        <div class="inside_box_title fontsize30">Recharge</div>
        <ul>
          <li>
            <div>
              <img :src="`${$store.state.imgUrl}personalCenter2.png`" />
              <span class="fontsize12"> {{ mailAccount }} </span>
            </div>
            <div @click="getHC">
              <span class="fontsize12">Get HC</span>
              <img :src="`${$store.state.imgUrl}buy_hclp.png`" />
            </div>
          </li>
          <li>
            <div class="fontsize18 li_title">Recharge amount:</div>
            <div class="input_box_box">
              <input
                type="text"
                placeholder="Please fill in HC values"
                v-model="HCValue"
                @input="
                  HCValue = HCValue.replace(/[^\d.]/g, '')
                    .replace(/\.{2,}/g, '.')
                    .replace('.', '$#$')
                    .replace(/\./g, '')
                    .replace('$#$', '.')
                    .replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3')
                    .replace(/^\./g, '')
                "
              />
              <div class="ban_select fontsize18 input_btn" @click="getMaxHC">
                <span>MAX</span>
                <BtnLoading :isloading="getmaxbtnloading"></BtnLoading>
              </div>
            </div>
          </li>
          <li>
            <div class="fontsize18 li_title">Fill in quickly:</div>
            <div class="quick_input">
              <div class="fontsize14" v-for="item in quickInput" :key="item" @click="quickInputHC(item)">
                {{ item }}HC
              </div>
            </div>
          </li>
          <li>
            <div class="enter_btn fontsize18">
              <Btn
                ref="mychild"
                :word="'Recharge'"
                :isapprove="isapprove"
                :approveloading="buy_isloading"
                :isloading="buy_isloading"
                @sonapprove="toAuthorization"
                @dosomething="toRecharge"
              />
            </div>
          </li>
        </ul>
        <div class="recharge_instructions">
          <div class="fontsize16">Recharge instructions:</div>
          <div class="instructions fontsize12"><span></span><span>1HC=10000 diamonds</span></div>
          <div class="instructions fontsize12"><span></span><span>Once recharged, it cannot be cancelled</span></div>
          <div class="instructions fontsize12">
            <span></span
            ><span>The recharge is complete, it will take some time to sync to the game, please wait patiently</span>
          </div>
        </div>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { erc20, token, util, getSigner, hwDeposit, contract } from "hashland-sdk";
export default {
  data() {
    return {
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      quickInput: [4, 16, 32, 64],
      mailAccount: "",
      HCValue: null,
      getmaxbtnloading: false,
      isapprove: false, //是否授权
      buy_isloading: false, // 按钮loading
    };
  },
  watch: {
    getIstrue: {
      handler: function (newValue) {
        if (newValue) {
          setTimeout(() => {
            this.$refs.mychild.isApproveFun("hc", contract().HWDeposit).then((res) => {
              this.isapprove = res;
            });
          }, 1000);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["getAccount", "getIstrue"]),
  },
  created() {
    const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
    this.mailAccount = gameFiInfo.mailAccount;
  },
  methods: {
    /**获取钱包内最大HC */
    getMaxHC() {
      this.getmaxbtnloading = true;
      erc20(token().HC)
        .balanceOf(this.getAccount)
        .then((res) => {
          const num = util.formatEther(res);
          this.HCValue = this.keep4DecimalPlaces(num);
          this.getmaxbtnloading = false;
        })
        .catch((err) => {
          this.getmaxbtnloading = false;
        });
    },
    /**授权 */
    toAuthorization() {
      if (this.buy_isloading) return;
      this.buy_isloading = true;
      this.$refs.mychild
        .goApproveFun("hc", contract().HWDeposit)
        .then((res) => {
          this.buy_isloading = false;
          this.isapprove = true;
        })
        .catch((err) => {
          this.isapprove = false;
          this.buy_isloading = false;
        });
    },
    /**确认充值 */
    toRecharge() {
      if (this.buy_isloading) return;
      if (!this.HCValue)
        return this.$common.selectLang("请输入您要充值的金额", "Please fill in the amount you want to top up", this);
      this.buy_isloading = true;
      const amount = this.$common.convertNormalToBigNumber(this.HCValue, 18);
      hwDeposit()
        .connect(getSigner())
        .deposit(amount)
        .then(async (res) => {
          const etReceipt = await res.wait();
          if (etReceipt.status == 1) {
            this.buy_isloading = false;
            this.$common.selectLang("充值成功", "Top up successfully", this);
            // this.closeCurrentPage();
            this.HCValue = null;
          } else {
            this.buy_isloading = false;
          }
        })
        .catch((err) => {
          this.buy_isloading = false;
        });
    },
    getHC() {
      window.location.href = `https://pancakeswap.finance/add/${token().HC}/${token().BUSD}`;
    },
    /**快捷输入 */
    quickInputHC(num) {
      this.HCValue = this.keep4DecimalPlaces(num);
    },
    keep4DecimalPlaces(num) {
      return Number(String(num).replace(/^(.*\..{4}).*$/, "$1"));
    },
    /**关闭当前弹窗 */
    closeCurrentPage() {
      this.$parent.showRecharge = false;
    },
    /**公用提示框（关闭方法） closePopupPrompts */
    CloseFun() {
      this.proupDis = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mask_layer {
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
  .outline_box {
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
    .inside_box {
      width: 80vw;
      max-width: 580px;
      height: 100%;
      border-radius: 14px;
      background: linear-gradient(180deg, #010f20 0%, #021c3b 100%);
      padding: 30px;
      .inside_box_title {
        color: #fff;
        text-align: center;
      }
      ul {
        li {
          padding: 10px 0;
          &:nth-child(1) {
            display: flex;
            align-items: center;
            justify-content: space-between;
            div {
              display: flex;
              align-items: center;
              justify-content: space-between;
              &:nth-child(1) {
                color: #fff;
                img {
                  width: 25px;
                  height: 25px;
                  margin-right: 10px;
                }
              }
              &:nth-child(2) {
                cursor: pointer;
                color: #d79c00;
                img {
                  width: 10px;
                  height: 10px;
                  margin-left: 10px;
                }
              }
            }
          }
          &:nth-child(2) {
            color: #fff;
            .li_title {
              margin-bottom: 10px;
            }
            .input_box_box {
              width: 100%;
              height: 38px;
              background: rgba(11, 22, 43, 0.99);
              box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18), 0px 1px 1px 0px #8be6fe, 0px -1px 0px 0px #8be6fe;
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
              .input_btn {
                cursor: pointer;
                color: #ffffff;
                width: 40%;
                height: calc(100% * 1.5);
                display: flex;
                align-items: center;
                justify-content: center;
                background-image: url("//cdn.hashland.com/images/SpeciaBtn1.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                text-shadow: 0px 2px 4px #a16c28;
              }
              input:-ms-input-placeholder,
              input::-webkit-input-placeholder,
              input::-moz-placeholder,
              input:-moz-placeholder {
                color: #71787f;
              }
            }
          }
          &:nth-child(3) {
            color: #fff;
            .li_title {
              margin-bottom: 10px;
            }
            .quick_input {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              div {
                padding: 5px 30px;
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset, 0px 0px 9px 0px rgba(194, 190, 190, 0.52) inset;
                border-radius: 4px;
                cursor: pointer;
                &:hover {
                  background: #d8a43a;
                  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5);
                }
              }
            }
          }
          &:nth-child(4) {
            margin-top: 15px;
            .enter_btn {
              margin: 0 auto;
              cursor: pointer;
              color: #ffffff;
              width: 50%;
              line-height: calc(100% * 2.5);
              display: flex;
              align-items: center;
              justify-content: center;
              background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              text-shadow: 0px 2px 4px #a16c28;
            }
          }
        }
      }
      .recharge_instructions {
        margin-top: 20px;
        color: #fff;
        .instructions {
          display: flex;
          align-items: center;
          margin: 10px 0;
          span {
            &:nth-child(1) {
              width: 10px;
              min-width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #fdb234;
              margin-right: 10px;
            }
            &:nth-child(2) {
              color: #9291a1;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 980px) {
  .mask_layer {
    font-size: 0;
    .outline_box {
      .close {
        width: 0.3rem;
      }
      .inside_box ul {
        li:nth-child(2) .input_box_box .input_btn {
          width: 50%;
          height: calc(100% * 1.3);
        }
        li:nth-child(3) .quick_input div {
          padding: 5px 10px;
        }
        li:nth-child(4) .enter_btn {
          width: 50%;
          line-height: calc(100% * 2);
        }
      }
    }
  }
}
</style>
