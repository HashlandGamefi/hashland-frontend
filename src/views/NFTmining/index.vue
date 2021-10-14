<template>
  <div class="nft_miningpage">
    <span class="nft_title">NFT卡牌权益</span>
    <span class="nft_title1">质押您拥有的NFT卡牌，获得挖矿权益</span>
    <div class="tab_box">
      <div class="oneTab" :class="{activeTab:tabIndex == 0}" @click="tabIndex = 0">基础卡牌</div>
      <div class="oneTab" :class="{activeTab:tabIndex == 1}" @click="tabIndex = 1">特权卡牌</div>
    </div>
    <BasicCards v-if="tabIndex == 0"></BasicCards>
    <div class="apy_title">APY  180.88%</div>
    <div class="footer_box">
      <div class="left_footer">
        <div class="top">
          <div class="txt">提取</div>
        </div>
        <div class="bottom">
          <div class="add_txt">
            <span class="span1">累计赚取:0.00000001</span>
          </div>
          <div class="extractable">
            <span class="span1">可提取</span>
            <span class="span2">0.00079008</span>
          </div>
        </div>
        <img src="../../assets/images/logo.png" class="btcimg" />
      </div>
      <div class="left_footer right_footer">
        <div class="top">
          <div class="txt">提取</div>
        </div>
        <div class="bottom">
          <div class="add_txt">
            <span class="span1_">累计赚取:0.00000001</span>
          </div>
          <div class="extractable">
            <span class="span1">可提取</span>
            <span class="span2">0.00079008</span>
          </div>
        </div>
        <img src="../../assets/images/logo.png" class="btcimg" />
      </div>
    </div>
  </div>
</template>

<script>
import BasicCards from './basiccards.vue'
export default {
  components: {
    BasicCards
  },
  data () {
    return {
      tabIndex:0
    }
  },
  methods: {},
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
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
    font-size: 60px;
    font-family: AaJXH;
    color: #FFFFFF;
    line-height: 73px;
    letter-spacing: 4px;
    text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    // background: linear-gradient(180deg, #E5FFFF 0%, #81C6E3 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
  .nft_title1{
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #0AA6B5;
    line-height: 37px;
    -webkit-text-stroke: 1px #092868;
    // text-stroke: 1px #092868;
    background: linear-gradient(180deg, #E5FFFF 0%, #81C6E3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 20px;
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
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      border-radius: 5px;
      cursor: pointer;
      box-shadow:-15px 11px 40px 21px rgba(0,0,1,0.38), -2px 1px 34px 0px rgba(255, 255, 255,0.22) inset;
    }
    .activeTab{
      background: linear-gradient(to right,#2445C1,#1E9694);
    }
  }
  .apy_title{
    width: 100%;
    padding-left: 120px;
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 56px;
    margin-top: 160px;
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
      justify-content: space-between;
      padding: 20px;
      .top{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .txt{
          width: 280px;
          text-align: center;
          height: 97px;
          background-image: url("../../assets/images/nft_btn2.png");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          font-size: 40px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 97px;
          cursor: pointer;
        }
      }
      .bottom{
        width: 100%;
        display: flex;
        flex-direction: column;
        background: linear-gradient(270deg, #E79826 0%, #FF7902 100%);
        box-shadow: 0px 6px 12px 0px rgba(127, 70, 14, 0.69), 0px 1px 23px 0px #8B4309 inset;
        border-radius: 25px;
        padding: 10px;
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
        top: -45px;
        left: -45px;
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
