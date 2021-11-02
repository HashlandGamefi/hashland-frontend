<template>
  <div class="nft_miningpage">
    <span class="nft_title fontsize32">{{$t("message.nftMining.txt1")}}</span>
    <span class="nft_title1 fontsize16_100">{{$t("message.nftMining.txt2")}}</span>
    <div class="tab_box">
      <div class="oneTab fontsize16_400" :class="{activeTab:tabIndex == 0}" @click="tabIndex = 0">{{$t("message.nftCard.txt2")}}</div>
      <div class="oneTab fontsize16_400" :class="{activeTab:tabIndex == 1}" @click="tabIndex = 1">{{$t("message.nftCard.txt4")}}</div>
    </div>
    <!-- 基础卡牌 -->
    <BasicCards v-if="tabIndex == 0"></BasicCards>
    <!-- 特权卡牌 -->
    <PrivilegeCard v-if="tabIndex == 1"></PrivilegeCard>
    <div class="apybox">
      <div class="apy_title">
        <span class="span1 fontsize12">APY</span>
        <span class="span1 span2 fontsize18">{{apy}}%</span>
      </div>
      <div class="apy_title">
        <span class="span1 fontsize12">{{$t("message.nftMining.txt11")}}</span>
        <span class="span1 span2 fontsize18">0%</span>
      </div>
    </div>
    <div class="footer_box">
      <div class="left_footer">
        <div class="top">
          <div class="txt" @click="extractableClick('btc',btcnum)">
            <span class="fontsize18">{{$t("message.nftMining.txt12")}}</span>
            <BtnLoading :isloading="btc_isloading"></BtnLoading>
          </div>
        </div>
        <div class="bottom">
          <div class="add_txt">
            <span class="span1 fontsize12_400">{{$t("message.nftMining.txt13")}}: {{addBTC}}</span>
          </div>
          <div class="extractable">
            <span class="span1 fontsize16">{{$t("message.nftMining.txt14")}}</span>
            <span class="span2 fontsize16" v-if="btcnum == 0">0</span>
            <span class="span2 fontsize16" v-else>
              <countTo
                :decimals="btcnumShow.length"
                :startVal="0"
                :endVal="btcnum"
                :duration="1500"
              ></countTo>
            </span>
          </div>
        </div>
        <img :src="`${$store.state.imgUrl}btclogo.png`" class="btcimg" />
      </div>
      <div class="left_footer right_footer">
        <div class="top">
          <div class="txt" @click="extractableClick('hc',hcnum)">
            <span class="fontsize18">{{$t("message.nftMining.txt12")}}</span>
            <BtnLoading :isloading="hc_isloading"></BtnLoading>
          </div>
        </div>
        <div class="bottom">
          <div class="add_txt">
            <span class="span1_ fontsize12_400">{{$t("message.nftMining.txt13")}}: {{addHC}}</span>
          </div>
          <div class="extractable">
            <span class="span1 fontsize16">{{$t("message.nftMining.txt14")}}</span>
            <span class="span2 fontsize16" v-if="hcnum == 0">0</span>
            <span class="span2 fontsize16" v-else>
              <countTo
                :decimals="hcnumShow.length"
                :startVal="0"
                :endVal="hcnum"
                :duration="1500"
              ></countTo>
            </span>
          </div>
        </div>
        <img :src="`${$store.state.imgUrl}hclogo.png`" class="btcimg" />
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BasicCards from './basiccards.vue'
import PrivilegeCard from './privilegecard.vue'
import { hc,contract,hnPool, getSigner } from 'hashland-sdk'
export default {
  components: {
    BasicCards,
    PrivilegeCard
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"]),
  },
  watch:{
    'getIstrue':{
      handler: function (newValue, oldValue) {
        if(newValue){
          this.addyieldFun()
        }else{
          clearInterval(this.timernull)
        }
      },
      deep: true,
      immediate: true
    },
  },
  data () {
    return {
      timernull:null,//定时器对象
      hcnumShow:'12345678', // 数字滚动插件默认显示小数位数8位
      btcnumShow:'12345678', // 数字滚动插件默认显示小数位数8位
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      tabIndex:0,
      apy:0,
      addBTC:0,//btc累积产量
      addHC:0,//hc累积产量
      btcnum:0,//可提取btc
      hcnum:0,//可提取hc
      btc_isloading:false,// btc提取loading
      hc_isloading:false,// hc提取loading
    }
  },
  methods: {
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    extractableClick(type,num){
      if(num == 0){
        this.$common.selectLang('没有可提取余额','No Remaining Balance to Claim',this)
        return
      }
      if(type == 'btc'){
        if(this.btc_isloading)return
        this.btc_isloading = true
        hnPool().connect(getSigner()).harvestTokens([1]).then(async res => {
          console.log('提取btcres: ', res);
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.$common.selectLang('提取成功','Claim Successful',this)
            this.btc_isloading = false
            this.addyieldFun()
          }
        }).catch(() => {
          this.btc_isloading = false
        })
      }else{
        if(this.hc_isloading)return
        this.hc_isloading = true
        hnPool().connect(getSigner()).harvestTokens([0]).then(async res => {
          console.log('提取hcres: ', res);
          if(etReceipt.status == 1){
            this.$common.selectLang('提取成功','Claim Successful',this)
            this.hc_isloading = false
            this.addyieldFun()
          }
        }).catch(() => {
          this.hc_isloading = false
        })
      }
    },
    // 累积产量---可提取产量
    addyieldFun(){
      clearInterval(this.timernull)
      this.timernull = setInterval(() => {
        hnPool().getTokenTotalRewards(this.getAccount,0).then(res => { //获取某用户的hc代币累计产量
          this.addHC = this.$common.useBigNumberDiv(res.toString())
          console.log('获取某用户的hc代币累计产量:', this.addHC);
        })
        hnPool().getTokenTotalRewards(this.getAccount,1).then(res => { //获取某用户的btc代币累计产量
          this.addBTC = this.$common.useBigNumberDiv(res.toString())
          console.log('获取某用户的btc代币累计产量: ', this.addBTC);
        })
        hnPool().getTokenRewards(this.getAccount,0).then(res => { //获取某用户可提取的hc数量
          console.log('获取某用户可提取的btc数量: ', res);
          // this.hcnum = this.$common.useBigNumberDiv(res.toString())
          if ((res.toNumber() / 1e18) < 1e-8) {
            this.hcnum = 0
          }else{
            let num = this.$common.useBigNumberDiv(res.toString())
            this.hcnumShow = num.substring(num.indexOf('.') + 1,num.length)
            this.hcnum = Number(num)
          }
        })
        hnPool().getTokenRewards(this.getAccount,1).then(res => { //获取某用户可提取的btc数量
        console.log('获取某用户可提取的hc数量: ', res);
        // this.btcnum = this.$common.useBigNumberDiv(res.toString())
        if ((res.toNumber() / 1e18) < 1e-8) {
          this.btcnum = 0
        }else{
          let num = this.$common.useBigNumberDiv(res.toString())
          this.btcnumShow = num.substring(num.indexOf('.') + 1,num.length)
          this.btcnum = Number(num)
        }
      })
      },5000)
    },
    // sdk一系列信息
    async getSDKInfo(){
      let hc_num = (await hc().getPoolTokenPerBlock(contract().HNPool) / 1e18).toString() // hc产量
      let btc_num = (await hnPool().tokensPerBlock(1) / 1e18).toString() // btc产量
      console.log('hc产量:%s,btc产量:%s ', hc_num,btc_num);
      let molecule = hc_num * 28800 * 365 * 10 + btc_num * 28800 * 365 * 400000 // 分子
      let cardNum = await hnPool().getHnIdsLength() // 获取池子质押的总卡牌数量
      this.apy = molecule / (cardNum * 100)
    },
  },
  mounted(){
    this.getSDKInfo()
    this.addyieldFun()
  }
}
</script>

<style lang='scss' scoped>
.nft_miningpage{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
  .nft_title{
    color: #FFFFFF;
  }
  .nft_title1{
    color: #FFFFFF;
    margin-top: 10px;
  }
  .tab_box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:65px;
    .oneTab{
      width: 158px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #FFFFFF;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
        -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
    }
    .activeTab{
      background: #29CDDA; //linear-gradient(to right,#2445C1,#1E9694);
      box-shadow: 0 9px 2px #23447C;
    }
  }
  .apybox{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 82px;
    padding: 0 100px;
    .apy_title{
      color: #FFFFFF;
      display: flex;
      align-items: center;
      margin-right: 107px;
      .span1{
        color: #FFFFFF;
      }
      .span2{
        margin-left: 15px;
      }
    }
  }
  .footer_box{
    width: 100%;
    padding: 0 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 54px;
    .left_footer{
      position: relative;
      width: 47%;
      height: 228px;
      background: linear-gradient(90deg, #F5A00A 0%, #EA6C10 10%, #E69826 100%);
      border-radius: 19px;
      display: flex;
      flex-direction: column;
      padding:7px 20px 26px 20px;
      .top{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .txt{
          width: 140px;
          height: 49px;
          background-image: url("//cdn.hashland.com/images/nft_btn2.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          color: #FFFFFF;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .bottom{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: linear-gradient(270deg, #E79826 0%, #FF7902 100%);
        box-shadow: 0px 6px 12px 0px rgba(127, 70, 14, 0.69) inset, 0px 1px 23px 0px #8B4309 inset;
        border-radius: 25px;
        padding: 14px 0 26px 13px;
        margin-top: 13px;
        .add_txt{
          width: 240px;
          .span1{
            width: 100%;
            padding: 2px 10px;
            background: #A25911;
            border-radius: 15px;
            color: #FFFFFF;
            line-height: 25px;
          }
        }
        .extractable{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 13px;
          padding-right: 50px;
          .span1{
            color: #FFFFFF;
          }
          .span2{
            color: #FFFFFF;
          }
        }
      }
      .btcimg{
        position: absolute;
        top: -20px;
        left: -4px;
        width: 61px;
        object-fit: contain;
      }
    }
    .right_footer{
      background: linear-gradient(90deg, #153AA2 0%, #0F296A 10%, #2673E6 100%);
      // box-shadow: 0px 9px 17px 4px rgba(0, 0, 0, 0.5), 0px 21px 22px -2px rgba(3, 17, 34, 0.68);
      .top{
        .txt{
          background-image: url("//cdn.hashland.com/images/nft_btn1.png");
        }
      }
      .bottom{
        background: linear-gradient(88deg, #3080F8 0%, #31ABEB 100%);
        box-shadow: 0px 6px 12px 0px #2164CE inset, 0px 1px 23px 0px #01060E inset;
      }
      .add_txt{
        .span1_{
          padding: 2px 10px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 15px;
          color: #FFFFFF;
        }
      }
    }
  }
}
@media screen and (min-width: 1280px) {
  .nft_miningpage{
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .nft_miningpage{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    .nft_title{
      color: #FFFFFF;
      line-height: 0.5rem;
    }
    .nft_title1{
      font-size: 0.16rem;


      color: #FFFFFF;
      line-height: 0.2rem;
      margin-top: 0;
    }
    .tab_box{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top:0.4rem;
      .oneTab{
        width: 1rem;
        height: 0.37rem;
        line-height: 0.37rem;
        text-align: center;
        font-size: 0.12rem;


        color: #FFFFFF;
        border-radius: 0.05rem;
        cursor: pointer;
      box-shadow:0px 1px 3px 0px rgba(0, 0, 0, 0.5), -2px 1px 22px 0px rgba(194,190,190,0.52) inset;
      }
      .activeTab{
        background: #29CDDA;
        box-shadow: 0 0.06rem 2px #23447C;
      }
    }
    .apy_title{
      width: 100%;
      padding-left: 0.2rem;
      font-size: 0.2rem;


      color: #FFFFFF;
      line-height: 0.28rem;
      margin-top: 0.1rem;
    }
    .footer_box{
      width: 100%;
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.2rem;
      .left_footer{
        position: relative;
        width: 80%;
        height: auto;
        background: linear-gradient(90deg, #F5A00A 0%, #EA6C10 10%, #E69826 100%);
        box-shadow: 0px 21px 22px -2px rgba(3, 17, 34, 0.68), 0px 21px 22px -2px rgba(3, 17, 34, 0.68);
        border-radius: 0.2rem;
        display: flex;
        flex-direction: column;
        padding: 0.1rem;
        margin-bottom: 0.4rem;
        .top{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .txt{
            width: 1.21rem;
            height: 0.42rem;
            background-image: url("//cdn.hashland.com/images/nft_btn2.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            font-size: 0.2rem;


            color: #FFFFFF;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .bottom{
          width: 100%;
          height: 1rem;
          background: linear-gradient(270deg, #E79826 0%, #FF7902 100%);
          box-shadow: 0px 6px 12px 0px rgba(127, 70, 14, 0.69), 0px 1px 23px 0px #8B4309 inset;
          border-radius: 0.2rem;
          padding: 0.2rem;
          margin-top: 0.1rem;
          .add_txt{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .span1{
              padding: 0.02rem 0.1rem;
              background: #A25911;
              border-radius: 0.15rem;
              font-size: 0.12rem;


              color: #FFFFFF;
              line-height: 0.17rem;
            }
          }
          .extractable{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .span1{
              font-size: 0.2rem;


              color: #FFFFFF;
              line-height: 0.28rem;
            }
            .span2{
              font-size: 0.2rem;


              color: #FFFFFF;
              line-height: 0.28rem;
            }
          }
        }
        .btcimg{
          position: absolute;
          top: -28px;
          left: -16px;
          width: 0.66rem;
          object-fit: contain;
        }
      }
      .right_footer{
        height: auto;
        background: linear-gradient(90deg, #153AA2 0%, #0F296A 10%, #2673E6 100%);
        box-shadow: 0px 9px 17px 4px rgba(0, 0, 0, 0.5), 0px 21px 22px -2px rgba(3, 17, 34, 0.68);
        .top{
          .txt{
            background-image: url("//cdn.hashland.com/images/nft_btn1.png");
          }
        }
        .bottom{
          background: linear-gradient(88deg, #3080F8 0%, #31ABEB 100%);
          box-shadow: 0px 6px 12px 0px #2164CE, 0px 1px 23px 0px #01060E;
          .add_txt{
            .span1_{
              padding: 0.02rem 0.1rem;
              background: rgba(0, 0, 0, 0.4);
              border-radius: 0.15rem;
              font-size: 0.12rem;


              color: #FFFFFF;
              line-height: 0.17rem;
            }
          }
        }
      }
    }
  }
}
</style>
