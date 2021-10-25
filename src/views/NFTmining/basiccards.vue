<template>
  <div class="basic_card_page">
    <!-- 卡牌 -->
    <div class="myCard">
      <div class="card_left">
        <span class="span1">我的钱包卡牌</span>
        <span class="span2">未插入卡槽不产生收益</span>
      </div>
      <div class="synthesis_btn" @click="synthesisClick">合成升级</div>
    </div>
    <!-- 我的卡牌轮播 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in 5" :key="item">
          <div class="content_box" @click="jumpDetails(item)">
            <img src="../../assets/images/swiper1.png" class="swiper_img" />
            <div class="grade_box">
              <div class="five_pointed_star">
                <img src="../../assets/images/start.png" v-for="ele in item" :key="ele"  class="start_img" />
              </div>
              <span class="card_grade">{{gradeArr.filter(data => {return data.level == item}).length}}</span>
              <span class="details">详情</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <!-- <div class="swiper-pagination"></div> -->

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- 如果需要滚动条 -->
      <!--    <div class="swiper-scrollbar"></div>-->
    </div>
    <!-- 卡槽 -->
    <div class="myCard margin_top_card">
      <div class="card_left">
        <span class="span1">我的卡槽卡牌</span>
        <span class="span2">卡槽有限，可合成后再质押</span>
      </div>
    </div>
    <!-- 卡槽轮播 -->
    <div class="swiper-container self_swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in cardsoltArr" :key="index">
          <div class="outbox">
            <div class="second-content_box">
              <img :src="item.src" class="swiper_img" />
              <img src="../../assets/images/bottom.png" class="base_img" />
            </div>
            <div class="btnbox remove_btnbox" v-if="item.btnstatus == 1" @click="insertClick(item)">插入卡槽</div>
            <div class="btnbox insert_btnbox" v-if="item.btnstatus == 2" @click="removeClick(item)">
              解除卡槽<BtnLoading :isloading="item.isloading"></BtnLoading>
            </div>
            <div class="btnbox lock_btnbox" v-if="item.btnstatus == 3" @click="Unlock(index)">
              解锁卡槽<BtnLoading :isloading="item.isloading"></BtnLoading></div>
          </div>
        </div>
      </div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper from 'swiper'
import Vue from 'vue'
import { hnPool,hn,getSigner,hc,util,contract,getHnImg } from 'hashland-sdk';
export default {
  data () {
    return {
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      gradeArr:[], // 我的钱包卡牌
      cardsoltArr:[], // 卡槽数组
      cardSlot:0,//用户的卡槽数量
      emptyCardSlot:0,//用户的空卡槽数量
      maxCardSlot:0,//最大卡槽数量
      ISpprove:false,//解锁卡槽时候的是否授权
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
        // console.log('基础卡牌的我的卡牌newValue: ', newValue);
        if(newValue.length > 0){
          let res = JSON.parse(newValue)
          this.gradeArr = res
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
          this.$common.selectLang('解除成功','1223',this)
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
    async Unlock(index){
      // 获取某用户购买新卡槽的HC金额
      let buyMoney = (await hnPool().getUserSlotPrice(this.getAccount) / 1e18).toString()
      // 获取用户的hc余额
      let balance = util.formatEther(await hc().balanceOf(this.getAccount))
      console.log('buyMoney:%s,balance:%s',buyMoney, balance);

      if(Number(balance) < Number(buyMoney)){
        this.$common.selectLang('余额不足','1223',this)
        return
      }
      if(!this.ISpprove){
        this.$common.delegatingFun(2,contract().HNPool).then(res => {
          console.log('授权res: ', res);
          // this.approve_isloading = false
          this.ISpprove = true
          this.$common.selectLang('授权成功','1223',this)
        }).catch(err => {
          console.log('授权err: ', err);
          this.ISpprove = false
          // this.approve_isloading = false
        })
        return
      }
      hnPool().connect(getSigner()).buySlot().then(async res => {
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.$common.selectLang('解锁成功','1223',this)
          // 暂时先本地更改后续优化
          this.cardsoltArr[index].btnstatus = 1
          this.cardsoltArr[index].src = ''
          this.cardsoltArr[index].isloading = false
          this.cardSlot = (await hnPool().getUserSlots(this.getAccount)).toString()
          console.log('Number(this.maxCardSlot): ', Number(this.maxCardSlot),Number(this.cardSlot));
          if(Number(this.maxCardSlot) > Number(this.cardSlot)){
            Vue.set(this.cardsoltArr,this.cardsoltArr.length,{
              src:require("../../assets/images/cardlock.png"),
              btnstatus:3,//1---插入卡槽 2----解除卡槽   3-----解锁卡槽
            })
          }
        }
      })
    },
    // 合成
    synthesisClick(){
      this.$router.push('/synthesis')
    },
    // 我的卡牌跳转
    jumpDetails(item){
      this.$router.push({ path: '/carddetails', query: { 'level': item.level} })
    },
    async getCardSlotInfo(){
      this.cardsoltArr = []
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
        obj.level = (await hn().level(item)).toString() // 等级
        let race = await hn().getHashrates(item)
        obj.hc = race[0].toString()// hc 算力
        obj.btc = race[1].toString()// btc 算力
        obj.src = await getHnImg(Number(item),Number(obj.level))
        this.cardsoltArr.push(obj)
        console.log('卡槽中已质押的卡牌infoArr: ', this.cardsoltArr);
      })
      // 获取某用户的总卡槽数量cardSlot
      this.cardSlot = (await hnPool().getUserSlots(this.getAccount)).toString()
      // console.log('获取某用户的总卡槽数量cardSlotcardSlot: ', cardSlot);
      // 获取某用户的空卡槽数量
      this.emptyCardSlot = (await hnPool().getUserLeftSlots(this.getAccount)).toString()
      // console.log('获取某用户的空卡槽数量emptyCardSlot: ', emptyCardSlot);
      // 获取最大卡槽数量
      this.maxCardSlot = (await hnPool().maxSlots()).toString()
      // console.log('获取最大卡槽数量maxCardSlot: ', maxCardSlot);
      // 获取某用户在池子质押的基于指针（从0开始）和数量的HN卡牌ID数组和最后一个数据的指针
      let obj1 = {
        src:'',
        btnstatus:1,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
        isloading:false
      }
      let obj3 = {
        src:require("../../assets/images/cardlock.png"),
        btnstatus:3,//1---插入卡槽  2------已质押卡槽  3-----解锁卡槽
        isloading:false
      }
      // 添加空卡槽
      for (let index1 = 0; index1 < this.emptyCardSlot; index1++) {
        this.cardsoltArr.push(obj1)
      }
      // 是否添加解锁卡槽
      if(Number(this.cardSlot) < Number(this.maxCardSlot)){
        this.cardsoltArr.push(obj3)
      }
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
    this.getCardSlotInfo()
    new Swiper('.swiper-container', {
      // loop: true,//循环播放
      // pagination: '.swiper-pagination',// 如果需要分页器
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView : 4,
      slidesOffsetBefore : 100,
      // centeredSlides : true,
      //如果需要自动切换海报
      // autoplay: {
      //   delay: 20000,//时间 毫秒
      //   disableOnInteraction: false,//用户操作之后是否停止自动轮播默认true
      // },
      observer:true, // 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
      observeParents:true,// 将observe应用于Swiper的祖先元素。当Swiper的祖先元素变化时，例如window.resize，Swiper更新。
    })
  }
}
</script>

<style lang='scss' scoped>
.basic_card_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 160px;
  .myCard {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    .card_left {
      width: 320px;
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
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ccbebe;
        line-height: 37px;
      }
    }
    .synthesis_btn {
      width: 115px;
      height: 56px;
      background-image: url("../../assets/images/nft_btn1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 24px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 56px;
      cursor: pointer;
    }
  }
  .swiper-container{
    width: 100%;
    height: auto;
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
            padding: 0 15px;
            display: flex;
            align-items: center;
            margin-top: 20px;
            border-radius: 15px;
            box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
            .five_pointed_star{
              display: flex;
              align-items: center;
              .start_img{
                width: 26px;
                object-fit: contain;
              }
            }
            .card_grade{
              font-size: 26px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #FFFFFF;
              line-height: 56px;
              margin: 0 10px;
            }
            .details{
              padding:0 10px;
              background: #F5B252;
              font-size: 16px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #FFFFFF;
              line-height: 22px;
              border-radius: 25px;
              cursor: pointer;
            }
          }
          .btnbox{
            width: 238px;
            text-align: center;
            line-height: 84px;
            background-size: contain;
            background-repeat: no-repeat;
            font-size: 32px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            cursor: pointer;
          }
          .remove_btnbox{
            background-image: url("../../assets/images/nft_btn1.png");
          }
          .insert_btnbox{
            background-image: url("../../assets/images/insert.png");
          }
          .lock_btnbox{
            background-image: url("../../assets/images/lock.png");
          }
        }
        .outbox{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          margin-top: 130px;
          .second-content_box{
            position: relative;
            width: 100%;
            height: 500px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 50px;
            .swiper_img{
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              width: 320px;
              object-fit: contain;
            }
            .base_img{
              width: 100%;
              object-fit: contain;
            }
          }
          .btnbox{
            width: 238px;
            text-align: center;
            line-height: 84px;
            background-size: contain;
            background-repeat: no-repeat;
            font-size: 32px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            cursor: pointer;
          }
          .remove_btnbox{
            background-image: url("../../assets/images/nft_btn1.png");
          }
          .insert_btnbox{
            background-image: url("../../assets/images/insert.png");
          }
          .lock_btnbox{
            background-image: url("../../assets/images/lock.png");
          }
        }
      }
    }
  }
  .self_swiper{
    height: auto;
    min-height: 300px;
    margin-top: -178px;
  }
  .margin_top_card{
    margin-top: 50px;
  }
}
</style>
