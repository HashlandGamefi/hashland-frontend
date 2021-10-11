<template>
  <div class="composite_card">
    <div class="outbox">
      <div class="left_box">
        <div class="btn">编号00001</div>
        <span class="composite_span1">价格</span>
        <span class="composite_span2">0.25 BNB</span>
        <span class="composite_line"></span>
        <span class="composite_span1">数量</span>
        <div class="inputbox">
          <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" @input="inputchangeFun" oninput="value=value.replace(/[^\d]/g, '')" />
        </div>
        <span class="composite_line"></span>
        <div class="last">
          <span class="span_last">总计：0.025 BNB</span>
        </div>
      </div>
      <div class="center_box">
        <img src="../../assets/images/refesh.png" class="refeshimg" />
        <span class="remaining">剩余数量: 100</span>
      </div>
      <div class="left_box">
        <div class="btn">购买说明</div>
        <span class="right_span1">卡牌是锚定XXXW/T矿机的算力凭证，持1分卡牌就相当于持有1T算力</span>
        <span class="right_span1">购买后获得1星合成卡牌，可通过合成提升星级，星级越高，算力越高</span>
        <span class="right_span1">插入卡槽后可获得挖矿奖励（BTC+平台币），算力越高，奖励越多</span>
      </div>
    </div>
    <div class="btn_box">
      连接钱包
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      boxnums:'',//购买数量
    }
  },
  methods: {
    inputchangeFun () {
      console.log("输入框改变事件")
    },
  },
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style lang='scss' scoped>
.composite_card{
  width: 100%;
  min-height: 875px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-image: url("../../assets/images/card1.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .outbox{
    width: 100%;
    display: flex;
    margin-top: 90px;
    padding: 0 60px;
    .left_box{
      display: flex;
      flex-direction: column;
      .btn{
        width: 308px;
        height: 87px;
        background-image: url("../../assets/images/SpeciaBtn1.png");
        background-size:contain;
        background-repeat: no-repeat;
        text-align: center;
        line-height: 87px;
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        margin-bottom: 10px;
      }
      .composite_span1{
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
      }
      .composite_span2{
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #29CDDA;
        line-height: 40px;
        margin: 20px 0;
      }
      .composite_line{
        width: 100%;
        border: 1px dashed #ccc;
        margin: 10px 0;
      }
      .inputbox{
        width: 100%;
        margin: 20px 0;
        .input{
          width: 100%;
          padding-right:5px;
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
      .last{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .span_last{
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 40px;
        }
      }
      .right_span1{
        width: 280px;
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #27C7D5;
        line-height: 28px;
        margin: 0 auto;
        margin-top: 30px;
      }
    }
    .center_box{
      position: relative;
      width:calc(100% - 616px);
      .refeshimg{
        position: absolute;
        right: 127px;
        top: 88px;
        width: 40px;
        object-fit: contain;
      }
      .remaining{
        position: absolute;
        bottom:-167px;
        right: 64px;
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 40px;
      }
    }
  }
  .btn_box{
    width: 533px;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background-image: url("../../assets/images/SpeciaBtn2.png");
    background-size:contain;
    background-repeat: no-repeat;
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
  }
}
input::-webkit-input-placeholder {
  font-weight: 600;
  color: #909292;
  line-height: 40px;
  font-size:22px;
}
</style>
