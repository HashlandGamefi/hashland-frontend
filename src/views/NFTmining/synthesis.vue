<template>
  <div class="insertcard_page">
    <div class="title" @click="back">
      <img src="../../assets/images/back.png" class="backimg" />
    </div>
    <div class="title_title">合成</div>
    <div class="title_son1">选择你想要合成的卡牌</div>
    <div class="title_son1">每四张同等级可拍可升级为高等级卡牌</div>
    <div class="content">
      <div class="left_content">
        <span class="span1">{{rank}}阶 (共{{amount}}张)</span>
        <div class="span2"></div>
        <div class="left_content_hover">
          <span class="span1" @click="selectRankClik(ele)" v-for="ele in 5" :key="ele">{{ele}}阶 (共{{cardarr.filter(data => {return data.level == ele}).length}}张)</span>
        </div>
      </div>
      <div class="right_content">
        <img src="../../assets/images/select.png" class="selectimg" />
        <span class="select_ttx">全选/取消</span>
      </div>
    </div>
    <div class="bottom_txtbox" v-if="rank < 5">
      <div class="bottom_txt1">
        <span class="span1">选中卡牌</span>
        <span class="span2">{{selectedNUM}}</span>
      </div>
      <div class="bottom_txt2">
        合成后，{{rank}}星卡牌消失，合成{{compose}}张{{rank + 1 }}星卡牌，算力总提升15%
      </div>
    </div>
    <!-- 选中以后的卡牌数组 -->
    <div class="cardarr_class cardarr_class_selected">
      <div class="onebox selected_onebox" v-for="(item,index) in selectedArr" :key="index" @click="selectedCardClick(item,index)">
        <img :src="item.src" class="card_picture" :class="{scaleimg:index % 4 == 0}" />
        <div class="bottom selected_bottom" :class="{scalebottom:index % 4 !== 0}">
          <div class="five_pointed_star">
            <img src="../../assets/images/start.png" v-for="item1 in rank" :key="item1" class="start_img" />
          </div>
          <div class="hc_btc_box">
            <div class="hc_coefficient">
              <img src="../../assets/images/hclogo.png" class="imgcard" />
              <span class="span1">{{item.hc}}</span>
            </div>
            <div class="hc_coefficient">
              <img src="../../assets/images/btclogo.png" class="imgcard" />
              <span class="span1">{{item.btc}}</span>
            </div>
          </div>
        </div>
        <img src="../../assets/images/selected.png" class="selected_img" />
        <img src="../../assets/images/zhu.png" class="master_img" v-if="index % 4 == 0" />
      </div>
    </div>
    <!-- 页面展示数组 -->
    <div class="cardarr_class">
      <div class="onebox" v-for="(item,index) in pageshowarr" :key="index" @click="cardClick(item,index)">
        <img :src="item.src" class="card_picture" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img src="../../assets/images/start.png" v-for="item1 in rank" :key="item1" class="start_img" />
          </div>
          <div class="hc_btc_box">
            <div class="hc_coefficient">
              <img src="../../assets/images/hclogo.png" class="imgcard" />
              <span class="span1">{{item.hc}}</span>
            </div>
            <div class="hc_coefficient">
              <img src="../../assets/images/btclogo.png" class="imgcard" />
              <span class="span1">{{item.btc}}</span>
            </div>
          </div>
        </div>
        <img src="../../assets/images/select.png" class="select_img" />
        <!-- <img src="../../assets/images/zhu.png" class="master_img" v-if="item.ismaster" /> -->
        <img src="../../assets/images/fu.png" class="orther_img"/>
      </div>
    </div>
    <div class="btn_box" @click="synthesisFun" v-if="isApproveHN && isApproveHC">合成</div>
    <div class="btn_box" @click="authorizationClick">授权</div>
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
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    async synthesisFun(){
      console.log('合成',this.selectedArr)
      let arr = this.selectedArr.map(item => {
        return item.cardID
      })
      console.log('arr: ', arr);
      if(arr.length % 4 !== 0){
        this.$common.selectLang('选择的卡牌必须4的倍数哦','1223',this)
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
        this.$common.selectLang('余额不足','1223',this)
      }
    },
    // 选中的卡牌的点击事件
    selectedCardClick(data,index){
      this.selectedArr.splice(index,1) // 删除对应图片
      this.selectedNUM--
      this.compose = parseInt(this.selectedNUM / 4)
      this.pageshowarr.push(data)
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

        if(this.selectedArr.length % 4 == 1){

        }
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
    },
    back(){
      this.$router.go(-1)
    },
    getSDKInfo(){
      this.$common.isApproveFun(1,this.getAccount, contract().HNPool).then(res => {
        console.log('是否授权res: ', res);
        if (res) {
          this.isApproveHN = true
        } else {
          this.isApproveHN = false
        }
      }).catch(err => {
        console.log('是否授权err: ', err);
        this.isApproveHN = false
      })
      this.$common.isApproveFun(2,this.getAccount,contract().HNPool).then(res => {
        console.log('解锁是否授权res: ', res);
        if(res.toString() == 1){
          this.isApproveHC = true
        }else{
          this.isApproveHC = false
        }
      }).catch( err => {
        console.log('解锁是否授权err: ', err);
        this.isApproveHC = false
      })
    },
    // 授权
    authorizationClick(){
      this.$common.delegatingFun(1, contract().HNPool).then(res => {
        console.log('授权res: ', res);
        // this.approve_isloading = false
        this.isApproveHN = true
      }).catch(err => {
        console.log('授权err: ', err);
        this.isApproveHN = false
      })
      this.$common.delegatingFun(2,contract().HNPool).then(res => {
        console.log('授权res: ', res);
        // this.approve_isloading = false
        this.isApproveHC = true
      }).catch(err => {
        console.log('授权err: ', err);
        this.isApproveHC = false
        // this.approve_isloading = false
      })
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
    font-size: 60px;
    font-family: AaJXH;
    color: #ffffff;
    line-height: 73px;
    letter-spacing: 4px;
    text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    background: linear-gradient(180deg, #e5ffff 0%, #81c6e3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 35px;
  }
  .title_son1{
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #0AA6B5;
    line-height: 37px;
    -webkit-text-stroke: 1px #092868;
    text-stroke: 1px #092868;
    background: linear-gradient(180deg, #E5FFFF 0%, #81C6E3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 90px;
    .left_content{
      position: relative;
      width: 460px;
      height: 125px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.54) linear-gradient(180deg, #24345D 0%, rgba(35, 52, 98, 0.18) 100%);
      box-shadow: -1px 14px 9px -9px rgba(0, 0, 0, 0.82) inset;
      .span1{
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 56px;
        letter-spacing: 5px;
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
        top: 56px;
        left: 0;
        z-index: 9;
        width: 460px;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.74);
        box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56) inset;
        filter: blur(0px);
        // background: rgba(0, 0, 0, 0.8);
        // box-shadow: -2px 1px 20px 0px rgba(184, 175, 175, 0.29) inset;
        border-radius: 4px;
        padding: 20px 0;
        margin-top: 70px;
        .span1{
          font-size: 30px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
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
        width: 52px;
        object-fit: contain;
        margin-right: 10px;
      }
      .select_ttx{
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
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
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 56px;
        letter-spacing: 5px;
      }
      .span2 {
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #00e7f0;
        line-height: 56px;
        letter-spacing: 5px;
      }
    }
    .bottom_txt2 {
      width: 100%;
      font-size: 26px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
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
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
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
    margin-top: 30px;
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
