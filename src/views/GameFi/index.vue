<template>
  <div class="game_page">
    <div class="game_main">
      <div class="game_banner">
        <div class="info_tool" v-if="loginRegisteredStatus">
          <div class="information_box">
            <img
              class="personal_center"
              :src="`${$store.state.imgUrl}personalCenter.png`"
            />
            <div class="mailAccount fontsize18">
              <span class="fontsize14">{{ mailAccount }}</span>
              <img
                class="information_accrow"
                :src="`${$store.state.imgUrl}accrow.png`"
              />
            </div>
            <div class="toolbox">
              <div @click="toPersonalCenter">
                <span class="fontsize14">个人中心</span>
                <img
                  class="toolbox_accrow"
                  :src="`${$store.state.imgUrl}accrow.png`"
                />
              </div>
              <div @click="toLogOut">
                <span class="fontsize14">退出登录</span>
                <img :src="`${$store.state.imgUrl}exit.png`" />
              </div>
            </div>
          </div>
        </div>
        <div class="btn_group fontsize18">
          <div @click="openLoginOrRegistered" v-if="!loginRegisteredStatus">
            {{ $t("message.nav.txt10") + " / " + $t("message.nav.txt11") }}
          </div>
          <!-- <div @click="openRecharge">充值</div> -->
          <!-- <div @click="downloadGame">play</div> -->
        </div>
      </div>
      <div class="game_introduction">
        <div class="game_title fontsize18">Hash warfare</div>
        <div class="player_box1">
          <iframe
            id="player"
            class="player"
            src="https://www.youtube.com/embed/liqxQp6wP6w"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="game_model">
          <div class="fontsize18">游戏模式</div>
          <ul>
            <li>
              <span class="fontsize16">PVE</span>
              <div class="fontsize12">
                Unlock new chapters, earn HC token and items
              </div>
            </li>
            <li>
              <span class="fontsize16">PVP</span>
              <div class="fontsize12">
                Build teams to challenge other players and earn HC token
              </div>
            </li>
            <li>
              <span class="fontsize16">GVE</span>
              <div class="fontsize12">
                Team up against bosses and compete for rare items
              </div>
            </li>
            <li>
              <span class="fontsize16">GVG</span>
              <div class="fontsize12">Join guilds and fight with teammates</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
      <LoginRegistered v-if="showLoginRegistered"></LoginRegistered>
      <Recharge v-if="showRecharge"></Recharge>
    </transition>
    <Proup
      :btntxt="btntxt"
      :word="word"
      :proupDis="proupDis"
      @besurefun="CloseFun"
      @closedis="CloseFun"
    ></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoginRegistered from "./loginRegistered.vue";
import Recharge from "./recharge.vue";
export default {
  components: { LoginRegistered, Recharge },
  data() {
    return {
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      showLoginRegistered: false,
      showRecharge: false,
      loginRegisteredStatus: false,
      mailAccount: "",
      // videoPlayer1: {
      //   sources: require("./videoplayback.mp4"),
      //   poster: require("./mqdefault_6s.webp"), // 封面地址
      //   // sources: "http://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4",
      //   // poster: "https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png", // 封面地址
      // },
    };
  },
  computed: {
    ...mapGetters(["getAccount"]),
  },
  created() {
    if (localStorage.getItem("hashlandGameFiInfo")) {
      const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
      this.loginRegisteredStatus = true; // 已登录
      this.mailAccount = gameFiInfo.mailAccount;
    } else {
      this.loginRegisteredStatus = false;
    }
    // const sUserAgent = navigator.userAgent.toLowerCase();
    // if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
    //   this.isMobile = true;
    //   console.log("移动端");
    // } else {
    //   this.isMobile = false;
    //   console.log("PC端");
    // }
  },
  methods: {
    /**打开登录与注册 */
    openLoginOrRegistered() {
      this.showLoginRegistered = true;
    },
    /**关闭登录与注册 */
    closeLoginRegistered() {
      this.showLoginRegistered = false;
    },
    /**个人中心 */
    toPersonalCenter() {
      this.$router.push("/personalCenter");
    },
    /**退出登录 */
    toLogOut() {
      localStorage.removeItem("hashlandGameFiInfo");
      this.loginRegisteredStatus = false; // 未登录
    },
    /**打开充值 */
    openRecharge() {
      if (!localStorage.getItem("hashlandGameFiInfo"))
        return this.$common.selectLang("请先登录！", "请先登录！", this);
      if (!this.getAccount)
        return this.$common.selectLang("请连接钱包！", "请链接钱包！", this);
      this.showRecharge = true;
    },
    /**游戏下载 */
    downloadGame() {
      // 游戏下载
    },
    /**公用提示框（关闭方法）  */
    CloseFun() {
      this.proupDis = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.game_page {
  padding-top: 80px;
  .game_main {
    width: 100vw;
  }
}
.game_banner {
  width: 100vw;
  height: 50vw;
  background-image: url("//cdn.hashland.com/images/gamebanner.png");
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  color: #ffffff;
  border-bottom:  1px solid #ccc;
  .info_tool {
    position: absolute;
    left: 130px;
    top: 100px;
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
        padding: 0 5px;
        background: rgba(28, 23, 24, 0.5);
        box-shadow: -10px -10px 30px 30px rgba(28, 23, 24, 0.5) inset,
          10px 10px 30px 30px rgba(28, 23, 24, 0.5) inset;
        border-radius: 10px;
        .information_accrow {
          width: 15px;
          height: auto;
          margin-left: 5px;
          transform: rotate(-90deg);
          transition: all 0.3s;
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
        box-shadow: -10px -10px 30px 30px rgba(28, 23, 24, 0.5) inset,
          10px 10px 30px 30px rgba(28, 23, 24, 0.5) inset;
        border-radius: 10px;
        .toolbox_accrow {
          transform: rotate(-90deg);
        }
        div {
          padding: 5px 10px;
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
.game_introduction {
  width: 80vw;
  height: auto;
  color: #ffffff;
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
    box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4),
      -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
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
          line-height: 6vw;
          padding: 0 1vw;
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
