<template>
  <div class="buy_page" ref="buypage">
    <span class="title1_txt font_title">{{ $t("message.nav.txt7") }}</span>
    <span class="title2_txt">{{ $t("message.nftCard.txt1") }}</span>
    <div class="tab_box">
      <div
        class="oneTab"
        :class="{ activeTab: tabIndex == 0 }"
        @click="tabIndex = 0"
      >
        {{ $t("message.nftCard.txt2") }}
      </div>
      <div
        class="oneTab"
        :class="{ activeTab: tabIndex == 1 }"
        @click="tabIndex = 1"
      >
        {{ $t("message.nftCard.txt3") }}
      </div>
      <div
        class="oneTab"
        :class="{ activeTab: tabIndex == 2 }"
        @click="tabIndex = 2"
      >
        {{ $t("message.nftCard.txt4") }}
      </div>
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
      tabIndex: 0,//tab索引
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
.buy_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110px;
  .title1_txt {
    font-size: 36px;
    line-height: 84px;
    color: #ffffff;
  }
  .title2_txt {
    font-size: 20px;
    color: #ffffff;
    line-height: 37px;
  }
  .tab_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 90px;
    .oneTab {
      width: 360px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      font-size: 26px;

      color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
        -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
    }
    .activeTab {
      background: #29cdda; //linear-gradient(to right,#2445C1,#1E9694);
      box-shadow: 0 14px 2px #23447c;
    }
  }
}
@media screen and (min-width: 1440px) {
  .buy_page {
    max-width: 1440px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .buy_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    .title1_txt {
      font-size: 0.24rem;

      line-height: 0.3rem;

      color: #ffffff;
    }
    .title2_txt {
      font-size: 0.16rem;

      color: #ffffff;
      line-height: 0.22rem;
    }
    .tab_box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.4rem;
      .oneTab {
        width: 1rem;
        height: 0.37rem;
        line-height: 0.37rem;
        text-align: center;
        font-size: 0.12rem;

        color: #ffffff;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
          -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
      }
      .activeTab {
        background: #29cdda; //linear-gradient(to right,#2445C1,#1E9694);
        box-shadow: 0 0.06rem 2px #23447c;
      }
    }
  }
}
</style>
