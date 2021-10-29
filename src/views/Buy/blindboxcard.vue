<template>
  <div class="composite_card">
    <div class="left_box">
      <div class="top_box">
        <span class="luckey_span1">{{$t("message.nftCard.txt5")}}</span>
        <span class="luckey_span2">{{$t("message.nftCard.txt19")}}</span>
      </div>
      <div class="btn">
        <span class="span1">{{$t("message.nftCard.txt7")}}</span>
        <span class="span2">00001</span>
      </div>
      <span class="composite_span1">{{$t("message.nftCard.txt8")}}</span>
      <span class="composite_span2">{{boxPrice}} BNB</span>
      <span class="composite_line_color"></span>
      <span class="composite_span1">{{$t("message.nftCard.txt9")}}</span>
      <div class="inputbox">
        <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" oninput="value=value.replace(/[^\d]/g, '')" />
      </div>
      <span class="composite_line_color"></span>
      <div class="last">
        {{$t("message.nftCard.txt11")}}: {{total}} BNB
      </div>
    </div>
    <div class="mobile_top">
      <div class="mobile_top_box">
        <span class="luckey_span1">{{$t("message.nftCard.txt5")}}</span>
        <span class="luckey_span2">{{$t("message.nftCard.txt19")}}</span>
      </div>
    </div>
    <div class="center_box">
      <img :src="`${$store.state.imgUrl}blindcard.png`" class="bgimg" />
      <div class="onebox">
        <img :src="`${$store.state.imgUrl}box.png`" class="cardimg" />
      </div>
      <div class="remaining">
        <span class="span1">{{$t("message.nftCard.txt12")}}</span>
        <span class="span2">{{surplusNums}}</span>
      </div>
    </div>
    <div class="mobile_content">
      <div class="btn">
        <span class="span1">{{$t("message.nftCard.txt7")}}</span>
        <span class="span2">00001</span>
      </div>
      <span class="composite_span1">{{$t("message.nftCard.txt8")}}</span>
      <span class="composite_span2">{{boxPrice}} BNB</span>
      <span class="composite_line_color"></span>
      <span class="composite_span1">{{$t("message.nftCard.txt9")}}</span>
      <div class="inputbox">
        <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" oninput="value=value.replace(/[^\d]/g, '')" />
      </div>
      <span class="composite_line_color"></span>
      <span class="composite_span1">{{$t("message.nftCard.txt11")}}: </span>
      <span class="composite_span2">{{total}} BNB</span>
      <span class="composite_line_color"></span>
    </div>
    <div class="connect_box" v-if="getIstrue">{{$t("message.nftCard.txt13")}}<BtnLoading :isloading="buy_isloading"></BtnLoading></div>
    <div class="connect_box" v-else>Connect</div>
    <div class="right_box">
      <div class="btn">{{$t("message.nftCard.txt14")}}</div>
      <div class="right_span1"><span class="radious"></span>{{$t("message.nftCard.txt20")}}</div>
      <div class="right_span1"><span class="radious"></span>{{$t("message.nftCard.txt21")}}</div>
      <div class="right_span1"><span class="radious"></span>{{$t("message.nftCard.txt22")}}</div>
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
    .btn {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      .span1{
        padding: 9px;
        background: #29CDDA;
        border-radius: 5px;
        line-height: 42px;
      }
      .span2{
        padding: 9px;
        background: #23447C;
        border-radius: 5px;
        line-height: 20px;
      }
    }
    .top_box {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 50px;
      .luckey_span1 {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #27c7d5;
        line-height: 40px;
      }
      .luckey_span2 {
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
        margin-top: 10px;
        letter-spacing: 4px;
      }
    }
    .composite_span1 {
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
      padding-left: 15px;
    }
    .composite_span2 {
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #29cdda;
      line-height: 40px;
      margin: 10px 0;
      padding-left: 15px;
    }
    // .composite_line {
    //   width: 100%;
    //   height: 1px;
    //   border: 1px dashed #ccc;
    //   margin: 10px 0;
    // }
    .composite_line_color{
      width: 100%;
      height: 1px;
      border: 1px solid;
      border-image: linear-gradient(22deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
      margin: 10px 0;
    }
    .inputbox {
      width: 100%;
      margin: 20px 0;
      padding-left: 15px;
      .input {
        width: 100%;
        padding-right: 5px;
        height: 28px;
        border: none;
        outline: none;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-style: normal;
        font-weight: bold;
        font-size: 24px;
        color: #ffffff;
        background: transparent;
      }
    }
    .last {
      width: 100%;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
      padding-left: 15px;
    }
  }
  .right_box{
    position: absolute;
    right: 70px;
    top: 210px;
    z-index: 1;
    min-width: 200px;
    .right_span1 {
      width: 280px;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #27c7d5;
      line-height: 28px;
      margin: 0 auto;
      margin-top: 30px;
      .radious{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #FDB234;
        display: inline-block;
        margin-right: 8px;
      }
    }
    .btn {
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      padding: 5px;
      background: #29CDDA;
      border-radius: 5px;
      line-height: 56px;
      text-align: center;
    }
  }
  .center_box{
    position: relative;
    width: 100%;
    min-height: 1000px;
    margin-top: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bgimg{
      width: 100%;
      object-fit: contain;
    }
    .onebox{
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translate(-50%,-50%);
      // width: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .cardimg{
        width: 497px;
        object-fit: contain;
      }
    }
    .remaining{
      position: absolute;
      top:64%;
      left:63%;
      transform:translate(-50%,-50%);
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 26px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      .span1{
        padding: 5px;
        background: #29CDDA;
        border-radius: 5px;
        line-height: 37px;
        box-shadow: 0 9px 2px #23447C;
      }
      .span2{
        padding: 5px 15px;
        background: #23447C;
        border-radius: 5px;
        line-height: 20px;
        margin-top: 10px;
      }
    }
  }
  .connect_box {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 533px;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
  }
  .mobile_top{
    display: none;
  }
  .mobile_content{
    display: none;
  }
}
input::-webkit-input-placeholder {
  font-weight: 600;
  color: #909292;
  line-height: 40px;
  font-size: 18px;
}
@media screen and (max-width: 980px){
  .composite_card{
    .left_box{
      display: none;
    }
    .center_box{
      position: relative;
      width: 100%;
      margin-top: 0.25rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .bgimg{
        width: 100%;
        object-fit: contain;
      }
      .onebox{
        position: absolute;
        top: 33%;
        left: 46%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .cardimg{
          width: 2rem;
          object-fit: contain;
        }
      }
      .remaining{
        position: absolute;
        top:86%;
        left:66%;
        transform:translate(-50%,-50%);
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        font-size: 0.12rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
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
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #27c7d5;
          line-height: 0.4rem;
        }
        .luckey_span2 {
          font-size: 0.14rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
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
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
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
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.2rem;
        padding-left: 0.3rem;
      }
      .composite_span2 {
        font-size: 0.2rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
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
          font-family: PingFangSC-Semibold, PingFang SC;
          font-style: normal;
          font-weight: bold;
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
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
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
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
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
        width:2rem;
        font-size: 0.18rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
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
