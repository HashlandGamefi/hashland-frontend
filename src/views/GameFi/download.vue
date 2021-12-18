<template>
  <div class="page">
    <img class="return_img" :src="`${$store.state.imgUrl}proupclose.png`" @click="returnToPreviousPage" />
    <div class="banner">
      <img class="left_img" :src="`${$store.state.imgUrl}gamefi_downloadbg1.png`" alt="" />
      <ul class="banner_center">
        <li>{{ $t("message.gameFi.text47") }}</li>
        <li>
          <div>
            <span></span><span>{{ $t("message.gameFi.text48") }}</span>
          </div>
          <div>
            <span></span><span>{{ $t("message.gameFi.text49") }}</span>
          </div>
          <div>
            <span></span><span>{{ $t("message.gameFi.text50") }}</span>
          </div>
        </li>
        <li>{{ $t("message.gameFi.text51") }}</li>
      </ul>
      <img class="right_img" :src="`${$store.state.imgUrl}gamefi_downloadbg2.png`" alt="" />
    </div>
    <div class="page_main">
      <div class="main_title">{{ $t("message.gameFi.text52") }}</div>
      <div class="box">
        <div class="item" v-for="(item, index) in downloadData" :key="index">
          <div class="item_title">{{ item.mobileDesktop }}</div>
          <div class="list">
            <div class="li_box" v-for="(it, ind) in item.list" :key="ind">
              <div class="li" v-if="it.isShow" @click="openLink(it)" :class="{ disable: !it.downloadLink }">
                <img :src="it.imgUri" alt="" />
                <div>
                  <div>{{ it.application }}</div>
                  <div v-if="!it.downloadLink">{{ $t("message.gameFi.text79") }}</div>
                </div>
                <p v-if="it.prompt">{{ it.prompt }}</p>
              </div>
            </div>
            <div class="prompt" v-if="item.prompt">{{ item.prompt }}</div>
          </div>
        </div>
      </div>
      <div class="main_title">{{ $t("message.gameFi.text53") }}</div>
      <div class="main_title2">
        {{ $t("message.gameFi.text54") }}
        <a href="https://land-hash.gitbook.io/hashland/gamefi/hash-warfare">{{ $t("message.gameFi.text55") }}</a>
      </div>
      <div class="main_title">{{ $t("message.gameFi.text84") }}</div>
      <div class="box2">
        <div class="item">
          <div>{{ $t("message.gameFi.text85") }}</div>
          <div class="select_list" v-if="versionData.version">
            <span>{{ versionData.version }}</span>
            <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
            <ul id="versionlist" class="list">
              <li v-for="(item, index) in versionlist" :key="index" @click="selectVersion(item)">{{ item }}</li>
            </ul>
          </div>
        </div>
        <div class="item">
          <div>{{ $t("message.gameFi.text86") }}</div>
          <div v-if="versionData.update">{{ versionData.update }}</div>
        </div>
        <div class="item">
          <div>{{ $t("message.gameFi.text87") }}</div>
          <div v-if="versionData.log">
            {{ versionData.log }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameFiVersionUpdateLog from "@/configs/gameFi-version-update-log";
export default {
  data() {
    return {
      // isProd: false,
      downloadData: [
        {
          mobileDesktop: `${this.$t("message.gameFi.text56")}`,
          list: [
            {
              id: 1,
              isShow: true,
              imgUri: `${this.$store.state.imgUrl}android.png`,
              application: `${this.$t("message.gameFi.text58")}`,
              isOpen: true,
              openTime: null, // 2021-12-16 20:30:00
              downloadLink: GameFiVersionUpdateLog[0].downloadLink,
            },
            {
              id: 2,
              isShow: true,
              imgUri: `${this.$store.state.imgUrl}ios.png`,
              application: `${this.$t("message.gameFi.text59")}`,
              isOpen: false,
              openTime: null,
            },
            {
              id: 3,
              isShow: true,
              imgUri: `${this.$store.state.imgUrl}googleplay.png`,
              application: `${this.$t("message.gameFi.text60")}`,
              isOpen: false,
              openTime: null,
            },
          ],
          prompt: `* ${this.$t("message.gameFi.text57")}`,
        },
        {
          mobileDesktop: `${this.$t("message.gameFi.text61")}`,
          list: [
            {
              id: 4,
              isShow: true,
              imgUri: `${this.$store.state.imgUrl}nowg.png`,
              application: `${this.$t("message.gameFi.text64")}`,
              isOpen: false,
              openTime: null,
              prompt: `${this.$t("message.gameFi.text65")}`,
            },
            {
              id: 5,
              isShow: false,
              imgUri: `${this.$store.state.imgUrl}windows.png`,
              application: `${this.$t("message.gameFi.text62")}`,
              isOpen: false,
              openTime: null,
            },
            {
              id: 6,
              isShow: false,
              imgUri: `${this.$store.state.imgUrl}macos.png`,
              application: `${this.$t("message.gameFi.text63")}`,
              isOpen: false,
              openTime: null,
            },
          ],
        },
      ],
      versionlist: [],
      versionData: {
        version: "",
        update: "",
        log: "",
        downloadLink: "",
      },
    };
  },

  created() {
    // this.isProd = process.env.NODE_ENV === "production" ? true : false;
    if (GameFiVersionUpdateLog.length > 0) this.versionData = GameFiVersionUpdateLog[0];
    GameFiVersionUpdateLog.forEach((element) => {
      this.versionlist.push(element.version);
    });
    // console.log(this.downloadData[0].list[0].href);
    // this.downloadData.forEach((element) => {
    //   element.list.forEach((item) => {
    //     if (item.openTime) {
    //       const openTime = this.$common.foreignTimeFormat(item.openTime, "yyyy-MM-dd HH-ss");
    //       item.isOpen = this.countdown(item.openTime);
    //       console.log(`${item.application}下载包，${openTime}，开放！${item.isOpen ? "现已开放" : "还未开放"}`);
    //     }
    //   });
    // });
  },
  methods: {
    selectVersion(item) {
      GameFiVersionUpdateLog.forEach((element) => {
        if (item == element.version) {
          this.versionData = element;
        }
      });
    },
    countdown(end) {
      return Date.parse(new Date()) > end ? true : false;
    },
    openLink(item) {
      // const message = `${item.id},${item.application}下载包，${item.isOpen},${item.isOpen ? "现已开放" : "还未开放"}`;
      // console.log(message);
      // if (!item.isOpen) return;
      if (item.downloadLink) window.location.href = item.downloadLink;
    },
    returnToPreviousPage() {
      history.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 80px 0;
  color: #fff;
  // background: #00162e;
  position: relative;
  .return_img {
    cursor: pointer;
    width: 50px;
    height: auto;
    position: absolute;
    top: 90px;
    right: 80px;
    z-index: 10;
  }
}
.banner {
  width: 100vw;
  height: 400px;
  text-align: center;
  box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), 7px -20px 36px 0px rgba(255, 255, 255, 0.1);
  border: 1px solid;
  border-image: linear-gradient(180deg, rgba(139, 230, 254, 0), rgba(139, 230, 254, 0), rgba(139, 230, 254, 0)) 1 1;
  position: relative;
  img {
    width: 300px;
    height: auto;
    position: absolute;
    bottom: 0;
    &.left_img {
      left: 0;
    }
    &.right_img {
      right: 0;
    }
  }
  .banner_center {
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 9;
    li {
      font-weight: 600;
      &:nth-child(1) {
        font-size: 32px;
      }
      &:nth-child(3) {
        font-size: 14px;
      }
      &:nth-child(2) {
        font-size: 18px;
        margin: 50px 0;
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #0f2a46;
        border-radius: 40px;
        white-space: nowrap;
        padding: 0 20px;
        div {
          display: flex;
          align-items: center;
          margin: 0 20px;
          span {
            &:nth-child(1) {
              width: 10px;
              height: 10px;
              min-width: 10px;
              margin: 0 0.5em;
              border-radius: 50%;
              background: #8be6fe;
            }
          }
        }
      }
    }
  }
}
.page_main {
  width: 80vw;
  margin: 0 auto;
  .main_title {
    margin-top: 80px;
    font-size: 22px;
    font-weight: bold;
    text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
  }
  .main_title2 {
    margin-top: 20px;
    font-size: 12px;
    font-weight: 600;
    a {
      color: #8be6fe;
      text-decoration: underline;
    }
  }
  .box {
    display: flex;
    justify-content: space-around;
    .item {
      margin-top: 40px;
      .item_title {
        width: fit-content;
        background: #0f2a46;
        border-radius: 30px;
        padding: 10px 30px;
        font-size: 22px;
        font-weight: 600;
        line-height: 30px;
        text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
      }
      .list {
        width: 450px;
        padding: 20px;
        margin-top: 10px;
        position: relative;
        background: linear-gradient(90deg, #021f3e 0%, #01142a 100%, #034088 100%);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), -13px 16px 19px -2px rgba(2, 12, 23, 0.69),
          -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
        border-radius: 6px;
        .li {
          margin: 20px;
          height: 85px;
          padding: 0 20px;
          background: rgba(11, 22, 43, 0.99);
          box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18), 0px 1px 1px 0px #8be6fe, 0px -1px 0px 0px #8be6fe;
          border-radius: 5px;
          position: relative;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          overflow: hidden;
          &:hover {
            cursor: pointer;
            background: rgba(139, 230, 254, 0.7);
            box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18);
          }
          &.disable:hover {
            cursor: no-drop;
            background: rgba(11, 22, 43, 0.99);
            box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18), 0px 1px 1px 0px #8be6fe, 0px -1px 0px 0px #8be6fe;
          }
          img {
            width: 40px;
            min-width: 40px;
            height: auto;
            margin-right: 1em;
          }
          > div {
            display: flex;
            > div:nth-child(1) {
              margin-right: 1em;
            }
          }
          p {
            font-size: 8px;
            font-weight: 400;
            width: fit-content;
            white-space: nowrap;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 5px;
            margin: auto;
          }
        }
        .prompt {
          font-size: 12px;
          font-weight: 600;
          position: absolute;
          right: 20px;
          bottom: 10px;
        }
      }
    }
  }
  .box2 {
    padding-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item {
      &:nth-child(1) {
        width: 20%;
      }
      &:nth-child(2) {
        width: 20%;
      }
      &:nth-child(3) {
        width: 30%;
        div {
          &:nth-child(2) {
            font-size: 12px;
          }
        }
      }
      > div {
        background: linear-gradient(90deg, #021f3e 0%, #01142a 100%, #034088 100%);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), -13px 16px 19px -2px rgba(2, 12, 23, 0.69),
          -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
        border-radius: 4px;
        font-size: 16px;
        &:nth-child(1) {
          text-align: center;
          margin-bottom: 20px;
          padding: 10px 0;
        }
        &:nth-child(2) {
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .select_list {
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      .accrow {
        margin-left: 1em;
        width: 15px;
        height: auto;
        transform: rotate(-90deg);
        transition: all 0.3s;
      }
      ul {
        width: 100%;
        height: auto;
        background: #082545;
        box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
        border-radius: 0 0 6px 6px;
        overflow: hidden;
        position: absolute;
        top: calc(100% + 5px);
        left: 0;
        transform: scaleY(0);
        transition: transform 0.2s;
        transform-origin: top center;
        li {
          font-size: 16px;
          height: 40px;
          line-height: 40px;
          &:hover {
            background: #00e7f0;
          }
        }
      }
      &:hover {
        .accrow {
          transform: rotate(0);
        }
        ul {
          transform: scaleY(1);
        }
      }
    }
  }
}
@media screen and (max-width: 980px) {
  .page {
    padding: 60px 0;
    .return_img {
      width: 0.3rem;
      top: 70px;
      right: 10px;
    }
  }
  .banner {
    height: 2rem;
    img {
      width: 1.2rem;
      &.left_img {
        left: -5%;
      }
      &.right_img {
        right: -10%;
      }
    }
    .banner_center {
      width: fit-content;
      li {
        &:nth-child(1) {
          font-size: 18px;
        }
        &:nth-child(3) {
          font-size: 10px;
        }
        &:nth-child(2) {
          font-size: 10px;
          margin: 0.2rem 0;
          padding: 0 0.05rem;
          line-height: 0.3rem;
          div {
            display: flex;
            align-items: center;
            margin: 0;
            span {
              &:nth-child(1) {
                width: 5px;
                height: 5px;
                min-width: 5px;
              }
            }
          }
        }
      }
    }
  }

  .page_main {
    width: 90vw;
    margin: 0 auto;
    .main_title {
      font-size: 18px;
      margin-top: 0.2rem;
    }
    .main_title2 {
      font-size: 10px;
      margin-top: 0.1rem;
    }
    .box {
      display: block;
      .item {
        margin-top: 0.2rem;
        width: 90vw;
        .item_title {
          padding: 0.05rem 0.2rem;
          font-size: 16px;
          line-height: 22px;
        }
        .list {
          width: 100%;
          padding: 0.2rem;
          margin-top: 0.1rem;
          .li {
            height: 0.85rem;
            margin: 0.2rem 0.1rem;
            padding: 0 0.2rem;
            font-size: 14px;
            img {
              width: 0.4rem;
              min-width: 0.4rem;
            }
            > div {
              display: block;
              > div:nth-child(1) {
                margin-right: 0;
              }
            }
            p {
              font-size: 8px;
              font-weight: 400;
              width: fit-content;
              white-space: nowrap;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 5px;
              margin: auto;
            }
          }
          .prompt {
            right: 0.2rem;
            bottom: 0.1rem;
            font-size: 10px;
          }
        }
      }
    }
    .box2 {
      flex-wrap: wrap;
      .item {
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          width: 100%;
        }
        > div {
          &:nth-child(1) {
            margin-bottom: 0.1rem;
          }
          &:nth-child(2) {
            margin-bottom: 0.3rem;
          }
        }
        &:last-child {
          > div {
            &:nth-child(2) {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>
