<template>
  <div class="insertcard_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <div class="title_title fontsize32">{{ $t("message.insert.txt1") }}</div>
    <span class="title1_txt title2_txt fontsize12_400">{{ $t("message.insert.txt3") }}</span>
    <div class="content">
      <div class="add_content_box">
        <!-- 选择系列 -->
        <div class="left_content" :class="[disablehover?'clear_hover':'']">
          <span class="span1 fontsize16">{{$t("message.series")}} {{seriesTxt}}</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="selectSeries(1)">{{$t("message.series")}} {{seriesTxt1}}</span>
            <span class="span1 fontsize16" @click="selectSeries(2)">{{$t("message.series")}} {{seriesTxt2}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content_box">
      <div class="stratbox" v-for="(ele,index1) in numArr" :key="index1">
        <div class="top_line" v-if="starArr.filter((data) => {return data.level == ele}).length > 0">
          <span class="span1 fontsize22">{{ $t("message.synthesis.txt4")}} {{ ele }} ({{ $t("message.synthesis.txt8")}} {{
              starArr.filter((data) => {
                return data.level == ele;
              }).length
            }})</span
          >
          <span class="span2 fontsize12_400">{{ $t("message.nftMining.txt8") }}</span>
        </div>
        <!-- 卡牌轮播 -->
        <div class="swiper-container" v-if="starArr.filter((data) => {
                return data.level == ele;
              }).length > 0">
          <div class="swiper-wrapper" >
            <div
              class="swiper-slide"
              v-for="(item, index) in starArr.filter((data) => {
                return data.level == ele;
              })"
              :key="index"
            >
              <div
                class="swiper_content_box"
                @click="cardClick(item, index, index1)"
              >
                <img :src="item.src" class="swiper_img" />
                <Lottie :left="getIsMobile?'6%':'0'" :options="anmationArr.filter(ele => {return ele.level == item.level && ele.type == item.type})[0].dataJson" :width="getIsMobile?256:'50%'" v-if="item.ultra"></Lottie>
                <!-- <Lottie :left="getIsMobile?'48%':'0'" :transform="true" :top="getIsMobile?'6%':'0'" :options="anmationArr.filter(ele => {return ele.level == item.level && ele.type == item.type})[0].dataJson" :width="getIsMobile?256:'50%'" v-if="item.ultra"></Lottie> -->
                <img :src=" item.status ? `${$store.state.imgUrl}selected.png` : `${$store.state.imgUrl}select.png`" class="select_img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoadingAnmation v-if="starArr.length == 0 && pageshowLoading"></LoadingAnmation>
      <NoData v-else-if="starArr.length == 0 && !pageshowLoading"></NoData>
    </div>
    <div class="btn_box fontsize18" v-if="starArr.length > 0" @click="insertFun">
      <span v-if="!getIstrue">Connect</span>
      <span v-else-if="!isbtnstatus">{{ $t("message.approve") }}</span>
      <span v-else>{{ $t("message.nftMining.txt15") }}</span>
      <BtnLoading :isloading="approve_isloading"></BtnLoading>
    </div>
    <Proup
      :btntxt="btntxt"
      :word="word"
      :proupDis="proupDis"
      @closedis="CloseFun"
      @besurefun="CloseFun"
    ></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper from 'swiper'
import { contract, hnPool, getSigner } from 'hashland-sdk'
export default {
  data () {
    return {
      anmationArr:[],//动画数组的json
      disablehover:false,
      seriesTxt:1,
      seriesTxt1:1,
      seriesTxt2:2,
      numArr:[5,4,3,2,1],
      pageshowLoading:true,
      btntxt: '',// 弹窗页面的确认按钮
      word: '',//弹窗提示文字
      proupDis: false,// 弹窗展示消失变量
      starArr: [],//用户卡牌数组
      cardIdArr: [],// 选中的卡牌id数组
      isbtnstatus: false,// 按钮的文字状态
      approve_isloading: false,// 按钮的loading
      swiper1: 0,//swiper对象
      timerll:null
    }
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount", "getUserCardInfo","getIsMobile"])
  },
  watch: {
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          this.pageshowLoading = true
          this.resetData()
          this.getconnetFun()
          this.getUserAllCard()
        }else{
          this.pageshowLoading = false
          this.resetData()
        }
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    // 重置数据
    resetData(){
      this.seriesTxt = 1
      this.proupDis = false// 弹窗展示消失变量
      this.starArr = []//用户卡牌数组
      this.cardIdArr = []// 选中的卡牌id数组
      this.isbtnstatus = false// 按钮的文字状态
      this.approve_isloading = false// 按钮的loading
      this.swiper1 = 0//swiper对象
    },
    // 选择系列
    selectSeries(data){
      this.disablehover = true
      setTimeout(() => {
        this.disablehover = false
      },600)
      if(!this.getIstrue)return this.$common.selectLang("请连接钱包！", "Please connect the wallet!", this)
      if(this.pageshowLoading)return
      this.cardIdArr = [] //选中的卡牌的信息
      this.pageshowLoading = true
      this.starArr = []
      if(data == 1){
        this.seriesTxt = this.seriesTxt1
        this.SeparateMethodToGetData(1)
      }else{
        this.seriesTxt = this.seriesTxt2
        this.SeparateMethodToGetData(2)
      }
    },
    // 获取对应的卡牌
    SeparateMethodToGetData(series){
      let arr = JSON.parse(this.getUserCardInfo)
      if(series == 2){
        arr.sort((a, b) => {
          if(a.ultra == b.ultra == true){
            return a.ultra > b.ultra?-1:1
          }
          return a.ultra > b.ultra?-1:1
        })
      }
      this.starArr = arr.filter(item => {
        return item.series == series
      })
      this.pageshowLoading = false
      this.$nextTick(() => {
        this.swiper1 = new Swiper('.swiper-container', {
          slidesPerView: 'auto',
          observer: true,
          observeParents: true,
          initialSlide:0
        })
      });
    },
    // 用户总卡牌数据获取
    getUserAllCard(){
      console.log("用户总卡牌数获取")
      clearInterval(this.timerll)
      this.timerll = setInterval(() => {
        if(sessionStorage.getItem('count')){
          clearInterval(this.timerll)
          this.pageshowLoading = true
          this.SeparateMethodToGetData(1)
        }
      }, 1000);
    },
    // 取消按钮(关闭弹窗)
    CloseFun () {
      this.proupDis = false
    },
    cardClick (data, index, index1) { // index---当前数组的索引  index1---上层数组的索引
      let obj = {}
      obj.cardID = data.cardID
      obj.index = index
      obj.index1 = index1
      console.log('选中当前卡牌的信息data: ', data);
      data.status = !data.status
      if (data.status) {
        this.cardIdArr.push(obj)
      } else {
        for (var i = 0; i < this.cardIdArr.length; i++) {
          if (this.cardIdArr[i].index == obj.index && this.cardIdArr[i].index1 == obj.index1) {
            this.cardIdArr.splice(i, 1)
          }
        }
      }
    },
    // 插入卡槽
    async insertFun () {
      if (this.approve_isloading) return
      if (!this.getIstrue) return // 链接钱包按钮点击函数
      if (!this.isbtnstatus) { // 去授权
        this.approve_isloading = true
        this.$common.delegatingFun(1, contract().HNPool).then(res => {
          console.log('授权res: ', res);
          this.approve_isloading = false
          this.isbtnstatus = true
        }).catch(err => {
          console.log('授权err: ', err);
          this.approve_isloading = false
        })
        return
      }
      if (this.cardIdArr.length == 0) {
        this.$common.selectLang('请选择卡牌', 'Select Your Card', this)
        return
      }
      this.approve_isloading = true
      let emptyCardSlot = (await hnPool().getUserLeftSlots(this.getAccount)).toString()
      if (emptyCardSlot >= this.cardIdArr.length) {
        let arr = []
        this.cardIdArr.forEach(element => {
          arr.push(element.cardID)
        });
        console.log("向合约发的卡牌id数组:", arr)
        hnPool().connect(getSigner()).deposit(arr).then(async res => {
          console.log('插入卡槽res: ', res);
          const etReceipt = await res.wait();
          if (etReceipt.status == 1) {
            this.$common.selectLang('插入成功', 'Insert Successful', this)
            this.approve_isloading = false
            // this.$common.getUserCardInfoFun(this.getAccount)
            this.$common.newgetUserCardInfoFun(this.getAccount).then(res1 => {
              if(res1 > 1){
                sessionStorage.setItem("count",res1)
              }else{
                sessionStorage.setItem("count",1)
              }
            })
            setTimeout(() => {
              this.back()
            }, 1500)
          }
        }).catch(err => {
          console.log('质押err: ', err);
          this.approve_isloading = false
        })
      } else {
        this.approve_isloading = false
        this.$common.selectLang('没有空卡槽了', 'No Empty Slot Remaining', this)
      }
    },
    back () {
      this.$router.go(-1)
    },
    // 页面加载需要获取的信息
    getconnetFun () {
      this.$common.isApproveFun(1, this.getAccount, contract().HNPool).then(res => {
        // console.log('是否授权res: ', res);
        if (res) {
          this.isbtnstatus = true
        } else {
          this.isbtnstatus = false
        }
      }).catch(err => {
        console.log('是否授权err: ', err);
        this.isbtnstatus = false
      })
    },
  },
  mounted(){
    let timerObject = setInterval(() => {
      if(localStorage.getItem('Animation')){
        this.anmationArr = JSON.parse(localStorage.getItem('Animation'))
        clearInterval(timerObject)
      }
    },1000)
  }
}
</script>

<style lang='scss' scoped>
.insertcard_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    position: absolute;
    top: 149px;
    right: 90px;
    width: 44px;
    cursor: pointer;
    .backimg {
      width: 100%;
      object-fit: contain;
    }
  }
  .title_title {
    color: #ffffff;
    margin-top: 208px;
  }
  .title1_txt {
    color: #fff;
  }
  .title2_txt {
    margin-top: 10px;
  }
  .content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
    .add_content_box{
      width: 50%;
      display: flex;
      align-items: center;
      .left_content{
        position: relative;
        width: 204px;
        height: 48px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(90deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
        .span1{
          color: #FFFFFF;
          margin-right: 10px;
          cursor: pointer;
        }
        .span2{
          border-width: 7px;
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
          width: 204px;
          display: none;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.9);
          box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
          filter: blur(0px);
          border-radius: 4px;
          padding: 10px 0;
          margin-top:47px;
          line-height: 39px;
          .span1{
            color: #E2DADA;
            cursor: pointer;
          }
        }
      }
      .left_content:hover{
        .left_content_hover{
          display: flex;
          .span1:hover{
            color: #00E7F0;
          }
        }
      }
    }
  }
  .content_box {
    width: 100%;
    max-height: 1093px;
    overflow: auto;
    padding: 50px 0;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    .stratbox {
      width: 100%;
      display: flex;
      flex-direction: column;
      .top_line {
        width: 100%;
        display: flex;
        flex-direction: column;
        .span1 {
          color: #ffffff;
          font-size:0.16rem;
        }
        .span2 {
          color: #ccbebe;
        }
      }
      .swiper-container {
        width: 100%;
        height: auto;
        margin-bottom: 20px;
        .swiper-wrapper {
          .swiper-slide {
            width: 25%;
            height: 100%;
            .swiper_content_box {
              position: relative;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top: 40px;
              .swiper_img {
                width: 256px;
                object-fit: contain;
              }
              .select_img {
                position: absolute;
                right: 22px;
                top: 0;
                width: 31px;
                object-fit: contain;
              }
            }
          }
        }
        .swiper-button-prev {
          width: 70px;
          height: 67px;
          background: url("//cdn.hashland.com/images/swiper_pre.png") no-repeat;
          background-size: 100% 100%;
        }
        .swiper-button-next {
          width: 70px;
          height: 67px;
          background: url("//cdn.hashland.com/images/swiper_next.png") no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .btn_box {
    width: 274px;
    height: 59px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    color: #ffffff;
    cursor: pointer;
    margin-top: 30px;
  }
}
@media screen and (min-width: 1280px) {
  .insertcard_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .insertcard_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1.07rem;
    .title {
      position: absolute;
      top: 0.15rem;
      right: 0.2rem;
      width: 0.36rem;
      cursor: pointer;
      .backimg{
        width: 100%;
        object-fit: contain;
      }
    }
    .title_title {
      color: #ffffff;
      margin-top: 0.25rem;
    }
    .title1_txt {
      color: #fff;
    }
    .title2_txt {
      margin-top: 0;
    }
    .content{
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-top: 0.33rem;
      padding-left: 0.2rem;
      .add_content_box{
        width: 100%;
        flex-wrap: wrap;
        .left_content{
          position: relative;
          width: 50%;
          margin-bottom: 0.15rem;
          height: 0.34rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.54) linear-gradient(180deg, #24345D 0%, rgba(35, 52, 98, 0.18) 100%);
          box-shadow: -1px 14px 9px -9px rgba(0, 0, 0, 0.82) inset;
          .span1{
            font-size: 0.12rem;
            color: #FFFFFF;
            margin-right: 0.1rem;
            cursor: pointer;
          }
          .span2{
            border-width: 0.06rem;
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
            width: 1.71rem;
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            background: rgba(0, 0, 0, 0.74);
            box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56) inset;
            filter: blur(0px);
            border-radius: 0.04rem;
            padding: 0.05rem 0 0.05rem 0;
            margin-top: 0.35rem;
            .span1{
              color: #E2DADA;
              cursor: pointer;
              margin-right: 0;
            }
          }
        }
        .left_content:hover{
          .left_content_hover{
            display: flex;
          }
        }
      }
    }
    .content_box {
      width: 100%;
      max-height: 6rem;
      overflow: auto;
      padding: 0.2rem;
      padding-top: 0.1rem;
      display: flex;
      flex-direction: column;
      .stratbox {
        width: 100%;
        display: flex;
        flex-direction: column;
        .top_line {
          width: 100%;
          display: flex;
          flex-direction: column;
          .span1 {
            color: #ffffff;
          }
          .span2 {
            color: #ccbebe;
          }
        }
        .swiper-container {
          width: 100%;
          height: auto;
          margin-bottom: 0.4rem;
          .swiper-wrapper {
            .swiper-slide {
              width: 40%;
              height: 100%;
              .swiper_content_box {
                position: relative;
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 0.14rem;
                .swiper_img {
                  width: 100%;
                  object-fit: contain;
                }
                .bottom{
                  position: absolute;
                  top: 0.15rem;
                  display: flex;
                  align-items: center;
                  padding:0.1rem 0.08rem;
                  transform:translate(0,-50%) scale(0.4);
                  .five_pointed_star{
                    display: flex;
                    align-items: center;
                    .start_img{
                      width: 0.18rem;
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
                      border-radius: 0.1rem;
                      opacity: 0.56;
                      .imgcard{
                        width: 0.23rem;
                        object-fit: contain;
                      }
                      .span1{
                        color: #FFFFFF;
                      }
                    }
                  }
                }
                .select_img {
                  position: absolute;
                  right: 0;
                  top: 0;
                  width: 0.2rem;
                  object-fit: contain;
                }
              }
            }
            // .swiper-slide-active {
            //   transform: scale(1.2);
            //   margin: 0 30px;
            // }
          }
        }
      }
    }
    .btn_box {
      width: 1.94rem;
      height: 0.38rem;
      line-height: 0.38rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: #ffffff;
      cursor: pointer;
      margin-top: 0.1rem;
    }
  }
}
</style>
