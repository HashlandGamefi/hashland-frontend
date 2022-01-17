<template>
  <div class="record_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="title1_txt fontsize32">{{$t("message.market.txt28")}}</span>
    <div class="show_gameArr">
      <div class="onebox" :class="{margin0:index % 4 == 3 }" v-for="(item,index) in pageshowarr" :key="index">
        <img :src="item.src" class="img" />
        <Lottie :options="anmationArr.filter(ele => {return ele.level == item.level && ele.type == item.type})[0].dataJson" :width="getIsMobile?256:'50%'" v-if="item.ultra"></Lottie>
        <div class="bottom_box">
          <div class="left_price">
            <img :src="`${$store.state.imgUrl}bsc.png`" class="bsc_img" />
            <span class="span1 fontsize16" v-if="$route.query.type == 'busd'">{{item.price}} BUSD</span>
            <span class="span1 fontsize16" v-if="$route.query.type == 'hc'">{{item.price}} HC</span>
          </div>
          <div class="btn fontsize12" @click="cancleOrder(item)">
            {{$t("message.market.txt34")}}<BtnLoading :isloading="item.isloading"></BtnLoading>
          </div>
        </div>
      </div>
      <LoadingAnmation v-if="pageshowarr.length == 0 && pageshowLoading"></LoadingAnmation>
      <NoData v-else-if="pageshowarr.length == 0 && !pageshowLoading" :isshow="false"></NoData>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnMarket,hnMarketV2,hn,getHnImg,getSigner } from 'hashland-sdk';
export default {
  data () {
    return {
      anmationArr:[],//动画数组的json
      pageshowLoading:true,//数据没有加载完之前显示loading
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      tabIndex: 0,//tab索引
      pageshowarr:[],// 页面展示数组
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount","getIsMobile"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          this.pageshowLoading = true//数据没有加载完之前显示loading
          this.resetData()
          this.connectInfo(this.$route.query.type)
        }else{
          this.pageshowLoading = false//数据没有加载完之前显示loading
          this.resetData()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods:{
    // 重置数据
    resetData(){
      this.pageshowarr = []// 页面展示数组
    },
    // 撤单
    cancleOrder(item){
      if(item.isloading)return
      item.isloading = true
      // console.log("取消订单:",item)
      if(this.$route.query.type == 'busd'){
        hnMarket().connect(getSigner()).cancel([item.cardID]).then(async res => {
          // console.log('卖家批量取消出售卡牌(busd售卖的)res: ', res);
          const etReceipt = await res.wait();
            if(etReceipt.status == 1){
              this.$common.selectLang('撤单成功','Cancel Successfully',this)
              this.connectInfo('busd')
              item.isloading = false
            }else{
              item.isloading = false
            }
        }).catch(() => {
          item.isloading = false
        })
      }else{
        hnMarketV2().connect(getSigner()).cancel([item.cardID]).then(async res => {
          // console.log('卖家批量取消出售卡牌(hc售卖的)res: ', res);
          const etReceipt = await res.wait();
            if(etReceipt.status == 1){
              this.$common.selectLang('撤单成功','Cancel Successfully',this)
              this.connectInfo('hc')
              item.isloading = false
            }else{
              item.isloading = false
            }
        }).catch(() => {
          item.isloading = false
        })
      }
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    back(){
      this.$router.go(-1)
    },
    connectInfo(type){
      if(type == 'busd'){
        this.getMarketCardInfo(hnMarket).then(res =>{
          this.pageshowLoading = false
          if(res.istrue){
            this.pageshowarr = res.arr
          }
        })
      }else if(type == 'hc'){
        this.getMarketCardInfo(hnMarketV2).then(res =>{
          // console.log('获取到的卖家正在出售的卡牌res: ', res);
          this.pageshowLoading = false
          if(res.istrue){
            this.pageshowarr = res.arr.sort((a, b) => {
              if(a.ultra == b.ultra == true){
                return a.level > b.level?1 :-1
              }
              return a.ultra > b.ultra?-1 :1
            })
          }
        })
      }
    },
    // 获取某卖家正在出售卡牌id数组
    getMarketCardInfo(funName){
      return new Promise((resolve) => {
        funName().getSellerHnIdsBySize(this.getAccount,0,10000000).then(res => {
          // console.log('获取某卖家正在出售卡牌id数组res: ', res);
          if(res[0].length == 0){
            resolve({'istrue':true,'arr':[]})
            return
          }
          let count = 1
          let arr = []
          res[0].map(async item => {
            let obj = {
              cardID: "",
              level: "",
              type: "", // 卡牌的种类
              src: "",
              price:"",
              isloading:false
            }
            obj.cardID = item.toString() // 卡牌的id
            obj.type = (await hn().getRandomNumber(item, "class", 1, 4)).toString()
            obj.level = (await hn().level(item)).toString() // 等级
            let card_price = (await funName().hnPrice(item)).toString()
            obj.price = this.$common.convertBigNumberToNormal(card_price,0)
            obj.ultra = (await hn().data(item, 'ultra')) >= 1?true:false
            let race = await hn().getHashrates(item) // 算力数组
            obj.src = getHnImg(Number(item), obj.level, race,obj.ultra);
            arr.push(obj)
            if (count == res[0].length) {
              resolve({'istrue':true,'arr':arr})
            }
            count++;
          })
        })
      })
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    position: absolute;
    top: 100px;
    right: 90px;
    width: 44px;
    cursor: pointer;
    .backimg {
      width: 100%;
      object-fit: contain;
    }
  }
  .title1_txt {
    color: #ffffff;
    margin-top: 160px;
  }
  .show_gameArr{
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
    max-height: 800px;
    .onebox{
      position: relative;
      width: 256px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 40px;
      margin-bottom: 57px;
      .img{
        width: 256px;
        object-fit: contain;
      }
      .bottom_box{
        width: 90%;
        margin-top: 20px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
        padding: 4px 8px;
        .left_price{
          display: flex;
          align-items: center;
          .bsc_img{
            width: 24px;
            object-fit: contain;
            margin-right: 4px;
          }
          .span1{
            color: #ffffff;
          }
        }
        .btn{
          min-width: 56px;
          padding: 10px 5px;
          height: 22px;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          background:#DD9005;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
}
@media screen and (min-width: 1280px) {
  .record_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .record_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.15rem;
    padding-top: 0.94rem;
    .title{
      position: absolute;
      top: 0.05rem;
      right: 0.2rem;
      width: 0.36rem;
      cursor: pointer;
      .backimg{
        width: 100%;
        object-fit: contain;
      }
    }
    .title1_txt {
      color: #ffffff;
      margin-top: 0;
    }
    .show_gameArr{
      margin-top: 0.4rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      overflow-y: auto;
      max-height: 6.5rem;
      .onebox{
        width: 49%;
        display: flex;
        flex-direction: column;
        margin-right: 0;
        margin-bottom: 0.2rem;
        .img{
          width: 100%;
          object-fit: contain;
        }
        .bottom_box{
          width: 100%;
          margin-top: 0.1rem;
          border-radius: 0.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
          padding: 0.02rem 0.04rem;
          .left_price{
            display: flex;
            align-items: center;
            .bsc_img{
              width: 0.18rem;
              object-fit: contain;
              margin-right: 0.02rem;
            }
            .span1{
              color: #ffffff;
            }
          }
          .btn{
            min-width: 0.56rem;
            padding: 0.05rem;
            height: 0.22rem;
            border-radius: 0.15rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background:#DD9005;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
