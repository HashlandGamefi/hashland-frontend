<template>
  <div class="buy_page">
    <img src="../../assets/images/nftcard.png" class="card_nft" />
    <!-- <span class="title1_txt">NFT卡牌</span> -->
    <span class="title2_txt">这是一张持续增值的卡牌</span>
    <div class="tab_box">
      <div class="oneTab" :class="{activeTab:tabIndex == 0}" @click="tabIndex = 0">基础卡牌</div>
      <div class="oneTab" :class="{activeTab:tabIndex == 1}" @click="tabIndex = 1">盲盒卡牌</div>
      <div class="oneTab" :class="{activeTab:tabIndex == 2}" @click="tabIndex = 2">特权卡牌</div>
    </div>
    <BasicsCard v-if="tabIndex == 0"></BasicsCard>
    <BlindBoxCard v-if="tabIndex == 1"></BlindBoxCard>
    <PrivilegeCard v-if="tabIndex == 2"></PrivilegeCard>
  </div>
</template>

<script>
import BasicsCard from './basicscard.vue'
import BlindBoxCard from './blindboxcard.vue'
import PrivilegeCard from './privilegecard.vue'
export default {
  data () {
    return {
      tabIndex:0 ,//tab索引
    }
  },
  components: {
    BasicsCard,
    BlindBoxCard,
    PrivilegeCard
  }
}
</script>

<style lang='scss' scoped>
.buy_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;
  .card_nft{
    width: 470px;
    object-fit: contain;
  }
  .title2_txt{
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #0AA6B5;
    line-height: 37px;
    transition: all 1.5s ease;
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
