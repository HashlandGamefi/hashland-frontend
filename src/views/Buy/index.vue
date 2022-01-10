<template>
  <div class="buy_page">
    <span class="title1_txt fontsize32">{{ $t("message.nav.txt7") }}</span>
    <span class="title1_txt title2_txt fontsize16_100">{{ $t("message.nftCard.txt1") }}</span>
    <div class="tab_box">
      <div class="oneTab fontsize16" :class="{ activeTab: tabIndex == 0}" @click="tabClick(0)" >
        {{ $t("message.nftCard.txt2") }}
      </div>
      <div
        class="oneTab fontsize16"
        :class="{ activeTab: tabIndex == 1 }"
        @click="tabClick(1)"
      >
        {{ $t("message.nftCard.txt3") }}
      </div>
      <div
        class="oneTab fontsize16"
        :class="{ activeTab: tabIndex == 2 }"
        @click="tabClick(2)"
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
  },
  watch:{
    $route(to){
      this.tabIndex = to.params.id
    }
  },
  methods:{
    tabClick(index){
      if(localStorage.getItem('routerIndex')){
        this.$router.push(`/buy/${index}/${localStorage.getItem('routerIndex')}`)
      }else{
        this.$router.push(`/buy/${index}/1`)
      }
    }
  },
  mounted(){
    this.tabIndex = this.$route.params.id
  }
}
</script>

<style lang='scss' scoped>
.buy_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 126px;
  .title1_txt {
    color: #ffffff;
  }
  .title2_txt {
    margin-top: 10px;
  }
  .tab_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 65px;
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
}
@media screen and (min-width: 1280px) {
  .buy_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .buy_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.94rem;
    .title1_txt {
      color: #ffffff;
    }
    .title2_txt {
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
