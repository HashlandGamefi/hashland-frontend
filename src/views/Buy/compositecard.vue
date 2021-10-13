<template>
  <div class="composite_card">
    <div class="outbox">
      <div class="left_box">
        <div class="btn">编号00001</div>
        <span class="composite_span1">价格</span>
        <span class="composite_span2">{{boxPrice}} BNB</span>
        <span class="composite_line"></span>
        <span class="composite_span1">数量</span>
        <div class="inputbox">
          <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" @input="inputchangeFun" oninput="value=value.replace(/[^\d]/g, '')" />
        </div>
        <span class="composite_line"></span>
        <div class="last">
          <span class="span_last">总计：{{total}} BNB</span>
        </div>
      </div>
      <div class="center_box">
        <img src="../../assets/images/refesh.png" class="refeshimg" @click="refesh" />
        <span class="remaining">剩余数量: {{surplusNums}}</span>
      </div>
      <div class="left_box">
        <div class="btn">购买说明</div>
        <span class="right_span1">卡牌是锚定XXXW/T矿机的算力凭证，持1分卡牌就相当于持有1T算力</span>
        <span class="right_span1">购买后获得1星合成卡牌，可通过合成提升星级，星级越高，算力越高</span>
        <span class="right_span1">插入卡槽后可获得挖矿奖励（BTC+平台币），算力越高，奖励越多</span>
      </div>
    </div>
    <div class="btn_box" v-if="getIstrue" @click="buyBox">购买</div>
    <div class="btn_box" v-else>连接钱包</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnBox,contract,getSigner,constant } from 'hashland-sdk';
export default {
  data () {
    return {
      surplusNums:0, //盲盒剩余数量
      boxnums:'',//购买数量
      boxPrice:0,//盲盒价格
      total:0,// 合计
      originalPrice:0,// 合约返回的原始盲盒价格数据 可以直接用的传给合约
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  methods: {
    // 购买盒子
    async buyBox(){
      console.log("购买盒子:",this.getAccount,contract().HNBox,this.total)
      // const one = constant.WeiPerEther // 先定一个one  然后one.mul(12)   ----12*1e18
      await getSigner().sendTransaction({
        to: contract().HNBox,
        value: this.originalPrice.mul(this.boxnums)
      }).then(res => {
        console.log('购买盒子res: ', res);
      }).catch(err => {
        console.log('购买盒子err: ', err);

      })
    },
    inputchangeFun () {
      console.log("输入框改变事件")
      if(this.boxnums == ''){
        this.total = 0
      }else{
        this.total = this.$common.useBignumberMultipliedBy(this.boxPrice,this.boxnums)
      }
    },
    // 刷新
    refesh(){
      console.log("刷新卡牌")
    },
    async getSDKInfo(){
      let price = await hnBox().boxTokenPrices(0) // 盲盒价格
      this.originalPrice = price
      let str = (price / 1e18).toString()
      this.$common.checkNumber(str,res => {
        this.boxPrice = res
      })

      let surplusNums = await hnBox().getBoxesLeftSupply() // 获取盲盒剩余可销售数量
      this.surplusNums = surplusNums.toString()
    }
  },
  mounted () {
    this.getSDKInfo()
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
        cursor: pointer;
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
    cursor: pointer;
  }
}
input::-webkit-input-placeholder {
  font-weight: 600;
  color: #909292;
  line-height: 40px;
  font-size:22px;
}
</style>
