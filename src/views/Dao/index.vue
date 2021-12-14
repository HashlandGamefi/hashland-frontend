<template>
  <div class="dao_page">
    <span class="title1_txt fontsize32">{{ $t("message.dao.txt1") }}</span>
    <span class="title1_txt title2_txt fontsize16_100">{{ $t("message.dao.txt2") }}</span>
    <div class="tab_box">
      <div class="oneTab fontsize16" :class="{ activeTab: tabIndex == 0}" @click="tabClick(0)" >
        {{ $t("message.dao.txt3") }}
      </div>
      <div
        class="oneTab fontsize16"
        :class="{ activeTab: tabIndex == 1 }"
        @click="tabClick(1)"
      >
        {{ $t("message.dao.txt4") }}
      </div>
      <div
        class="oneTab fontsize16"
        :class="{ activeTab: tabIndex == 2 }"
        @click="tabClick(2)"
      >
        {{ $t("message.dao.txt5") }}
      </div>
    </div>
    <VoteCom v-if="tabIndex == 0"></VoteCom>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun"></Proup>
  </div>
</template>
<script>
import VoteCom from './VoteCom.vue'
export default {
  components: {
    VoteCom
  },
  data () {
    return {
      tabIndex: 0,//tab索引
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
    }
  },
  methods:{
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    tabClick(index){
      console.log('index: ', index);
      if(index != 0){
        this.$common.selectLang("敬请期待", "Coming soon", this);
        return
      }
      this.tabIndex = index
    },
  },
}
</script>
<style lang='scss' scoped>
.dao_page {
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
    width: 570px;
    text-align: center;
  }
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
}
@media screen and (min-width: 1280px) {
  .dao_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .dao_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.94rem;
    .title1_txt {
      color: #ffffff;
    }
    .title2_txt {
      margin-top: 0.1rem;
      width: 100%;
      text-align: center;
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
