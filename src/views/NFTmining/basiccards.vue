<template>
  <div class="basic_card_page">
    <!-- 卡牌 -->
    <div class="myCard">
      <div class="card_left">
        <span class="span1 fontsize22">{{$t("message.nftMining.txt3")}}</span>
        <span class="span2 fontsize12_400">{{$t("message.nftMining.txt4")}}</span>
      </div>
      <div class="synthesis_btn fontsize16" @click="synthesisClick">{{$t("message.nftMining.txt5")}}</div>
    </div>
    <!-- 我的卡牌轮播 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in slotArr" :key="index">
          <div class="content_box" @click="jumpDetails(item)">
            <img :src="item.src" class="swiper_img" />
            <div class="grade_box">
              <div class="five_pointed_star">
                <img :src="`${$store.state.imgUrl}start.png`" v-for="(ele,index1) in item.level" :key="index1"  class="start_img" />
              </div>
              <span class="card_grade fontsize16">{{item.num}}</span>
              <span class="details fontsize12">{{$t("message.nftMining.txt6")}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev" slot="button-prev">
      </div>
      <div class="swiper-button-next" slot="button-next"></div>
    </div>
    <!-- 卡槽 -->
    <div class="myCard margin_top_card">
      <div class="card_left">
        <span class="span1 fontsize22">{{$t("message.nftMining.txt7")}}</span>
        <span class="span2 fontsize12_400">{{$t("message.nftMining.txt8")}}</span>
      </div>
    </div>
    <!-- 卡槽轮播 -->
    <div class="swiper-container self_swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in cardsoltArr" :key="index">
          <div class="outbox">
            <div class="second-content_box">
              <img :src="item.src" class="swiper_img" v-if="item.btnstatus !== 3"/>
              <div class="bottom" v-if="item.btnstatus == 2">
                <div class="five_pointed_star">
                  <img :src="`${$store.state.imgUrl}start.png`" v-for="(item1,index1) in Number(item.level)" :key="index1" class="start_img" />
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
              <img :src="item.src" class="lock_swiper_img" v-if="item.btnstatus == 3"/>
              <img :src="`${$store.state.imgUrl}pledgebg.png`" class="base_img" />
            </div>
            <div class="btnbox remove_btnbox fontsize16" v-if="item.btnstatus == 1" @click="insertClick(item)">
              {{$t("message.nftMining.txt15")}}
            </div>
            <div class="btnbox insert_btnbox fontsize16" v-if="item.btnstatus == 2" @click="removeClick(item)">
              {{$t("message.nftMining.txt9")}}
              <BtnLoading :isloading="item.isloading"></BtnLoading>
            </div>
            <div class="btnbox lock_btnbox fontsize16" v-if="item.btnstatus == 3" @click="Unlock(item)">
              <span v-if="ISpprove">{{$t("message.nftMining.txt10")}}</span>
              <span v-else>{{$t("message.approve")}}</span>
              <BtnLoading :isloading="item.isloading"></BtnLoading>
            </div>
          </div>
        </div>
      </div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="sureBtnFun" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper from 'swiper'
import { hnPool,hn,getSigner,hc,util,contract } from 'hashland-sdk';
export default {
  data () {
    return {
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      cardsoltArr:[
        {
          src:'',
          btnstatus:1,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
          isloading:false
        },
        {
          src:'',
          btnstatus:1,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
          isloading:false
        },
        {
          src:`${this.$store.state.imgUrl}cardlock.png`,
          btnstatus:3,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
          isloading:false
        },
        {
          src:`${this.$store.state.imgUrl}cardlock.png`,
          btnstatus:3,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
          isloading:false
        },
        {
          src:`${this.$store.state.imgUrl}cardlock.png`,
          btnstatus:3,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
          isloading:false
        }
      ], // 卡槽数组
      cardSlot:0,//用户的卡槽数量
      emptyCardSlot:0,//用户的空卡槽数量
      maxCardSlot:0,//最大卡槽数量
      ISpprove:false,//解锁卡槽时候的是否授权
      buyHCMoney:0,//解锁所需hc金额
      proupBtnstatus:false, // 弹窗的确认按钮 是否可以关闭弹窗
      datainfo:{}, // 点击解锁按钮 存储的信息
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount","getUserCardInfo"]),
    slotArr(){//我的卡牌数组
      return [{
        level:1,
        src:`${this.$store.state.imgUrl}level1.png`,
        num:JSON.parse(this.getUserCardInfo).filter(data => {return data.level == 1}).length
      },
      {
        level:2,
        src:`${this.$store.state.imgUrl}defaultcard.png`,
        num:JSON.parse(this.getUserCardInfo).filter(data => {return data.level == 2}).length
      },{
        level:3,
        src:`${this.$store.state.imgUrl}defaultcard.png`,
        num:JSON.parse(this.getUserCardInfo).filter(data => {return data.level == 3}).length
      },
      {
        level:4,
        src:`${this.$store.state.imgUrl}defaultcard.png`,
        num:JSON.parse(this.getUserCardInfo).filter(data => {return data.level == 4}).length
      },{
        level:5,
        src:`${this.$store.state.imgUrl}defaultcard.png`,
        num:JSON.parse(this.getUserCardInfo).filter(data => {return data.level == 5}).length
      }
      ]
    }
  },
  watch:{
    'getIstrue':{
      handler: function (newValue, oldValue) {
        console.log('基础卡牌页面钱包是否链接:', newValue,oldValue);
        if(newValue){
          setTimeout(() => {
            this.getCardSlotInfo()
          },1500)
        }
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    // 确认按钮(弹窗)
    sureBtnFun(){
      if(this.proupBtnstatus){
        this.proupDis = false
        return
      }
      this.proupDis = false
      this.PickUpFoxFun()
    },
    // 插入卡槽
    insertClick(item){
      this.$router.push({ path: '/insertcard', query: { 'nums': this.emptyCardSlot} })
    },
    // 解除卡槽
    removeClick(item){
      console.log('解除卡槽item: ', item);
      if(item.isloading)return
      item.isloading = true
      hnPool().connect(getSigner()).withdraw([item.cardID]).then(async res => {
        console.log('解除卡槽res: ', res);
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.$common.selectLang('解除成功','Unlock Successful',this)
          item.isloading = false
          this.getCardSlotInfo()
          this.$common.getUserCardInfoFun(this.getAccount)
        }
      }).catch(err => {
        console.log('解除卡槽err: ', err);
        item.isloading = false
      })
    },
    // 解锁卡槽
    async Unlock(item){
      console.log('item: ', item);
      this.datainfo = item
      if(!this.ISpprove){
        if(item.isloading)return
        item.isloading = true
        this.$common.delegatingFun(2,contract().HNPool).then(res => {
          console.log('授权res: ', res);
          this.ISpprove = true
          this.$common.selectLang('授权成功','Authorize Successful',this)
          item.isloading = false
        }).catch(err => {
          console.log('授权err: ', err);
          this.ISpprove = false
          item.isloading = false
        })
        return
      }

      // 获取某用户购买新卡槽的HC金额
      this.buyHCMoney = (await hnPool().getUserSlotPrice(this.getAccount) / 1e18).toString()
      this.$common.selectLang('本次解锁共需' + this.buyHCMoney + 'HC','Craft needs to consume ' + this.buyHCMoney + ' HC',this)
    },
    async PickUpFoxFun(){
      this.datainfo.isloading = true
      let balance = util.formatEther(await hc().balanceOf(this.getAccount))
      if(Number(balance) < Number(this.buyHCMoney)){
        this.proupBtnstatus = true
        this.$common.selectLang('余额不足','Insufficent Balance',this)
        this.datainfo.isloading = false
        return
      }
      hnPool().connect(getSigner()).buySlot().then(async res => {
        const etReceipt = await res.wait();
        this.proupBtnstatus = true
        if(etReceipt.status == 1){
          this.$common.selectLang('解锁成功','Unlock Successful',this)
          this.getCardSlotInfo()
          this.datainfo.isloading = false
        }
      }).catch(() => {
        this.proupBtnstatus = false
        this.datainfo.isloading = false
      })
    },
    // 合成
    synthesisClick(){
      this.$router.push('/synthesis')
    },
    // 我的卡牌跳转
    jumpDetails(item){
      this.$router.push({ path: '/carddetails', query: { 'level': item.level, 'num':item.num} })
    },
    // 链接钱包才能拿到的数据获取方法
    async getCardSlotInfo(){
      this.cardsoltArr = []
      // 获取某用户的总卡槽数量cardSlot
      this.cardSlot = (await hnPool().getUserSlots(this.getAccount)).toString()
      // 获取某用户的空卡槽数量
      this.emptyCardSlot = (await hnPool().getUserLeftSlots(this.getAccount)).toString()
      // 获取最大卡槽数量
      this.maxCardSlot = (await hnPool().maxSlots()).toString()
      // 获取某用户在池子质押的基于指针（从0开始）和数量的HN卡牌ID数组和最后一个数据的指针
      let obj1 = {
        src:'',
        btnstatus:1,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
        isloading:false
      }
      // 添加空卡槽
      for (let index1 = 0; index1 < this.emptyCardSlot; index1++) {
        this.cardsoltArr.push(obj1)
      }
      // 是否添加解锁卡槽
      if(Number(this.cardSlot) < Number(this.maxCardSlot)){
        for (let index = 0; index < Number(this.maxCardSlot) - Number(this.cardSlot); index++) {
          let obj3 = {
            src:`${this.$store.state.imgUrl}cardlock.png`,
            btnstatus:3,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
            isloading:false
          }
          this.cardsoltArr.push(obj3)
        }
      }
      let res = await hnPool().getUserHnIdsBySize(this.getAccount,0,100000000)
      res[0].map(async item => {
        let obj = {
          src:'',
          cardID:'',
          level:'',
          hc:'',
          btc:'',
          btnstatus:2, //设置一个状态供需要的地方使用
          isloading:false,//按钮的loading
        }
        obj.cardID = item.toString() // 卡牌的id
        obj.level = (await hn().level(item.toString())).toString() // 等级
        let race = await hn().getHashrates(item)
        obj.hc = race[0].toString()// hc 算力
        obj.btc = race[1].toString()// btc 算力
        // obj.src = await getHnImg(Number(item),Number(obj.level))
        obj.src = `//cdn.hashland.com/nft/images/hashland-nft-${item.toString()}-${obj.level}.png`
        this.cardsoltArr.unshift(obj)
        console.log('卡槽中已质押的卡牌infoArr: ', this.cardsoltArr);
      })

      // 授权
      this.$common.isApproveFun(2,this.getAccount,contract().HNPool).then(res => {
        console.log('解锁是否授权res: ', res);
        if(res.toString() > 0){
          this.ISpprove = true
          console.log('解锁是否授权1');
        }else{
          this.ISpprove = false
          console.log('解锁是否授权2');
        }
      }).catch( err => {
        console.log('解锁是否授权err: ', err);
        this.ISpprove = false
      })
    }
  },
  mounted () {
    console.log('轮播页面当前窗口宽度:', document.body.clientWidth)// 当前窗口的宽度
    if(document.body.clientWidth <= 980){
      new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView : 2,
        observer:true, // 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
        observeParents:true,// 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
      })
    }else if(document.body.clientWidth > 980){
      new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView : 4,
        observer:true, // 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
        observeParents:true,// 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
      })
    }

  }
}
</script>
<style lang='scss' scoped>
.basic_card_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  .myCard {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    .card_left {
      display: flex;
      flex-direction: column;
      .span1 {
        color: #ffffff;
      }
      .span2 {
        color: #ccbebe;
        margin-top: 7px;
      }
    }
    .synthesis_btn {
      width: 144px;
      height: 49px;
      line-height: 49px;
      background-image: url(//cdn.hashland.com/images/nft_btn1.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .swiper-container{
    width: 100%;
    height: auto;
    padding:0 90px;
    .swiper-wrapper{
      .swiper-slide{
        width: 100%;
        height: 100%;
        .content_box{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          .swiper_img{
            width: 86%;
            object-fit: contain;
          }
          .grade_box{
            width: 228px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
            border-radius: 15px;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5),
        -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
            .five_pointed_star{
              display: flex;
              align-items: center;
              .start_img{
                width: 26px;
                object-fit: contain;
              }
            }
            .card_grade{
              color: #FFFFFF;
              margin: 0 10px;
            }
            .details{
              padding:0 10px;
              background: #F5B252;
              color: #FFFFFF;
              border-radius: 25px;
              cursor: pointer;
            }
          }
        }
        .outbox{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          margin-top: 120px;
          .second-content_box{
            position: relative;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            .swiper_img{
              position: absolute;
              top: 6%;
              left: 48%;
              transform: translate(-50%, -50%);
              width: 237px;
              object-fit: contain;
            }
            .bottom{
              position: absolute;
              top: -139px;
              display: flex;
              align-items: center;
              padding:10px 8px;
              transform: scale(0.6);
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
            .lock_swiper_img{
              position: absolute;
              top: 32%;
              left: 48%;
              transform: translate(-50%, -50%);
              width: 100px;
              object-fit: contain;
            }
            .base_img{
              width: 100%;
              object-fit: contain;
            }
          }
          .btnbox{
            width: 160px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 52px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color: #FFFFFF;
            cursor: pointer;
          }
          .remove_btnbox{
            background-image: url("//cdn.hashland.com/images/nft_btn1.png");
          }
          .insert_btnbox{
            background-image: url("//cdn.hashland.com/images/insert.png");
          }
          .lock_btnbox{
            background-image: url("//cdn.hashland.com/images/lock.png");
          }
        }
      }
    }
    .swiper-button-prev{
      width: 70px;
      height: 67px;
      background: url("//cdn.hashland.com/images/swiper_pre.png") no-repeat;
      background-size: 100% 100%;
    }
    .swiper-button-next{
      width: 70px;
      height: 67px;
      background: url("//cdn.hashland.com/images/swiper_next.png") no-repeat;
      background-size: 100% 100%;
    }
  }
  .self_swiper{
    height: auto;
    min-height: 300px;
    margin-top: 70px;
  }
  .margin_top_card{
    margin-top: 81px;
  }
}
@media screen and (max-width: 980px){
  .basic_card_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    .myCard {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.2rem;
      .card_left {
        width: 2rem;
        display: flex;
        flex-direction: column;
        .span1 {
          font-size: 0.2rem;


          color: #ffffff;
          line-height: 0.28rem;
        }
        .span2 {
          font-size: 0.14rem;


          color: #ccbebe;
          line-height: 0.2rem;
        }
      }
      .synthesis_btn {
        width: 1rem;
        height: 0.39rem;
        background-image: url("//cdn.hashland.com/images/nft_btn1.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        font-size: 0.18rem;


        color: #ffffff;
        line-height: 0.39rem;
        cursor: pointer;
      }
    }
    .swiper-container{
      width: 100%;
      height: auto;
      padding: 0 0.4rem;
      .swiper-wrapper{
        .swiper-slide{
          width: 100%;
          height: 100%;
          .content_box{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            .swiper_img{
              width: 100%;
              object-fit: contain;
            }
            .grade_box{
              padding: 0 0.15rem;
              display: flex;
              align-items: center;
              margin-top: 0.2rem;
              border-radius: 0.1rem;
              box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
              .five_pointed_star{
                display: flex;
                align-items: center;
                .start_img{
                  width: 0.13rem;
                  object-fit: contain;
                }
              }
              .card_grade{
                font-size: 0.12rem;


                color: #FFFFFF;
                line-height: 0.17rem;
                margin: 0 0.1rem;
              }
              .details{
                padding:0 0.1rem;
                background: #F5B252;
                font-size: 0.12rem;


                color: #FFFFFF;
                line-height: 0.12rem;
                border-radius: 0.25rem;
                cursor: pointer;
              }
            }
            .btnbox{
              width: 2rem;
              text-align: center;
              line-height: 0.48rem;
              background-size: contain;
              background-repeat: no-repeat;
              font-size: 0.12rem;


              color: #FFFFFF;
              cursor: pointer;
            }
            .remove_btnbox{
              background-image: url("//cdn.hashland.com/images/nft_btn1.png");
            }
            .insert_btnbox{
              background-image: url("//cdn.hashland.com/images/insert.png");
            }
            .lock_btnbox{
              background-image: url("//cdn.hashland.com/images/lock.png");
            }
          }
          .outbox{
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin-top: 1rem;
            .second-content_box{
              position: relative;
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: flex-end;
              margin-bottom: 0.2rem;
              .swiper_img{
                position: absolute;
                top: 18%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 1rem;
                object-fit: contain;
              }
              .base_img{
                width: 100%;
                object-fit: contain;
              }
            }
            .btnbox{
              width: 1rem;
              text-align: center;
              line-height: 0.24rem;
              background-size: 100% 100%;
              background-repeat: no-repeat;
              font-size: 0.14rem;


              color: #FFFFFF;
              cursor: pointer;
            }
            .remove_btnbox{
              background-image: url("//cdn.hashland.com/images/nft_btn1.png");
            }
            .insert_btnbox{
              background-image: url("//cdn.hashland.com/images/insert.png");
            }
            .lock_btnbox{
              background-image: url("//cdn.hashland.com/images/lock.png");
            }
          }
        }
      }
      .swiper-button-prev{
        width: 0.45rem;
        height: 0.45rem;
        background: url("//cdn.hashland.com/images/swiper_pre.png") no-repeat;
        background-size: 100% 100%;
      }
      .swiper-button-next{
        width: 0.45rem;
        height: 0.45rem;
        background: url("//cdn.hashland.com/images/swiper_next.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .self_swiper{
      height: auto;
      min-height: 3rem;
      margin-top: 0;
    }
    .margin_top_card{
      margin-top: 0.5rem;
    }
  }
}
</style>
