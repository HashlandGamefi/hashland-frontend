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
        <img :src="item.loading ? item.src : `${$store.state.imgUrl}defaultcard.png`"
          class="imgcard"
          :class="{ blindBox_drop_anim: item.loading }"
        />
        <Lottie :options="anmationArr.filter(ele => {return ele.level == item.level && ele.type == item.type})[0].dataJson" :width="getIsMobile?256:'50%'" v-if="item.ultra" class="positon_absoult"></Lottie>
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
import { mapGetters } from "vuex";
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
  data(){
    return {
      anmationArr:[]
    }
  },
  computed: {
    ...mapGetters(["getIsMobile"])
  },
  watch: {
    'boxarr': {
      handler: function (newValue) {
        newValue.map(item => {
          let newImg = new Image()
          newImg.src = item.src
          newImg.onload = () => { // 图片加载成功后把地址给原来的img
            item.loading = true
          }
        })
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    // 弹窗关闭
    closepage () {
      this.$emit('closepage')
    },
    winbtnsure () {
      this.$emit('winbtnsure')
    }
  },
  mounted(){
    let timerObject = setInterval(() => {
      if(localStorage.getItem('Animation')){
        this.anmationArr = JSON.parse(localStorage.getItem('Animation'))
        clearInterval(timerObject)
      }
    },1000)
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
  // backdrop-filter: blur(16px);
  background: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadein 3s linear 1;
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
    min-height: 738px;
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
      .positon_absoult{
        position: absolute;
        top: 0;
        left: 0;
      }
      .blindBox_drop_anim {
        animation: blindBox_drop_anim 0.6s ease-in;
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
@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes blindBox_drop_anim {
  0% {
    transform: translateY(-80px) rotate(720deg) scale(0.1);
  }

  100% {
    transform: translateY(0) rotate(0deg) scale(1);
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
      padding: 0 0.2rem;
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
