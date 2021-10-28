<template>
  <div class="buy_page" ref="buypage">
    <span class="title1_txt">{{$t("message.nav.txt7")}}</span>
    <span class="title2_txt">{{$t("message.nftCard.txt1")}}</span>
    <div class="tab_box">
      <div class="oneTab" :class="{activeTab:tabIndex == 0}" @click="tabIndex = 0">{{$t("message.nftCard.txt2")}}</div>
      <div class="oneTab" :class="{activeTab:tabIndex == 1}" @click="tabIndex = 1">{{$t("message.nftCard.txt3")}}</div>
      <div class="oneTab" :class="{activeTab:tabIndex == 2}" @click="tabIndex = 2">{{$t("message.nftCard.txt4")}}</div>
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
  .title1_txt{
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 84px;
    letter-spacing: 4px;
    color: #FFFFFF;
    // text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    // background: linear-gradient(360deg, rgba(47, 215, 242, 0) 0%, #00EBF3 100%);
    // background-clip: text;
    // color: transparent;
  }
  .title2_txt{
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    // color: #0AA6B5;
    color: #FFFFFF;
    line-height: 37px;
    // transition: all 1.5s ease;
    letter-spacing: 4px;
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
      font-size: 30px;
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
}
@media screen and (max-width: 980px){
  .buy_page{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    .title1_txt{
      font-size: 0.24rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      line-height: 0.3rem;
      letter-spacing: 4px;
      color: #FFFFFF;
    }
    .title2_txt{
      font-size: 0.16rem;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 0.22rem;
      letter-spacing: 4px;
    }
    .tab_box{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.4rem;
      .oneTab{
        width: 1rem;
        height: 0.37rem;
        line-height: 0.37rem;
        text-align: center;
        font-size: 0.12rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        border-radius: 5px;
        cursor: pointer;
        box-shadow:26px 11px 40px 21px rgba(0,0,1,0.38), -5px 1px 34px 0px rgba(255, 255, 255,0.22) inset;
      }
      .activeTab{
        background: #29CDDA; //linear-gradient(to right,#2445C1,#1E9694);
        box-shadow: 0 0.06rem 2px #23447C;
      }
    }
  }
}
</style>
