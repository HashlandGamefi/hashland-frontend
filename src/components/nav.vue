<template>
  <div class="nav_box" :class="{ navbg: getMenuBG == 'yes' }">
    <div class="logo_img" @click="menuClick(-1)">
      <img :src="`${$store.state.imgUrl}logo.png`" class="imgs" />
    </div>
    <div class="menu_box">
      <ul class="ul_ fontsize18">
        <li v-for="(item, index) in navarr" :key="index" :class="[index == menuIndex ? 'activeClass' : '']" @click="menuClick(index)">
          {{ $t(item) }}
          <div class="nft_hover" v-show="index == 0" :class="[disablehover?'clear_hover':'']">
            <div class="box_nft">
              <div class="span1" @click.stop="nftFun('card')">{{ $t("message.nav.txt7") }} <span class="icon-v-right"></span></div>
              <div class="span1" @click.stop="nftFun('mining')">{{ $t("message.nav.txt8") }} <span class="icon-v-right"></span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="connect_box fontsize18">
      <div class="walletBox" v-if="getIstrue">
        <div class="connect_triangle">
          <span class="span2">{{ getSubtringAccount }}</span>
          <span class="connect_icon"></span>
        </div>
        <div class="wallet_hover">
          <div class="lastbox_hover">
            <div class="hover_span1" @click.stop="signOutFun">
              <span class="span_exit">Disconnect</span>
              <img :src="`${$store.state.imgUrl}exit.png`" class="exit_class" />
            </div>
          </div>
        </div>
      </div>
      <span class="span1" @click="commonLink" v-else>Connect</span>
      <div class="lang_box"><span class="lang_txt">EN</span></div>
    </div>
    <div class="mobile_menu">
      <div class="top_line" :class="{ mobile_border: !InitialStatus }">
        <img :src="`${$store.state.imgUrl}logo.png`" class="mobile_imgs" @click="menuClick(-1)" />
        <div class="mobile_right_menu">
          <div class="walletBox" v-if="getIstrue">
            <div class="connect_triangle">
              <span class="span2 fontsize18">{{ getSubtringAccount }}</span>
              <span class="connect_icon"></span>
            </div>
            <div class="wallet_hover">
              <div class="hover_span1" @click.stop="signOutFun">
                <span class="span_exit fontsize14">Disconnect</span>
                <img :src="`${$store.state.imgUrl}exit.png`" class="exit_class" />
              </div>
            </div>
          </div>
          <span class="span1 fontsize18" @click="commonLink" v-else>Connect </span>
          <img :src="`${$store.state.imgUrl}mobilemenu.png`" class="mobile_menu_class" v-if="InitialStatus" @click="mobilemenuClick" />
          <img :src="`${$store.state.imgUrl}proupclose.png`" class="mobile_menu_class" v-else @click="mobilemenuClick" />
        </div>
      </div>
      <div class="mobile_fixed_menu" v-if="mobilemenu" @click="mobilemenu = false">
        <div class="mobile_box">
          <ul class="ul_ fontsize16">
            <li :class="[index == menuIndex ? 'mobile_activeClass' : '']" v-for="(item, index) in navarr" :key="index" @click.stop="menuClick(index)">
              <div class="mobile_line">
                {{ $t(item) }}
                <span
                  class="mobile_triangle"
                  :class="{
                    mobilethreedown: mobile_menuDis,
                    mobilethreetop: !mobile_menuDis,
                  }"
                  v-if="index == 0"
                ></span>
              </div>
              <div class="box_nft" v-if="mobile_menuDis && index == 0">
                <div class="span1" @click.stop="nftFun('card')">
                  {{ $t("message.nav.txt7") }}
                </div>
                <div class="span1" @click.stop="nftFun('mining')">
                  {{ $t("message.nav.txt8") }}
                </div>
              </div>
            </li>
            <li><div class="mobile_line" @click.stop>EN</div></li>
          </ul>
        </div>
        <div class="dispear_box"></div>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
    <WalletComponents :walletdis="walletdis" @closewalletpage="walletClose" @walletClick="walletClick"></WalletComponents>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { wallet, network } from "hashland-sdk";
import WalletComponents from "./walletcomponents.vue";
export default {
  components: { WalletComponents },
  inject: ["reload"],
  data() {
    return {
      disablehover:false,
      walletdis: false, //选择钱包
      InitialStatus: true, // 移动端菜单栏按钮转换变量
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      navarr: [
        "message.nav.txt1",
        "message.nav.txt2",
        "message.nav.txt3",
        "message.nav.txt6",
        "message.nav.txt4",
        "message.nav.txt5",
        "message.nav.txt10",
      ],
      mobilemenu: false, //移动端菜单
      mobile_menuDis: false, // nfts展开菜单,
      menuIndex: -1,
    };
  },
  computed: {
    ...mapGetters(["getSubtringAccount", "getIstrue", "getMenuBG", "getAccount"]),
    // ...mapGetters(["getMenuIndex", "getSubtringAccount", "getIstrue", "getMenuBG", "getAccount"]),
  },
  watch: {
    $route(to) {
      switch (to.name) {
        case "Home":
          this.menuIndex = -1;
          break;
        case "Buy":
          this.menuIndex = 0;
          break;
        case "Synthesis":
          this.menuIndex = 0;
          break;
        case "Transfer":
          this.menuIndex = 0;
          break;
        case "NFTmining":
          this.menuIndex = 0;
          break;
        case "GameFi":
          this.menuIndex = 1;
          break;
        case "Hclp":
          this.menuIndex = 2;
          break;
        case "Market":
          this.menuIndex = 3;
          break;
        case "Pendingrecord":
          this.menuIndex = 3;
          break;
        case "HangingOrder":
          this.menuIndex = 3;
          break;
        case "HangingOrderV2":
          this.menuIndex = 3;
          break;
        case "Dao":
          this.menuIndex = 4;
          break;
        case "gameFiDownload":
          this.menuIndex = 6;
          break;

        default:
          this.menuIndex = -1;
          break;
      }
    },
  },
  mounted() {
    if (this.getAccount) {
      this.$common.newgetUserCardInfoFun(this.getAccount).then((res1) => {
        if (res1 > 1) {
          sessionStorage.setItem("count", res1);
        } else {
          sessionStorage.setItem("count", 1);
        }
      });
    }
    wallet.onAccountChanged(this.connectFun); // 监听账号
    wallet.onChainChanged(this.OnNetworkFun); // 监听网络
    wallet.onDisconnect(this.signOutFun);
  },
  methods: {
    // 退出钱包
    async signOutFun() {
      sessionStorage.removeItem("setAccount");
      sessionStorage.removeItem("setCardInfo");
      sessionStorage.removeItem("setChain");
      sessionStorage.removeItem("count");
      if (localStorage.getItem("walletType") == "walletconnect") {
        wallet.disconnect();
      }
      this.$store.commit("setAccount", "no");
      this.$store.commit("setCardInfo", JSON.stringify([]));
      this.$store.commit("setChain", "");
    },
    // 关闭链接钱包弹窗
    walletClose() {
      this.walletdis = false;
    },
    // 取消按钮(关闭弹窗)
    CloseFun() {
      this.proupDis = false;
    },
    // nfts子菜单选择项
    nftFun(data) {
      this.disablehover = true
      setTimeout(() => {
        this.disablehover = false
      },600)
      this.$store.commit("menuBG", "yes");
      sessionStorage.setItem("menuBG", "yes");
      this.InitialStatus = true;
      this.$store.commit("HashMenu", 0);
      sessionStorage.setItem("HashMenu", 0);
      if (data == "card") {
        this.$router.push("/buy/0/1");
      } else if (data == "mining") {
        this.$router.push("/nftmining");
      }
      this.mobile_menuDis = false;
      this.mobilemenu = false;
    },
    // 菜单栏切换状态
    menuClick(index) {
      if (index == 0) {
        this.mobile_menuDis = !this.mobile_menuDis;
        this.InitialStatus = false;
        return;
      }
      this.$store.commit("menuBG", "yes");
      sessionStorage.setItem("menuBG", "yes");
      this.$store.commit("HashMenu", index);
      sessionStorage.setItem("HashMenu", index);
      this.InitialStatus = true;
      this.mobilemenu = false;
      switch (index) {
        case -1:
          this.mobile_menuDis = false;
          this.mobilemenu = false;
          this.$store.commit("menuBG", "no");
          sessionStorage.setItem("menuBG", "no");
          this.$router.push("/home");
          break;
        // case 0:
        //   this.$router.push("/buy/0/1");
        //   break;
        case 1:
          this.$router.push("/gameFi");
          break;
        case 2:
          this.$router.push("/hclp");
          break;
        case 3:
          this.$router.push("/market");
          break;
        case 4:
          this.$router.push("/dao");
          // window.location.href = "https://land-hash.gitbook.io/official/dao/about-dao";
          break;
        case 5:
          window.location.href = "https://land-hash.gitbook.io/official/white-paper/abstract";
          break;
        case 6:
          this.$router.push("/gameFi-download");
          break;
        default:
          this.$common.selectLang("敬请期待", "Coming soon", this);
          break;
      }
    },
    // 账号链接抽离方法
    connectFun(res) {
      if (res.length == 0) {
        this.$store.commit("setAccount", "no");
        sessionStorage.setItem("setAccount", "no");
        this.$store.commit("setCardInfo", JSON.stringify([]));
        sessionStorage.setItem("setCardInfo", JSON.stringify([]));
      } else {
        this.$store.commit("setAccount", res[0]);
        sessionStorage.setItem("setAccount", res[0]);
        this.$common.newgetUserCardInfoFun(res[0]).then((res1) => {
          if (res1 > 1) {
            sessionStorage.setItem("count", res1);
          } else {
            sessionStorage.setItem("count", 1);
          }
        });
      }
    },
    // 网络链接抽离方法(第一次连接,用户网络不对的情况下帮他切换网络)
    networkFun(chainID) {
      let net = network(); // 获取sdk返回的当前的环境
      if (chainID == net.chainId) {
        this.$store.commit("setChain", chainID);
        sessionStorage.setItem("setChain", chainID);
      } else {
        wallet.addChain();
      }
    },
    // 网络链接抽离方法(用户自己手动切换其他网络的操作)
    OnNetworkFun(res) {
      let net = network(); // 获取sdk返回的当前的环境
      if (res == net.chainId) {
        this.$store.commit("setChain", res);
        sessionStorage.setItem("setChain", res);
      } else {
        this.$store.commit("setChain", "");
        sessionStorage.removeItem("setChain");
      }
    },
    async walletClick(item) {
      if (item.name.toLowerCase() == "coin98" || item.name.toLowerCase() == "onto" || item.name.toLowerCase() == "bitkeep") {
        // console.log("当前点击的是%s,传的是metamask", item.name.toLowerCase());
        this.metamaskLink("metamask");
      } else {
        this.metamaskLink(item.name.toLowerCase());
      }
    },
    // 链接钱包方法
    commonLink() {
      this.walletdis = true;
    },
    // 小狐狸链接
    async metamaskLink(data) {
      const account = await wallet.getAccount(data); //链接钱包
      this.connectFun(account);
      const chainID = await wallet.getChainId(); // 连接网络
      this.networkFun(chainID);
      this.walletdis = false;
    },
    // 移动端展开菜单
    mobilemenuClick() {
      this.mobilemenu = !this.mobilemenu;
      this.InitialStatus = !this.InitialStatus;
    },
  },
};
</script>
<style lang="scss" scoped>
.nav_box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 107px 0 250px;
  .logo_img {
    position: absolute;
    top: 0;
    left: 90px;
    width: 169px;
    display: flex;
    cursor: pointer;
    .imgs {
      width: 100%;
      object-fit: contain;
    }
  }
  .menu_box {
    width: calc(100% - 430px);
    .ul_ {
      width: 100%;
      display: flex;
      align-items: center;
      li {
        position: relative;
        padding: 0 18px;
        color: #ffffff;
        cursor: pointer;
        .nft_hover {
          display: none;
          position: absolute;
          top: 24px;
          left: -29px;
          z-index: 99999999;
          .box_nft {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 183px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            padding: 20px 10px;
            margin-top: 25px;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
            .span1 {
              width: 100%;
              height: 60px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: #fff;
              line-height: 82px;
              padding: 0 15px;
              .icon-v-right {
                width: 12px;
                height: 12px;
                border: 2px solid #fff;
                border-width: 2px 2px 0 0;
                transform: rotate(45deg);
                margin-left: 10px;
              }
            }
            .span1:hover {
              color: #00e7f0;
              .icon-v-right {
                width: 12px;
                height: 12px;
                border: 2px solid #00e7f0;
                border-width: 2px 2px 0 0;
                transform: rotate(45deg);
                margin-left: 10px;
              }
            }
          }
        }
      }
      li:hover {
        .nft_hover {
          display: flex;
        }
      }
      .activeClass {
        color: #00e7f0;
      }
    }
  }
  .connect_box {
    display: flex;
    align-items: center;
    .walletBox {
      position: relative;
      margin-right: 5px;
      .connect_triangle {
        width: 160px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5), -2px 1px 14px 0px rgba(194, 190, 190, 0.52) inset;
        border-radius: 33px;
        cursor: pointer;
        padding: 5px 20px;
        .span2 {
          color: #ffffff;
        }
        .connect_icon {
          border-width: 5px;
          margin-top: 5px;
          border-color: #ffffff;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
        }
      }
      .wallet_hover {
        display: none;
      }
    }
    .walletBox:hover {
      .connect_triangle {
        .connect_icon {
          margin-top: -5px;
          border-top-color: transparent;
          border-bottom-color: #ffffff;
          border-bottom-style: solid;
        }
      }
      .wallet_hover {
        position: absolute;
        display: flex;
        .lastbox_hover {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 160px;
          padding: 6.5px 20px;
          background: #0c153b;
          border-radius: 6px;
          box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
          .hover_span1 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: pointer;
            .span_exit {
              color: #fff;
            }
            .span_exit:hover {
              color: #00e7f0;
            }
            .exit_class {
              width: 18px;
              object-fit: contain;
              margin-left: 10px;
            }
          }
        }
      }
    }
    .span1 {
      padding: 2px 11px;
      border-radius: 12px;
      box-shadow: 26px 11px 40px 21px rgba(0, 0, 1, 0.38), -5px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
      color: #ffffff;
      cursor: pointer;
      margin-right: 5px;
    }
    .lang_box {
      display: flex;
      align-items: center;
      margin-left: 5px;
      .lang_txt {
        color: #ffffff;
      }
    }
  }
  .mobile_menu {
    display: none;
  }
  .mobile_fixed_menu {
    display: none;
  }
}
.navbg {
  background: #0c153b;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
@media screen and (min-width: 981px) and (max-width: 1439px) {
  .nav_box {
    .menu_box {
      width: calc(100% - 300px);
      .ul_ {
        li {
          padding: 0 15px;
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .nav_box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    height: auto;
    .logo_img {
      display: none;
    }
    .menu_box {
      display: none;
    }
    .connect_box {
      display: none;
    }
    .mobile_menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: auto;
      .top_line {
        width: 100%;
        height: 0.6rem;
        padding: 0 0.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #021c3a;
        border-radius: 0px 0px 17px 17px;
        border: 2px solid rgba(161, 64, 248, 1);
        border-top: none;
        .mobile_imgs {
          width: 0.42rem;
          object-fit: contain;
        }
        .mobile_right_menu {
          display: flex;
          align-items: center;
          .mobile_menu_class {
            width: 0.28rem;
            object-fit: contain;
            margin-left: 0.1rem;
          }
          .walletBox {
            position: relative;
            display: flex;
            flex-direction: column;
            .connect_triangle {
              width: 1.4rem;
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5), -2px 1px 14px 0px rgba(194, 190, 190, 0.52) inset;
              border-radius: 0.06rem;
              cursor: pointer;
              padding: 0 0.12rem;
              .span2 {
                color: #ffffff;
              }
              .connect_icon {
                border-width: 0.05rem;
                margin-top: 0.05rem;
                border-color: #ffffff;
                border-style: dashed;
                border-top-style: solid;
                border-left-color: transparent;
                border-right-color: transparent;
                border-bottom-color: transparent;
              }
            }
            .wallet_hover {
              display: none;
            }
          }
          .walletBox:hover {
            .connect_triangle {
              .connect_icon {
                margin-top: -0.05rem;
                border-top-color: transparent;
                border-bottom-color: #ffffff;
                border-bottom-style: solid;
              }
            }
            .wallet_hover {
              position: absolute;
              z-index: 99;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 1.4rem;
              height: 0.32rem;
              margin-top: 0.33rem;
              background: #0c153b;
              border-radius: 0.06rem;
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
              .hover_span1 {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #fff;
                padding: 0 0.12rem;
                cursor: pointer;
                .span_exit {
                  color: #fff;
                }
                .exit_class {
                  width: 0.12rem;
                  object-fit: contain;
                }
              }
            }
          }
          .span1 {
            padding: 0.02rem 0.1rem;
            border-radius: 0.1rem;
            box-shadow: 0 0 10px 2px rgba(0, 0, 1, 0.38), 0 0 5px 0px rgba(255, 255, 255, 0.22) inset;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
      .mobile_border {
        border: 2px solid rgba(161, 64, 248, 1);
        border-top: none;
        border-bottom: none;
        border-radius: 0px;
      }
      .mobile_fixed_menu {
        width: 100%;
        height: calc(100% - 0.6rem);
        background: rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        .mobile_box {
          border-radius: 0px 0px 17px 17px;
          border: 2px solid rgba(161, 64, 248, 1);
          border-top: none;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0 0.2rem;
          // padding-bottom: 0.26rem;
          background: #021c3a;
          .ul_ {
            width: 100%;
            margin-top: 0.14rem;
            li {
              width: 100%;
              color: #ffffff;
              cursor: pointer;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 0.24rem;
              &:last-child {
                .mobile_line {
                  margin-bottom: 0;
                }
              }
              .mobile_line {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.12rem;
                .mobile_triangle {
                  border-width: 0.05rem;
                  border-color: #ffffff;
                  border-style: dashed;
                  border-top-style: solid;
                  border-left-color: transparent;
                  border-right-color: transparent;
                }
                .mobilethreetop {
                  border-bottom-width: 0;
                }
                .mobilethreedown {
                  border-top-width: 0;
                }
              }
              .box_nft {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #032144;
                box-shadow: -2px 1px 10px 0px #020f1f inset;
                border-radius: 0.06rem;
                padding: 0.12rem 0;
                .span1 {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  color: #fff;
                  line-height: 0.4rem;
                }
              }
            }
            .mobile_activeClass {
              color: #00e7f0;
            }
          }
          .mobile_lang {
            width: 100%;
            color: #ffffff;
          }
        }
        .dispear_box {
          width: 100%;
          min-height: calc(100% - 3rem);
          height: calc(100% - 3rem);
          background: red;
        }
      }
    }
  }
}
</style>
