<template>
  <div class="composite_card">
    <div class="left_box">
      <div class="top_box">
        <span class="luckey_span1">{{$t("message.nftCard.txt5")}}</span>
        <span class="luckey_span2">{{$t("message.nftCard.txt6")}}</span>
      </div>
      <div class="btn">
        <span class="span1">{{$t("message.nftCard.txt7")}}</span>
        <span class="span2">00001</span>
      </div>
      <span class="composite_span1">{{$t("message.nftCard.txt8")}}</span>
      <span class="composite_span2">{{boxPrice}} BUSD</span>
      <span class="composite_line_color"></span>
      <span class="composite_span1">{{$t("message.nftCard.txt9")}}</span>
      <div class="inputbox">
        <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" @input="inputchangeFun" oninput="value=value.replace(/[^\d]/g, '')" />
      </div>
      <span class="composite_line_color"></span>
      <div class="last">
        {{$t("message.nftCard.txt11")}}: {{total}} BUSD
      </div>
    </div>
    <div class="mobile_top">
      <div class="mobile_top_box">
        <span class="luckey_span1">{{$t("message.nftCard.txt5")}}</span>
        <span class="luckey_span2">{{$t("message.nftCard.txt6")}}</span>
      </div>
    </div>
    <div class="center_box">
      <img :src="`${$store.state.imgUrl}buybg.png`" class="bgimg" />
      <div class="onebox">
        <img :src="`${$store.state.imgUrl}newcard.png`" class="cardimg" />
        <!-- <div class="bottom">
          <div class="five_pointed_star">
            <img :src="`${$store.state.imgUrl}start.png`" v-for="item1 in 1" :key="item1" class="start_img" />
          </div>
          <div class="hc_btc_box">
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
              <span class="span1">0</span>
            </div>
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}btclogobtclogo.png`" class="imgcard" />
              <span class="span1">0</span>
            </div>
          </div>
        </div> -->
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
      <span class="composite_span2">{{boxPrice}} BUSD</span>
      <span class="composite_line_color"></span>
      <span class="composite_span1">{{$t("message.nftCard.txt9")}}</span>
      <div class="inputbox">
        <input type="text" :placeholder='$t("message.placeholder")' v-model="boxnums" class="input" @input="inputchangeFun" oninput="value=value.replace(/[^\d]/g, '')" />
      </div>
      <span class="composite_line_color"></span>
      <span class="composite_span1">{{$t("message.nftCard.txt11")}}: </span>
      <span class="composite_span2">{{total}} BUSD</span>
      <span class="composite_line_color"></span>
    </div>
    <div class="connect_box" v-if="getIstrue" @click="buyBox">{{$t("message.nftCard.txt13")}}<BtnLoading :isloading="buy_isloading"></BtnLoading></div>
    <div class="connect_box" v-else>Connect</div>
    <div class="right_box">
      <div class="btn">{{$t("message.nftCard.txt14")}}</div>
      <div class="right_span1"><span class="radious"></span>{{$t("message.nftCard.txt15")}}</div>
      <div class="right_span1"><span class="radious"></span>{{$t("message.nftCard.txt16")}}</div>
      <div class="right_span1"><span class="radious"></span>{{$t("message.nftCard.txt17")}}</div>
      <div class="right_span1"><span class="radious"></span>{{$t("message.nftCard.txt18")}}</div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnBox,hn,getProvider,util,getSigner,getHnImg,erc20, token } from 'hashland-sdk';
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
          arr.map(async item => {
            let obj = {}
            // obj.round = await hn().getRandomNumber(arr[i],"class", 1, 4) // 卡牌随机数
            obj.level = (await hn().level(item)).toString() // 卡牌等级
            obj.src = await getHnImg(Number(item),Number(obj.level))
            let race = await hn().getHashrates(item)
            obj.hc = race[0].toString()// hc 算力
            obj.btc = race[1].toString()// btc 算力
            imgarr.push(obj)
          })

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
        this.$common.selectLang('请输入购买数量','Enter Purchase Amount',this)
        return
      }
      console.log('this.boxnums: ', this.boxnums,this.surplusNums);
      if(Number(this.boxnums) > Number(this.surplusNums)){
        console.log('可购买数量不足')
        this.$common.selectLang('可购买数量不足','Insufficent quantity left',this)
        return
      }
      if(this.total > this.balance){
        this.$common.selectLang('余额不足','Insufficent Balance',this)
        return
      }
      this.buy_isloading = true
      console.log("购买:",this.boxnums,this.originalPrice.mul(this.boxnums))
      hnBox().connect(getSigner()).buyBoxes(this.boxnums,0,{value: this.originalPrice.mul(this.boxnums)}).then(async res => {
        console.log('购买盒子res: ', res);
        this.buy_isloading = false
        this.watchResult()
        this.$common.selectLang('购买成功','Purchase Successful',this)
        this.boxnums = ''
        this.total = 0
        this.getSDKInfo()
        // const etReceipt = await res.wait();
        // console.log('etReceipt: ', etReceipt);
        // console.log(etReceipt.confirmations, 'Blocks Confirmations');
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
        this.$common.selectLang('最大购买数量100','Maximum Purchase Number is 100',this)
      }else{
        this.proupDis = false
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
      let busd = await erc20(token().BUSD).balanceOf(this.getAccount)
      console.log('busd余额: ', busd);
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
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      font-size: 24px;


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
        color: #27c7d5;
        line-height: 40px;
      }
      .luckey_span2 {
        font-size: 20px;
        color: #ffffff;
        line-height: 40px;
        margin-top: 10px;

      }
    }
    .composite_span1 {
      font-size: 18px;
      color: #ffffff;
      line-height: 40px;
      padding-left: 15px;
    }
    .composite_span2 {
      font-size: 32px;
      color: #29cdda;
      line-height: 40px;
      margin: 10px 0;
      padding-left: 15px;
    }
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

        font-style: normal;

        font-size: 24px;
        color: #ffffff;
        background: transparent;
      }
    }
    .last {
      width: 100%;
      font-size: 18px;


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
      top: 27%;
      left: 52%;
      transform: translate(-50%,-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      .cardimg{
        width: 410px;
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
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.75rem;
      .bgimg{
        width: 100%;
        object-fit: contain;
      }
      .onebox{
        position: absolute;
        top: 11%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .cardimg{
          width: 1.64rem;
          object-fit: contain;
        }
        .bottom{
          position: absolute;
          top: 0.05rem;
          display: flex;
          align-items: center;
          padding:0.1rem 0.08rem;
          transform: scale(0.5);
          .five_pointed_star{
            display: flex;
            align-items: center;
            .start_img{
              width: 0.26rem;
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


                color: #FFFFFF;
              }
            }
          }
        }
      }
      .remaining{
        position: absolute;
        top:70%;
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
        ;

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
