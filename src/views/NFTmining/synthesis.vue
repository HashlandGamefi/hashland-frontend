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
        <div class="left_content_hover" v-for="item in [1,2,3,4,5]" :key="item">
          <span class="span1" @click="selectRankClik(1)">{{item}}阶 (共{{cardarr[0].arr.length}}张)</span>
          <span class="span1" @click="selectRankClik(2)">{{cardarr[1].level}}阶 (共{{cardarr[1].arr.length}}张)</span>
          <span class="span1" @click="selectRankClik(3)">{{cardarr[2].level}}阶 (共{{cardarr[2].arr.length}}张)</span>
          <span class="span1" @click="selectRankClik(4)">{{cardarr[3].level}}阶 (共{{cardarr[3].arr.length}}张)</span>
          <span class="span1" @click="selectRankClik(5)">{{cardarr[4].level}}阶 (共{{cardarr[4].arr.length}}张)</span>
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
    <div class="cardarr_class">
      <div class="onebox" v-for="(item,index) in showarr" :key="index" @click="cardClick(item,index)">
        <img :src="item.src" class="card_picture" :class="{scaleimg:item.ismaster}" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img src="../../assets/images/start.png" v-for="(item1,index1) in rank" :key="index1" class="start_img" />
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
        <img :src="item.status?require('../../assets/images/selected.png'):require('../../assets/images/select.png')" class="select_img" />
        <img src="../../assets/images/zhu.png" class="master_img" v-if="item.ismaster" />
        <img src="../../assets/images/fu.png" class="orther_img" v-else/>
      </div>
    </div>
    <div class="btn_box" @click="synthesisFun">合成</div>
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
      showarr:[],// 页面展示的卡牌数组
      cardarr:[],//所有卡牌信息的数组
      rank:1,//1阶
      amount:0,//阶对应的卡牌数量
      selectedNUM:0,//选中的卡牌数量
      compose:0,//合成的卡牌数量
      selectimgArr:[],//选中的卡牌的信息
      // onceClick:true
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount","getUserCardInfo"]),
    dataInfo:function(){
      return this.getUserCardInfo
    },
  },
  watch:{
    "dataInfo":{
      handler: function (newValue, oldValue) {
        if(newValue.length > 0){
          // console.log('合成卡牌页面的用户全部卡牌信息: ', JSON.parse(newValue));
          this.cardarr = JSON.parse(newValue)
          this.rank = JSON.parse(newValue)[0].level
          this.amount = JSON.parse(newValue)[0].arr.length
          this.showarr = JSON.parse(newValue)[0].arr
          // console.log('JSON.parse(newValue)[0].arr: ', JSON.parse(newValue)[0].arr);
          // console.log(' this.showarr: ',  this.showarr);
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
    synthesisFun(){
      console.log('合成')
    },
    //选择单张卡牌
    cardClick(data,index){ // index---当前数组的索引  index1---上层数组的索引
      if(data.status){
        if(this.showarr[index].ismaster){ // 这一步判断取消选中的是不是主牌
          console.log("是主牌")
          this.showarr[index].ismaster = false // 把当前主牌取消掉
          for(var i = 0; i < this.selectimgArr.length; i++){
            if(this.selectimgArr[i].index == index){
              this.selectimgArr.splice(i,1)
              this.showarr[this.selectimgArr[i].index].ismaster = true // 把相邻的下一张变成主牌

            }
          }
          console.log("取消选中后的数组",this.selectimgArr)
        }else{
          console.log("不是主牌")
          this.$common.selectLang('请重新选择当前组','1223',this)
          return
        }
      }

      let obj = {}
      obj.cardID = data.cardID
      obj.index = index
      console.log('选中当前卡牌的信息data: ', data);
      data.status = true

      this.selectimgArr.push(obj)
      // this.selectedNUM++
      // this.compose = parseInt(this.selectedNUM / 4)
      if(this.selectimgArr.length % 4 == 1){
        data.ismaster = true
      }



      return
      if(data.status){
        this.selectimgArr.push(obj)
        this.selectedNUM++
        this.compose = parseInt(this.selectedNUM / 4)
        if(this.selectimgArr.length % 4 == 1){
          data.ismaster = true
        }
        // if(this.onceClick){
        //   data.ismaster = !data.ismaster
        // }
        // this.onceClick = false
        console.log("选中后的数组",this.selectimgArr)
      }else{
        if(this.showarr[index].ismaster){ // 这一步判断取消选中的是不是主牌
          console.log("是主牌")
          this.showarr[index].ismaster = false // 把当前主牌取消掉
          for(var i = 0; i < this.selectimgArr.length; i++){
            if(this.selectimgArr[i].index == index){
              this.selectimgArr.splice(i,1)
              this.showarr[this.selectimgArr[i].index].ismaster = true // 把相邻的下一张变成主牌

            }
          }
          console.log("取消选中后的数组",this.selectimgArr)
        }else{
          console.log("不是主牌")
          this.$common.selectLang('请重新选择当前组','1223',this)
        }
        // for (let index = 0; index < this.selectimgArr.length; index++) {
        //   const element = this.selectimgArr[index];

        // }
        // for(var i = 0; i < this.selectimgArr.length; i++){
        //   if(this.selectimgArr[i].index == obj.index){
        //     this.selectimgArr.splice(i,1)
        //     this.selectedNUM--
        //     this.compose = parseInt(this.selectedNUM / 4)
        //   }

        // }
      }
    },
    // 选择阶数
    selectRankClik(data){
      this.selectedNUM = 0
      this.compose = 0
      this.selectimgArr = [] // 清掉原来选中卡牌的数组信息
      this.rank = this.cardarr[data - 1].level
      this.amount = this.cardarr[data - 1].arr.length
      this.showarr = this.cardarr[data - 1].arr
    },
    back(){
      this.$router.go(-1)
    },
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
    margin-top: 40px;
    .onebox{
      position: relative;
      width: 320px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform: scale(0.8);
      .card_picture{
        width: 100%;
        object-fit: contain;
      }
      .scaleimg{
        transform: scale(1.3);
      }
      .bottom{
        position: absolute;
        top: 44px;
        // background-image: url("../../assets/images/cardtop.png");
        // background-size: 100% 100%;
        // background-repeat: no-repeat;
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
        top: 0;
        right: 0;
        width: 43px;
        object-fit: contain;
      }
      .master_img{
        position: absolute;
        bottom: -50px;
        right: -3px;
        width: 78px;
        object-fit: contain;
      }
      .orther_img{
        position: absolute;
        bottom: 17px;
        right: 28px;
        width: 78px;
        object-fit: contain;
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
