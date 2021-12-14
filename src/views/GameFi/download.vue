<template>
  <div class="page">
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
          <div class="item_title">{{ item.title }}</div>
          <div class="list">
            <div class="li" v-for="(ite, ind) in item.list" :key="ind" @click="openLink(ite.href)">
              <img :src="ite.imgurl" alt="" />
              <span>{{ ite.text }}</span>
              <p v-if="ite.prompt">{{ ite.prompt }}</p>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      downloadData: [
        {
          title: `${this.$t("message.gameFi.text56")}`,
          prompt: `* ${this.$t("message.gameFi.text57")}`,
          list: [
            {
              imgurl: `${this.$store.state.imgUrl}android.png`,
              text: `${this.$t("message.gameFi.text58")}`,
              href: "https://www.baidu.com",
            },
            {
              imgurl: `${this.$store.state.imgUrl}ios.png`,
              text: `${this.$t("message.gameFi.text59")}`,
              href: "https://www.baidu.com",
            },
            {
              imgurl: `${this.$store.state.imgUrl}googleplay.png`,
              text: `${this.$t("message.gameFi.text60")}`,
              href: "https://www.baidu.com",
            },
          ],
        },
        {
          title: `${this.$t("message.gameFi.text61")}`,
          list: [
            {
              imgurl: `${this.$store.state.imgUrl}windows.png`,
              text: `${this.$t("message.gameFi.text62")}`,
              href: "https://www.baidu.com",
            },
            {
              imgurl: `${this.$store.state.imgUrl}macos.png`,
              text: `${this.$t("message.gameFi.text63")}`,
              href: "https://www.baidu.com",
            },
            {
              imgurl: `${this.$store.state.imgUrl}nowg.png`,
              text: `${this.$t("message.gameFi.text64")}`,
              href: "https://www.baidu.com",
              prompt: `${this.$t("message.gameFi.text65")}`,
            },
          ],
        },
      ],
    };
  },
  watch: {},
  computed: {},
  created() {},
  methods: {
    openLink(href) {
      console.log(href);
      window.location.href = href;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 80px 0;
  color: #fff;
  background: #00162e;
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
    // width: 60%;
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
    align-items: center;
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
        cursor: pointer;
        background: linear-gradient(90deg, #021f3e 0%, #01142a 100%, #034088 100%);
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), -13px 16px 19px -2px rgba(2, 12, 23, 0.69),
          -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
        border-radius: 6px;
        .li {
          height: 85px;
          background: rgba(11, 22, 43, 0.99);
          box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18), 0px 1px 1px 0px #8be6fe, 0px -1px 0px 0px #8be6fe;
          border-radius: 5px;
          margin: 20px;
          padding: 0 20px;
          position: relative;
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 600;
          overflow: hidden;
          &:hover,
          &.selected {
            background: rgba(245, 176, 0, 0.99);
            box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18);
            border-radius: 5px;
          }
          img {
            width: 40px;
            min-width: 40px;
            height: auto;
            margin-right: 1em;
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
}
@media screen and (max-width: 980px) {
  .page {
    padding: 60px 0;
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
            margin: 0.2rem;
            padding: 0 0.2rem;
            font-size: 14px;
            img {
              width: 0.4rem;
              min-width: 0.4rem;
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
  }
}
</style>
