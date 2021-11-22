<template>
  <div class="hclp_page">
    <span class="title1_txt fontsize32">{{ $t("message.hclp.txt1") }}</span>
    <span class="title1_txt title2_txt fontsize16_100">{{ $t("message.hclp.txt2") }}</span>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hclpPool, erc20, token, getSigner, contract, info } from 'hashland-sdk';
export default {
  data () {
    return {
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount",'getCoinPrice'])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        console.log('市场页面newValue: ', newValue);
        if(newValue){

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
    }
  }
}
</script>

<style lang='scss' scoped>
.hclp_page {
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
}
@media screen and (min-width: 1280px) {
  .hclp_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .hclp_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.37rem;
    padding-top: 0.94rem;
    .title1_txt {
      color: #ffffff;
    }
    .title2_txt {
      color: #ffffff;
    }
  }
}
</style>
