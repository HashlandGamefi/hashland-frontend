<template>
  <div class="game_page">
    <div class="game_banner">
      <div class="info_tool" v-if="loginRegisterStatus">
        <div class="information_box">
          <img class="personal_center" :src="`${$store.state.imgUrl}personalCenter.png`" />
          <div class="mailAccount fontsize18">
            <span class="fontsize14">{{ mailAccount | mailEllipsis }}</span>
            <img class="accrow information_accrow" :src="`${$store.state.imgUrl}accrow.png`" />
          </div>
          <div class="toolbox">
            <div @click="toPersonalCenter">
              <span class="fontsize14"> {{ $t("message.gameFi.text1") }} </span>
              <img class="accrow toolbox_accrow" :src="`${$store.state.imgUrl}accrow.png`" />
            </div>
            <div @click="toLogOut">
              <span class="fontsize14"> {{ $t("message.gameFi.text2") }} </span>
              <img :src="`${$store.state.imgUrl}exit.png`" />
            </div>
          </div>
        </div>
      </div>
      <div class="btn_group fontsize14">
        <div @click="openLoginOrRegistered" v-if="!loginRegisterStatus">
          {{ $t("message.gameFi.text13") }}
          / {{ $t("message.gameFi.text22") }}
        </div>
        <div @click="openRecharge">Recharge</div>
        <div @click="openDownload">{{ $t("message.gameFi.text46") }}</div>
      </div>
    </div>
    <div class="game_main">
      <div class="game_introduction">
        <div class="game_title fontsize32">{{ $t("message.gameFi.text3") }}</div>
        <div class="player_box1">
          <iframe
            class="player"
            src="https://www.youtube.com/embed/liqxQp6wP6w"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="game_model">
          <div class="fontsize32">{{ $t("message.gameFi.text4") }}</div>
          <ul>
            <li>
              <span class="fontsize16"> {{ $t("message.gameFi.text33") }} </span>
              <div class="fontsize12">{{ $t("message.gameFi.text34") }}</div>
            </li>
            <li>
              <span class="fontsize16"> {{ $t("message.gameFi.text35") }} </span>
              <div class="fontsize12">{{ $t("message.gameFi.text36") }}</div>
            </li>
            <li>
              <span class="fontsize16"> {{ $t("message.gameFi.text37") }} </span>
              <div class="fontsize12">{{ $t("message.gameFi.text38") }}</div>
            </li>
            <li>
              <span class="fontsize16"> {{ $t("message.gameFi.text39") }} </span>
              <div class="fontsize12">{{ $t("message.gameFi.text40") }}</div>
            </li>
          </ul>
        </div>
      </div>
      <!-- <div class="ranking_box">
        <div class="fontsize26">个人当前赛季奖励/排行</div>
        <div class="ranking_content">
          <div class="col">
            <div class="select">
              <span class="fontsize18">第一期</span>
              <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
            </div>
            <div class="">
            </div>
          </div>
          <div class="col">
            <div class="select">
              <span class="fontsize18">第一期</span>
              <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
            </div>
          </div>
          <div class="col">
            <div class="select">
              <span class="fontsize18">第一期</span>
              <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <transition name="fade">
      <LoginRegister v-if="showLoginRegister"></LoginRegister>
      <Recharge v-if="showRecharge"></Recharge>
    </transition>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoginRegister from "./loginRegister.vue";
import Recharge from "./recharge.vue";
export default {
  components: { LoginRegister, Recharge },
  data() {
    return {
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      showLoginRegister: false,
      showRecharge: false,
      loginRegisterStatus: false,
      mailAccount: "",
      ranking1select: "",
    };
  },
  computed: {
    ...mapGetters(["getAccount"]),
  },
  created() {
    if (localStorage.getItem("hashlandGameFiInfo")) {
      const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
      this.loginRegisterStatus = true; // 已登录
      this.mailAccount = gameFiInfo.mailAccount;
    } else {
      this.loginRegisterStatus = false;
    }
  },
  methods: {
    /**打开登录与注册 */
    openLoginOrRegistered() {
      this.showLoginRegister = true;
    },
    /**关闭登录与注册 */
    // closeLoginRegister() {
    //   this.showLoginRegister = false;
    // },
    /**个人中心 */
    toPersonalCenter() {
      this.$router.push("/gameFi-personalCenter");
    },
    /**退出登录 */
    toLogOut() {
      localStorage.removeItem("hashlandGameFiInfo");
      this.loginRegisterStatus = false; // 未登录
    },
    /**打开充值 */
    openRecharge() {
      if (!localStorage.getItem("hashlandGameFiInfo"))
        return this.$common.selectLang("请先登录游戏账号！", "Please sign in the game account first!", this);
      if (!this.getAccount) return this.$common.selectLang("请连接钱包！", "Please connect to the wallet!", this);

      const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
      const hasThisAccount = gameFiInfo.walletAddresses.findIndex((item) => item === this.getAccount); //不存在：-1
      // console.log("当前钱包：", this.getAccount);
      // console.log("本账号绑定的钱包", gameFiInfo.walletAddresses);
      // console.log("-1为没有", hasThisAccount);

      if (hasThisAccount == -1)
        return this.$common.selectLang(
          "请切换至本游戏账号绑定的钱包，否则充值无法到账！",
          "Please switch wallet address to other under this account!",
          this
        );
      this.showRecharge = true;
    },
    /**游戏下载 */
    openDownload() {
      this.$router.push("/gameFi-download");
    },
    /**公用提示框（关闭方法）  */
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
.game_page {
  padding-top: 80px;
}
.accrow {
  width: 15px;
  height: auto;
  margin-left: 5px;
  transition: all 0.3s;
}
.game_banner {
  width: 100vw;
  height: 50vw;
  background-image: url("//cdn.hashland.com/images/gamebanner.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  color: #ffffff;
  .info_tool {
    position: absolute;
    left: 130px;
    top: 100px;
    white-space: nowrap;
    .information_box {
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      &:hover {
        .mailAccount .information_accrow {
          transform: rotate(0);
        }
        .toolbox {
          display: block;
        }
      }
      .personal_center {
        margin-right: 5px;
        width: 30px;
        height: 30px;
      }
      .mailAccount {
        line-height: 30px;
        padding: 0 10px;
        background: rgba(28, 23, 24, 0.5);
        box-shadow: -10px -10px 30px 30px rgba(28, 23, 24, 0.5) inset, 10px 10px 30px 30px rgba(28, 23, 24, 0.5) inset;
        border-radius: 10px;
        .information_accrow {
          transform: rotate(-90deg);
        }
      }
      .toolbox {
        display: none;
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(28, 23, 24, 0.5);
        box-shadow: -10px -10px 30px 30px rgba(28, 23, 24, 0.5) inset, 10px 10px 30px 30px rgba(28, 23, 24, 0.5) inset;
        border-radius: 10px;
        padding: 10px;
        .toolbox_accrow {
          transform: rotate(-90deg);
        }
        div {
          padding: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        img {
          width: 15px;
          height: auto;
        }
      }
    }
  }
  .btn_group {
    width: fit-content;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 70px;
    left: 0;
    right: 0;
    margin: auto;
    div {
      margin: 0 10px;
      padding: 20px 80px;
      cursor: pointer;
      background: rgba(28, 23, 24, 0.85);
      border-radius: 4px;
      &:hover,
      &.active {
        background: rgba(245, 176, 0, 0.85);
      }
    }
  }
}
.game_main {
  width: 80vw;
  margin: 0 auto;
  color: #ffffff;
}
.game_introduction {
  width: 100%;
  height: auto;
  margin: 50px auto;
  .player_box1 {
    box-sizing: content-box;
    width: 60vw;
    height: 40vw;
    background-image: url("//cdn.hashland.com/images/gamevideoborder.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px auto;
    padding: 1.5vw 1vw;
    .player {
      width: 100%;
      height: 100%;
    }
  }
  .game_model {
    width: 100%;
    height: auto;
    background: linear-gradient(180deg, #010f20 0%, #021c3b 100%)
      linear-gradient(90deg, #021f3e 0%, #01142a 100%, #034088 100%);
    box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
    border-radius: 6px;
    margin: 30px auto;
    padding: 20px;
    > div {
      margin-bottom: 20px;
    }
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      li {
        width: 20%;
        height: fit-content;
      }
    }
  }
}
.ranking_box {
  width: 100%;
  height: auto;
  background: linear-gradient(180deg, #010f20 0%, #021c3b 100%)
    linear-gradient(90deg, #021f3e 0%, #01142a 100%, #034088 100%);
  box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
  border-radius: 6px;

  .ranking_content {
    width: 100%;
    background: #01162d;
    border-radius: 7px;
    border: 1px solid;
    border-image: linear-gradient(
        360deg,
        rgba(139, 230, 254, 0.42),
        rgba(139, 230, 254, 0.78),
        rgba(139, 230, 254, 0.42)
      )
      1 1;
    display: flex;

    .col {
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 40%;
      }
      &:nth-child(3) {
        width: 40%;
      }
      .select {
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .game_page {
    padding-top: 60px;
    font-size: 0;
  }
  .game_banner {
    .info_tool {
      left: 5vw;
      top: 8vw;
      .information_box {
        padding-bottom: 1vw;
        .personal_center {
          margin-right: 0.5vw;
          width: 6vw;
          height: auto;
        }
        .mailAccount {
          // padding: 0.01rem 0.02rem;
          .information_accrow {
            width: 3vw;
            height: auto;
            margin-left: 1vw;
          }
        }
        .toolbox {
          div {
            padding: 1vw 2vw;
          }
          img {
            width: 3vw;
            height: auto;
          }
        }
      }
    }
    .btn_group {
      bottom: 2vw;
      div {
        margin: 0 1vw;
        padding: 1vw 3vw;
      }
    }
  }
  .game_introduction {
    margin: 4vw auto;
    .player_box1 {
      margin: 2vw auto;
      padding: 2vw 1.5vw;
    }
    .game_model {
      margin: 2vw auto;
      padding: 2vw;
      > div {
        margin-bottom: 2vw;
      }
      ul {
        display: block;
        li {
          width: 100%;
          height: fit-content;
          padding: 1vw 0;
        }
      }
    }
  }
}
</style>
