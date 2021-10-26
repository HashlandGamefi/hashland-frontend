<template>
  <div class="composite_card">
    <div class="left_box">
      <div class="top_box">
        <span class="luckey_span1">幸运抽奖</span>
        <span class="luckey_span2">随机获取基础卡牌</span>
      </div>
      <div class="btn">
        <span class="span1">编号</span>
        <span class="span2">00001</span>
      </div>
      <span class="composite_span1">价格</span>
      <span class="composite_span2">{{boxPrice}} BNB</span>
      <span class="composite_line_color"></span>
      <span class="composite_span1">数量</span>
      <div class="inputbox">
        <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" oninput="value=value.replace(/[^\d]/g, '')" />
      </div>
      <span class="composite_line_color"></span>
      <div class="last">
        总计：{{total}} BNB
      </div>
    </div>
    <div class="right_box">
      <div class="btn">购买说明</div>
      <div class="right_span1"><span class="radious"></span>购买后等待倒计时结束统一开奖，可随机获取不同星级卡牌及卡槽，开奖后获得的卡牌在“NFT挖矿“钱包中查看</div>
      <div class="right_span1"><span class="radious"></span>插入卡槽后可获的挖矿奖励（BTC+平台币），算力越高，奖励越多</div>
    </div>
    <div class="center_box">
      <img src="../../assets/images/privilegebg.png" class="bgimg" />
      <div class="onebox">
        <img src="../../assets/images/newcard.png" class="cardimg" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img src="../../assets/images/start.png" v-for="item1 in 1" :key="item1" class="start_img" />
          </div>
          <div class="hc_btc_box">
            <div class="hc_coefficient">
              <img src="../../assets/images/hclogo.png" class="imgcard" />
              <span class="span1">0</span>
            </div>
            <div class="hc_coefficient">
              <img src="../../assets/images/btclogo.png" class="imgcard" />
              <span class="span1">0</span>
            </div>
          </div>
        </div>
      </div>
      <div class="remaining">
        <span class="span1">剩余数量</span>
        <span class="span2">{{surplusNums}}</span>
      </div>
    </div>
    <div class="connect_box">连接钱包</div>
    <div class="connect_box" v-if="getIstrue">购买<BtnLoading :isloading="buy_isloading"></BtnLoading></div>
    <div class="connect_box" v-else>连接钱包</div>
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
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      .span1{
        padding: 5px;
        background: #29CDDA;
        border-radius: 5px;
        line-height: 42px;
      }
      .span2{
        padding: 5px;
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
      font-size: 32px;
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
      top: 38%;
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
      .bottom{
        position: absolute;
        top: 75px;
        display: flex;
        align-items: center;
        padding:10px 8px;
        transform: scale(0.7);
        .five_pointed_star{
          display: flex;
          align-items: center;
          .start_img{
            width: 26px;
            object-fit: contain;
          }
        }
        .hc_btc_box{
          display: flex;
          align-items: center;
          .hc_coefficient{
            display: flex;
            align-items: center;
            border-radius: 4px;
            margin-right: 5px;
            background: rgba(5, 24, 44, 0.88);
            box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.22);
            border-radius: 11px;
            opacity: 0.56;
            .imgcard{
              width: 43px;
              object-fit: contain;
            }
            .span1{
              font-size: 26px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
            }
          }
        }
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
    bottom: 0;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 533px;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background-image: url("../../assets/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
  }
}
input::-webkit-input-placeholder {
  font-weight: 600;
  color: #909292;
  line-height: 40px;
  font-size: 18px;
}
@media screen and (min-width: 1440px) {
  .composite_card{
    max-width: 1440px;
  }
}
</style>
