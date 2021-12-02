<template>
  <div class="gamefi_page">
    <span class="title1_txt fontsize32">{{ $t("message.market.txt1") }}</span>
    <div class="info_box">
      <div class="onebox" v-for="(item,index) in infoArr" :key="index">
        <p class="p1 fontsize12">{{ $t(item.title) }}</p>
        <p class="p1 fontsize20">{{item.num}}</p>
      </div>
    </div>
    <div class="content">
      <div class="leftboxs">
        <!-- 几阶对应数量 -->
        <div class="left_content">
          <span class="span1 fontsize16">{{$t("message.synthesis.txt4")}} {{rank}} ({{$t("message.synthesis.txt8")}} {{amount}})</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="selectRankClik(ele,index)" v-for="(ele,index) in cardLengthArr" :key="index">{{$t("message.synthesis.txt4")}} {{index + 1}} ({{$t("message.synthesis.txt8")}} {{ele}})</span>
          </div>
        </div>
        <!-- 价格排序 -->
        <div class="left_content left_content_price">
          <span class="span1 fontsize16" v-if="sprtTxt == 'asc'">{{$t("message.market.txt2")}}</span>
          <span class="span1 fontsize16" v-else>{{$t("message.market.txt3")}}</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="sortPriceClik('asc')">
              {{$t("message.market.txt2")}}
            </span>
            <span class="span1 fontsize16" @click="sortPriceClik('desc')">
              {{$t("message.market.txt3")}}
            </span>
          </div>
        </div>
      </div>
      <!-- 去挂单 -->
      <div class="right_content">
        <img :src="`${$store.state.imgUrl}record.png`" class="record_img" @click="recordClick" />
        <div class="synthesis_btn fontsize16" @click="goOrder">
          {{ $t("message.market.txt4") }}
        </div>
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
          <div class="btn fontsize12">
            <Btn :isapprove="isapprove" :approveloading="item.isstatus" :isloading="item.isstatus" :word="'购买'" ref="mychild" @sonapprove="sonapprove(item)" @dosomething="buyCard(item)"/>
          </div>
        </div>
      </div>
      <NoData v-if="pageshowarr.length == 0"></NoData>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnMarket,hn,getHnImg,erc20,token,contract,getSigner,util } from 'hashland-sdk';
export default {
  data () {
    return {
      pageshowarr:[],
      cardInfoArr:[],//所有的出售卡牌信息数组
      cardLengthArr:[],// 几阶对应的数量数组
      rank:1,//1阶
      amount:0,//阶对应的卡牌数量
      selectedNUM:0,//选中的卡牌数量
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      isapprove:false,// 是否授权busd
      user_busd_balance:0,//用户busd余额
      sprtTxt:'asc',
      time_btn:null,//判断是否授权按钮的定时器
      infoArr:[
        {title:"message.market.txt5",num:0},
        {title:"message.market.txt6",num:0},
        {title:"message.market.txt7",num:0},
        {title:"message.market.txt8",num:0},
      ]
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount",'getCoinPrice'])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          this.connectInfo()
          clearInterval(this.time_btn)
          this.time_btn = setInterval(() => {
            if(this.pageshowarr.length > 0){
              clearInterval(this.time_btn)
              for (let index = 0; index <this.$refs.mychild.length; index++) {
                this.$refs.mychild[index].isApproveFun('BUSD',contract().HNMarket).then(res => {
                  // console.log("shishou:",res)
                  if(res){
                    this.isapprove = true
                  }else{
                    this.isapprove = false
                  }
                });
              }
            }
            // console.log("链接状态为true时判断是否授权")
          },1000)
        }
      },
      deep: true,
      immediate: true
    },
    'cardInfoArr':{
      handler: function () {
        this.pageArrInfo()
      },
      deep: true,
      immediate: true
    },
  },
  methods:{
    sonapprove(item){
      if(item.isstatus)return
      console.log('父组件页面调用子组件的授权方法,授权busd',item)
      for (let index = 0; index < this.pageshowarr.length; index++) {
        const element = this.pageshowarr[index];
        element.isstatus = true
      }
      this.$refs.mychild[0].goApproveFun('BUSD',contract().HNMarket).then(res => {
        if(res){
          for (let index = 0; index < this.pageshowarr.length; index++) {
            const element = this.pageshowarr[index];
            element.isstatus = false
          }
          this.isapprove = true
        }else{
          for (let index = 0; index < this.pageshowarr.length; index++) {
            const element = this.pageshowarr[index];
            element.isstatus = false
          }
          this.isapprove = false
        }
      }).catch(err => {
        for (let index = 0; index < this.pageshowarr.length; index++) {
          const element = this.pageshowarr[index];
          element.isstatus = false
        }
        this.isapprove = false
      })
      // this.$refs.mychild[0].goApproveFun('busd',contract().HNMarket);
    },
    // 购买卡牌
    buyCard(item){
      console.log('item: ', item);
      if(item.isstatus)return
      if(Number(this.user_busd_balance) >= Number(item.price)){
        item.isstatus = true
        let arr = []
        arr.push(item.cardID)
        hnMarket().connect(getSigner()).buy(arr).then(async ele => {
          console.log('买家批量购买卡牌res: ', ele);
          const etReceipt = await ele.wait();
          if(etReceipt.status == 1){
            this.getMarketCardInfo().then(data => {
              console.log('data: ', data);
              if(data){
                this.$common.selectLang('购买成功','购买成功',this)
                this.getSDKInfo()
                this.pageArrInfo()
                this.connectInfo()
                item.isstatus = false
              }
            })
          }else{
            item.isstatus = false
          }
        }).catch(err => {
          item.isstatus = false
          console.log('买家批量购买卡牌err: ', err);
        })
      }else{
        this.$common.selectLang('余额不足','余额不足',this)
      }
    },
    // 选择阶数
    selectRankClik(ele,index){
      this.sprtTxt = 'asc'
      this.current = index // 当前等级
      console.log('选择阶数ele,index: ', ele,index);
      this.rank = index + 1 // 当前几阶
      this.amount = ele
      this.pageArrInfo()
    },
    // 页面数组信息--排序
    pageArrInfo(){
      this.pageshowarr = this.cardInfoArr.filter(item => { return item.level == this.rank}).sort((a, b) => {
        if(a.type === b.type){
　　　　  return Number(a.price) > Number(b.price) ? 1 : -1
        }
        return Number(a.type) > Number(b.type) ? 1 : -1;
      })
    },
    // 排序
    sortPriceClik(data){
      this.sprtTxt = data
      if(data == 'asc'){//升序
        this.pageshowarr.sort((a, b) => {
          if(a.type === b.type){
  　　　　  return Number(a.price) > Number(b.price) ? 1 : -1
          }
          return Number(a.type) > Number(b.type) ? 1 : -1;
        })
      }else{
        this.pageshowarr.sort((a, b) => {
          if(a.type === b.type){
  　　　　  return Number(a.price) > Number(b.price) ? -1 : 1
          }
          return Number(a.type) > Number(b.type) ? 1 : -1;
        })
      }
    },
    // 去挂单
    goOrder(){
      this.$router.push('/hangingorder')
    },
    // 挂单记录
    recordClick(){
      this.$router.push('/pendingrecord')
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    //获取sdk信息
    getSDKInfo(){
      // 获取各阶所售卖的总卡牌数量
      hnMarket().getEachLevelHnIdsLength(5).then(res => {
        // console.log('获取各阶所售卖的总卡牌数量res: ', res);
        this.cardLengthArr = res
        this.amount = res[this.rank - 1]
      })
      // 获取总成交次数
      hnMarket().totalSellCount().then(res => {
        console.log('获取总成交次数: ', res)
        this.infoArr[0].num = res.toNumber()
      })
      // 获取总成交额，除1e18
      hnMarket().totalSellAmount().then(res => {
        console.log('获取总成交额，除1e18: ', res)
        this.infoArr[1].num = this.$common.convertBigNumberToNormal(res.toNumber())
      })
      // 获取市场正在出售的所有HN卡牌数量
      hnMarket().getHnIdsLength().then(res => {
        console.log('获取市场正在出售的所有HN卡牌数量: ', res)
        this.infoArr[3].num = res.toNumber()
      })
    },
    connectInfo(){
      // 获取用户余额
      erc20(token().BUSD).balanceOf(this.getAccount).then(res => {
        this.user_busd_balance = util.formatEther(res)
      })
    },
    // 市场页面获取市场出售的所有卡牌
    getMarketCardInfo(){
      // 获取市场正在出售的基于指针（从0开始）和数量的HN卡牌ID数组
      return new Promise((resolve) => {
        hnMarket().getHnIdsBySize(0,10000000).then(res => {
          // console.log('所有正在出售的卡牌id数组res: ', res);
          let count = 1
          let arr = []
          res[0].map(async item => {
            let obj = {
              cardID: "",
              level: "",
              type: "", // 卡牌的种类
              src: "",
              price:"",
              isstatus:false//是否授权
            }
            obj.cardID = item.toString() // 卡牌的id
            obj.type = (await hn().getRandomNumber(item, "class", 1, 4)).toString()
            obj.level = (await hn().level(item)).toString() // 等级
            obj.price = (await hnMarket().hnPrice(item)).toString()
            let race = await hn().getHashrates(item) // 算力数组
            // @ts-ignore
            obj.src = getHnImg(Number(item), obj.level, race);
            arr.push(obj)
            if (count == res[0].length) {
              this.cardInfoArr = arr
              resolve(true);
            }
            count++;
          })
        })
      })
    }
  },
  mounted(){
    this.getSDKInfo()
    this.getMarketCardInfo()
  }
}
</script>

<style lang='scss' scoped>
.gamefi_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 126px;
  .info_box{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 54px;
    .onebox{
      width: 234px;
      height: 115px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background: #021E3E;
      box-shadow: 0px 2px 13px 0px rgba(2, 18, 35, 0.68);
      border-radius: 4px;
      padding: 28px 0 25px;
      margin-right: 54px;
      .p1{
        color: #ffffff;
      }
    }
  }
  .title1_txt {
    color: #ffffff;
  }
  .content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 71px;
    .leftboxs{
      display: flex;
      align-items: center;
      justify-content: center;
      .left_content{
        position: relative;
        width: 222px;
        height: 44px;
        background: #031224;
        box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18), -2px 1px 8px 0px rgba(194, 190, 190, 0.52) inset;
        border-radius: 9px;
        padding: 0 19px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .span1{
          color: #FFFFFF;
          margin-right: 10px;
        }
        .span2{
          border-width: 7px;
          border-color: #00E7F0;
          border-bottom-width: 0;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
        }
        .left_content_hover{
          position: absolute;
          top: -3px;
          left: 0;
          z-index: 9;
          width: 222px;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.9);
          box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
          filter: blur(0px);
          border-radius: 4px;
          padding: 10px 19px;
          margin-top:47px;
          line-height: 39px;
          .span1{
            color: #E2DADA;
            cursor: pointer;
          }
        }
      }
      .left_content_price{
        margin-left: 71px;
      }
      .left_content:hover{
        .left_content_hover{
          display: flex;
          .span1:hover{
            color: #00E7F0;
          }
        }
      }
    }
    .right_content{
      display: flex;
      align-items: center;
      cursor: pointer;
      .synthesis_btn {
        width: 144px;
        height: 49px;
        line-height: 49px;
        background-image: url(//cdn.hashland.com/images/nft_btn1.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
      }
      .record_img{
        width: 40px;
        object-fit: contain;
        margin-right: 20px;
      }
    }
  }
  .show_gameArr{
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    min-height: 550px;
    overflow-y: auto;
    height: 800px;
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
  }
}
@media screen and (min-width: 1280px) {
  .gamefi_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .gamefi_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.37rem;
    padding-top: 0.94rem;
    .title1_txt {
      color: #ffffff;
    }
    .title2_txt {
      color: #ffffff;
    }
  }
}
</style>
