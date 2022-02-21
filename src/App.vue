<template>
  <div id="app">
    <Nav></Nav>
    <!-- <transition name="fade"> -->
    <router-view v-if="isRouterAlive" />
    <!-- </transition> -->
    <div class="top_btn fontsize16" :class="{ istop: istopshow }" @click="gotop">Top</div>
    <Footer v-if="isshowFooter"></Footer>
    <WinningPopup
      :proupTitle="getrewardsInfo.proupTitle"
      :minserdis="getrewardsInfo.minserDis"
      :boxarr="getrewardsInfo.boxarr"
      @winbtnsure="winbtnsure"
      @closepage="closepageFun"
    ></WinningPopup>
    <WalletComponents
      @closewalletpage="walletClose"
      @walletClick="walletClick"
    ></WalletComponents>
    <!-- <Banner :bannershow="bannershow" @closebanner="bannerClick" @besureclcik="besureClick"></Banner> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Banner from "./components/banner.vue";
import Nav from "./components/nav.vue";
import Footer from "./components/footer.vue";
import WinningPopup from "./components/winningpopup.vue";
export default {
  components: {
    Nav,
    Footer,
    WinningPopup,
    Banner,
  },
  watch: {
    $route(to) {
      window.scrollTo(0, 0);
      this.istopshow = false;
      if (to.path == "/synthesis" || to.path == "/transfer") {
        this.isshowFooter = false;
      } else {
        this.isshowFooter = true;
      }
    },
    getIstrue: {
      handler: function (newValue) {
        if (newValue) {
          this.$common
            .getUserPledgeInfo(this.getAccount)
            .then((res) => {
              if (res.istrue) {
                localStorage.setItem("pledgeArr", JSON.stringify(res.arr));
              } else {
                localStorage.setItem("pledgeArr", JSON.stringify([]));
              }
            })
            .catch(() => {
              localStorage.setItem("pledgeArr", JSON.stringify([]));
            });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["getrewardsInfo", "getAccount", "getIstrue", "getIsMobile"]),
  },
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      timeer: null,
      timeData: { h: "00", m: "00", s: "00" },
      starttime: "1641117600", //开始时间  1641031200
      isRouterAlive: true, //控制视图是否显示的变量
      isshowFooter: true, // 合成页面底部不显示变量
      temArr: [],
      istopshow: false, //鼠标移入移除
      scrollTimeer: null,
      // bannershow: "istrue", // banner展示由此变量控制,默认为'istrue
    };
  },
  methods: {
    walletClose() {
      this.$store.commit("setwalletstatus", false);
    },
    walletClick(item) {
      if (
        item.name.toLowerCase() == "coin98" ||
        item.name.toLowerCase() == "onto" ||
        item.name.toLowerCase() == "bitkeep"
      ) {
        console.log("当前点击的是%s,传的是metamask", item.name.toLowerCase());
        this.$common.connectWallet("metamask").then(res => {
          console.log('方法返回res: ', res);
          this.$store.commit("setwalletstatus", false);
        })
      } else {
        this.$common.connectWallet(item.name.toLowerCase()).then(res => {
          this.$store.commit("setwalletstatus", false);
        })
      }
    },
    gotop() {
      window.scrollTo(0, 0);
      this.addDom(document);
      this.temArr.forEach((element) => {
        element.scrollTop = 0;
      });
      this.istopshow = false;
    },
    addDom(dom) {
      [...dom.children].forEach((v) => {
        this.temArr.push(v);
        this.addDom(v);
      });
    },
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true; //再打开
      });
    },
    setRem() {
      const bodyWidth = document.body.clientWidth;
      const rem375 = (bodyWidth * 100) / 375;
      if (bodyWidth <= 980) {
        document.getElementsByTagName("html")[0].style.fontSize = rem375 + "px";
      }
    },
    winbtnsure() {
      this.closepageFun();
      this.$router.push("/nftmining");
    },
    closepageFun() {
      let obj = {
        minserDis: false,
        boxarr: [],
      };
      this.$common.newgetUserCardInfoFun(this.getAccount).then((res1) => {
        if (res1 > 1) {
          sessionStorage.setItem("count", res1);
        } else {
          sessionStorage.setItem("count", 1);
        }
      });
      // this.$common.getUserCardInfoFun(this.getAccount)
      this.$store.commit("setrewardsInfo", obj);
    },
    // 获取各种币的价格
    getCurrenciesPrices() {
      // 比特币价格
      this.$api.getCurrencyFun("bitcoin").then((res) => {
        // console.log('btc的价格---res: ', res.data.bitcoin.usd);
        this.$api.getCurrencyFun("hashland-coin").then((res1) => {
          // console.log('hc的价格--res1: ', res1.data['hashland-coin'].usd);
          this.$store.commit("setCurrenciesPrice", {
            btc: this.$common.getBit(res.data.bitcoin.usd),
            hc: this.$common.getBit(res1.data["hashland-coin"].usd),
          });
          sessionStorage.setItem("btcprice", this.$common.getBit(res.data.bitcoin.usd));
          sessionStorage.setItem("hcprice", this.$common.getBit(res1.data["hashland-coin"].usd));
        });
      });
    },
    handleScroll(e) {
      let direction = e.deltaY > 0 ? "down" : "up"; //deltaY为正则滚轮向下，为负滚轮向上
      if (this.scrollTimeer) {
        clearTimeout(this.scrollTimeer);
        this.scrollTimeer = setTimeout(() => {
          this.isshowTop(direction);
        }, 500);
      } else {
        this.scrollTimeer = setTimeout(() => {
          this.isshowTop(direction);
        }, 500);
      }
    },
    // 是否展示top按钮
    isshowTop(direction) {
      let scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
      if (direction == "down") {
        //125为用户一次滚动鼠标的wheelDelta的值
        if (!this.istopshow) {
          this.istopshow = true;
        }
      }
      if (direction == "up" && scroll_top == 0) {
        if (this.istopshow) {
          this.istopshow = false;
        }
      }
    },
    // 首页弹窗banner  ---  关闭方法
    // bannerClick() {
    //   // this.bannershow = "isfalse";
    //   // clearInterval(this.timeer)
    //   // 传1代表1小时后过期,传24代表1天后过期
    //   // this.$common.setCookie('showbanner','isfalse',1)
    // },
    // besureClick() {
    //   // this.bannerClick();
    //   this.$router.push("/buy/1/3");
    // },
    settimeoutFun() {
      clearInterval(this.timeer);
      let time = Date.parse(new Date()) / 1000;
      let owtime = this.starttime - time;
      this.timeer = setInterval(() => {
        if (owtime <= 0) {
          clearInterval(this.timeer);
          this.timeData = { h: "00", m: "00", s: "00" };
          return;
        }
        this.$common.afferentTime(owtime, (res) => {
          this.timeData = res;
        });
        owtime -= 1;
      }, 1000);
    },
    async DisplayCardAnimationMethods() {
      let arr = [];
      for (let type = 1; type < 5; type++) {
        for (let lv = 1; lv < 6; lv++) {
          let res = await this.$common.getDatCardJson(type, lv);
          let obj = {
            level: lv,
            type: type,
            dataJson: {},
          };
          obj.dataJson = res.data;
          arr.push(obj);
        }
      }
      localStorage.setItem("Animation", JSON.stringify(arr));
    },
  },
  created() {
    this.DisplayCardAnimationMethods();
    this.getCurrenciesPrices();
  },
  mounted() {
    // if (process.env.NODE_ENV != "production") this.bannershow = "false";
    window.addEventListener("mousewheel", this.handleScroll);
    window.addEventListener("load", this.setRem);
    window.addEventListener("resize", this.setRem);
  },
};
</script>
<style lang="scss">
.top_btn {
  position: fixed;
  bottom: 150px;
  right: -30px;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  background: #0072bd;
  color: #ffffff;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.5s;
}
.istop {
  right: 10px;
  background: linear-gradient(60deg, #0873ec 40%, #3a96ff 60%);
}
@media screen and (min-width: 981px) {
  #app {
    width: 100%;
    min-height: 100%;
    // background: #011A31;
    // background-image: url("//cdn.hashland.com/images/pagehome.png");
    // background-size: 100% 100%;
    // background-repeat: no-repeat;
    background: linear-gradient(180deg, #011020 0%, #022954 37%, #012958 56%, #00162e 100%);
  }
}
@media screen and (max-width: 980px) {
  #app {
    width: 100%;
    min-height: 100%;
    background: linear-gradient(180deg, #011020 0%, #022954 37%, #012958 56%, #00162e 100%);
  }
}
</style>
