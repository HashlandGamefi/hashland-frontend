<template>
  <div class="gamefi_page">
    <span class="title1_txt fontsize32">{{ $t("message.market.txt1") }}</span>
    <div class="tab_box">
      <div class="oneTab fontsize16" :class="{ activeTab: tabIndex == 0}" @click="tabClick(0)" >
        {{ $t("message.market.txt42") }}
      </div>
      <div class="oneTab fontsize16"
        :class="{ activeTab: tabIndex == 1 }"
        @click="tabClick(1)"
      >
        {{ $t("message.market.txt43") }}
      </div>
    </div>
    <BusdMarket v-show="tabIndex == 0"></BusdMarket>
    <HcMarket v-show="tabIndex == 1"></HcMarket>
  </div>
</template>

<script>
import BusdMarket from './busdMarket.vue'
import HcMarket from './hcMarket.vue'
export default {
  components: {
    BusdMarket,
    HcMarket
  },
  data() {
    return {
      tabIndex:0
    }
  },
  watch:{
    $route(to){
      this.tabIndex = to.params.id
    }
  },
  methods: {
    tabClick(index){
      this.$router.push(`/market/${index}`)
    }
  },
  mounted(){
    this.tabIndex = this.$route.params.id
  }
}
</script>

<style lang='scss' scoped>
.gamefi_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 126px;
  .tab_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 32px;
    .oneTab {
      width: 158px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
        -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
    }
    .activeTab {
      background: #29cdda; //linear-gradient(to right,#2445C1,#1E9694);
      box-shadow: 0 9px 2px #23447c;
    }
  }
  .title1_txt {
    color: #ffffff;
  }
}
@media screen and (min-width: 1280px) {
  .gamefi_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .gamefi_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.2rem;
    padding-top: 0.94rem;
    .title1_txt {
      color: #ffffff;
    }
    .tab_box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.33rem;
      .oneTab {
        width: 1rem;
        height: 0.24rem;
        font-size: 0.12rem;
        line-height: 0.24rem;
        text-align: center;
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
