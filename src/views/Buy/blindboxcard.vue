<template>
  <div class="composite_card">
    <div class="left_box">
      <div class="top_box">
        <span class="luckey_span2 fontsize22">{{$t("message.nftCard.txt5")}}</span>
        <span class="luckey_span2 fontsize12">{{$t("message.nftCard.txt6_1")}}</span>
      </div>
      <div class="btn">
        <span class="span1 fontsize16_400">{{$t("message.nftCard.txt7")}}.</span>
        <span class="span2 fontsize16_400">{{cardNumber}}</span>
      </div>
      <span class="composite_span1 fontsize12">{{$t("message.nftCard.txt8")}}</span>
      <div class="add_select_box" :class="[disablehover?'clear_hover':'']">
        <span class="add_accrow" v-if="tokenID == 1 || tokenID == 3"></span>
        <span class="add_composite_span2 fontsize16" v-if="tokenID == 0">{{boxPrice}} BNB</span>
        <span class="add_composite_span2 fontsize16" v-if="tokenID == 1">{{boxPrice}} HC</span>
        <span class="add_composite_span2 fontsize16" v-if="tokenID == 2">{{boxPrice}} HCLP</span>
        <span class="add_composite_span2 fontsize16" v-if="tokenID == 3">{{boxPrice}} BUSD</span>
        <span class="add_composite_span2 fontsize16" v-if="tokenID == 4">{{boxPrice}} HT</span>
        <span class="add_composite_span2 fontsize16" v-if="tokenID >= 5">{{boxPrice}} BUSD</span>
        <div class="nft_hover" v-if="tokenID == 1 || tokenID == 3">
          <div class="box_nft">
            <span class="add_span1 fontsize16" v-if="tokenID == 3" @click="BuyboxClick(1)">{{hc_boxprice}} HC</span>
            <span class="add_span1 fontsize16" v-if="tokenID == 1" @click="BuyboxClick(3)">{{busd_boxprice}} BUSD</span>
          </div>
        </div>
      </div>
      <span class="composite_line_color"></span>
      <span class="composite_span1 amount_class fontsize12">{{$t("message.nftCard.txt9")}}</span>
      <div class="inputbox">
        <!-- <Input v-model="boxnums" @inputchange="inputchangeFun" :placeholder="$t('message.placeholder')" :inputvalue="boxnums" oninput="value=value.replace(/[^\d]/g, '')" class="input"></Input> -->
        <input type="text" :placeholder='$t("message.placeholder")' @input="inputchangeFun" v-model="boxnums" class="input" oninput="value=value.replace(/[^\d]/g, '')" />
      </div>
      <span class="composite_line_color"></span>
      <div class="last">
        <span class="span1 fontsize14">{{$t("message.nftCard.txt12")}}  {{surplusNums}}</span>
        <span class="span2 fontsize14" v-if="tokenID == 0">{{$t("message.nftCard.txt11")}}: {{total}} BNB</span>
        <span class="span2 fontsize14" v-if="tokenID == 1">{{$t("message.nftCard.txt11")}}: {{total}} HC</span>
        <span class="span2 fontsize14" v-if="tokenID == 2">{{$t("message.nftCard.txt11")}}: {{total}} HCLP</span>
        <span class="span2 fontsize14" v-if="tokenID == 3">{{$t("message.nftCard.txt11")}}: {{total}} BUSD</span>
        <span class="span2 fontsize14" v-if="tokenID == 4">{{$t("message.nftCard.txt11")}}: {{total}} HT</span>
        <span class="span2 fontsize14" v-if="tokenID >= 5">{{$t("message.nftCard.txt11")}}: {{total}} BUSD</span>
      </div>
    </div>
    <div class="mobile_top">
      <div class="mobile_top_box">
        <span class="luckey_span2 fontsize22">{{$t("message.nftCard.txt5")}}</span>
        <span class="luckey_span2 fontsize12">{{$t("message.nftCard.txt6_1")}}</span>
      </div>
    </div>
    <div class="center_box">
      <img :src="`${$store.state.imgUrl}blindcard.png`" class="bgimg" />
      <!-- <img src="../../assets/222.gif" class="bgimg" /> -->
      <div class="wrap-box">
        <div class="box-content">
          <div class="_3dbox _front"></div>
          <div class="_3dbox _back"></div>
          <div class="_3dbox _left"></div>
          <div class="_3dbox _right"></div>
          <div class="_3dbox _top"></div>
          <div class="_3dbox _bottom"></div>
        </div>
      </div>
    </div>
    <div class="mobile_content">
      <div class="btn">
        <span class="span1 fontsize16_400">{{$t("message.nftCard.txt7")}}.</span>
        <span class="span2 fontsize16_400">{{cardNumber}}</span>
      </div>
      <div class="mobile_line">
        <span class="composite_span1 fontsize12">{{$t("message.nftCard.txt8")}}</span>
        <div class="add_select_box" :class="[disablehover?'clear_hover':'']">
          <span class="add_accrow" v-if="tokenID == 1 || tokenID == 3"></span>
          <span class="composite_span2 fontsize16" v-if="tokenID == 0">{{boxPrice}} BNB</span>
          <span class="composite_span2 fontsize16" v-if="tokenID == 1">{{boxPrice}} HC</span>
          <span class="composite_span2 fontsize16" v-if="tokenID == 2">{{boxPrice}} HCLP</span>
          <span class="composite_span2 fontsize16" v-if="tokenID == 3">{{boxPrice}} BUSD</span>
          <span class="composite_span2 fontsize16" v-if="tokenID == 4">{{boxPrice}} HT</span>
          <span class="composite_span2 fontsize16" v-if="tokenID >= 5">{{boxPrice}} BUSD</span>
          <div class="nft_hover" v-if="tokenID == 1 || tokenID == 3">
            <div class="box_nft">
              <span class="add_span1 fontsize16" v-if="tokenID == 3" @click="BuyboxClick(1)">{{hc_boxprice}} HC</span>
              <span class="add_span1 fontsize16" v-if="tokenID == 1" @click="BuyboxClick(3)">{{busd_boxprice}} BUSD</span>
            </div>
          </div>
        </div>
      </div>
      <span class="composite_line_color"></span>
      <div class="mobile_line">
        <span class="composite_span1 amount_class fontsize12">{{$t("message.nftCard.txt9")}}</span>
        <div class="inputbox">
          <!-- <Input v-model="boxnums" @inputchange="inputchangeFun" :placeholder="$t('message.placeholder')" :inputvalue="boxnums" oninput="value=value.replace(/[^\d]/g, '')" class="input" ></Input> -->
          <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" @input="inputchangeFun" oninput="value=value.replace(/[^\d]/g, '')" />
        </div>
      </div>
      <span class="composite_line_color"></span>
      <div class="mobile_line">
        <span class="composite_span1 fontsize12">{{$t("message.nftCard.txt12")}}  {{surplusNums}}</span>
        <span class="composite_span3 fontsize12" v-if="tokenID == 0">{{$t("message.nftCard.txt11")}}: {{total}} BNB</span>
        <span class="composite_span3 fontsize12" v-if="tokenID == 1">{{$t("message.nftCard.txt11")}}: {{total}} HC</span>
        <span class="composite_span3 fontsize12" v-if="tokenID == 2">{{$t("message.nftCard.txt11")}}: {{total}} HCLP</span>
        <span class="composite_span3 fontsize12" v-if="tokenID == 3">{{$t("message.nftCard.txt11")}}: {{total}} BUSD</span>
        <span class="composite_span3 fontsize12" v-if="tokenID == 4">{{$t("message.nftCard.txt11")}}: {{total}} HT</span>
        <span class="composite_span3 fontsize12" v-if="tokenID >= 5">{{$t("message.nftCard.txt11")}}: {{total}} BUSD</span>
      </div>
    </div>
    <div class="connect_box fontsize18" :class="{disable_bnb:disable}">
      <div v-if="disable" class="disablebtn">Not Qualified</div>
      <Btn v-show="!disable" :isapprove="isapprove" :approveloading="buy_isloading" :isloading="buy_isloading" :word="$t('message.nftCard.txt13')" ref="mychild" @sonapprove="sonapprove" @dosomething="buyBindCard"/>
    </div>
    <div class="right_box">
      <div class="btn fontsize16">{{$t("message.nftCard.txt14")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt19")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt20")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt21")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt22")}}</div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnBlindBox,hn,erc20,contract,util,getSigner,getHnImg } from 'hashland-sdk';
export default {
  data () {
    return {
      vrfFlag:false, // 是否使用随机数
      disablehover:false,
      hc_boxprice:0,//hc购买盲盒价格
      busd_boxprice:0,//busd买盲盒价格
      currencyAddress:'',//sdk返回合约地址
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      buy_isloading:false,// 按钮loading
      surplusNums:0, //盲盒剩余数量
      boxnums:'',//购买数量
      boxPrice:0,//盲盒价格
      balance:0,//用户余额
      total:0,// 合计
      cardNumber:'0',//卡牌的编号
      originalPrice:0,// 合约返回的原始盲盒价格数据 可以直接用的传给合约
      isapprove:false,//是否授权
      tokenID:1, // 代币id------0 bnb  1 hc 2 hclp  3 busd 4 ht
      maxbuy:0, // 最大购买数量
      disable:true,//购买按钮是否禁用(是否在白名单)
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          this.watchResult()
          setTimeout(() => {
            this.getTokenInfoFun(this.tokenID)
          },1500)
          let setIntervalOBJ = setInterval(() => {
            if(this.currencyAddress){
              clearInterval(setIntervalOBJ)
              this.$refs.mychild.isApproveFun(this.currencyAddress,contract().HNBlindBox,'NoDescription').then(res => {
                console.log('当前页面的币种合约: ', this.currencyAddress);
                if(res){
                  this.isapprove = true
                }else{
                  this.isapprove = false
                }
              })
            }
          }, 1000);
        }
      },
      deep: true,
      immediate: true
    },
    $route(to){
      localStorage.setItem('routerIndex',to.params.type)
      this.tokenID = localStorage.getItem('routerIndex')
      this.getTokenInfoFun(this.tokenID)
    }
  },
  methods: {
    BuyboxClick(data){
      this.boxnums = ''
      this.total = 0
      this.disablehover = true
      setTimeout(() => {
        this.disablehover = false
      },600)
      this.$router.push(`/buy/1/${data}`)
    },
    inputchangeFun() {
      // console.log("输入框改变事件")
      if(!this.getIstrue){
        this.boxnums = ''
        this.$common.selectLang("请先连接钱包", "Please connect the wallet", this);
        return
      }
      if(this.boxnums == ''){
        this.total = 0
      }else if(this.vrfFlag && Number(this.boxnums) > 2){
        this.boxnums = 2
        this.total = this.$common.useBignumberMultipliedBy(this.boxPrice,this.boxnums)
        this.$common.selectLang(`最大购买数量2`,`You can purchase up to 2 mystery boxes at a time.`,this)
      }else if(Number(this.boxnums) > Number(this.maxbuy)){
        this.boxnums = this.maxbuy
        this.total = this.maxbuy * this.boxPrice
        this.$common.selectLang(`最大购买数量${this.maxbuy}`,`Remaining purchaseable quantity per hour is ${this.maxbuy}`,this)
      }else{
        this.proupDis = false
        this.total = this.$common.useBignumberMultipliedBy(this.boxPrice,this.boxnums)
      }
    },
    // 去授权
    sonapprove(){
      if(this.disable)return
      if(this.buy_isloading)return
      this.buy_isloading = true
      this.$refs.mychild.goApproveFun(this.currencyAddress,contract().HNBlindBox,'NoDescription').then(res => {
        console.log('去授权res: ', res);
        this.buy_isloading = false
        this.isapprove = true
      }).catch(() => {
        console.log("授权错误")
        this.isapprove = false
        this.buy_isloading = false
      })
    },
    // 监听盲盒开奖结果
    watchResult(){
      let filter = hnBlindBox().filters.SpawnHns(this.getAccount)
      hnBlindBox().on(filter, (user, boxslengths, boxarrID,events) => {
        console.log('监听盲盒开奖结果: ', user, boxslengths, boxarrID,events);
        this.getTokenInfoFun(this.tokenID)
        let str = boxarrID.toString()
        let arr = str.split(',')
        let imgarr = []
        arr.map(async item => {
          let obj = {}
          obj.level = (await hn().level(item)).toString() // 卡牌等级
          let race = await hn().getHashrates(item) // 算力数组
          obj.src = getHnImg(Number(item),Number(obj.level),race)
          obj.loading = false
          imgarr.push(obj)
        })
        let lastObj = {
          minserDis:true,
          boxarr:imgarr,
          proupTitle:'Purchase Detail',
        }
        this.$store.commit("setrewardsInfo", lastObj);
        this.$common.newgetUserCardInfoFun(this.getAccount).then(res1 => {
          if(res1 > 1){
            sessionStorage.setItem("count",res1)
          }else{
            sessionStorage.setItem("count",1)
          }
        })
      });
    },
    // 买盲盒
    buyBindCard(){
      if(this.disable)return
      if(this.buy_isloading)return
      if(!this.boxnums){
        this.$common.selectLang('请输入购买数量','Enter Purchase Amount',this)
        return
      }
      if(Number(this.boxnums) > Number(this.surplusNums)){
        console.log('可购买数量不足')
        this.$common.selectLang('可购买数量不足','Insufficent quantity left',this)
        return
      }
      console.log('购买前余额跟盒子总价比较: ', Number(this.total),Number(this.balance));
      if(Number(this.total) > Number(this.balance)){
        this.$common.selectLang('余额不足','Insufficent Balance',this)
        return
      }
      this.buy_isloading = true
      hnBlindBox().connect(getSigner()).buyBoxes(this.boxnums,this.tokenID).then(async res => {
        console.log('购买盒子res: ', res);
        this.buy_isloading = false
        this.$common.selectLang('购买成功',"The NFT cards will display in few seconds, and it doesn't affect any action.",this)
        this.boxnums = ''
        this.total = 0
      }).catch(err => {
        console.log('购买盒子err: ', err);
        this.buy_isloading = false
      })
    },
    getuserBalance(type){
      console.log('获取余额传进来的type: ', type);
      erc20(type).balanceOf(this.getAccount).then(res => {
        this.balance = util.formatEther(res)
        console.log('钱包余额res: ',this.balance);
      }).catch(err => {
        console.log('%s钱包余额err: ', err);
      })
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    // 获取某代币信息
    async getTokenInfoFun(tokenID){
      // console.log('fdfdsfsd ',tokenID)
      hnBlindBox().getBoxesLeftSupply(tokenID).then(res => {
        // console.log("忙和剩余数量",res)
        this.surplusNums = res
      })
      hn().totalSupply().then(data => {
        this.cardNumber = data.toString()
      })
      hnBlindBox().getTokenInfo(3).then(res => {
        console.log('获取某代币信息res: ', res);
        this.busd_boxprice = res[0].toString() / 1e18
      })
      hnBlindBox().getTokenInfo(1).then(res => {
        console.log('获取某代币信息res: ', res);
        this.hc_boxprice = res[0].toString() / 1e18
      })
      hnBlindBox().getTokenInfo(tokenID).then(res => {
        console.log('获取某代币信息res: ', res);
        this.boxPrice = res[0].toString() / 1e18
        this.currencyAddress = res[1]
        this.getuserBalance(res[1])
        this.vrfFlag = res[5]
        if(res[4]){
          hnBlindBox().getWhiteListExistence(tokenID,this.getAccount).then(istrue => {
            // console.log('判断某用户是否在某代币的白名单istrue: ', istrue);
            if(istrue){
              this.disable = false
            }else{
              this.disable = true
            }
          })
        }else{
          this.disable = false
        }
      })
      // 1小时之内某用户的剩余购买量
      let maxnum = await hnBlindBox().getUserHourlyBoxesLeftSupply(tokenID,this.getAccount,Date.parse(new Date()) / 1000)
      this.maxbuy = maxnum.toString()
    }
  },
  created(){
    localStorage.setItem('routerIndex',this.$route.params.type)
    this.tokenID = localStorage.getItem('routerIndex')
    this.getTokenInfoFun(this.tokenID)
  }
}
</script>

<style lang='scss' scoped>
.composite_card {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .left_box {
    position: absolute;
    left: 70px;
    top: 60px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    .top_box {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .luckey_span2 {
        color: #ffffff;
        line-height: 40px;
      }
    }
    .btn {
      width: 171px;
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 25px;
      background: linear-gradient(90deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
      // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 0px 3px 6px -2px rgba(2, 12, 23, 0.69);
      color: #ffffff;
      padding-left: 14px;
    }
    .composite_span1 {
      color: #ffffff;
      margin-top: 28px;
    }
    .amount_class{
      margin-top: 44px;
    }
    .add_select_box{
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      .add_accrow{
        border-right: 3px solid #ffffff;
        border-top: 3px solid #ffffff;
        padding:3px;
        transform: rotate(135deg);
        margin-right: 10px;
        transition: all 0.3s;
      }
      .add_composite_span2 {
        color: #29cdda;
        line-height: 40px;
      }
      .nft_hover {
        display: none;
        position: absolute;
        top: 18px;
        left: 0;
        z-index: 99999999;
        .box_nft {
          display: flex;
          flex-direction: column;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          padding: 10px;
          margin-top: 25px;
          box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 1) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.9) inset;
          .add_span1{
            color: #29cdda;
            line-height: 25px;
            cursor: pointer;
          }
        }
      }
    }
    .add_select_box:hover{
      .add_accrow{
        border-right: 3px solid #ffffff;
        border-top: 3px solid #ffffff;
        padding:3px;
        transform: rotate(-43deg);
        margin-right: 10px;
      }
      .nft_hover{
        display: flex;
      }
    }
    .composite_span2 {
      color: #29cdda;
      line-height: 40px;
      margin-top: 20px;
    }
    .composite_line_color{
      width: 100%;
      height: 1px;
      border: 1px solid;
      border-image: linear-gradient(22deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
      margin-top: 5px;
    }
    .inputbox {
      width: 100%;
      margin: 11px 0;
      .input {
        width: 100%;
        padding-right: 5px;
        height: 28px;
        border: none;
        outline: none;
        font-style: normal;
        color: #ffffff;
        background: transparent;
      }
    }
    .last {
      width: 100%;
      display: flex;
      color: #fff;
      align-items: center;
      margin-top: 35px;
      .span2{
        margin-left: 45px;
      }
    }
  }
  .right_box{
    position: absolute;
    right: 70px;
    top: 185px;
    z-index: 1;
    min-width: 200px;
    .right_span1 {
      width: 280px;
      color: #9291A1;
      margin-top: 20px;
      .radious{
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #FDB234;
        display: inline-block;
        margin-right: 8px;
      }
    }
    .btn {
      width: 204px;
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 25px;
      background: linear-gradient(90deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
      // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 0px 3px 6px -2px rgba(2, 12, 23, 0.69);
      color: #ffffff;
      padding-left: 14px;
    }
  }
  .center_box{
    position: relative;
    width: 100%;
    min-height: 800px;
    margin-top: 193px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bgimg{
      width: 100%;
      object-fit: contain;
    }
    .wrap-box{
      position: absolute;
      width: 100%;
      height: auto;
      perspective: 800px;
      .box-content {
        width: 260px;
        height: 260px;
        margin: 60px auto 100px;
        transform-style: preserve-3d;
        position: relative;
        animation: rotate 10s infinite linear;
        ._3dbox{
          position: absolute;
          transition: all 0.2s ease;
          top: 0;
          left: 0;
          width: 260px;
          height: 260px;
        }
        // 前方元素
        ._front {
          background-image: url("//cdn.hashland.com/images/bindimg.jpg");
          background-size: 100% 100%;
          transform: translateZ(130px);
        }
        /*  后方元素 */
        ._back{
          background-image: url("//cdn.hashland.com/images/bindimg.jpg");
          background-size: 100% 100%;
          transform: translateZ(-130px);
        }
        // 左边元素
        ._left{
          background-image: url("//cdn.hashland.com/images/bindimg.jpg");
          background-size: 100% 100%;
          transform: translateX(-130px) rotateY(-90deg);
        }
        /* 右边元素 */
        ._right{
          background-image: url("//cdn.hashland.com/images/bindimg.jpg");
          background-size: 100% 100%;
          transform: translateX(130px) rotateY(90deg);
        }
        /*上方*/
        ._top{
          background-image: url("//cdn.hashland.com/images/bindimg.jpg");
          background-size: 100% 100%;
          transform: translateY(-130px) rotateX(-90deg);
        }
        /*下方*/
        ._bottom{
          background-image: url("//cdn.hashland.com/images/bindimg.jpg");
          background-size: 100% 100%;
          transform: translateY(130px) rotateX(90deg);
        }
      }
    }
  }
  .mobile_top{
    display: none;
  }
  .mobile_content{
    display: none;
  }
  // .center_box:after {//毛玻璃效果
  //   position: absolute;
  //   content: '';
  //   width: 100%;
  //   height: 100%;
  //   top: 0;
  //   left: 0;
  //   border-radius: 50%;
  //   box-shadow:0 0 50px 30px #011A31 inset;
  // }
  .connect_box {
    position: absolute;
    bottom: 16%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 274px;
    height: 59px;
    text-align: center;
    line-height: 47px;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    color: #ffffff;
    cursor: pointer;
    .disablebtn{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
@keyframes rotate {
  0% {
    transform: rotateX(140deg) rotateY(0deg)
  }
  50% {
    transform: rotateX(-120deg) rotateY(180deg)
  }
  100% {
    transform: rotateX(140deg) rotateY(360deg)
  }
}
@keyframes rotate1 {
  0% {
    transform: rotateX(10deg) rotateY(0deg)
  }
  50% {
    transform: rotateX(-20deg) rotateY(180deg)
  }
  100% {
    transform: rotateX(10deg) rotateY(360deg)
  }
}
@media screen and (max-width: 980px){
  .composite_card{
    .left_box{
      display: none;
    }
    .center_box{
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top:0.9rem;
      min-height: 1rem;
      .bgimg{
        width: 100%;
        object-fit: contain;
      }
      .wrap-box{
        width: 100%;
        height: auto;
        perspective: 14rem;
        margin-top: -0.6rem;
        .box-content {
          width: 200px;
          height: 200px;
          margin: 0.2rem auto 0.4rem;
          transform-style: preserve-3d;
          position: relative;
          animation: rotate1 10s infinite linear;
          ._3dbox{
            position: absolute;
            transition: all 0.2s ease;
            left: 0;
            width: 200px;
            height: 200px;
            top: 0;
          }
          // 前方元素
          ._front {
            background-image: url("//cdn.hashland.com/images/bindimg.jpg");
            background-size: 100% 100%;
            transform: translateZ(100px);
          }
          /*  后方元素 */
          ._back{
            background-image: url("//cdn.hashland.com/images/bindimg.jpg");
            background-size: 100% 100%;
            transform: translateZ(-100px);
          }
          // 左边元素
          ._left{
            background-image: url("//cdn.hashland.com/images/bindimg.jpg");
            background-size: 100% 100%;
            transform: translateX(-100px) rotateY(-90deg);
          }
          /* 右边元素 */
          ._right{
            background-image: url("//cdn.hashland.com/images/bindimg.jpg");
            background-size: 100% 100%;
            transform: translateX(100px) rotateY(90deg);
          }
          /*上方*/
          ._top{
            background-image: url("//cdn.hashland.com/images/bindimg.jpg");
            background-size: 100% 100%;
            transform: translateY(-100px) rotateX(-90deg);
          }
          /*下方*/
          ._bottom{
            background-image: url("//cdn.hashland.com/images/bindimg.jpg");
            background-size: 100% 100%;
            transform: translateY(100px) rotateX(90deg);
          }
        }
      }
    }
    .mobile_top{
      display: flex;
      width: 100%;
      padding:0 0.2rem 0.1rem;
      margin-top: 0.3rem;
      .mobile_top_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        .luckey_span1 {
          color: #ffffff;
          line-height: 0.4rem;
        }
        .luckey_span2 {
          color: #ffffff;
        }
      }
    }
    .mobile_content{
      display: flex;
      width: 100%;
      padding:0 0.2rem 0.29rem;
      display: flex;
      flex-direction: column;
      .btn {
        width: 1.7rem;
        height: 0.4rem;
        display: flex;
        align-items: center;
        margin-bottom: 0.16rem;
        border-radius: 0.25rem;
        background: linear-gradient(90deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
        color: #ffffff;
        padding-left: 0.15rem;
      }
      .mobile_line{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 0.15rem;
        .add_select_box{
          display: flex;
          align-items: center;
          position: relative;
          cursor: pointer;
          .add_accrow{
            border-right: 3px solid #ffffff;
            border-top: 3px solid #ffffff;
            padding:3px;
            transform: rotate(135deg);
            margin-right: 10px;
            transition: all 0.3s;
          }
          .add_composite_span2 {
            color: #29cdda;
            line-height: 40px;
          }
          .nft_hover {
            min-width: 0.9rem;
            display: none;
            position: absolute;
            top: 0.18rem;
            right: 0;
            z-index: 99999999;
            .box_nft {
              display: flex;
              flex-direction: column;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 0.12rem;
              padding: 0.1rem;
              margin-top: 0.2rem;
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 1) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.9) inset;
              .add_span1{
                color: #29cdda;
                line-height: 0.2rem;
                cursor: pointer;
              }
            }
          }
        }
        .add_select_box:hover{
          .add_accrow{
            border-right: 0.03rem solid #ffffff;
            border-top: 0.03rem solid #ffffff;
            padding:0.03rem;
            transform: rotate(-43deg);
            margin-right: 0.1rem;
          }
          .nft_hover{
            display: flex;
          }
        }
        .composite_span1 {
          color: #ffffff;
          line-height: 0.2rem;
          font-size: 0.16rem;
        }
        .composite_span2 {
          color: #29CDDA;
          line-height: 0.28rem;
          margin: 0;
        }
        .composite_span3{
          color: #ffffff;
          font-size: 0.16rem;
        }
        .inputbox {
          margin: 0;
          display: flex;
          .input {
            width: 100%;
            padding-right: 0.05rem;
            text-align: right;
            height: 0.4rem;
            border: none;
            outline: none;
            font-style: normal;
            color: #ffffff;
            background: transparent;
          }
        }
      }
      .composite_line_color{
        width: 100%;
        height: 1px;
        border: 1px solid;
        border-image: linear-gradient(22deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
        margin: 0.14rem 0;
      }
    }
    .connect_box {
      position: static;
      transform: none;
      width: 1.94rem;
      height: 0.38rem;
      text-align: center;
      line-height: 0.38rem;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: contain;
      background-repeat: no-repeat;
      font-size: 0.18rem;
      color: #ffffff;
      cursor: pointer;
      .disablebtn{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .right_box{
      position: static;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 0.2rem;
      margin: 0.4rem;
      .right_span1 {
        width: 100%;
        line-height: 0.14rem;
        margin: 0 auto;
        margin-top: 0.1rem;
        .radious{
          width: 0.05rem;
          height: 0.05rem;
          border-radius: 50%;
          background: #FDB234;
          display: inline-block;
          margin-right: 0.05rem;
        }
      }
      .btn {
        width: 100%;
        font-size: 0.18rem;
        color: #FFFFFF;
        padding: 0.05rem;
        background: linear-gradient(90deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
        border-radius: 0.25rem;
        line-height: 0.25rem;
        text-align: center;
        margin-bottom: 0.1rem;
        padding-left: 0.15rem;
      }
    }
  }
  input::-webkit-input-placeholder {
    color: #909292;
    font-size: 0.16rem;
    font-weight: 400;
    font-family: 'Poppins';
  }
}
</style>
