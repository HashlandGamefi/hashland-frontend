<template>
  <div class="composite_card">
    <div class="left_box">
      <div class="top_box">
        <span class="luckey_span1">幸运抽奖</span>
        <span class="luckey_span2">随机获取高星级卡牌及卡槽</span>
      </div>
      <div class="left_btnbox">
        <div class="btnbox">编号00001</div>
        <div class="record" @click="recordClick">
          <span class="record_span1">记录</span>
          <span class="record_span2">点击查看详情</span>
        </div>
      </div>
      <span class="composite_span1">价格</span>
      <span class="composite_span2">0.25 BNB</span>
      <span class="composite_line"></span>
      <span class="composite_span1">数量</span>
      <div class="inputbox">
        <input
          type="text"
          :placeholder="$t('message.placeholder')"
          v-model="boxnums"
          class="input"
          @input="inputchangeFun"
          oninput="value=value.replace(/[^\d]/g, '')"
        />
      </div>
      <span class="composite_line"></span>
      <div class="last">
        <span class="span_last">总计：0.025 BNB</span>
      </div>
    </div>
    <div class="right_box">
      <div class="btn">购买说明</div>
      <div class="right_span1">卡购买后等待倒计时结束统一开奖，可随机获取不同星级卡牌及卡槽，开奖后获得的卡牌在“NFT挖矿“钱包中查看</div>
      <div class="right_span1">插入卡槽后可获的挖矿奖励(BTC+平台币),算力越高，奖励越多</div>
    </div>
    <div class="center_box"></div>
    <div class="connect_box">连接钱包</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      boxnums: '',//购买数量
    }
  },
  methods: {
    inputchangeFun () {
      console.log("输入框改变事件")
    },
    recordClick(){
      this.$router.push('/record')
    }
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
.composite_card {
  position: relative;
  width: 100%;
  min-height: 875px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // background-image: url("../../assets/images/card1.png");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // background: rgb(170, 175, 169);
  .left_box {
    position: absolute;
    left: 70px;
    top: 60px;
    display: flex;
    flex-direction: column;
    .top_box {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 50px;
      .luckey_span1 {
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #27c7d5;
        line-height: 40px;
      }
      .luckey_span2 {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
        margin-top: 30px;
      }
    }
    .left_btnbox {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .btnbox {
        width: 308px;
        height: 87px;
        background-image: url("../../assets/images/SpeciaBtn1.png");
        background-size: contain;
        background-repeat: no-repeat;
        text-align: center;
        line-height: 87px;
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
      }
      .record {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10px;
        cursor: pointer;
        .record_span1 {
          font-size: 40px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 56px;
        }
        .record_span2 {
          background: #00e7f0;
          border-radius: 25px;
          text-align: center;
          padding: 0 15px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 20px;
        }
      }
    }
    .composite_span1 {
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 40px;
    }
    .composite_span2 {
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #29cdda;
      line-height: 40px;
      margin: 20px 0;
    }
    .composite_line {
      width: 100%;
      height: 1px;
      border: 1px solid;
      border-image: linear-gradient(22deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
      margin: 10px 0;
    }
    .inputbox {
      width: 100%;
      margin: 20px 0;
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
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .span_last {
        font-size: 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
      }
    }
  }
  .right_box{
    position: absolute;
    right: 70px;
    top: 210px;
    width: 310px;
    .right_span1 {
      width: 250px;
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #27c7d5;
      line-height: 28px;
      margin: 0 auto;
      margin-top: 30px;
    }
    .btn {
      width: 308px;
      height: 87px;
      background-image: url("../../assets/images/SpeciaBtn1.png");
      background-size: contain;
      background-repeat: no-repeat;
      text-align: center;
      line-height: 87px;
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 10px;
    }
  }
  .center_box{
    width: 400px;
    height: 300px;
    background: red;
    margin-top: 220px;
  }
  .connect_box {
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
  font-size: 22px;
}
</style>
