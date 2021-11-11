<template>
  <div class="composite_card">
    <div class="left_box">
      <div class="top_box">
        <span class="luckey_span2 fontsize22">{{$t("message.nftCard.txt5")}}</span>
        <span class="luckey_span2 fontsize12">{{$t("message.nftCard.txt6")}}</span>
      </div>
      <div class="btn">
        <span class="span1 fontsize16_400">{{$t("message.nftCard.txt7")}}.</span>
        <span class="span2 fontsize16_400">{{cardNumber}}</span>
      </div>
      <span class="composite_span1 fontsize12">{{$t("message.nftCard.txt8")}}</span>
      <span class="composite_span2 fontsize16">{{boxPrice}} BUSD</span>
      <span class="composite_line_color"></span>
      <span class="composite_span1 amount_class fontsize12">{{$t("message.nftCard.txt9")}}</span>
      <div class="inputbox">
        <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" @input="inputchangeFun" oninput="value=value.replace(/[^\d]/g, '')" />
      </div>
      <span class="composite_line_color"></span>
      <div class="last">
        <span class="span1 fontsize12">{{$t("message.nftCard.txt12")}}  {{surplusNums}}</span>
        <span class="span2 fontsize12">{{$t("message.nftCard.txt11")}}: {{total}} BUSD</span>
      </div>
    </div>
    <div class="mobile_top">
      <div class="mobile_top_box">
        <span class="luckey_span1 fontsize22">{{$t("message.nftCard.txt5")}}</span>
        <span class="luckey_span2 fontsize12">{{$t("message.nftCard.txt6")}}</span>
      </div>
    </div>
    <div class="center_box">
      <img :src="`${$store.state.imgUrl}buybg.png`" class="bgimg" />
      <div class="onebox">
        <img :src="`${$store.state.imgUrl}defaultcard.png`" class="cardimg" />
        <!-- <img :src="cardSrc" class="cardimg" /> -->
        <!-- <div class="bottom">
          <div class="five_pointed_star">
            <img :src="`${$store.state.imgUrl}start.png`" v-for="item1 in 1" :key="item1" class="start_img" />
          </div>
          <div class="hc_btc_box">
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
              <span class="span1">0</span>
            </div>
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}btclogobtclogo.png`" class="imgcard" />
              <span class="span1">0</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="mobile_content">
      <div class="btn">
        <span class="span1 fontsize16_400">{{$t("message.nftCard.txt7")}}.</span>
        <span class="span2 fontsize16_400">{{cardNumber}}</span>
      </div>
      <div class="mobile_line">
        <span class="composite_span1 fontsize12">{{$t("message.nftCard.txt8")}}</span>
        <span class="composite_span2 fontsize16">{{boxPrice}} BUSD</span>
      </div>
      <span class="composite_line_color"></span>
      <div class="mobile_line">
        <span class="composite_span1 fontsize12">{{$t("message.nftCard.txt9")}}</span>
        <div class="inputbox">
          <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" @input="inputchangeFun" oninput="value=value.replace(/[^\d]/g, '')" />
        </div>
      </div>
      <span class="composite_line_color"></span>
      <div class="mobile_line">
        <span class="composite_span1 fontsize12">{{$t("message.nftCard.txt12")}}  {{surplusNums}}</span>
        <span class="composite_span3 fontsize12">{{$t("message.nftCard.txt11")}}: {{total}} BUSD</span>
      </div>
    </div>
    <div class="connect_box fontsize18" v-if="!getIstrue">Connect</div>
    <div class="connect_box fontsize18" v-else-if="!isapprove" @click="goApproveClick">{{$t("message.approve")}}<BtnLoading :isloading="buy_isloading"></BtnLoading></div>
    <div class="connect_box fontsize18" v-else @click="buyBox">{{$t("message.nftCard.txt13")}}<BtnLoading :isloading="buy_isloading"></BtnLoading></div>
    <div class="right_box">
      <div class="btn">{{$t("message.nftCard.txt14")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt15")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt16")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt17")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt18")}}</div>
    </div>
    <Proup :btntxt="btntxt"  @besurefun="CloseFun" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnBox,hn,util,getSigner,erc20, token,contract } from 'hashland-sdk';
// const one = constant.WeiPerEther // 先定一个one  然后one.mul(12)   ----12*1e18
export default {
  data () {
    return {
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      buy_isloading:false,// 按钮loading
      surplusNums:0, //盲盒剩余数量
      boxnums:'',//购买数量
      boxPrice:0,//盲盒价格
      balance:0,//用户余额
      total:0,// 合计
      originalPrice:0,// 合约返回的原始盲盒价格数据 可以直接用的传给合约
      cardNumber:'0',//卡牌的编号
      isapprove:false,//是否授权busd
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue, oldValue) {
        console.log('合成卡牌页面是否链接:', newValue,oldValue);
        if(newValue){
          setTimeout(() => {
            this.connectGetInfo()
            this.watchResult()
          }, 1500);
        }
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    // 监听盲盒开奖结果
    watchResult(){
      let filter = hnBox().filters.SpawnHns(this.getAccount)
      hnBox().on(filter, (user, boxslengths, boxarrID,events) => {
        console.log('监听盲盒开奖结果: ', user, boxslengths, boxarrID,events);
        let str = boxarrID.toString()
        let arr = str.split(',')
        let imgarr = []
        arr.map(async item => {
          let obj = {}
          obj.level = (await hn().level(item)).toString() // 卡牌等级
          // obj.src = await getHnImg(Number(item),Number(obj.level))
          obj.src = `//cdn.hashland.com/nft/images/hashland-nft-${item.toString()}-${obj.level}.png/w400`
          // let race = await hn().getHashrates(item)
          // obj.hc = race[0].toString()// hc 算力
          // obj.btc = race[1].toString()// btc 算力
          imgarr.push(obj)
        })

        let lastObj = {
          minserDis:true,
          boxarr:imgarr,
          proupTitle:'Purchase Detail',
        }
        this.$store.commit("setrewardsInfo", lastObj);

        this.$common.getUserCardInfoFun(this.getAccount) // 全局更新数据
      });
    },
    // 购买盒子
    async buyBox(){
      if(this.buy_isloading)return
      if(!this.boxnums){
        this.$common.selectLang('请输入购买数量','Enter Purchase Amount',this)
        return
      }
      // console.log('this.boxnums: ', this.boxnums,this.surplusNums);
      if(Number(this.boxnums) > Number(this.surplusNums)){
        console.log('可购买数量不足')
        this.$common.selectLang('可购买数量不足','Insufficent quantity left',this)
        return
      }
      if(this.total > this.balance){
        this.$common.selectLang('余额不足','Insufficent Balance',this)
        return
      }
      this.buy_isloading = true
      // console.log("购买:",this.boxnums,this.originalPrice.mul(this.boxnums))
      hnBox().connect(getSigner()).buyBoxes(this.boxnums,1).then(async res => {
        console.log('购买盒子res: ', res);
        this.buy_isloading = false
        // this.watchResult()
        this.$common.selectLang('购买成功','Purchase Successful',this)
        this.boxnums = ''
        this.total = 0
        this.getSDKInfo()
      }).catch(err => {
        console.log('购买盒子err: ', err);
        this.buy_isloading = false
      })
    },
    inputchangeFun () {
      console.log("输入框改变事件")
      if(this.boxnums == ''){
        this.total = 0
      }else if(this.boxnums > 100){
        this.boxnums = 100
        this.total = 100 * this.boxPrice
        this.$common.selectLang('最大购买数量100','Maximum Purchase Number is 100',this)
      }else{
        this.proupDis = false
        this.total = this.$common.useBignumberMultipliedBy(this.boxPrice,this.boxnums)
      }
    },
    // 去授权
    goApproveClick(){
      if(this.buy_isloading)return
      this.buy_isloading = true
      const TOKEN_amount = '50000000000000000000000000000000000000000000000000000000000';
      erc20(token().BUSD).connect(getSigner()).approve(contract().HNBox,TOKEN_amount).then(async res => {
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.isapprove = true
          this.buy_isloading = false
        }
      }).catch(() => {
        this.buy_isloading = false
      })
    },
    async getSDKInfo(){
      let price = await hnBox().boxTokenPrices(1) // 盲盒价格
      this.originalPrice = price
      let str = (price / 1e18).toString()
      this.$common.checkNumber(str,res => {
        this.boxPrice = res
      })
      hn().totalSupply().then(async data => {
        this.cardNumber = data.toString()
      })
      let surplusNums = await hnBox().getBoxesLeftSupply() // 获取盲盒剩余可销售数量
      this.surplusNums = surplusNums.toString()
    },
    connectGetInfo(){
      erc20(token().BUSD).balanceOf(this.getAccount).then(res => {
        this.balance = util.formatEther(res)
      })
      erc20(token().BUSD).allowance(this.getAccount,contract().HNBox).then(res => {
        console.log('是否授权busd: ', res);
        if(res.toString() > 0){
          this.isapprove = true
        }else{
          this.isapprove = false
        }
      }).catch(err => {
        console.log('是否授权busderr: ', err);
      })
    }
  },
  mounted () {
    this.getSDKInfo()
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
      align-items: center;
      color: #fff;
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
    .onebox{
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .cardimg{
        width:350px;
        object-fit: contain;
      }
    }
  }
  .connect_box {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 274px;
    height: 59px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #ffffff;
    cursor: pointer;
  }
  .mobile_top{
    display: none;
  }
  .mobile_content{
    display: none;
  }
}
input::-webkit-input-placeholder {
  color: #909292;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Poppins-Regular';
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
      margin-top: 0;
      min-height: 2.65rem;
      .bgimg{
        width: 100%;
        object-fit: contain;
      }
      .onebox{
        position: absolute;
        top: 24%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .cardimg{
          width: 1.01rem;
          object-fit: contain;
        }
        .bottom{
          position: absolute;
          top: 0.05rem;
          display: flex;
          align-items: center;
          padding:0.1rem 0.08rem;
          transform: scale(0.5);
          .five_pointed_star{
            display: flex;
            align-items: center;
            .start_img{
              width: 0.26rem;
              object-fit: contain;
            }
          }
          .hc_btc_box{
            display: flex;
            align-items: center;
            .hc_coefficient{
              display: flex;
              align-items: center;
              border-radius: 4px;
              margin-right: 5px;
              background: rgba(5, 24, 44, 0.88);
              box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.22);
              border-radius: 11px;
              opacity: 0.56;
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
    }
    .mobile_top{
      display: flex;
      width: 100%;
      padding:0 0.2rem 0.3rem;
      margin-top: 0.3rem;
      .mobile_top_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        .luckey_span1 {
          color: #ffffff;
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
      margin-top: -0.38rem;
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
        .composite_span1 {
          color: #ffffff;
          line-height: 0.2rem;
        }
        .composite_span2 {
          color: #29CDDA;
          line-height: 0.28rem;
          margin: 0;
        }
        .composite_span3{
          color: #ffffff;
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
            font-size: 0.14rem;
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
