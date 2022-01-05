<template>
  <div class="card_details_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="span_title fontsize32">{{$t("message.details")}}</span>
    <div class="boxarr">
      <div class="onebox" :class="{margin0:index % 4 == 3 }" v-for="(item,index) in boxarr" :key="index">
        <img :src="item.src" class="imgcard" />
        <Lottie :options="lv1_defaultOptions" v-if="item.level == 1" :width="256" class="positon_absoult"></Lottie>
        <Lottie :options="lv2_defaultOptions" v-if="item.level == 2" :width="256" class="positon_absoult"></Lottie>
        <Lottie :options="lv3_defaultOptions" v-if="item.level == 3" :width="256" class="positon_absoult"></Lottie>
        <Lottie :options="lv4_defaultOptions" v-if="item.level == 4" :width="256" class="positon_absoult"></Lottie>
        <Lottie :options="lv5_defaultOptions" v-if="item.level == 5" :width="256" class="positon_absoult"></Lottie>
      </div>
      <div class="loadingbox fontsize16" v-if="boxarr.length == 0 && pageshowLoading">
        Loading...
      </div>
      <NoData v-else-if="boxarr.length == 0 && !pageshowLoading"></NoData>
    </div>
  </div>
</template>

<script>
import lv1_animationData from '@/assets/common/data1.json' // 引入json文件
import lv2_animationData from '@/assets/common/data2.json' // 引入json文件
import lv3_animationData from '@/assets/common/data3.json' // 引入json文件
import lv4_animationData from '@/assets/common/data4.json' // 引入json文件
import lv5_animationData from '@/assets/common/data5.json' // 引入json文件
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      pageshowLoading:true,
      boxarr:[],
      lv1_defaultOptions: {
        animationData: lv1_animationData
      },
      lv2_defaultOptions: {
        animationData: lv2_animationData
      },
      lv3_defaultOptions: {
        animationData: lv3_animationData
      },
      lv4_defaultOptions: {
        animationData: lv4_animationData
      },
      lv5_defaultOptions: {
        animationData: lv5_animationData
      },
      timerll:null
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getUserCardInfo","getIsMobile"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          this.pageshowLoading = true
          this.getUserAllCard()
        }else{
          this.pageshowLoading = false
          this.boxarr = []
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 用户总卡牌数据获取
    getUserAllCard(){
      clearInterval(this.timerll)
      this.timerll = setInterval(() => {
        if(sessionStorage.getItem('count')){
          clearInterval(this.timerll)
          let arr = JSON.parse(this.getUserCardInfo).filter(data => {return data.level == this.$route.query.level})
          this.boxarr = arr.sort((a, b) => {
            return Number(a.type) > Number(b.type) ? 1 : -1;
          })
          this.pageshowLoading = false
        }
      }, 500);
    },
    back(){
      this.$router.go(-1)
    }
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
    // justify-content: space-between;
    flex-wrap: wrap;
    min-height: 500px;
    overflow-y: auto;
    margin-top: 18px;
    .onebox{
      position: relative;
      width: 256px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40px;
      margin-bottom: 61px;
      .imgcard{
        width: 100%;
        object-fit: contain;
      }
      .positon_absoult{
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .margin0{
      margin-right: 0;
    }
    .loadingbox {
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
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
