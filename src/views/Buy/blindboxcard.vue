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
      <span class="composite_span2 fontsize16" v-if="tokenID == 0">{{boxPrice}} BNB</span>
      <span class="composite_span2 fontsize16" v-if="tokenID == 1">{{boxPrice}} HCLP</span>
      <span class="composite_span2 fontsize16" v-if="tokenID == 2">{{boxPrice}} BUSD</span>
      <span class="composite_span2 fontsize16" v-if="tokenID == 3">{{boxPrice}} HT</span>
      <span class="composite_line_color"></span>
      <span class="composite_span1 amount_class fontsize12">{{$t("message.nftCard.txt9")}}</span>
      <div class="inputbox">
        <!-- <Input v-model="boxnums" @inputchange="inputchangeFun" :placeholder="$t('message.placeholder')" :inputvalue="boxnums" oninput="value=value.replace(/[^\d]/g, '')" class="input"></Input> -->
        <input type="text" :placeholder='$t("message.placeholder")' @input="inputchangeFun" v-model="boxnums" class="input" oninput="value=value.replace(/[^\d]/g, '')" />
      </div>
      <span class="composite_line_color"></span>
      <div class="last">
        <span class="span1 fontsize12">{{$t("message.nftCard.txt12")}}  {{surplusNums}}</span>
        <span class="span2 fontsize12" v-if="tokenID == 0">{{$t("message.nftCard.txt11")}}: {{total}} BNB</span>
        <span class="span2 fontsize12" v-if="tokenID == 1">{{$t("message.nftCard.txt11")}}: {{total}} HCLP</span>
        <span class="span2 fontsize12" v-if="tokenID == 2">{{$t("message.nftCard.txt11")}}: {{total}} BUSD</span>
        <span class="span2 fontsize12" v-if="tokenID == 3">{{$t("message.nftCard.txt11")}}: {{total}} HT</span>
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
      <!-- <div class="onebox">
        <img :src="`${$store.state.imgUrl}box.png`" class="cardimg" />
      </div> -->
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
        <span class="composite_span2 fontsize16" v-if="tokenID == 0">{{boxPrice}} BNB</span>
        <span class="composite_span2 fontsize16" v-if="tokenID == 1">{{boxPrice}} HCLP</span>
        <span class="composite_span2 fontsize16" v-if="tokenID == 2">{{boxPrice}} BUSD</span>
        <span class="composite_span2 fontsize16" v-if="tokenID == 3">{{boxPrice}} HT</span>
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
        <span class="composite_span3 fontsize12" v-if="tokenID == 1">{{$t("message.nftCard.txt11")}}: {{total}} HCLP</span>
        <span class="composite_span3 fontsize12" v-if="tokenID == 2">{{$t("message.nftCard.txt11")}}: {{total}} BUSD</span>
        <span class="composite_span3 fontsize12" v-if="tokenID == 3">{{$t("message.nftCard.txt11")}}: {{total}} HT</span>
      </div>
    </div>
    <div class="connect_box fontsize18" :class="{disable_bnb:disable}">
      <Btn :isapprove="isapprove" :approveloading="buy_isloading" :isloading="buy_isloading" :word="$t('message.nftCard.txt13')" ref="mychild" @sonapprove="sonapprove" @dosomething="buyBindCard"/>
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
import { hnBlindBox,hn,erc20,contract,token,util,getSigner } from 'hashland-sdk';
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
      cardNumber:'0',//卡牌的编号
      originalPrice:0,// 合约返回的原始盲盒价格数据 可以直接用的传给合约
      isapprove:false,//是否授权
      tokenID:1, // 代币id------0 bnb  1 hclp  2 busd 3 ht
      maxbuy:0, // 最大购买数量
      disable:false,//购买按钮是否禁用(是否在白名单)
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          this.connectGetInfo()
          this.getTokenInfo(this.tokenID)
          setTimeout(() => {
            let type = ''
            if(this.tokenID == 0){
              type = 'BNB'
            }else if(this.tokenID == 1){
              type = 'HCLP'
            }else if(this.tokenID == 2){
              type = 'BUSD'
            }else if(this.tokenID == 3){
              type = 'HT'
            }
            this.$refs.mychild.isApproveFun(type,contract().HNBlindBox).then(res => {
              console.log('type: ', type);
              if(res){
                this.isapprove = true
              }else{
                this.isapprove = false
              }
            })
          },1000)
        }
      },
      deep: true,
      immediate: true
    },
    $route(to){
      console.log('盲盒页面to: ', to);
      this.tokenID = to.params.type
      this.getTokenInfo(to.params.type)
    }
  },
  methods: {
    inputchangeFun() {
      console.log("输入框改变事件")
      if(this.boxnums == ''){
        this.total = 0
      }else if(Number(this.boxnums) > Number(this.maxbuy)){
        this.boxnums = this.maxbuy
        this.total = this.maxbuy * this.boxPrice
        this.$common.selectLang(`最大购买数量${this.maxbuy}`,`Maximum Purchase Number is ${this.maxbuy}`,this)
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
      let type = ''
      if(this.tokenID == 0){
        type = 'BNB'
      }else if(this.tokenID == 1){
        type = 'HCLP'
      }else if(this.tokenID == 2){
        type = 'BUSD'
      }else if(this.tokenID == 3){
        type = 'HT'
      }
      this.$refs.mychild.goApproveFun(type,contract().HNBlindBox).then(res => {
        console.log('去授权res: ', res);
        this.buy_isloading = false
        this.isapprove = true
      }).catch(() => {
        this.isapprove = false
        this.buy_isloading = false
      })
    },
    // 买盲盒
    buyBindCard(){
      if(this.disable)return
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
      hnBlindBox().connect(getSigner()).buyBoxes(this.boxnums,this.tokenID).then(async res => {
        console.log('购买盒子res: ', res);
        this.buy_isloading = false
        // this.watchResult()
        this.$common.selectLang('购买成功','Purchase Successful',this)
        this.boxnums = ''
        this.total = 0
      }).catch(err => {
        console.log('购买盒子err: ', err);
        this.buy_isloading = false
      })
    },
    connectGetInfo(){
      erc20(token().BUSD).balanceOf(this.getAccount).then(res => {
        this.balance = util.formatEther(res)
      })
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    // 获取某代币信息
    getTokenInfo(tokenID){
      console.log('获取某代币信息',tokenID)
      hnBlindBox().getBoxesLeftSupply(tokenID).then(res => {
        this.surplusNums = res
      })
      hn().totalSupply().then(data => {
        this.cardNumber = data.toString()
      })
      hnBlindBox().getTokenInfo(tokenID).then(res => {
        console.log('获取某代币信息res: ', res);
        this.boxPrice = res[0].toString() / 1e18
        this.maxbuy = res[3].toString()
        if(res[4]){
          hnBlindBox().getWhiteListExistence(tokenID,this.getAccount).then(istrue => {
            console.log('判断某用户是否在某代币的白名单istrue: ', istrue);
            if(istrue){
              this.disable = false
            }else{
              this.disable = true
            }
          })
        }
      })
    }
  },
  mounted(){
    this.getTokenInfo(this.$route.params.type)
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
    .onebox{
      position: absolute;
      top: 30%;
      left: 47%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .cardimg{
        width: 497px;
        object-fit: contain;
      }
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
          background-image: url("//cdn.hashland.com/images/bindimg.png");
          background-size: 100% 100%;
          transform: translateZ(130px);
        }
        /*  后方元素 */
        ._back{
          background-image: url("//cdn.hashland.com/images/bindimg.png");
          background-size: 100% 100%;
          transform: translateZ(-130px);
        }
        // 左边元素
        ._left{
          background-image: url("//cdn.hashland.com/images/bindimg.png");
          background-size: 100% 100%;
          transform: translateX(-130px) rotateY(-90deg);
        }
        /* 右边元素 */
        ._right{
          background-image: url("//cdn.hashland.com/images/bindimg.png");
          background-size: 100% 100%;
          transform: translateX(130px) rotateY(90deg);
        }
        /*上方*/
        ._top{
          background-image: url("//cdn.hashland.com/images/bindimg.png");
          background-size: 100% 100%;
          transform: translateY(-130px) rotateX(-90deg);
        }
        /*下方*/
        ._bottom{
          background-image: url("//cdn.hashland.com/images/bindimg.png");
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
      min-height: 1rem;
      .bgimg{
        width: 100%;
        object-fit: contain;
      }
      .onebox{
        position: absolute;
        top: 31%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .cardimg{
          width: 1.56rem;
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
