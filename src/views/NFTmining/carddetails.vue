<template>
  <div class="card_details_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="span_title fontsize32">{{$t("message.details")}}</span>
    <div class="boxarr">
      <div class="onebox" v-for="(item,index) in boxarr" :key="index">
        <img :src="item.src" class="imgcard" />
        <Lottie :options="lv3_defaultOptions" v-if="item.level == 3" :width="256" class="positon_absoult"/>
      </div>
      <NoData v-if="$route.query.num == 0"></NoData>
    </div>
  </div>
</template>

<script>
import Lottie from '@/components/lottie.vue'
import animationData from '@/assets/common/data3.json' // 引入json文件
import { mapGetters } from "vuex";
export default {
  components: {
    Lottie
  },
  data () {
    return {
      boxarr:[],
      lv3_defaultOptions: {
        animationData: animationData
      },
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount","getUserCardInfo"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue, oldValue) {
        if(newValue){
          this.getUserAllCard()
        }
      },
      deep: true,
      immediate: true,
      timerll:null
    },
  },
  methods: {
    // 用户总卡牌数据获取
    getUserAllCard(){
      clearInterval(this.timerll)
      this.timerll = setInterval(() => {
        if(sessionStorage.getItem('count')){
          clearInterval(this.timerll)
          let arr = JSON.parse(this.getUserCardInfo).filter(data => {return data.level == this.$route.query.level})
          arr.sort((a, b) => {
            return Number(a.type) > Number(b.type) ? 1 : -1;
          })
          this.boxarr = arr
        }
        console.log("获取用户信息")
      }, 1000);
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
      .positon_absoult{
        position: absolute;
        top: 0;
        left: 0;
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
