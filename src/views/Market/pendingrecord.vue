<template>
  <div class="record_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="title1_txt fontsize32">{{$t("message.market.txt28")}}</span>
    <div class="show_gameArr">
      <div class="onebox" v-for="(item,index) in pageshowarr" :key="index">
        <img :src="item.src" class="img" />
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
      <!-- <div class="loadingbox fontsize16" v-if="pageshowarr.length == 0 && pageshowLoading">
        Loading...
      </div> -->
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
      pageshowLoading:true,//数据没有加载完之前显示loading
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      tabIndex: 0,//tab索引
      pageshowarr:[],// 页面展示数组
      cardInfoArr:[]
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          console.log("this.$route.query:",this.$route.query)
          this.connectInfo(this.$route.query.type)
        }else{
          this.pageshowLoading = false//数据没有加载完之前显示loading
          this.pageshowarr = []// 页面展示数组
          this.cardInfoArr = []
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods:{
    // 撤单
    cancleOrder(item){
      if(item.isloading)return
      item.isloading = true
      console.log("取消订单:",item)
      if(this.$route.query.type == 'busd'){
        hnMarket().connect(getSigner()).cancel([item.cardID]).then(async res => {
          console.log('卖家批量取消出售卡牌(busd售卖的)res: ', res);
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
          console.log('卖家批量取消出售卡牌(hc售卖的)res: ', res);
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
            this.cardInfoArr = this.pageshowarr = this.pageArrInfo(res.arr)
          }
        })
      }else if(type == 'hc'){
        this.getMarketCardInfo(hnMarketV2).then(res =>{
          console.log('获取到的卖家正在出售的卡牌res: ', res);
          this.pageshowLoading = false
          if(res.istrue){
            this.cardInfoArr = this.pageshowarr = this.pageArrInfo(res.arr)
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
            console.log('card_price: ', card_price);
            obj.price = this.$common.convertBigNumberToNormal(card_price,0)
            let race = await hn().getHashrates(item) // 算力数组
            // @ts-ignore
            obj.src = getHnImg(Number(item), obj.level, race);
            arr.push(obj)
            if (count == res[0].length) {
              resolve({'istrue':true,'arr':arr})
            }
            count++;
          })
        })
      })
    },
    // 页面数组信息--排序
    pageArrInfo(arr){
      return arr.sort((a, b) => {
        if(a.type === b.type){
　　　　  return Number(a.price) > Number(b.price) ? 1 : -1
        }
        return Number(a.type) > Number(b.type) ? 1 : -1;
      })
    },
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
      width: 228px;
      display: flex;
      flex-direction: column;
      margin-right: 60px;
      margin-bottom: 57px;
      .img{
        width: 228px;
        object-fit: contain;
      }
      .bottom_box{
        width: 100%;
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
    .loadingbox{
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
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
      .loadingbox{
        width: 100%;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
      }
    }
  }
}
</style>
