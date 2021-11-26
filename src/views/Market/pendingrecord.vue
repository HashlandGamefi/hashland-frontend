<template>
  <div class="record_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="title1_txt fontsize32">挂单记录</span>
    <div class="btn_father">
      <Btn :word="'购买'" ref="mychild" @sonapprove="sonapprove" @dosomething="buy"/>
    </div>
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
    <div class="show_gameArr">
      <div class="onebox" v-for="(item,index) in pageshowarr" :key="index">
        <img :src="item.src" class="img" />
        <div class="bottom_box">
          <div class="left_price">
            <img :src="`${$store.state.imgUrl}bsc.png`" class="bsc_img" />
            <span class="span1 fontsize16">{{item.price}} BUSD</span>
          </div>
          <Btn :word="'购买'" ref="mychild" @sonapprove="sonapprove" @dosomething="buy"/>
          <!-- <div class="btn fontsize12" @click="buyCard(item)" v-if="isapprove">
            购买<BtnLoading :isloading="item.isstatus"></BtnLoading>
          </div>
          <div class="btn fontsize12" v-else @click="goApproveClick">
            {{$t("message.approve")}}<BtnLoading :isloading="buy_isloading"></BtnLoading>
          </div> -->
        </div>
      </div>
      <NoData v-if="pageshowarr.length == 0"></NoData>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { contract } from 'hashland-sdk';
export default {
  data () {
    return {
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      tabIndex: 0,//tab索引
      pageshowarr:[]
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          setTimeout(() => {
            this.$refs.mychild.isApproveFun('busd',contract().HNUpgrade);
          },1000)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods:{
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    sonapprove(){
      console.log('父组件页面调用子组件的授权方法,授权busd')
      this.$refs.mychild.goApproveFun('busd',contract().HNUpgrade)
    },
    buy(){
      console.log('授权成功后,子组件返回的方法,父组件可以做自己的事情了')
    },
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
  .btn_father{
    width: 274px;
    height: 59px;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 70px;
    cursor: pointer;
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
