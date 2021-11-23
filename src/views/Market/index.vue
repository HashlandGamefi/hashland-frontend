<template>
  <div class="gamefi_page">
    <span class="title1_txt fontsize32">{{ $t("message.gamefi.txt1") }}</span>
    <div class="content">
      <div class="leftboxs">
        <!-- 几阶对应数量 -->
        <div class="left_content">
          <span class="span1 fontsize16">{{$t("message.synthesis.txt4")}} {{rank}}</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="selectRankClik(ele)" v-for="ele in 5" :key="ele">{{$t("message.synthesis.txt4")}} {{ele}}</span>
          </div>
        </div>
        <!-- 排序 -->
        <div class="left_content left_content_price">
          <span class="span1 fontsize16">{{$t("message.gamefi.txt2")}}</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="selectRankClik('asc')">
              {{$t("message.gamefi.txt2")}}
            </span>
            <span class="span1 fontsize16" @click="selectRankClik('desc')">
              {{$t("message.gamefi.txt3")}}
            </span>
          </div>
        </div>
      </div>
      <!-- 去挂单 -->
      <div class="right_content">
        <div class="synthesis_btn fontsize16" @click="goOrder">
          {{ $t("message.gamefi.txt4") }}
        </div>
        <img :src="`${$store.state.imgUrl}record.png`" class="record_img" @click="recordClick" />
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
          <div class="btn">购买</div>
        </div>
      </div>
      <NoData v-if="pageshowarr.length == 0"></NoData>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnMarket } from 'hashland-sdk';
export default {
  data () {
    return {
      pageshowarr:[
        {
          src:`${this.$store.state.imgUrl}defaultcard.png`,
          price:100,
        },
        {
          src:`${this.$store.state.imgUrl}defaultcard.png`,
          price:100,
        },
        {
          src:`${this.$store.state.imgUrl}defaultcard.png`,
          price:100,
        },
        {
          src:`${this.$store.state.imgUrl}defaultcard.png`,
          price:100,
        },
        {
          src:`${this.$store.state.imgUrl}defaultcard.png`,
          price:100,
        },
        {
          src:`${this.$store.state.imgUrl}defaultcard.png`,
          price:100,
        }
      ],//页面展示数组
      rank:1,//1阶
      amount:0,//阶对应的卡牌数量
      selectedNUM:0,//选中的卡牌数量
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
    // 去挂单
    goOrder(){
      this.$router.push('/hangingorder')
    },
    // 挂单记录
    recordClick(){
      this.$router.push('/pendingrecord')
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    //获取sdk信息
    getSDKInfo(){
      hnMarket().getEachLevelHnIdsLength(5).then(res => {
        console.log('获取市场正在出售的各等级的所有HN卡牌数量数组res: ', res);
      })
    }
  },
  mounted(){
    this.getSDKInfo()
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
  .title1_txt {
    color: #ffffff;
  }
  .content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 90px;
    .leftboxs{
      display: flex;
      align-items: center;
      justify-content: center;
      .left_content{
        position: relative;
        width: 222px;
        height: 44px;
        background: #031224;
        box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18), -2px 1px 8px 0px rgba(194, 190, 190, 0.52) inset;
        border-radius: 9px;
        padding: 0 19px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .span1{
          color: #FFFFFF;
          margin-right: 10px;
        }
        .span2{
          border-width: 7px;
          border-color: #00E7F0;
          border-bottom-width: 0;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
        }
        .left_content_hover{
          position: absolute;
          top: -3px;
          left: 0;
          z-index: 9;
          width: 222px;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.9);
          box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
          filter: blur(0px);
          border-radius: 4px;
          padding: 10px 19px;
          margin-top:47px;
          line-height: 39px;
          .span1{
            color: #E2DADA;
            cursor: pointer;
          }
        }
      }
      .left_content_price{
        margin-left: 71px;
      }
      .left_content:hover{
        .left_content_hover{
          display: flex;
          .span1:hover{
            color: #00E7F0;
          }
        }
      }
    }
    .right_content{
      display: flex;
      align-items: center;
      cursor: pointer;
      .synthesis_btn {
        width: 144px;
        height: 49px;
        line-height: 49px;
        background-image: url(//cdn.hashland.com/images/nft_btn1.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
      }
      .record_img{
        width: 55px;
        object-fit: contain;
      }
    }
  }
  .show_gameArr{
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    min-height: 550px;
    overflow-y: auto;
    max-height: 800px;
    .onebox{
      width: 228px;
      display: flex;
      flex-direction: column;
      margin-right: 60px;
      margin-bottom: 57px;
      .img{
        width: 228px;
        object-fit: contain;
      }
      .bottom_box{
        width: 100%;
        margin-top: 20px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
        padding: 4px 8px;
        .left_price{
          display: flex;
          align-items: center;
          .bsc_img{
            width: 24px;
            object-fit: contain;
          }
          .span1{
            color: #ffffff;
          }
        }
        .btn{
          width: 65px;
          height: 22px;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          background:#DD9005;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
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
