<template>
  <div class="card_details_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="span_title fontsize32">{{$t("message.details")}}</span>
    <div class="boxarr">
      <div class="onebox" :class="{margin0:index % 4 == 3 }" v-for="(item,index) in boxarr" :key="index">
        <img :src="item.src" class="imgcard" />
        <Lottie :options="anmationArr.filter(ele => {return ele.level == item.level && ele.type == item.type})[0].dataJson" :width="getIsMobile?256:'50%'" v-if="item.ultra && anmationArr.length > 0"></Lottie>
      </div>
      <LoadingAnmation v-if="boxarr.length == 0 && pageshowLoading"></LoadingAnmation>
      <NoData v-else-if="boxarr.length == 0 && !pageshowLoading"></NoData>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      anmationArr:[],//动画数组的json
      pageshowLoading:true,
      boxarr:[],
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
          this.boxarr = []
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
          let arr = JSON.parse(this.getUserCardInfo).filter(data => {return data.series == this.$route.query.serise && data.level == this.$route.query.level})
          this.boxarr = arr.sort((a, b) => {
            if(a.ultra == b.ultra == true){
              if(b.type == a.type){
                return b.type - a.type
              }else{
                return a.type - b.type
              }
            }else{
              return b.ultra - a.ultra
            }
          })
          // console.log("卡牌详情页面展示的数组:",this.boxarr)
          this.pageshowLoading = false
        }
      }, 500);
    },
    back(){
      this.$router.go(-1)
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
