<template>
  <div class="insertcard_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}back.png`" class="backimg" />
    </div>
    <div class="title_title">{{$t("message.insert.txt1")}}</div>
    <span class="title1_txt">{{$t("message.insert.txt2")}}</span>
    <span class="title1_txt title2_txt"
      >{{$t("message.insert.txt3")}}</span
    >
    <div class="content_box">
      <div class="stratbox" v-for="ele in 5" :key="ele">
        <div class="top_line">
          <span class="span1"
            >{{ ele }}{{$t("message.synthesis.txt4")}}{{$t("message.synthesis.txt8")}}{{
              starArr.filter((data) => {
                return data.level == ele;
              }).length
            }}</span
          >
          <span class="span2">{{$t("message.nftMining.txt8")}}</span>
        </div>
        <!-- 卡牌轮播 -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in starArr.filter((data) => {
                return data.level == ele;
              })"
              :key="index"
            >
              <div class="swiper_content_box" @click="cardClick(item, index, index1)">
                <img :src="item.src" class="swiper_img" />
                <img :src="item.status?`${$store.state.imgUrl}selected.png`:`${$store.state.imgUrl}select.png`" class="select_img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_box" @click="insertFun">
      <span v-if="!getIstrue">Connect</span>
      <span v-else-if="!isbtnstatus">{{$t("message.approve")}}</span>
      <span v-else>{{$t("message.nftMining.txt15")}}</span>
      <BtnLoading :isloading="approve_isloading"></BtnLoading>
    </div>
    <Proup
      :btntxt="btntxt"
      :word="word"
      :proupDis="proupDis"
      @closedis="CloseFun"
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
      btntxt: '',// 弹窗页面的确认按钮
      word: '',//弹窗提示文字
      proupDis: false,// 弹窗展示消失变量
      starArr: [],//用户卡牌数组
      cardIdArr: [],// 选中的卡牌id数组
      isbtnstatus: false,// 按钮的文字状态
      approve_isloading: false,// 按钮的loading
      mySwiper: 0,//swiper对象
    }
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount", "getUserCardInfo"]),
    dataInfo: function () {
      return this.getUserCardInfo
    }
  },
  watch: {
    "dataInfo": {
      handler: function (newValue, oldValue) {
        if (newValue.length > 0) {
          if (newValue.length > 0) {
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
    setFilterFun (level, newValue) {
      let obj = { level: level, ownerNum: [] }
      obj.ownerNum = JSON.parse(newValue).filter(item => {
        return item.level == level
      })
      this.starArr.push(obj)
      console.log('页面的数组:this.starArr: ', this.starArr);
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
            this.$common.getUserCardInfoFun(this.getAccount)
          }
          // console.log('etReceipt: ', etReceipt);
          // console.log(etReceipt.confirmations, 'Blocks Confirmations');
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
        console.log('是否授权res: ', res);
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
    swiperFun () {
      if (this.mySwiper !== 0) {
        this.mySwiper.destroy();
      }
      this.mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 4,
        // loop : true,
        slidesOffsetBefore: 20,
        centeredSlides: true,
        centeredSlidesBounds: true,
        observer: true,
        observeParents: true,
      })
    },
  },
  async mounted () {
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
.insertcard_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
  .title {
    position: absolute;
    top: 160px;
    left: 90px;
    width: 121px;
    cursor: pointer;
    .backimg {
      width: 100%;
      object-fit: contain;
    }
  }
  .title_title {
    font-size: 40px;
    font-family: AaJXH;
    color: #ffffff;
    line-height: 73px;
    letter-spacing: 4px;
    // text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    // background: linear-gradient(180deg, #e5ffff 0%, #81c6e3 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    margin-bottom: 20px;
  }
  .title1_txt {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fff;
    line-height: 37px;
    // -webkit-text-stroke: 1px #092868;
    // text-stroke: 1px #092868;
    // background: linear-gradient(180deg, #e5ffff 0%, #81c6e3 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
  .title2_txt {
    margin-top: 10px;
  }
  .content_box {
    width: 100%;
    max-height: 800px;
    overflow: auto;
    padding: 50px 100px;
    display: flex;
    flex-direction: column;
    .stratbox {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 50px;
      .top_line {
        width: 100%;
        display: flex;
        flex-direction: column;
        .span1 {
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 56px;
          letter-spacing: 5px;
        }
        .span2 {
          font-size: 24px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ccbebe;
          line-height: 37px;
        }
      }
      .swiper-container {
        width: 100%;
        height: auto;
        .swiper-wrapper {
          .swiper-slide {
            width: 100%;
            height: 100%;
            margin-right: 20px;
            .swiper_content_box {
              position: relative;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top: 40px;
              .swiper_img {
                width: 350px;
                object-fit: contain;
              }
              .select_img {
                position: absolute;
                right: 100px;
                top: 31px;
                width: 43px;
                object-fit: contain;
              }
            }
          }
          .swiper-slide-active {
            transform: scale(1.2);
            margin: 0 30px;
          }
        }
      }
    }
  }
  .btn_box {
    width: 533px;
    height: 102px;
    text-align: center;
    line-height: 102px;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
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
  padding-top: 1rem;
  .title {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    width: 0.36rem;
    cursor: pointer;
    .backimg {
      width: 100%;
      object-fit: contain;
    }
  }
  .title_title {
    font-size: 0.32rem;
    font-family: AaJXH;
    color: #ffffff;
    line-height: 0.5rem;
    letter-spacing: 0;
    margin-bottom: 0.2rem;
  }
  .title1_txt {
    font-size: 0.16rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fff;
    line-height: 0.22rem;
  }
  .title2_txt {
    margin-top: 0.1rem;
  }
  .content_box {
    width: 100%;
    max-height: 8rem;
    overflow: auto;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    .stratbox {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 0.1rem;
      .top_line {
        width: 100%;
        display: flex;
        flex-direction: column;
        .span1 {
          font-size: 0.2rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 0.28rem;
          letter-spacing: 0;
        }
        .span2 {
          font-size: 0.14rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ccbebe;
          line-height: 0.2rem;
        }
      }
      .swiper-container {
        width: 100%;
        height: auto;
        .swiper-wrapper {
          .swiper-slide {
            width: 100%;
            height: 100%;
            margin-right: 0.2rem;
            .swiper_content_box {
              position: relative;
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              margin-top: 0.2rem;
              .swiper_img {
                width: 1rem;
                object-fit: contain;
              }
              .select_img {
                position: absolute;
                right: 0.09rem;
                top: 0.08rem;
                width: 0.13rem;
                object-fit: contain;
              }
            }
          }
          .swiper-slide-active {
            transform: scale(1.1);
            // margin: 0 0.2rem;
          }
        }
      }
    }
  }
  .btn_box {
    width: 1.8rem;
    height: 0.36rem;
    text-align: center;
    line-height: 0.36rem;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    font-size: 0.18rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    margin-top: 0;
  }
}
}
</style>
