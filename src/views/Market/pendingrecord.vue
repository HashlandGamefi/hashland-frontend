<template>
  <div class="record_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="title1_txt fontsize32">挂单记录</span>
    <div class="tab_box">
      <div class="oneTab fontsize16" :class="{ activeTab: tabIndex == 0}" @click="tabFun(0)" >
        出售中
      </div>
      <div
        class="oneTab fontsize16"
        :class="{ activeTab: tabIndex == 1 }"
        @click="tabFun(1)"
      >
        已完成
      </div>
    </div>
    <div class="show_gameArr">
      <div class="onebox" v-for="(item,index) in pageshowarr" :key="index">
        <img :src="item.src" class="img" />
        <div class="bottom_box">
          <div class="left_price">
            <img :src="`${$store.state.imgUrl}bsc.png`" class="bsc_img" />
            <span class="span1 fontsize16">{{item.price}} BUSD</span>
          </div>
          <!-- <Btn :word="'购买'" ref="mychild" @sonapprove="sonapprove" @dosomething="buy"/> -->
          <div class="btn fontsize12" @click="cancleOrder(item)" v-if="item.issell">
            撤单<BtnLoading :isloading="item.isloading"></BtnLoading>
          </div>
          <div class="btn fontsize12" @click="collect(item)" v-else>
            收取<BtnLoading :isloading="item.isloading"></BtnLoading>
          </div>
        </div>
      </div>
      <!-- <div class="loadingbox fontsize16" v-if="pageshowarr.length == 0 && pageshowLoading">
        Loading...
      </div>
      <NoData v-else-if="pageshowarr.length == 0 && !pageshowLoading"></NoData> -->
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnMarket,hn,getHnImg,getSigner } from 'hashland-sdk';
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
          // this.connectInfo()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods:{
    tabFun(index){
      this.tabIndex = index
      if(index == 0){
        this.pageshowarr = this.cardInfoArr.filter(item => {
          return item.issell
        })
      }else{
          console.log('this.pageshowarr: ', this.pageshowarr);
        this.pageshowarr = this.cardInfoArr.filter(item => {
          return !item.issell
        })
      }
    },
    // 取消订单
    cancleOrder(item){
      if(item.isloading)return
      item.isloading = true
      console.log("取消订单:",item)
      hnMarket().connect(getSigner()).cancel([item.cardID]).then(async res => {
        console.log('卖家批量取消出售卡牌res: ', res);
        const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.$common.selectLang('撤单成功','撤单成功',this)
            this.connectInfo()
            item.isloading = false
          }else{
            item.isloading = false
          }
      }).catch(() => {
        item.isloading = false
      })
    },
    // 收取
    collect(item){
      if(item.isloading)return
      item.isloading = true
      console.log("收取:",item)
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    back(){
      this.$router.go(-1)
    },
    connectInfo(){
      this.getMarketCardInfo().then(res =>{
        this.pageshowLoading = false
        if(res.istrue){
          this.cardInfoArr = this.pageshowarr = this.pageArrInfo(res.arr)
        }
      })
    },
    // 市场页面获取市场出售的所有卡牌
    getMarketCardInfo(){
      // 获取市场正在出售的基于指针（从0开始）和数量的HN卡牌ID数组
      return new Promise((resolve) => {
        hnMarket().getSellerHnIdsBySize(this.getAccount,0,10000000).then(res => {
          console.log('获取某卖家正在出售卡牌id数组res: ', res);
          let count = 1
          let arr = []
          res[0].map(async item => {
            let obj = {
              cardID: "",
              level: "",
              type: "", // 卡牌的种类
              src: "",
              price:"",
              issell:false,//是否正在售卖
              isloading:false//按钮loading
            }
            obj.cardID = item.toString() // 卡牌的id
            obj.type = (await hn().getRandomNumber(item, "class", 1, 4)).toString()
            obj.level = (await hn().level(item)).toString() // 等级
            obj.price = (await hnMarket().hnPrice(item) / 1e18).toString()
            let race = await hn().getHashrates(item) // 算力数组
            obj.issell = await hnMarket().getSellerHnIdExistence(this.getAccount, item)
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
    margin-top: 208px;
  }
  .btn_father{
    width: 274px;
    height: 59px;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 70px;
    cursor: pointer;
  }
  .tab_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 65px;
    .oneTab {
      width: 158px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
        -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
    }
    .activeTab {
      background: #29cdda; //linear-gradient(to right,#2445C1,#1E9694);
      box-shadow: 0 9px 2px #23447c;
    }
  }
  .show_gameArr{
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    // min-height: 550px;
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
    padding-top: 0.94rem;
    .title1_txt {
      color: #ffffff;
    }
    .title2_txt {
      color: #ffffff;
    }
    .tab_box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.33rem;
      .oneTab {
        width: 1rem;
        height: 0.24rem;
        font-size: 0.12rem;
        line-height: 0.24rem;
        text-align: center;
        color: #ffffff;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
          -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
      }
      .activeTab {
        background: #29cdda; //linear-gradient(to right,#2445C1,#1E9694);
        box-shadow: 0 0.06rem 2px #23447c;
      }
    }
  }
}
</style>
