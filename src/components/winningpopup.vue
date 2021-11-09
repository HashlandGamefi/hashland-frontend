<template>
  <div class="record_page" v-if="minserdis">
    <div class="title fontsize26">{{ proupTitle }}</div>
    <img
      :src="`${$store.state.imgUrl}proupclose.png`"
      class="close_img"
      @click="closepage"
    />
    <div class="boxarr">
      <div class="onebox" v-for="(item, index) in boxarr" :key="index">
        <img :src="item.src" class="imgcard" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img
              :src="`${$store.state.imgUrl}start.png`"
              v-for="(item1, index1) in Number(item.level)"
              :key="index1"
              class="start_img"
            />
          </div>
          <div class="hc_coefficient">
            <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
            <span class="span1 fontsize12_400">{{ item.hc }}</span>
          </div>
          <div class="hc_coefficient">
            <img :src="`${$store.state.imgUrl}btclogo.png`" class="imgcard" />
            <span class="span1 fontsize12_400">{{ item.btc }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="Suspension_btnbox">
      <span class="bottom_title fontsize12_400">{{
        $t("message.details1")
      }}</span>
      <div class="btn_box fontsize18" @click="winbtnsure">
        {{ $t("message.button1") }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    minserdis: {
      type: Boolean,
      default: false
    },
    boxarr: {
      type: Array,
      default: function () { return [] }
    },
    proupTitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 弹窗关闭
    closepage () {
      this.$emit('closepage')
    },
    winbtnsure () {
      this.$emit('winbtnsure')
    }
  }
}
</script>

<style lang='scss' scoped>
.record_page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin-top: 50px;
    width: 100%;
    text-align: center;
    color: #ffffff;
  }
  .close_img {
    position: absolute;
    top: 10px;
    right: 100px;
    width: 44px;
    object-fit: contain;
    cursor: pointer;
  }
  .boxarr {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 360px;
    max-height: 738px;
    overflow-y: auto;
    padding-bottom: 132px;
    .onebox {
      position: relative;
      width: 256px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 20px;
      margin-bottom: 20px;
      .imgcard {
        width: 100%;
        object-fit: contain;
      }
      .bottom {
        position: absolute;
        top: 0;
        left: 50%;
        display: flex;
        align-items: center;
        padding: 10px 8px;
        transform: translateX(-50%) scale(0.5);
        .five_pointed_star {
          display: flex;
          align-items: center;
          .start_img {
            width: 26px;
            object-fit: contain;
          }
        }
        .hc_coefficient {
          display: flex;
          align-items: center;
          background: #302f2e;
          box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
          border-radius: 4px;
          margin-right: 5px;
          .imgcard {
            width: 43px;
            object-fit: contain;
          }
          .span1 {
            color: #ffffff;
          }
        }
      }
    }
  }
  .Suspension_btnbox {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translate(-50%);
    width: 637px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(
      180deg,
      #06366d 0%,
      rgba(7, 31, 58, 0) 100%,
      #034088 100%
    );
    border-radius: 79px;
    padding-top: 24px;
    .bottom_title {
      color: #ffffff;
    }
    .btn_box {
      width: 274px;
      height: 59px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: #ffffff;
      cursor: pointer;
      margin-top: 14px;
    }
  }
}
@media screen and (min-width: 1280px) {
  .record_page {
    .boxarr {
      max-width: 1162px;
      margin: 40px auto;
      margin-bottom: 0;
    }
  }
}
@media screen and (max-width: 980px) {
  .record_page {
    .title {
      margin-top: 1rem;
      width: 100%;
      text-align: center;
      color: #ffffff;
    }
    .close_img {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      width: 0.36rem;
      object-fit: contain;
    }
    .boxarr {
      width: 100%;
      padding:0 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      min-height: 3.7rem;
      max-height: 3.7rem;
      overflow-y: auto;
      margin: 0.3rem;
      .onebox {
        position: relative;
        width: 1.56rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 0.05rem;
        margin-bottom: 0.16rem;
        .imgcard {
          width: 100%;
          object-fit: contain;
        }
        .bottom {
          position: absolute;
          top: 0;
          left: 50%;
          display: flex;
          align-items: center;
          padding: 0.1rem 0.08rem;
          transform: translateX(-50%) scale(0.5);
          .five_pointed_star {
            display: flex;
            align-items: center;
            .start_img {
              width: 0.13rem;
              object-fit: contain;
            }
          }
          .hc_coefficient {
            display: flex;
            align-items: center;
            background: #302f2e;
            box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
            border-radius: 0.04rem;
            margin-right: 0.05rem;
            .imgcard {
              width: 0.13rem;
              object-fit: contain;
            }
            .span1 {
              color: #ffffff;
            }
          }
        }
      }
    }
    .Suspension_btnbox {
      position: absolute;
      bottom: 0.15rem;
      left: 50%;
      transform: translate(-50%);
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(
        180deg,
        #06366d 0%,
        rgba(7, 31, 58, 0) 100%,
        #034088 100%
      );
      border-radius: 0.79rme;
      padding-top: 0.12rem;
      .bottom_title {
        color: #ffffff;
        transform: scale(0.8);
      }
      .btn_box {
        width: 1.67rem;
        height: 0.39rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #ffffff;
        cursor: pointer;
        margin-top: 0.06rem;
      }
    }
  }
}
</style>
