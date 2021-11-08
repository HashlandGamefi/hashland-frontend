<template>
  <div class="card_details_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="span_title fontsize32">{{$t("message.details")}}</span>
    <div class="boxarr">
      <div class="onebox" v-for="(item,index) in boxarr" :key="index">
        <img :src="item.src" class="imgcard" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img :src="`${$store.state.imgUrl}start.png`"  v-for="(item1,index1) in Number(item.level)" :key="index1" class="start_img" />
          </div>
          <div class="hc_coefficient">
            <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
            <span class="span1 fontsize12_400">{{item.hc}}</span>
          </div>
          <div class="hc_coefficient">
            <img :src="`${$store.state.imgUrl}btclogo.png`" class="imgcard" />
            <span class="span1 fontsize12_400">{{item.btc}}</span>
          </div>
        </div>
      </div>
      <NoData v-if="$route.query.num == 0"></NoData>
    </div>
    <!-- <span class="bottom_title fontsize12" v-if="boxarr.length > 0">{{$t("message.details1")}}</span>
    <div class="connect_box fontsize18" v-if="boxarr.length > 0">{{$t("message.button1")}}</div> -->
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
    ...mapGetters(["getIstrue","getAccount","getUserCardInfo"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue, oldValue) {
        console.log('卡牌详情页面钱包是否链接:', newValue,oldValue);
        console.log('this.$route.params.level: ', this.$route.query.level);
        if(newValue){
          setTimeout(() => {
            this.boxarr = JSON.parse(this.getUserCardInfo).filter(data => {return data.level == this.$route.query.level})

          },1500)
        }
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    back(){
      this.$router.go(-1)
    }
  },
  mounted(){
    console.log('$route.params.num : ', this.$route.query.num );
  }
}
</script>

<style lang='scss' scoped>
.card_details_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title{
    position: absolute;
    top: 149px;
    right: 90px;
    width: 44px;
    cursor: pointer;
    .backimg{
      width: 100%;
      object-fit: contain;
    }
  }
  .span_title{
    color: #FFFFFF;
    margin-top: 143px;
    margin-top: 208px;
  }
  .boxarr{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 500px;
    // max-height: 738px;
    overflow-y: auto;
    margin-top: 18px;
    .onebox{
      position: relative;
      width: 256px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 20px;
      margin-bottom: 61px;
      .imgcard{
        width: 100%;
        object-fit: contain;
      }
      .bottom{
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        padding:10px 8px;
        transform: scale(0.5);
        border-radius: 15px;
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
    line-height:  49px;
    text-align: center;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    color: #ffffff;
    margin-top: 16px;
    cursor: pointer;
  }
}
@media screen and (min-width: 1280px) {
  .card_details_page{
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px){
  .card_details_page{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1.07rem;
    .title{
      position: absolute;
      top: 0.15rem;
      right: 0.2rem;
      width: 0.36rem;
      cursor: pointer;
      .backimg{
        width: 100%;
        object-fit: contain;
      }
    }
    .span_title{
      color: #FFFFFF;
      line-height: 0.48rem;
      margin-top: 0.25rem;
    }
    .boxarr{
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 0.2rem;
      margin-top: 0.2rem;
      min-height: 2.5rem;
      overflow-y: auto;
      .onebox{
        position: relative;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 0;
        margin-bottom: 0.1rem;
        .imgcard{
          width: 100%;
          object-fit: contain;
        }
        .bottom{
          position: absolute;
          top: 0.2rem;
          display: flex;
          align-items: center;
          padding:0.1rem 0.08rem;
          transform:translate(0,-50%) scale(0.6);
          .five_pointed_star{
            display: flex;
            align-items: center;
            .start_img{
              width: 0.23rem;
              object-fit: contain;
            }
          }
          .hc_coefficient{
            display: flex;
            align-items: center;
            background: #302F2E;
            box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
            margin-right: 0;
            border-radius: 0.25rem;
            .imgcard{
              width: 0.23rem;
              object-fit: contain;
            }
            .span1{
              color: #FFFFFF;
              margin:0 0.05rem;
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
      line-height: 0.38rem;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: contain;
      background-repeat: no-repeat;
      color: #ffffff;
      margin-top: 0.2rem;
      cursor: pointer;
      margin-bottom: 0.2rem;
    }
  }
}
</style>
