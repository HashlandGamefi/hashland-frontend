<template>
  <div class="record_page" v-if="minserdis">
    <div class="title fontsize32">{{proupTitle}}</div>
    <img :src="`${$store.state.imgUrl}proupclose.png`" class="close_img" @click="closepage"/>
    <div class="boxarr">
      <div class="onebox" v-for="(item,index) in boxarr" :key="index">
        <img :src="item.src" class="imgcard" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img :src="`${$store.state.imgUrl}start.png`" v-for="(item1,index1) in Number(item.level)" :key="index1" class="start_img" />
          </div>
          <div class="hc_coefficient">
            <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
            <span class="span1">{{item.hc}}</span>
          </div>
          <div class="hc_coefficient">
            <img :src="`${$store.state.imgUrl}btclogo.png`" class="imgcard" />
            <span class="span1">{{item.btc}}</span>
          </div>
        </div>
      </div>
    </div>
    <span class="bottom_title fontsize12_400">{{$t("message.details1")}}</span>
    <div class="connect_box fontsize18" @click="closepage">{{$t("message.button1")}}</div>
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
    proupTitle:{
      type: String,
      default: ''
    }
  },
  methods: {
    // 弹窗关闭
    closepage () {
      this.$emit('closepage')
    }
  }
}
</script>

<style lang='scss' scoped>
.record_page{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    margin-top: 180px;
    width: 100%;
    text-align: center;
    color: #FFFFFF;
    text-shadow: 0px 8px 17px rgba(52, 30, 2, 0.5);
  }
  .close_img{
    position: absolute;
    top: 50px;
    right: 100px;
    width: 66px;
    object-fit: contain;
    cursor: pointer;
  }
  .boxarr{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 360px;
    max-height: 738px;
    overflow-y: auto;
    .onebox{
      position: relative;
      width: 256px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 20px;
      margin-bottom: 20px;
      .imgcard{
        width: 100%;
        object-fit: contain;
      }
      .bottom{
        position: absolute;
        top: 0;
        left: 50%;
        display: flex;
        align-items: center;
        padding:10px 8px;
        transform: translateX(-50%) scale(0.5);
        .five_pointed_star{
          display: flex;
          align-items: center;
          .start_img{
            width: 26px;
            object-fit: contain;
          }
        }
        .hc_coefficient{
          display: flex;
          align-items: center;
          background: #302F2E;
          box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
          border-radius: 4px;
          margin-right: 5px;
          .imgcard{
            width: 43px;
            object-fit: contain;
          }
          .span1{
            color: #FFFFFF;
          }
        }
      }
    }
  }
  .bottom_title{
    color: #FFFFFF;
  }
  .connect_box {
    width: 274px;
    height: 59px;
    line-height: 49px;
    text-align: center;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    color: #ffffff;
    margin-top: 7px;
    cursor: pointer;
  }
}
@media screen and (min-width: 1280px) {
  .record_page{
    .boxarr{
      max-width: 1162px;
      margin: 40px auto;
    }
  }
}
@media screen and (max-width: 980px){
  .record_page{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    margin-top: 0.5rem;
    width: 100%;
    text-align: center;
    font-style: normal;
    color: #FFFFFF;
    line-height: 0.5rem;

    text-shadow: 0px 8px 17px rgba(52, 30, 2, 0.5);
  }
  .close_img{
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    width: 0.36rem;
    object-fit: contain;
  }
  .boxarr{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0.2rem;
    max-height: 9rem;
    overflow-y: auto;
    .onebox{
      position: relative;
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 0.1rem;
      // margin-right: calc((100% - 1480px) / 5);
      margin-bottom: 0.1rem;
      .imgcard{
        width: 100%;
        object-fit: contain;
      }
      .bottom{
        position: absolute;
        top: -0.27rem;
        left: -0.67rem;
        // background-image: url("//cdn.hashland.com/images/cardtop.png");
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        display: flex;
        align-items: center;
        padding:0.1rem 0.08rem;
        transform: scale(0.3);
        .five_pointed_star{
          display: flex;
          align-items: center;
          .start_img{
            width: 26px;
            object-fit: contain;
          }
        }
        .hc_coefficient{
          display: flex;
          align-items: center;
          background: #302F2E;
          box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
          border-radius: 4px;
          margin-right: 5px;
          .imgcard{
            width: 43px;
            object-fit: contain;
          }
          .span1{
            color: #FFFFFF;
          }
        }
      }
    }
  }
  .bottom_title{
    color: #FFFFFF;
  }
  .connect_box {
    width: 1.94rem;
    height: 0.38rem;
    text-align: center;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    color: #ffffff;
    margin-top: 0.1rem;
    cursor: pointer;
  }
}
}
</style>
