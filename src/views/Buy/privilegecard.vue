<template>
  <div class="composite_card">
    <div class="left_box">
      <div class="top_box">
        <span class="luckey_span2 fontsize22">{{$t("message.nftCard.txt5")}}</span>
        <span class="luckey_span2 fontsize12">{{$t("message.nftCard.txt6")}}</span>
      </div>
      <div class="btn">
        <span class="span1 fontsize16_400">{{$t("message.nftCard.txt7")}}.</span>
        <span class="span2 fontsize16_400">{{cardNumber}}</span>
      </div>
      <span class="composite_span1 fontsize12">{{$t("message.nftCard.txt8")}}</span>
      <span class="composite_span2 fontsize16">{{boxPrice}} BUSD</span>
      <span class="composite_line_color"></span>
      <span class="composite_span1 amount_class fontsize12">{{$t("message.nftCard.txt9")}}</span>
      <div class="inputbox">
        <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" oninput="value=value.replace(/[^\d]/g, '')" />
      </div>
      <span class="composite_line_color"></span>
      <div class="last">
        <span class="span1 fontsize12">{{$t("message.nftCard.txt12")}}  {{surplusNums}}</span>
        <span class="span2 fontsize12">{{$t("message.nftCard.txt11")}}: {{total}} BUSD</span>
      </div>
    </div>
    <div class="center_box">
      <img :src="`${$store.state.imgUrl}buyboxprivilege.png`" class="bgimg" />
      <div class="onebox">
        <img :src="`${$store.state.imgUrl}specialCard.png`" class="cardimg" />
      </div>
    </div>
    <div class="connect_box" v-if="getIstrue">{{$t("message.nftCard.txt13")}}<BtnLoading :isloading="buy_isloading"></BtnLoading></div>
    <div class="connect_box" v-else>Connect</div>
    <div class="right_box">
      <div class="btn">{{$t("message.nftCard.txt14")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt25")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt26")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt28")}}</div>
      <div class="right_span1 fontsize12_400"><span class="radious"></span>{{$t("message.nftCard.txt29")}}</div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      buy_isloading:false,// 按钮loading
      surplusNums:0, //盲盒剩余数量
      boxnums:'',//购买数量
      boxPrice:0,//盲盒价格
      balance:0,//用户余额
      total:0,// 合计
      cardNumber:'0000000000',//卡牌的编号
      originalPrice:0,// 合约返回的原始盲盒价格数据 可以直接用的传给合约
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  methods: {
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    }
  }
}
</script>

<style lang='scss' scoped>
.composite_card {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  .left_box {
    position: absolute;
    left: 70px;
    top: 60px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    .top_box {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .luckey_span2 {
        color: #ffffff;
        line-height: 40px;
      }
    }
    .btn {
      width: 171px;
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 25px;
      background: linear-gradient(90deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
      // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 0px 3px 6px -2px rgba(2, 12, 23, 0.69);
      color: #ffffff;
      padding-left: 14px;
    }
    .composite_span1 {
      color: #ffffff;
      margin-top: 28px;
    }
    .amount_class{
      margin-top: 44px;
    }
    .composite_span2 {
      color: #29cdda;
      line-height: 40px;
      margin-top: 20px;
    }
    .composite_line_color{
      width: 100%;
      height: 1px;
      border: 1px solid;
      border-image: linear-gradient(22deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
      margin-top: 5px;
    }
    .inputbox {
      width: 100%;
      margin: 11px 0;
      .input {
        width: 100%;
        padding-right: 5px;
        height: 28px;
        border: none;
        outline: none;

        font-style: normal;
        color: #ffffff;
        background: transparent;
      }
    }
    .last {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #9291A1;
      margin-top: 35px;
    }
  }
  .right_box{
    position: absolute;
    right: 70px;
    top: 185px;
    z-index: 1;
    min-width: 200px;
    .right_span1 {
      width: 280px;
      color: #9291A1;
      margin-top: 20px;
      .radious{
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #FDB234;
        display: inline-block;
        margin-right: 8px;
      }
    }
    .btn {
      width: 204px;
      height: 40px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 25px;
      background: linear-gradient(90deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
      // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), 0px 3px 6px -2px rgba(2, 12, 23, 0.69);
      color: #ffffff;
      padding-left: 14px;
    }
  }
  .center_box{
    position: relative;
    width: 100%;
    min-height: 1000px;
    margin-top: 177px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bgimg{
      width: 100%;
      object-fit: contain;
    }
    .onebox{
      position: absolute;
      top: 24%;
      left: 51%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .cardimg{
        width: 355px;
        object-fit: contain;
      }
    }
  }
  .connect_box {
    position: absolute;
    bottom: 29%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 274px;
    height: 59px;
    text-align: center;
    line-height: 47px;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    color: #ffffff;
    cursor: pointer;
  }
}
input::-webkit-input-placeholder {
  color: #909292;
  font-size: 16px;
  font-weight: 400;
  font-family: 'Poppins-Regular';
}
@media screen and (max-width: 980px){
  .composite_card{
    .left_box{
      display: none;
    }
    .center_box{
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top:0;
      .bgimg{
        width: 100%;
        object-fit: contain;
      }
      .onebox{
        position: absolute;
        top: 39%;
        left: 48%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .cardimg{
          width: 1.64rem;
          object-fit: contain;
        }
      }
      .remaining{
        position: absolute;
        top:85%;
        left:63%;
        transform:translate(-50%,-50%);
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 0.12rem;


        color: #FFFFFF;
        .span1{
          padding: 0.02rem;
          background: #29CDDA;
          border-radius: 5px;
          line-height: 0.25rem;
          box-shadow: 0 9px 2px #23447C;
        }
        .span2{
          padding: 0.02rem 0.15rem;
          background: #23447C;
          border-radius: 5px;
          line-height: 20px;
          margin-top: 10px;
        }
      }
    }
    .mobile_top{
      display: flex;
      width: 100%;
      padding: 0.2rem;
      margin-top: 0.3rem;
      .mobile_top_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        .luckey_span1 {
          font-size: 0.2rem;


          color: #27c7d5;
          line-height: 0.4rem;
        }
        .luckey_span2 {
          font-size: 0.14rem;


          color: #ffffff;
        }
      }
    }
    .mobile_content{
      display: flex;
      width: 100%;
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      .btn {
        display: flex;
        align-items: center;
        margin-bottom: 0.1rem;
        font-size: 0.18rem;


        color: #FFFFFF;
        margin-bottom: 0.2rem;
        .span1{
          padding: 0.02rem;
          background: #29CDDA;
          border-radius: 0.05rem;
          line-height: 0.25rem;
        }
        .span2{
          padding: 0.02rem;
          background: #23447C;
          border-radius: 0.05rem;
          line-height: 0.15rem;
        }
      }
      .composite_span1 {
        font-size: 0.14rem;


        color: #ffffff;
        line-height: 0.2rem;
        padding-left: 0.3rem;
      }
      .composite_span2 {
        font-size: 0.2rem;


        color: #29cdda;
        line-height: 0.28rem;
        margin: 0;
        padding-left: 0.3rem;
      }
      .composite_line_color{
        width: 100%;
        height: 1px;
        border: 1px #ccc dashed;
        margin: 0.06rem 0;
      }
      .inputbox {
        width: 100%;
        margin: 0;
        padding-left: 0.3rem;
        display: flex;
        .input {
          width: 100%;
          padding-right: 0.05rem;
          height: 0.4rem;
          border: none;
          outline: none;

          font-style: normal;

          font-size: 0.2rem;
          color: #ffffff;
          background: transparent;
        }
      }
    }
    .connect_box {
      position: static;
      transform: none;
      width: 1.94rem;
      height: 0.38rem;
      text-align: center;
      line-height: 0.38rem;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: contain;
      background-repeat: no-repeat;
      font-size: 0.18rem;


      color: #ffffff;
      cursor: pointer;
    }
    .right_box{
      position: static;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 0.3rem;
      margin: 0.4rem;
      .right_span1 {
        width: 100%;
        font-size: 0.12rem;


        color: #27c7d5;
        line-height: 0.14rem;
        margin: 0 auto;
        margin-top: 0.1rem;
        .radious{
          width: 0.05rem;
          height: 0.05rem;
          border-radius: 50%;
          background: #FDB234;
          display: inline-block;
          margin-right: 0.05rem;
        }
      }
      .btn {
        width: 2rem;
        font-size: 0.18rem;


        color: #FFFFFF;
        padding: 0.05rem;
        background: #29CDDA;
        border-radius: 0.05rem;
        line-height: 0.25rem;
        text-align: center;
        margin-bottom: 0.1rem;
      }
    }
  }
}
</style>
