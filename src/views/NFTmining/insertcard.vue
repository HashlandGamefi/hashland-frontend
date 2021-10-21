<template>
  <div class='insertcard_page'>
    <div class="title" @click="back">
      <img src="../../assets/images/back.png" class="backimg" />
    </div>
    <div class="title_title">插入卡槽</div>
    <span class="title1_txt">选择您想要插入卡槽的卡牌</span>
    <span class="title1_txt title2_txt">卡牌增长系数越高，算力越高，收益越多</span>
    <div class="content_box">
      <div class="stratbox" v-for="(ele,index1) in starArr" :key="index1">
        <div class="top_line" >
          <span class="span1">{{ele.level}}星（共{{ele.arr.length}}张）</span>
          <span class="span2">卡槽有限，可合成后再质押</span>
        </div>
        <!-- 卡牌轮播 -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in ele.arr" :key="index">
              <div class="swiper_content_box">
                <img :src="item.src" class="swiper_img" />
                <img :src="item.status?require('../../assets/images/selected.png'):require('../../assets/images/select.png')" @click="cardClick(item,index,index1)" class="select_img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_box" @click="insertFun" >
      <span v-if="!getIstrue">连接钱包</span>
      <span v-else-if="!isbtnstatus">授权</span>
      <span v-else>插入卡槽</span>
      <BtnLoading :isloading="approve_isloading"></BtnLoading>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper from 'swiper'
import { util,getRandomNumber,hn,contract,hnPool,getSigner } from 'hashland-sdk'
export default {
  data () {
    return {
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      starArr: [],//用户卡牌数组
      cardIdArr:[],// 选中的卡牌id数组
      isbtnstatus:false,// 按钮的文字状态
      approve_isloading:false,// 按钮的loading
      mySwiper:0,//swiper对象
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
          if(newValue.length > 0){
            let res = JSON.parse(newValue)
            this.starArr = res
            console.log('页面上现在展示的数组this.starArr: ', this.starArr);
            // this.setFilterFun(1,newValue)
            // this.setFilterFun(2,newValue)
            // this.setFilterFun(3,newValue)
            // this.setFilterFun(4,newValue)
            // this.setFilterFun(5,newValue)
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    setFilterFun(level,newValue){
      let obj = {level:level,ownerNum:[]}
      obj.ownerNum = JSON.parse(newValue).filter(item =>{
        return item.level == level
      })
      this.starArr.push(obj)
      console.log('页面的数组:this.starArr: ', this.starArr);
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    cardClick(data,index,index1){ // index---当前数组的索引  index1---上层数组的索引
      let obj = {}
      obj.cardID = data.cardID
      obj.index = index
      obj.index1 = index1
      console.log('选中当前卡牌的信息data: ', data);
      data.status = !data.status
      if(data.status){
        this.cardIdArr.push(obj)
      }else{
        for(var i = 0; i < this.cardIdArr.length; i++){
          if(this.cardIdArr[i].index == obj.index && this.cardIdArr[i].index1 == obj.index1){
            this.cardIdArr.splice(i,1)
          }
        }
      }
    },
    // 插入卡槽
    async insertFun(){
      if(this.approve_isloading)return
      if(!this.getIstrue)return // 链接钱包按钮点击函数
      if(!this.isbtnstatus){ // 去授权
        this.approve_isloading = true
        this.$common.delegatingFun(1,contract().HNPool).then(res => {
          console.log('授权res: ', res);
          this.approve_isloading = false
          this.isbtnstatus = true
        }).catch(err => {
          console.log('授权err: ', err);
          this.approve_isloading = false
        })
        return
      }
      if(this.cardIdArr.length == 0){
        this.$common.selectLang('请选择卡牌','1223',this)
        return
      }
      this.approve_isloading = true
      let emptyCardSlot = (await hnPool().getUserLeftSlots(this.getAccount)).toString()
      if(emptyCardSlot >= this.cardIdArr.length){
        let arr = []
        this.cardIdArr.forEach(element => {
          arr.push(element.cardID)
        });
        console.log("向合约发的卡牌id数组:",arr)
        hnPool().connect(getSigner()).deposit(arr).then(async res => {
          console.log('插入卡槽res: ', res);
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.$common.selectLang('插入成功','1223',this)
            this.approve_isloading = false
            this.$common.getUserCardInfoFun(this.getAccount)
          }
          // console.log('etReceipt: ', etReceipt);
          // console.log(etReceipt.confirmations, 'Blocks Confirmations');
        }).catch(err => {
          console.log('质押err: ', err);
          this.approve_isloading = false
        })
      }else{
        this.approve_isloading = false
        this.$common.selectLang('没有空卡槽了','1223',this)
      }
    },
    back(){
      this.$router.go(-1)
    },
    // 页面加载需要获取的信息
    getconnetFun(){
      this.$common.isApproveFun(1,this.getAccount,contract().HNPool).then(res => {
        console.log('是否授权res: ', res);
        if(res){
          this.isbtnstatus = true
        }else{
          this.isbtnstatus = false
        }
      }).catch( err => {
        console.log('是否授权err: ', err);
        this.isbtnstatus = false
      })
    },
    swiperFun(){
      if (this.mySwiper !== 0) {
        this.mySwiper.destroy();
      }
      this.mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        centeredSlides: true,
        observer: true,
        observeParents: true,
      })
    }
  },
  mounted () {
    // new Swiper('.swiper-container', {
    //   slidesPerView: 4,
    //   centeredSlides: true,
    // })
    this.swiperFun()
    this.getconnetFun()
  }
}
</script>

<style lang='scss' scoped>
.insertcard_page{
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  .title_title{
    font-size: 60px;
    font-family: AaJXH;
    color: #FFFFFF;
    line-height: 73px;
    letter-spacing: 4px;
    text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    background: linear-gradient(180deg, #E5FFFF 0%, #81C6E3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 35px;
  }
  .title1_txt{
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
  .title2_txt{
    margin-top: 10px;
  }
  .content_box{
    width: 100%;
    max-height: 800px;
    overflow: auto;
    padding: 50px 100px;
    display: flex;
    flex-direction: column;
    .stratbox{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 50px;
      .top_line{
        width: 100%;
        display: flex;
        flex-direction: column;
        .span1{
          font-size: 40px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 56px;
          letter-spacing: 5px;
        }
        .span2{
          font-size: 26px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #CCBEBE;
          line-height: 37px;
        }
      }
      .swiper-container{
        width: 100%;
        height: 500px;
        .swiper-wrapper{
          .swiper-slide{
            width: 100%;
            height: 100%;
            margin-right: 20px;
            .swiper_content_box{
              position: relative;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top: 40px;
              .swiper_img{
                width: 250px;
                object-fit: contain;
              }
              .select_img{
                position: absolute;
                right: 35px;
                top: 7px;
                width: 43px;
                object-fit: contain;
              }
            }
          }
          .swiper-slide-active{
            transform: scale(1.2);
            margin: 0 30px;
          }
        }
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
    margin-top: 30px;
  }
}
</style>
