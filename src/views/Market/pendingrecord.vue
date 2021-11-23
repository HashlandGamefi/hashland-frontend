<template>
  <div class="record_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="title1_txt fontsize32">挂单记录</span>
    <div class="tab_box">
      <div class="oneTab fontsize16" :class="{ activeTab: tabIndex == 0}" @click="tabIndex = 0" >
        出售中
      </div>
      <div
        class="oneTab fontsize16"
        :class="{ activeTab: tabIndex == 1 }"
        @click="tabIndex = 1"
      >
        已完成
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabIndex: 0,//tab索引
    }
  },
  methods:{
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.record_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    position: absolute;
    top: 149px;
    right: 90px;
    width: 44px;
    cursor: pointer;
    .backimg {
      width: 100%;
      object-fit: contain;
    }
  }
  .title1_txt {
    color: #ffffff;
    margin-top: 208px;
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
  .record_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .record_page {
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
