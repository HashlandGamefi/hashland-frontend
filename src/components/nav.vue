<template>
  <div
    class="nav_box"
    :class="{ navbg: getMenuBG == 'yes' }"
  >
    <div
      class="logo_img"
      @click="menuClick(-1)"
    >
      <img
        :src="`${$store.state.imgUrl}logo.png`"
        class="imgs"
      />
    </div>
    <div class="menu_box">
      <ul class="ul_">
        <li
          :class="[index == getMenuIndex ? 'activeClass' : '', 'fontsize18']"
          v-for="(item, index) in navarr"
          :key="index"
          @click="menuClick(index)"
        >
          {{ $t(item) }}
          <div
            class="nft_hover"
            v-show="index == 0"
          >
            <div class="box_nft">
              <div
                class="span1"
                @click.stop="nftFun('card')"
              >
                {{ $t("message.nav.txt7") }} <span class="icon-v-right"></span>
              </div>
              <div
                class="span1"
                @click.stop="nftFun('mining')"
              >
                {{ $t("message.nav.txt8") }} <span class="icon-v-right"></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="connect_box">
      <div
        class="walletBox"
        v-if="getIstrue"
      >
        <div class="connect_triangle">
          <span class="span2 fontsize18">{{ getSubtringAccount }}</span>
          <span class="connect_icon"></span>
        </div>
        <div class="wallet_hover">
          <div class="lastbox_hover">
            <div
              class="hover_span1"
              @click.stop="signOutFun"
            >
              <span class="span_exit fontsize18">Disconnect</span>
              <img
                :src="`${$store.state.imgUrl}exit.png`"
                class="exit_class"
              />
            </div>
          </div>
        </div>
      </div>
      <span
        class="span1 fontsize18"
        @click="commonLink"
        v-else
      >Connect</span>
      <transition name="fade">
        <div
          class="login_register ban_select"
          v-if="showLRP == 1"
        >
          <span
            class="fontsize18"
            @click="openLoginOrRegistered('login')"
          >
            {{ $t("message.nav.txt10") }}
          </span>
          <span class="fontsize18"> / </span>
          <span
            class="fontsize18"
            @click="openLoginOrRegistered('registered')"
          >
            {{ $t("message.nav.txt11") }}
          </span>
        </div>
        <div
          class="account_box"
          v-if="showLRP == 2"
        >
          <img
            class="man_img"
            :src="`${$store.state.imgUrl}personalCenter.png`"
          />
          <span class="fontsize12">{{ mailAccount }}</span>
          <img
            class="accrow_img"
            :src="`${$store.state.imgUrl}accrow.png`"
          />
          <div class="toolbox">
            <div class="inset_box_add">
              <div @click="toPersonalCenter($event)">
                <span class="fontsize18">个人中心</span>
                <img
                  class="accrow_img"
                  :src="`${$store.state.imgUrl}accrow.png`"
                />
              </div>
              <div @click="toLogOut">
                <span class="fontsize18">退出登录</span>
                <img :src="`${$store.state.imgUrl}exit.png`" />
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="lang_box">
        <span class="lang_txt fontsize18">EN</span>
      </div>
    </div>
    <div class="mobile_menu">
      <div
        class="top_line"
        :class="{ mobile_border: !InitialStatus }"
      >
        <img
          :src="`${$store.state.imgUrl}logo.png`"
          class="mobile_imgs"
          @click="menuClick(-1)"
        />

        <div class="mobile_right_menu">
          <div
            class="walletBox"
            v-if="getIstrue"
          >
            <div class="connect_triangle">
              <span class="span2 fontsize18">{{ getSubtringAccount }}</span>
              <span class="connect_icon"></span>
            </div>
            <div class="wallet_hover">
              <div
                class="hover_span1"
                @click.stop="signOutFun"
              >
                <span class="span_exit fontsize14">Disconnect</span>
                <img
                  :src="`${$store.state.imgUrl}exit.png`"
                  class="exit_class"
                />
              </div>
            </div>
          </div>
          <span
            class="span1 fontsize18"
            @click="commonLink"
            v-else
          >Connect
          </span>
          <img
            :src="`${$store.state.imgUrl}mobilemenu.png`"
            class="mobile_menu_class"
            v-if="InitialStatus"
            @click="mobilemenuClick"
          />
          <img
            :src="`${$store.state.imgUrl}proupclose.png`"
            class="mobile_menu_class"
            v-else
            @click="mobilemenuClick"
          />
        </div>
      </div>
      <div
        class="mobile_fixed_menu"
        v-if="mobilemenu"
        @click="mobilemenu = false"
      >
        <div
          class="login_register ban_select"
          v-if="showLRP == 1"
        >
          <span
            class="fontsize18"
            @click="openLoginOrRegistered('login')"
          >
            {{ $t("message.nav.txt10") }}
          </span>
          <span class="fontsize18"> / </span>
          <span
            class="fontsize18"
            @click="openLoginOrRegistered('registered')"
          >
            {{ $t("message.nav.txt11") }}
          </span>
        </div>
        <div
          class="account_box"
          v-if="showLRP == 2"
          @click.stop
        >
          <img
            class="man_img"
            :src="`${$store.state.imgUrl}personalCenter.png`"
          />
          <span class="fontsize12">{{ mailAccount }}</span>
          <img
            class="accrow_img"
            :src="`${$store.state.imgUrl}accrow.png`"
          />
          <div class="toolbox">
            <div @click="toPersonalCenter($event)">
              <span class="fontsize18">个人中心</span>
              <img
                class="accrow_img"
                :src="`${$store.state.imgUrl}accrow.png`"
              />
            </div>
            <div @click="toLogOut">
              <span class="fontsize18">退出登录</span>
              <img :src="`${$store.state.imgUrl}exit.png`" />
            </div>
          </div>
        </div>
        <div class="mobile_box">
          <ul class="ul_">
            <li
              :class="[
                index == getMenuIndex ? 'mobile_activeClass' : '',
                'fontsize16',
              ]"
              v-for="(item, index) in navarr"
              :key="index"
              @click.stop="menuClick(index)"
            >
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
              <div
                class="box_nft"
                v-if="mobile_menuDis && index == 0"
              >
                <div
                  class="span1"
                  @click.stop="nftFun('card')"
                >
                  {{ $t("message.nav.txt7") }}
                </div>
                <div
                  class="span1"
                  @click.stop="nftFun('mining')"
                >
                  {{ $t("message.nav.txt8") }}
                </div>
              </div>
            </li>
          </ul>
          <div class="mobile_lang fontsize16">EN</div>
        </div>
        <div class="dispear_box"></div>
      </div>
    </div>
    <Proup
      :btntxt="btntxt"
      :word="word"
      @besurefun="CloseFun"
      :proupDis="proupDis"
      @closedis="CloseFun"
    ></Proup>
    <WalletComponents
      :walletdis="walletdis"
      @closewalletpage="walletClose"
      @walletClick="walletClick"
    ></WalletComponents>
    <transition name="fade">
      <LoginRegistered
        v-if="showLOrR"
        :showLOrR="showLOrR"
      ></LoginRegistered>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { wallet, network } from "hashland-sdk";
import WalletComponents from "./walletcomponents.vue";
import LoginRegistered from "../views/GameFi/loginRegistered.vue";
export default {
  components: { WalletComponents, LoginRegistered },
  inject: ["reload"],
  data() {
    return {
      walletdis: false, //选择钱包
      InitialStatus: true, // 移动端菜单栏按钮转换变量
      // addbg:false,// 导航栏背景
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
      ],
      mobilemenu: false, //移动端菜单
      mobile_menuDis: false, // nfts展开菜单,
      showLRP: null, // 登录注册状态
      showLOrR: "", // 登录注册弹窗
      mailAccount: "",
    };
  },
  computed: {
    ...mapGetters([
      "getMenuIndex",
      "getSubtringAccount",
      "getIstrue",
      "getMenuBG",
      "getAccount",
    ]),
  },
  watch: {
    $route: {
      handler(newRouter) {
        // 判断是否已登录
        if (newRouter.path == "/gameFi") {
          this.againAutoLogin();
        } else if (newRouter.path == "/personalCenter") {
          if (localStorage.getItem("loginInfo")) {
            const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
            this.showLRP = 2; // 已登录
            this.mailAccount = loginInfo.mailAccount;
          } else {
            this.showLRP = 1;
          }
        } else {
          this.showLRP = null;
        }
      },
    },
  },
  mounted() {
    if (this.getAccount) {
      this.$common.newgetUserCardInfoFun(this.getAccount).then((res1) => {
        // console.log("导航栏---页面加载获取用户信息res: ", res1);
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
    setTimeout(() => {
      // 判断是否已登录
      if (this.$route.path == "/") return;
      if (this.$route.path == "/gameFi") {
        this.againAutoLogin();
      } else if (this.$route.path == "/personalCenter") {
        if (localStorage.getItem("loginInfo")) {
          const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
          this.showLRP = 2; // 已登录
          this.mailAccount = loginInfo.mailAccount;
        } else {
          this.showLRP = 1;
        }
      } else {
        this.showLRP = null;
      }
    }, 500);
  },
  methods: {
    /**再次自动登录 */
    againAutoLogin() {
      if (localStorage.getItem("loginInfo")) {
        const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
        if (loginInfo.mailAccount && loginInfo.newToken) {
          const url = `mailAccount=${loginInfo.mailAccount}&token=${loginInfo.newToken}`;
          this.$api
            .gameMailLogin(url)
            .then((res) => {
              // console.log("再次自动登录：", res.data);
              if (res.data.result === "SUCCESS") {
                this.showLRP = 2; // 已登录
                this.mailAccount = res.data.mailAccount;
                localStorage.setItem("loginInfo", JSON.stringify(res.data));
              } else if (res.data.result === "FAIL") {
                this.$common.selectLang(res.data.msg, res.data.msg, this);
              }
            })
            .catch((err) => {});
        }
      } else {
        this.showLRP = 1;
      }
    },
    /**打开登录与注册 */
    openLoginOrRegistered(str) {
      this.showLOrR = str;
      this.InitialStatus = true;
      this.mobilemenu = false;
    },
    /**关闭登录与注册 */
    closeLoginOrRegistered() {
      this.showLOrR = "";
    },
    /**个人中心 */
    toPersonalCenter(e) {
      this.$router.push("/personalCenter");
    },
    /**退出登录 */
    toLogOut() {
      localStorage.removeItem("loginInfo");
      this.showLRP = 1; // 未登录
      if (this.$route.path !== "/gameFi") {
        this.$router.push("/gameFi");
      }
    },
    // 退出钱包
    async signOutFun() {
      sessionStorage.removeItem("setAccount");
      sessionStorage.removeItem("setCardInfo");
      sessionStorage.removeItem("setChain");
      sessionStorage.removeItem("count");
      // localStorage.removeItem('walletconnect')
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
      // this.addbg = true
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
      // this.addbg = true
      this.$store.commit("menuBG", "yes");
      sessionStorage.setItem("menuBG", "yes");
      this.$store.commit("HashMenu", index);
      sessionStorage.setItem("HashMenu", index);
      if (index == 0) {
        this.mobile_menuDis = !this.mobile_menuDis;
        this.InitialStatus = false;
        return;
      }
      this.InitialStatus = true;
      this.mobilemenu = false;
      switch (index) {
        case -1:
          this.mobile_menuDis = false;
          this.mobilemenu = false;
          // this.addbg = false
          this.$store.commit("menuBG", "no");
          sessionStorage.setItem("menuBG", "no");
          this.$router.push("/home");
          break;
        case 0:
          this.$router.push("/buy/0/1");
          break;
        case 1:
          if (process.env.NODE_ENV == "development") {
            this.$router.push("/gameFi");
          } else {
            this.$common.selectLang("敬请期待", "Coming soon", this);
          }
          break;
        case 2:
          this.$router.push("/hclp");
          break;
        case 4:
          window.location.href =
            "https://land-hash.gitbook.io/official/dao/about-dao";
          break;
        case 5:
          window.location.href =
            "https://land-hash.gitbook.io/official/white-paper/abstract";
          break;
        // case 6:
        //   this.$router.push('/invite')
        //   break;
        default:
          this.$common.selectLang("敬请期待", "Coming soon", this);
          break;
      }
    },
    // 账号链接抽离方法
    connectFun(res) {
      // console.log("账号切换res: ", res);
      if (res.length == 0) {
        this.$store.commit("setAccount", "no");
        sessionStorage.setItem("setAccount", "no");
        this.$store.commit("setCardInfo", JSON.stringify([]));
        sessionStorage.setItem("setCardInfo", JSON.stringify([]));
      } else {
        this.$store.commit("setAccount", res[0]);
        sessionStorage.setItem("setAccount", res[0]);
        // this.$common.getUserCardInfoFun(res[0])
        this.$common.newgetUserCardInfoFun(res[0]).then((res1) => {
          // console.log("导航栏---账号链接获取用户信息res: ", res1);
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
      if (
        item.name.toLowerCase() == "coin98" ||
        item.name.toLowerCase() == "onto" ||
        item.name.toLowerCase() == "bitkeep"
      ) {
        console.log("当前点击的是%s,传的是metamask", item.name.toLowerCase());
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
          top: 0;
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
            margin-top: 30px;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset,
              -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
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
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
          -2px 1px 14px 0px rgba(194, 190, 190, 0.52) inset;
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
          // height: 80px;
          background: #0c153b;
          border-radius: 6px;
          box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset,
            -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
          .hover_span1 {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            // padding: 0 15px;
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
      box-shadow: 26px 11px 40px 21px rgba(0, 0, 1, 0.38),
        -5px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
      color: #ffffff;
      cursor: pointer;
      margin-right: 5px;
    }
    .login_register {
      min-width: 160px;
      position: relative;
      color: #ffffff;
      cursor: pointer;
      display: flex;
      justify-content: center;
    }
    .account_box {
      min-width: 150px;
      display: flex;
      align-items: center;
      padding: 0 10px;
      position: relative;
      cursor: pointer;
      &:hover,
      &.active {
        .accrow_img {
          transform: rotate(0);
        }
        .toolbox {
          display: block;
        }
      }
      .man_img {
        width: 25px;
        height: auto;
        margin-right: 10px;
      }
      .accrow_img {
        width: 15px;
        height: auto;
        transform: rotate(-90deg);
        transition: all 0.3s;
      }
      span {
        margin-right: 10px;
        color: #ffffff;
      }
      .toolbox {
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        .inset_box_add {
          padding: 10px 20px;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.2);
          box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset,
            -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
          margin: auto;
          margin-top: 54px;
          div {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            &:hover,
            &.active {
              span {
                color: #00e7f0;
              }
            }
            span {
              color: #ffffff;
            }
            img {
              width: 15px;
              height: auto;
              &.accrow_img {
                transform: rotate(-90deg);
              }
            }
          }
        }
      }
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
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
                -2px 1px 14px 0px rgba(194, 190, 190, 0.52) inset;
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
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset,
                -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
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
            box-shadow: 0 0 10px 2px rgba(0, 0, 1, 0.38),
              0 0 5px 0px rgba(255, 255, 255, 0.22) inset;
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
        .login_register {
          width: 100%;
          display: flex;
          border-left: 2px solid rgba(161, 64, 248, 1);
          border-right: 2px solid rgba(161, 64, 248, 1);
          background: #021c3a;
          color: #ffffff;
          padding: 0 0.2rem;
        }
        .account_box {
          min-width: 1rem;
          display: flex;
          align-items: center;
          padding: 0 0.1rem;
          position: relative;
          cursor: pointer;
          border-left: 2px solid rgba(161, 64, 248, 1);
          border-right: 2px solid rgba(161, 64, 248, 1);
          background: #021c3a;
          .man_img {
            width: 0.25rem;
            height: auto;
            margin-right: 0.1rem;
          }
          .accrow_img {
            width: 0.15rem;
            height: auto;
            transform: rotate(-90deg);
            transition: all 0.3s;
          }
          span {
            margin-right: 0.1rem;
            color: #ffffff;
          }
          .toolbox {
            display: none;
            width: 1.68rem;
            padding: 0.1rem 0.2rem;
            border-radius: 6px;
            background: #00000033;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset,
              -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
            position: absolute;
            top: 0.25rem;
            left: 0;
            right: 0;
            div {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0.1rem 0;
              &:hover,
              &.active {
                span {
                  color: #00e7f0;
                }
              }
              span {
                color: #ffffff;
              }
              img {
                width: 0.15rem;
                height: auto;
                &.accrow_img {
                  transform: rotate(-90deg);
                }
              }
            }
          }
        }
        .account_box:hover {
          .accrow_img {
            transform: rotate(0);
          }
          .toolbox {
            display: block;
          }
        }
        .mobile_box {
          border-radius: 0px 0px 17px 17px;
          border: 2px solid rgba(161, 64, 248, 1);
          border-top: none;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0 0.2rem;
          padding-bottom: 0.26rem;
          background: #021c3a;
          // height: 4rem;
          // background: linear-gradient(180deg, #011020 0%, #022954 37%, #012958 56%, #00162E 100%);
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
