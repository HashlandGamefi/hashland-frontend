<template>
  <div class="insertcard_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <div class="title_title fontsize32">{{ $t("message.insert.txt1") }}</div>
    <!-- <span class="title1_txt fontsize12_400">{{ $t("message.insert.txt2") }}</span> -->
    <span class="title1_txt title2_txt fontsize12_400">{{ $t("message.insert.txt3") }}</span>
    <div class="content_box">
      <div class="stratbox" v-for="(ele,index1) in 5" :key="index1">
        <div class="top_line">
          <span class="span1 fontsize22">{{ $t("message.synthesis.txt4")}} {{ ele }} ({{ $t("message.synthesis.txt8")}} {{
              starArr.filter((data) => {
                return data.level == ele;
              }).length
            }})</span
          >
          <span class="span2 fontsize12_400">{{ $t("message.nftMining.txt8") }}</span>
        </div>
        <!-- 卡牌轮播 -->
        <div class="swiper-container">
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
                <!-- <div class="bottom">
                  <div class="five_pointed_star">
                    <img :src="`${$store.state.imgUrl}start.png`" v-for="item1 in ele" :key="item1" class="start_img" />
                  </div>
                  <div class="hc_btc_box">
                    <div class="hc_coefficient">
                      <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
                      <span class="span1 fontsize12_400">{{item.hc}}</span>
                    </div>
                    <div class="hc_coefficient">
                      <img :src="`${$store.state.imgUrl}btclogo.png`" class="imgcard" />
                      <span class="span1 fontsize12_400">{{item.btc}}</span>
                    </div>
                  </div>
                </div> -->
                <img :src=" item.status ? `${$store.state.imgUrl}selected.png` : `${$store.state.imgUrl}select.png`" class="select_img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_box fontsize18" @click="insertFun">
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
    ...mapGetters(["getIstrue", "getAccount", "getUserCardInfo"])
  },
  watch: {
    'getIstrue':{
      handler: function (newValue, oldValue) {
        console.log('插入页面的连接:', newValue,oldValue);
        if(newValue){
          setTimeout(() => {
            this.getconnetFun()
            let res = JSON.parse(this.getUserCardInfo)
            this.starArr = res
          },1500)
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
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
    swiperFun (type) {
      if (this.mySwiper !== 0) {
        this.mySwiper.destroy();
      }
      if(type == 'mobile'){
        this.mySwiper = new Swiper('.swiper-container', {
          slidesPerView: 'auto',
          observer: true,
          observeParents: true,
        })
      }else{
        this.mySwiper = new Swiper('.swiper-container', {
          slidesPerView: 4,
          // slidesOffsetAfter: 100,
          // slidesOffsetBefore: 100,
          // centeredSlides: true,
          // centeredSlidesBounds: true,
          observer: true,
          observeParents: true,
        })
      }

    },
  },
  async mounted () {
    if(document.body.clientWidth <= 980){
      this.swiperFun('mobile')
    }else if(document.body.clientWidth > 980){
      this.swiperFun('pc')
    }
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
                width: 237px;
                object-fit: contain;
              }
              .bottom{
                position: absolute;
                top: 0;
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
                      color: #FFFFFF;
                    }
                  }
                }
              }
              .select_img {
                position: absolute;
                right: 0;
                top: 0;
                width: 31px;
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
    .content_box {
      width: 100%;
      max-height: 6rem;
      overflow: auto;
      padding: 0.2rem;
      padding-top: 0.4rem;
      display: flex;
      flex-direction: column;
      .stratbox {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 0.4rem;
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
          .swiper-wrapper {
            .swiper-slide {
              width: 40%;
              height: 100%;
              margin-right: 0;
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
