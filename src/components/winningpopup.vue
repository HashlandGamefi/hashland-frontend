<template>
  <div class="record_page" v-if="minserdis">
    <div class="title">{{$t("message.buy1")}}</div>
    <img :src="`${$store.state.imgUrl}closebg.png`" class="close_img" @click="closepage"/>
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
    <span class="bottom_title">{{$t("message.details1")}}</span>
    <div class="connect_box" @click="closepage">{{$t("message.button1")}}</div>
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
    margin-top: 60px;
    width: 100%;
    text-align: center;
    font-size: 40px;

    font-style: italic;
    color: #FFFFFF;
    line-height: 73px;

    text-shadow: 0px 8px 17px rgba(52, 30, 2, 0.5);
    // -webkit-text-stroke: 2px #000000;
    // -webkit-text-fill-color: transparent;
  }
  .close_img{
    position: absolute;
    top: 40px;
    right: 80px;
    width: 73px;
    object-fit: contain;
  }
  .boxarr{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding: 0 40px;
    max-height: 980px;
    overflow-y: auto;
    .onebox{
      position: relative;
      width: 450px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: calc((100% - 1480px) / 5);
      .imgcard{
        width: 100%;
        object-fit: contain;
      }
      .bottom{
        position: absolute;
        top: 30px;
        left: 22%;
        // background-image: url("//cdn.hashland.com/images/cardtop.png");
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
        display: flex;
        align-items: center;
        padding:10px 8px;
        transform: scale(0.7);
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
            font-size: 26px;


            color: #FFFFFF;
          }
        }
      }
    }
  }
  .bottom_title{
    font-size: 26px;


    color: #FFFFFF;
    line-height: 32px;

  }
  .connect_box {
    width: 533px;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 40px;


    color: #ffffff;
    margin-top: 30px;
    cursor: pointer;
  }
}
@media screen and (min-width: 1280px) {
  .composite_card{
    max-width: 1400px;
    margin: 0 auto;
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
    font-size: 0.2rem;

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
            font-size: 26px;


            color: #FFFFFF;
          }
        }
      }
    }
  }
  .bottom_title{
    font-size: 0.14rem;


    color: #FFFFFF;
    line-height: 0.2rem;

  }
  .connect_box {
    width: 1.94rem;
    height: 0.38rem;
    text-align: center;
    line-height: 0.38rem;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 0.18rem;


    color: #ffffff;
    margin-top: 0.1rem;
    cursor: pointer;
  }
}
}
</style>
