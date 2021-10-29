<template>
  <div class="card_details_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}back.png`" class="backimg" />
    </div>
    <span class="span_title">{{$t("message.details")}}</span>
    <div class="boxarr">
      <div class="onebox" v-for="(item,index) in boxarr" :key="index">
        <img :src="item.src" class="imgcard" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img :src="`${$store.state.imgUrl}start.png`"  v-for="(item1,index1) in Number(item.level)" :key="index1" class="start_img" />
          </div>
          <div class="hc_coefficient">
            <img src="../../assets/images/hclogo.png" class="imgcard" />
            <span class="span1">{{item.hc}}%</span>
          </div>
          <div class="hc_coefficient">
            <img src="../../assets/images/btclogo.png" class="imgcard" />
            <span class="span1">{{item.btc}}%</span>
          </div>
        </div>
      </div>
    </div>
    <span class="bottom_title">{{$t("message.details1")}}</span>
    <div class="connect_box">{{$t("message.button1")}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      boxarr:[]
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount","getUserCardInfo"]),
    dataInfo:function(){
      return this.getUserCardInfo
    }
  },
  watch:{
    "dataInfo":{
      handler: function (newValue, oldValue) {
        if(newValue.length > 0){
          this.boxarr = JSON.parse(newValue)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    back(){
      this.$router.go(-1)
    }
  },
}
</script>

<style lang='scss' scoped>
.card_details_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 149px;
  .title{
    position: absolute;
    top: 160px;
    left: 90px;
    width: 121px;
    cursor: pointer;
    .backimg{
      width: 100%;
      object-fit: contain;
    }
  }
  .span_title{
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 84px;
    letter-spacing: 4px;
    // text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    // background: linear-gradient(360deg, rgba(47, 215, 242, 0) 0%, #00EBF3 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
  .boxarr{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 40px;
    // padding-right: 40px;
    margin-top: 70px;
    max-height: 980px;
    overflow-y: auto;
    .onebox{
      position: relative;
      width: 353px;
      // height: 305px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: calc((100% - 1480px) / 5);
      // margin-bottom: 30px;
      .imgcard{
        width: 100%;
        object-fit: contain;
      }
      .bottom{
        position: absolute;
        top: 18px;
        // width: 100%;
        background-image: url("//cdn.hashland.com/images/cardtop.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        padding:10px 8px;
        transform: scale(0.5);
        // transform: translate(-50%,-50%);
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
            // padding: 0 8px;
            // background: #302F2E;
            // box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            // line-height: 37px;
          }
        }
      }
    }
  }
  .bottom_title{
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 32px;
    letter-spacing: 1px;
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
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    margin-top: 30px;
    cursor: pointer;
  }
}
@media screen and (min-width: 1440px) {
  .card_details_page{
    max-width: 1400px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px){
  .card_details_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  .title{
    position: absolute;
    top: 0.3rem;
    left: 0.2rem;
    width: 0.36rem;
    cursor: pointer;
    .backimg{
      width: 100%;
      object-fit: contain;
    }
  }
  .span_title{
    font-size: 0.26rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 0.48rem;
  }
  .boxarr{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 0.2rem;
    // padding-right: 40px;
    margin-top: 0.2rem;
    max-height: 9rem;
    overflow-y: auto;
    .onebox{
      position: relative;
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 0;
      margin-bottom: 0.1rem;
      // margin-right: calc((100% - 1480px) / 5);
      // margin-bottom: 30px;
      .imgcard{
        width: 100%;
        object-fit: contain;
      }
      .bottom{
        position: absolute;
        top: -0.21rem;
        background-image: url("//cdn.hashland.com/images/cardtop.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        padding:0.1rem 0.08rem;
        transform: scale(0.1);
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
            // padding: 0 8px;
            // background: #302F2E;
            // box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            // line-height: 37px;
          }
        }
      }
    }
  }
  .bottom_title{
    font-size: 0.14rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 32px;
    letter-spacing: 1px;
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
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    margin-top: 0.2rem;
    cursor: pointer;
    margin-bottom: 0.2rem;
  }
}
}
</style>
