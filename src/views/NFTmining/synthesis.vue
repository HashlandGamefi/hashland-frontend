<template>
  <div class="insertcard_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}back.png`" class="backimg" />
    </div>
    <div class="title_title font_title">{{$t("message.synthesis.txt1")}}</div>
    <div class="title_son1">{{$t("message.synthesis.txt2")}}</div>
    <div class="title_son1">{{$t("message.synthesis.txt3")}}</div>
    <div class="content">
      <div class="left_content">
        <span class="span1">{{rank}}{{$t("message.synthesis.txt4")}} ({{$t("message.synthesis.txt8")}} {{amount}})</span>
        <div class="span2"></div>
        <div class="left_content_hover">
          <span class="span1" @click="selectRankClik(ele)" v-for="ele in 5" :key="ele">{{ele}}{{$t("message.synthesis.txt4")}} ({{$t("message.synthesis.txt8")}} {{cardarr.filter(data => {return data.level == ele}).length}})</span>
        </div>
      </div>
      <div class="right_content" @click="selectAllClick">
        <img :src="`${$store.state.imgUrl}selected.png`" class="selectimg" v-if="selectALLBtn || selectedArr.length >= selectedCardnum " />
        <img :src="`${$store.state.imgUrl}select.png`" class="selectimg" v-else />
        <span class="select_ttx">{{$t("message.synthesis.txt5")}}</span>
      </div>
    </div>
    <div class="bottom_txtbox" v-if="rank < 5">
      <div class="bottom_txt1">
        <span class="span1">{{$t("message.synthesis.txt6")}}</span>
        <span class="span2"> {{selectedNUM}}</span>
      </div>
      <div class="bottom_txt2" v-if="selectimgArr.length != 0">
        {{$t("message.synthesis.txt7")}}{{rank}}{{$t("message.synthesis.txt10")}}{{compose}} {{rank + 1 }}{{$t("message.synthesis.txt11")}}15%
      </div>
    </div>
    <!-- 选中以后的卡牌数组 -->
    <div class="cardarr_class cardarr_class_selected">
      <div class="onebox selected_onebox" v-for="(item,index) in selectedArr" :key="index" @click="selectedCardClick(item,index)">
        <img :src="item.src" class="card_picture" :class="{scaleimg:index % 4 == 0}" />
        <div class="bottom selected_bottom" :class="{scalebottom:index % 4 !== 0}">
          <div class="five_pointed_star">
            <img :src="`${$store.state.imgUrl}start.png`" v-for="item1 in rank" :key="item1" class="start_img" />
          </div>
          <div class="hc_btc_box">
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
              <span class="span1">{{item.hc}}</span>
            </div>
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}btclogo.png`" class="imgcard" />
              <span class="span1">{{item.btc}}</span>
            </div>
          </div>
        </div>
        <img :src="`${$store.state.imgUrl}selected.png`" class="selected_img" />
        <img :src="`${$store.state.imgUrl}zhu.png`" class="master_img" v-if="index % 4 == 0" />
      </div>
    </div>
    <!-- 页面展示数组 -->
    <div class="cardarr_class">
      <div class="onebox" v-for="(item,index) in pageshowarr" :key="index" @click="cardClick(item,index)">
        <img :src="item.src" class="card_picture" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img :src="`${$store.state.imgUrl}start.png`" v-for="item1 in rank" :key="item1" class="start_img" />
          </div>
          <div class="hc_btc_box">
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
              <span class="span1">{{item.hc}}</span>
            </div>
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}btclogo.png`" class="imgcard" />
              <span class="span1">{{item.btc}}</span>
            </div>
          </div>
        </div>
        <img :src="`${$store.state.imgUrl}select.png`" class="select_img" />
        <img :src="`${$store.state.imgUrl}fu.png`" class="orther_img" />
      </div>
      <NoData v-if="pageshowarr.length == 0"></NoData>
    </div>
    <div class="btn_box" @click="synthesisFun" v-if="isApproveHN && isApproveHC && pageshowarr.length > 0">{{$t("message.synthesis.txt1")}}</div>
    <div class="btn_box" @click="authorizationClick" v-if="!isApproveHN && !isApproveHC && pageshowarr.length > 0">{{$t("message.approve")}}</div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSigner, hnUpgrade, util, hc, contract } from 'hashland-sdk';
export default {
  data () {
    return {
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      cardarr:[],//所有卡牌信息的数组
      selectedArr:[],//页面展示的选中的数组
      pageshowarr:[],//页面展示的数组
      rank:1,//1阶
      amount:0,//阶对应的卡牌数量
      selectedNUM:0,//选中的卡牌数量
      compose:0,//合成的卡牌数量
      selectimgArr:[],//选中的卡牌的信息
      isApproveHN:false,// hn授权
      isApproveHC:false,// hc授权
      selectALLBtn:false,//全选按钮的状态
      selectedCardnum:100000000,// 本次全选可以选中的卡牌数量
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount","getUserCardInfo"]),
    dataInfo:function(){
      return this.getUserCardInfo
    }
  },
  watch:{
    "dataInfo":{
      handler: function (newValue, oldValue) {
        if(newValue.length > 0){
          // console.log('合成卡牌页面的用户全部卡牌信息: ', JSON.parse(newValue));
          this.cardarr = JSON.parse(newValue)
          this.pageshowarr = this.cardarr.filter(item => { return item.level == 1})
          this.amount = this.cardarr.filter(item => { return item.level == 1}).length
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    selectAllClick(){
      if(this.selectedArr.length >= this.selectedCardnum){ //选中数组长度等于计算出来的数字时,证明按钮现在是选中状态
        this.selectALLBtn = false
      }else{
        this.selectALLBtn = true
      }
      // this.selectALLBtn = !this.selectALLBtn
      console.log('this.selectALLBtn: ', this.selectALLBtn);
      if(this.selectedArr.length > 0){ // 判断选中卡牌数组书否大于0  大于0的情况下说明已选卡牌,清空重新计算
        this.selectedArr = []
        this.pageshowarr = this.cardarr.filter(item => { return item.level == this.rank})
      }
      this.selectedCardnum = this.pageshowarr.length - this.pageshowarr.length % 4
      console.log('本次全选可以选中的卡牌数量this.selectedCardnum: ', this.selectedCardnum);
      if(this.selectALLBtn){//选中的状态下
        if(this.selectedCardnum == this.pageshowarr.length){
          this.selectedArr = this.pageshowarr
          this.pageshowarr = []
        }else{
          // 可选卡牌不是4的倍数的逻辑
          this.selectedArr = this.pageshowarr.filter((item,index) => {
            return index < this.selectedCardnum
          })
          this.pageshowarr.splice(0,28)
        }
        this.selectedNUM = this.selectedCardnum
        this.compose = this.selectedNUM / 4
      }else{
        this.selectedArr = []
        this.pageshowarr = this.cardarr.filter(item => { return item.level == this.rank})
        this.selectedNUM = 0
        this.compose = 0
      }
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    async synthesisFun(){
      if(this.selectedArr.length < 4){
        this.$common.selectLang('至少选择4张卡牌','You need to select a minimal of 4 cards',this)
        return
      }
      console.log('合成',this.selectedArr)
      let arr = this.selectedArr.map(item => {
        return item.cardID
      })
      console.log('arr: ', arr);
      if(arr.length % 4 !== 0){
        this.$common.selectLang('选择的卡牌必须4的倍数哦','You must select',this)
        return
      }
      // 获取用户的hc余额
      let balance = util.formatEther(await hc().balanceOf(this.getAccount))
      console.log('balance:%s', balance);

      let money = (await hnUpgrade().getUpgradePrice(arr) / 1e18).toString()
      console.log('合成金额money: ', money);
      if(Number(money) <= Number(balance)){
        hnUpgrade().connect(getSigner()).upgrade(arr).then(res => {
          console.log('合成res: ', res);
        }).catch(err => {
          console.log('合成err: ', err);
        })
      }else{
        this.$common.selectLang('余额不足','Insufficent Balance',this)
      }
    },
    // 选中的卡牌的点击事件
    selectedCardClick(data,index){
      this.selectedArr.splice(index,1) // 删除对应图片
      this.selectedNUM--
      this.compose = parseInt(this.selectedNUM / 4)
      this.pageshowarr.push(data)
      this.selectALLBtn = false
    },
    //选择单张卡牌
    cardClick(data,index){ // index---当前数组的索引
      console.log('data: ', data);
      data.status = !data.status

      if(data.status){
        // 排序 选中的排前边
        // this.showArr = this.cardarr.filter(item => { return item.level == this.rank})
        // this.showArr.sort((a,b) => {return a.status > b.status ? -1 : 1;})

        // this.selectimgArr.push(obj)
        this.selectedNUM++
        this.compose = parseInt(this.selectedNUM / 4)

        this.selectedArr.push(data)
        console.log('选中的数组this.selectedArr: ', this.selectedArr);

        this.pageshowarr.splice(index,1)
      }
    },
    // 选择阶数
    selectRankClik(data){
      this.selectedNUM = 0
      this.compose = 0
      this.selectimgArr = [] // 清掉原来选中卡牌的数组信息
      this.rank = data
      this.amount = this.cardarr.filter(item => { return item.level == data}).length
      this.pageshowarr = this.cardarr.filter(item => { return item.level == data}) // 页面展示的卡牌数组重新置换
      this.selectedArr = []
      this.selectALLBtn = false
    },
    back(){
      this.$router.go(-1)
    },
    // sdk一系列方法---------判断是否授权
    getSDKInfo(){
      this.$common.isApproveFun(1,this.getAccount, contract().HNUpgrade).then(res => {
        console.log('hn是否授权res: ', res);
        if (res) {
          this.isApproveHN = true
        } else {
          this.isApproveHN = false
        }
      }).catch(err => {
        console.log('是否授权err: ', err);
        this.isApproveHN = false
      })
      this.$common.isApproveFun(2,this.getAccount,contract().HNUpgrade).then(res => {
        console.log('hc是否授权res: ', res);
        if(res.toString() > 0){
          this.isApproveHC = true
        }else{
          this.isApproveHC = false
        }
      }).catch( err => {
        console.log('解锁是否授权err: ', err);
        this.isApproveHC = false
      })
    },
    // 授权操作
    authorizationClick(){
      console.log("授权",this.isApproveHN,this.isApproveHC)
      if(!this.isApproveHN){
        this.$common.delegatingFun(1, contract().HNUpgrade).then(res => {
          console.log('hn授权res: ', res);
          // this.approve_isloading = false
          this.isApproveHN = true
        }).catch(err => {
          console.log('hn授权err: ', err);
          this.isApproveHN = false
        })
      }
      if(!this.isApproveHC){
        this.$common.delegatingFun(2,contract().HNUpgrade).then(res => {
          console.log('hc授权res: ', res);
          // this.approve_isloading = false
          this.isApproveHC = true
        }).catch(err => {
          console.log('hc授权err: ', err);
          this.isApproveHC = false
          // this.approve_isloading = false
        })
      }
    }
  },
  mounted(){
    this.getSDKInfo()
  }
}
</script>

<style lang='scss' scoped>
.insertcard_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 80px;
  padding-top: 130px;
  .title{
    position: absolute;
    top: 160px;
    left: 90px;
    width: 121px;
    cursor: pointer;
    .backimg{
      width: 100%;
      object-fit: contain;
    }
  }
  .title_title {
    font-size: 36px;
    color: #ffffff;
    line-height: 73px;
    margin-bottom: 15px;
  }
  .title_son1{
    font-size: 20px;
    color: #ffffff;
    line-height: 37px;
    // -webkit-text-stroke: 1px #092868;
    // text-stroke: 1px #092868;
    // background: linear-gradient(180deg, #E5FFFF 0%, #81C6E3 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
  .content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 90px;
    .left_content{
      position: relative;
      width: 380px;
      height: 87px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.54) linear-gradient(180deg, #24345D 0%, rgba(35, 52, 98, 0.18) 100%);
      box-shadow: -1px 14px 9px -9px rgba(0, 0, 0, 0.82) inset;
      .span1{
        font-size: 26px;
        font-weight: bold;
        color: #FFFFFF;
        line-height: 56px;
        margin-right: 10px;
        cursor: pointer;
      }
      .span2{
        font-size: 0;
        line-height: 0;
        border-width: 15px;
        border-color: #00E7F0;
        border-bottom-width: 0;
        border-style: dashed;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
      }
      .left_content_hover{
        position: absolute;
        top: 15px;
        left: 0;
        z-index: 9;
        width: 380px;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.74);
        box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56) inset;
        filter: blur(0px);
        border-radius: 4px;
        padding: 20px 0;
        margin-top: 70px;
        .span1{
          font-size: 18px;
        font-weight: bold;
          color: #E2DADA;
          line-height: 50px;
          cursor: pointer;
        }
      }
    }
    .left_content:hover{
      .left_content_hover{
        display: flex;
      }
    }
    .right_content{
      display: flex;
      align-items: center;
      .selectimg{
        width: 40px;
        object-fit: contain;
        margin-right: 10px;
      }
      .select_ttx{
        font-size: 24px;


        color: #FFFFFF;
        line-height: 56px;
      }
    }
  }
  .bottom_txtbox {
    width: 100%;
    display: flex;
    flex-direction: column;
    .bottom_txt1 {
      width: 100%;
      display: flex;
      align-items: center;
      .span1 {
        font-size: 24px;


        color: #ffffff;
        line-height: 56px;
        margin-right: 5px;
      }
      .span2 {
        font-size: 24px;


        color: #00e7f0;
        line-height: 56px;
      }
    }
    .bottom_txt2 {
      width: 100%;
      font-size: 20px;


      color: #ccbebe;
      line-height: 37px;
    }
  }
  .cardarr_class{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .onebox{
      position: relative;
      width: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      // transform: scale(0.8);
      .card_picture{
        width: 100%;
        object-fit: contain;
      }
      .scaleimg{
        transform: scale(1.3);
      }
      .bottom{
        position: absolute;
        top: 10px;
        display: flex;
        align-items: center;
        padding:10px 8px;
        transform: scale(0.5);
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
      .select_img{
        position: absolute;
        top: 23px;
        right: 54px;
        width: 43px;
        object-fit: contain;
      }
      .selected_img{
        position: absolute;
        top: -17px;
        right: 39px;
        width: 43px;
        object-fit: contain;
        transform: scale(1.2);
      }
      .master_img{
        position: absolute;
        bottom: -30px;
        right: 15px;
        width: 78px;
        object-fit: contain;
      }
      .orther_img{
        position: absolute;
        bottom: 17px;
        right: 58px;
        width: 44px;
        object-fit: contain;
      }
    }
  }
  .cardarr_class_selected{
    margin-top: 80px;
    .onebox{
      margin-bottom: 100px;
      .selected_bottom{
        position: absolute;
        top: -28px;
        transform: scale(0.7);
      }
      .scalebottom{
        position: absolute;
        top: 8px;
        transform: scale(0.5);
      }
    }
  }
  .btn_box {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 393px;
    height: 82px;
    text-align: center;
    line-height: 70px;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 40px;
    color: #ffffff;
    cursor: pointer;
    margin-top: 30px;
  }
}
@media screen and (min-width: 1440px) {
  .insertcard_page{
    max-width: 1400px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px){
  .insertcard_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
    padding-top: 1rem;
    .title{
      position: absolute;
      top: 0.3rem;
      left: 0.2rem;
      width: 0.36rem;
      cursor: pointer;
      .backimg{
        width: 100%;
        object-fit: contain;
      }
    }
    .title_title {
      font-size: 0.22rem;

      color: #ffffff;
      line-height: 0.22rem;
      margin-bottom: 0.1rem;
    }
    .title_son1{
      font-size: 0.14rem;


      color: #ffffff;
      line-height: 0.22rem;
    }
  .content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.4rem;
    .left_content{
      position: relative;
      width: 1.88rem;
      height: 0.37rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.54) linear-gradient(180deg, #24345D 0%, rgba(35, 52, 98, 0.18) 100%);
      box-shadow: -1px 14px 9px -9px rgba(0, 0, 0, 0.82) inset;
      .span1{
        font-size: 0.12rem;


        color: #FFFFFF;
        line-height: 0.28rem;
        margin-right: 0.1rem;
        cursor: pointer;
      }
      .span2{
        font-size: 0;
        line-height: 0;
        border-width: 0.12rem;
        border-color: #00E7F0;
        border-bottom-width: 0;
        border-style: dashed;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
      }
      .left_content_hover{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        width: 1.88rem;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.74);
        box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56) inset;
        filter: blur(0px);
        // background: rgba(0, 0, 0, 0.8);
        // box-shadow: -2px 1px 20px 0px rgba(184, 175, 175, 0.29) inset;
        border-radius: 0.04rem;
        padding: 0.2rem 0;
        margin-top: 0.35rem;
        .span1{
          font-size: 0.12rem;


          color: #E2DADA;
          line-height: 0.28rem;
          cursor: pointer;
        }
      }
    }
    .left_content:hover{
      .left_content_hover{
        display: flex;
      }
    }
    .right_content{
      display: flex;
      align-items: center;
      .selectimg{
        width: 0.3rem;
        object-fit: contain;
        margin-right: 0.05rem;
      }
      .select_ttx{
        font-size: 0.12rem;


        color: #FFFFFF;
        line-height: 0.2rem;
      }
    }
  }
  .bottom_txtbox {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0.1rem;
    .bottom_txt1 {
      width: 100%;
      display: flex;
      align-items: center;
      .span1 {
        font-size: 0.2rem;


        color: #ffffff;
        line-height: 0.28rem;
        margin-right: 0.05rem;
      }
      .span2 {
        font-size: 0.2rem;


        color: #00e7f0;
        line-height: 0.28rem;
      }
    }
    .bottom_txt2 {
      width: 100%;
      font-size: 0.14rem;


      color: #ccbebe;
      line-height: 0.2rem;
    }
  }
  .cardarr_class{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .onebox{
      position: relative;
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.1rem;
      .card_picture{
        width: 100%;
        object-fit: contain;
      }
      .scaleimg{
        transform: scale(1);
      }
      .bottom{
        position: absolute;
        top: -22px;
        display: flex;
        align-items: center;
        padding:0.1rem 0.08rem;
        transform: scale(0.1);
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
      .select_img{
        position: absolute;
        top: 0;
        right: 0.09rem;
        width: 0.24rem;
        object-fit: contain;
      }
      .selected_img{
        position: absolute;
        top: 0;
        right: 0.09rem;
        width: 0.24rem;
        object-fit: contain;
        transform: scale(1.2);
      }
      .master_img{
        position: absolute;
        bottom: -0.02rem;
        right: 0.1rem;
        width: 0.24rem;
        object-fit: contain;
      }
      .orther_img{
        position: absolute;
        bottom: 0;
        right: 0.09rem;
        width: 0.24rem;
        object-fit: contain;
      }
    }
  }
  .cardarr_class_selected{
    margin-top: 0.4rem;
    .onebox{
      margin-bottom: 0.4rem;
      .selected_bottom{
        position: absolute;
        top: -0.28rem;
        transform: scale(0.2);
      }
      .scalebottom{
        position: absolute;
        top: -0.21rem;
        transform: scale(0.2);
      }
    }
  }
  .btn_box {
    position: fixed;
    bottom: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 1.8rem;
    height: 0.36rem;
    text-align: center;
    line-height: 0.36rem;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 0.18rem;


    color: #ffffff;
    cursor: pointer;
  }
}
}
// p {
//   font-family: "Audiowide";
//   text-align: center;
//   color: #81C6E3;
//   font-size: 7em;
//   transition: all 1.5s ease;animation: Glow 1.5s ease infinite alternate;
// }
// @keyframes Glow {
//   from {
//     text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #81C6E3,
//       0 0 70px #81C6E3, 0 0 80px #81C6E3, 0 0 100px #81C6E3, 0 0 150px #81C6E3;
//   }
//   to {
//     text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #81C6E3,
//       0 0 35px #81C6E3, 0 0 40px #81C6E3, 0 0 50px #81C6E3, 0 0 75px #81C6E3;
//   }
// }
</style>
