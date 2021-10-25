<template>
  <div class="nft_miningpage">
    <span class="nft_title">NFT卡牌权益</span>
    <span class="nft_title1">质押您拥有的NFT卡牌，获得挖矿权益</span>
    <div class="tab_box">
      <div class="oneTab" :class="{activeTab:tabIndex == 0}" @click="tabIndex = 0">基础卡牌</div>
      <div class="oneTab" :class="{activeTab:tabIndex == 1}" @click="tabIndex = 1">特权卡牌</div>
    </div>
    <!-- 基础卡牌 -->
    <BasicCards v-if="tabIndex == 0"></BasicCards>
    <!-- 特权卡牌 -->
    <PrivilegeCard v-if="tabIndex == 1"></PrivilegeCard>
    <div class="apy_title">APY {{apy}}%</div>
    <div class="footer_box">
      <div class="left_footer">
        <div class="top">
          <div class="txt" @click="extractableClick('btc',btcnum)">
            <span>提取</span>
            <BtnLoading :isloading="btc_isloading"></BtnLoading>
          </div>
        </div>
        <div class="bottom">
          <div class="add_txt">
            <span class="span1">累计赚取:{{addBTC}}</span>
          </div>
          <div class="extractable">
            <span class="span1">可提取</span>
            <span class="span2">{{btcnum}}</span>
          </div>
        </div>
        <img src="../../assets/images/btc.png" class="btcimg" />
      </div>
      <div class="left_footer right_footer">
        <div class="top">
          <div class="txt" @click="extractableClick('hc',hcnum)">
            <span>提取</span>
            <BtnLoading :isloading="hc_isloading"></BtnLoading>
          </div>
        </div>
        <div class="bottom">
          <div class="add_txt">
            <span class="span1_">累计赚取: {{addHC}}</span>
          </div>
          <div class="extractable">
            <span class="span1">可提取</span>
            <span class="span2">{{hcnum}}</span>
          </div>
        </div>
        <img src="../../assets/images/hc.png" class="btcimg" />
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import BasicCards from './basiccards.vue'
import PrivilegeCard from './privilegecard.vue'
import { hc,contract,hn,hnPool, getSigner } from 'hashland-sdk'
export default {
  components: {
    BasicCards,
    PrivilegeCard
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"]),
  },
  data () {
    return {
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
        this.$common.selectLang('没有可提取余额','1223',this)
        return
      }
      if(type == 'btc'){
        if(this.btc_isloading)return
        this.btc_isloading = true
        hnPool().connect(getSigner()).harvestTokens([1]).then(async res => {
          console.log('提取btcres: ', res);
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.$common.selectLang('提取成功','1223',this)
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
            this.$common.selectLang('提取成功','1223',this)
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
        this.hcnum = this.$common.useBigNumberDiv(res.toString())
      })
      hnPool().getTokenRewards(this.getAccount,1).then(res => { //获取某用户可提取的btc数量
        console.log('获取某用户可提取的hc数量: ', res);
        this.btcnum = this.$common.useBigNumberDiv(res.toString())
      })
    },
    // sdk一系列信息
    async getSDKInfo(){
      let hc_num = (await hc().getPoolTokenPerBlock(contract().HNPool) / 1e18).toString() // hc产量
      let btc_num = (await hnPool().tokensPerBlock(1) / 1e18).toString() // btc产量
      console.log('hc产量:%s,btc产量:%s ', hc_num,btc_num);
      let molecule = hc_num * 28800 * 365 * 10 + btc_num * 28800 * 365 * 400000 // 分子
      let cardNum = await hnPool().getHnIdsLength() // 获取池子质押的总卡牌数量
      this.apy = molecule / (cardNum * 100)
      this.addyieldFun()
    }
  },
  mounted(){
    this.getSDKInfo()
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
    font-size: 40px;
    font-family: AaJXH;
    color: #FFFFFF;
    line-height: 73px;
    letter-spacing: 4px;
    // text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    // background: linear-gradient(180deg, #E5FFFF 0%, #81C6E3 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
  .nft_title1{
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 37px;
    // -webkit-text-stroke: 1px #092868;
    // text-stroke: 1px #092868;
    // background: linear-gradient(180deg, #E5FFFF 0%, #81C6E3 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    margin-top: 20px;
    letter-spacing: 4px;
  }
  .tab_box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top:70px;
    .oneTab{
      width: 360px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      border-radius: 5px;
      cursor: pointer;
      box-shadow:26px 11px 40px 21px rgba(0,0,1,0.38), -5px 1px 34px 0px rgba(255, 255, 255,0.22) inset;
    }
    .activeTab{
      background: #29CDDA; //linear-gradient(to right,#2445C1,#1E9694);
      box-shadow: 0 14px 2px #23447C;
    }
  }
  .apy_title{
    width: 100%;
    padding-left: 120px;
    font-size: 32px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 56px;
    margin-top: 60px;
  }
  .footer_box{
    width: 100%;
    padding: 0 65px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 80px;
    .left_footer{
      position: relative;
      width: 615px;
      height: 306px;
      background: linear-gradient(90deg, #F5A00A 0%, #EA6C10 10%, #E69826 100%);
      box-shadow: 0px 21px 22px -2px rgba(3, 17, 34, 0.68), 0px 21px 22px -2px rgba(3, 17, 34, 0.68);
      border-radius: 19px;
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      padding: 20px;
      .top{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .txt{
          width: 200px;
          height: 73px;
          background-image: url("../../assets/images/nft_btn2.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          font-size: 24px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
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
        box-shadow: 0px 6px 12px 0px rgba(127, 70, 14, 0.69), 0px 1px 23px 0px #8B4309 inset;
        border-radius: 25px;
        padding: 27px;
        margin-top: 10px;
        .add_txt{
          .span1{
            padding: 2px 10px;
            background: #A25911;
            border-radius: 15px;
            font-size: 18px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 25px;
          }
        }
        .extractable{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .span1{
            font-size: 28px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 56px;
          }
          .span2{
            font-size: 28px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 56px;
          }
        }
      }
      .btcimg{
        position: absolute;
        top: -75px;
        left: -70px;
        width: 181px;
        object-fit: contain;
      }
    }
    .right_footer{
      background: linear-gradient(90deg, #153AA2 0%, #0F296A 10%, #2673E6 100%);
      box-shadow: 0px 9px 17px 4px rgba(0, 0, 0, 0.5), 0px 21px 22px -2px rgba(3, 17, 34, 0.68);
      .top{
        .txt{
          background-image: url("../../assets/images/nft_btn1.png");
        }
      }
      .bottom{
        background: linear-gradient(88deg, #3080F8 0%, #31ABEB 100%);
        box-shadow: 0px 6px 12px 0px #2164CE, 0px 1px 23px 0px #01060E;
      }
      .add_txt{
        .span1_{
          padding: 2px 10px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 15px;
          font-size: 18px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
