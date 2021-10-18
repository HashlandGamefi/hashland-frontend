<template>
  <div class="composite_card">
    <div class="left_box">
      <div class="top_box">
        <span class="luckey_span1">幸运抽奖</span>
        <span class="luckey_span2">随机获取高星级卡牌及卡槽</span>
      </div>
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
    <div class="right_box">
      <div class="btn">购买说明</div>
      <div class="right_span1">卡购买后等待倒计时结束统一开奖，可随机获取不同星级卡牌及卡槽，开奖后获得的卡牌在“NFT挖矿“钱包中查看</div>
      <div class="right_span1">插入卡槽后可获的挖矿奖励(BTC+平台币),算力越高，奖励越多</div>
    </div>
    <div class="center_box">
      <img src="../../assets/images/blindcard.png" class="bgimg" />
      <!-- <img src="../../assets/images/card.png" class="cardimg" /> -->
      <span class="remaining">剩余数量: {{surplusNums}}</span>
    </div>
    <div class="connect_box">连接钱包</div>
    <div class="connect_box" v-if="getIstrue" @click="buyBox">购买<BtnLoading :isloading="buy_isloading"></BtnLoading></div>
    <div class="connect_box" v-else>连接钱包</div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnBox,contract,getSigner,constant,hn,getProvider,util } from 'hashland-sdk';
// const one = constant.WeiPerEther // 先定一个one  然后one.mul(12)   ----12*1e18
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
    },
    // 监听盲盒开奖结果
    watchResult(){
      hnBox().on("SpawnHns", async (user, boxslengths, boxarrID, event) => {
        let str = boxarrID.toString()
        let arr = str.split(',')
        if(user.toLocaleLowerCase() == this.getAccount.toLocaleLowerCase()){
          let imgarr = []
          for(let i = 0;i < arr.length;i++){
            let obj = {}
            let round = await hn().getRandomNumber(arr[i],"race", 1, 3) // 卡牌随机数
            obj.level = (await hn().level(arr[i])).toString() // 卡牌等级
            obj.src = require('../../assets/images/record193.png')
            obj.hc = (await hn().hashrates(arr[i], 0)).toString()
            obj.btc = (await hn().hashrates(arr[i], 1)).toString()
            imgarr.push(obj)
          }
          console.log('imgarr: ', imgarr);
          let lastObj = {
            minserDis:true,
            boxarr:imgarr
          }
          this.$store.commit("setrewardsInfo", lastObj);
        }
        // console.log('user:', user);
        // console.log('boxslengths:', boxslengths.toString());
        // console.log('boxarr:', boxarrID.toString());
        // console.log('event:',event.args.hnIds);
      });
    },
    // 购买盒子
    async buyBox(){
      if(this.buy_isloading)return
      if(!this.boxnums){
        this.BeSureFun('请输入购买数量','1223')
        return
      }
      if(this.boxnums > this.surplusNums){
        this.BeSureFun('可购买数量不足','1223')
        return
      }
      if(this.total > this.balance){
        this.BeSureFun('余额不足','1223')
        return
      }
      this.buy_isloading = true

      // 后续要换
      getSigner().sendTransaction({
        to: contract().HNBox,
        value: this.originalPrice.mul(this.boxnums)
      }).then(res => {
        console.log('购买盒子res: ', res);
        this.buy_isloading = false
        this.watchResult()
        this.BeSureFun('购买成功','1223')
        this.boxnums = ''
      }).catch(err => {
        console.log('购买盒子err: ', err);
        this.buy_isloading = false
      })
    },
    inputchangeFun () {
      console.log("输入框改变事件")
      if(this.boxnums == ''){
        this.total = 0
      }else if(this.boxnums > 100){
        this.boxnums = 100
        this.total = 100 * this.boxPrice
        this.BeSureFun('最大购买数量100','1223')
      }else{
        this.total = this.$common.useBignumberMultipliedBy(this.boxPrice,this.boxnums)
      }
    },
    // 刷新
    // refesh(){
    //   console.log("刷新卡牌")
    // },
    async getSDKInfo(){
      let balance = await getProvider().getBalance(this.getAccount)
      console.log('用户余额balance: ', util.formatEther(balance));
      this.balance = util.formatEther(balance)
      let price = await hnBox().boxTokenPrices(0) // 盲盒价格
      this.originalPrice = price
      let str = (price / 1e18).toString()
      this.$common.checkNumber(str,res => {
        this.boxPrice = res
      })

      let surplusNums = await hnBox().getBoxesLeftSupply() // 获取盲盒剩余可销售数量
      this.surplusNums = surplusNums.toString()
    },
    BeSureFun(chinse,english){
      if (this.$i18n.locale == 'cn') {
        this.word = chinse //'提取成功'
        this.btntxt = '确认'
      } else {
        this.word = english //'Claim success'
        this.btntxt = 'Confirm'
      }
      this.proupDis = true
    },
  },
  mounted () {
    this.getSDKInfo()
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
    z-index: 1;
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
    position: relative;
    width: 100%;
    // margin-top: 240px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .bgimg{
      width: 100%;
      object-fit: contain;
    }
    .cardimg{
      position: absolute;
      top: 20%;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 600px;
    }
    .remaining{
      position: absolute;
      top:53%;
      left:63%;
      transform:translate(-50%,-50%);
      font-size: 26px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 40px;
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
