<template>
  <div class="buy_page">
    <span class="title1_txt" @click="connect">NFT卡牌</span>
    <span class="title2_txt">这是一张持续增值的卡牌</span>
    <div class="tab_box">
      <div class="oneTab" :class="{activeTab:tabIndex == 0}" @click="tabIndex = 0">合成卡牌</div>
      <div class="oneTab" :class="{activeTab:tabIndex == 1}" @click="tabIndex = 1">盲盒卡牌</div>
      <div class="oneTab" :class="{activeTab:tabIndex == 2}" @click="tabIndex = 2">特权卡牌</div>
    </div>
    <CompositeCard v-if="tabIndex == 0"></CompositeCard>
  </div>
</template>

<script>
import CompositeCard from './compositecard.vue'
import { getSigner,hn,util,hnBox } from 'hashland-sdk';
export default {
  data () {
    return {
      tabIndex:0 ,//tab索引
    }
  },
  components: {
    CompositeCard
  },
  methods: {
    async connect(){
      console.log("点击函数")
      let zccount = await window.ethereum.enable();
      console.log('账号: ', zccount);

      // const tx = await signer.sendTransaction({
      //   to: "0x16FEC748C51B702eCC4ACCe122EcF9059f7fBd1C",
      //   value: util.parseEther("0.001")
      // });
      // console.log("tx:",tx)
      let box = hnBox()
      console.log('box: ', box);
      const a =await box.boxTokenPrices(0)
      console.log('a: ', a);

      let hnContract = hn();
      const totalSupply = await hnContract.totalSupply();
      console.log('totalSupply: ', util.formatEther(totalSupply));

      let trasfer = await hnContract.connect(getSigner()).transferFrom('0x16FEC748C51B702eCC4ACCe122EcF9059f7fBd1C','0x16FEC748C51B702eCC4ACCe122EcF9059f7fBd1C',0)
      console.log('trasfer: ', trasfer);

      // const tx1 = await hnContract.renameHn(0, "123");
      // console.log('tx: ', tx1);

      // const approve = await hnContract.setApprovalForAll('0xCfd90244D4788b61d1d79A77748C74a26d8b752b',true)
      // console.log('approve: ', approve);
    }
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style lang='scss' scoped>
.buy_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
  .title1_txt{
    font-size: 60px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 84px;
    letter-spacing: 4px;
    text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    background: linear-gradient(360deg, rgba(47, 215, 242, 0) 0%, #00EBF3 100%);
    background-clip: text;
    color: transparent;
  }
  .title2_txt{
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #0AA6B5;
    line-height: 37px;
    letter-spacing: 19px;
  }
  .tab_box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 90px;
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
}
</style>
