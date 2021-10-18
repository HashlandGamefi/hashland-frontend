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
        <div class="swiper-slide" v-for="(item,index) in gradeArr" :key="index">
          <div class="content_box" @click="jumpDetails(item)">
            <img :src="item.src" class="swiper_img" />
            <div class="grade_box">
              <div class="five_pointed_star">
                <img src="../../assets/images/start.png" v-for="(item,index) in item.level" :key="index"  class="start_img" />
              </div>
              <span class="card_grade">{{item.hold}}</span>
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
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in cardsoltArr" :key="index">
          <div class="outbox">
            <div class="second-content_box">
              <img :src="item.src" class="swiper_img" />
              <img src="../../assets/images/bottom.png" class="base_img" />
            </div>
            <div class="btnbox remove_btnbox" v-if="item.btnstatus == 1" @click="insertClick(item)">插入卡槽</div>
            <div class="btnbox insert_btnbox" v-if="item.btnstatus == 2">解除卡槽</div>
            <div class="btnbox lock_btnbox" v-if="item.btnstatus == 3" @click="Unlock(index)">解锁卡槽</div>
          </div>
        </div>
      </div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swiper from 'swiper'
import Vue from 'vue'
import { hn } from 'hashland-sdk';
export default {
  data () {
    return {
      gradeArr:[
        {
          src:require("../../assets/images/swiper1.png"),
          level:1,
          hold:0
        },
        {
          src:require("../../assets/images/swiper1.png"),
          level:2,
          hold:0
        },
        {
          src:require("../../assets/images/swiper1.png"),
          level:3,
          hold:0
        },
        {
          src:require("../../assets/images/swiper1.png"),
          level:4,
          hold:0
        },
        {
          src:require("../../assets/images/swiper1.png"),
          level:5,
          hold:0
        }
      ],
      cardsoltArr:[
        {
          src:'',//require("../../assets/images/record.png"),
          btnstatus:1,//1---插入卡槽 2----解除卡槽   3-----解锁卡槽
        },
        {
          src:require("../../assets/images/record.png"),
          btnstatus:2,//1---插入卡槽 2----解除卡槽   3-----解锁卡槽
        },
        {
          src:require("../../assets/images/cardlock.png"),
          btnstatus:3,//1---插入卡槽 2----解除卡槽   3-----解锁卡槽
        }
      ]
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  methods: {
    // 插入卡槽
    insertClick(item){
      this.$router.push('/insertcard')
    },
    // 合成
    synthesisClick(){
      this.$router.push('/synthesis')
    },
    // 我的卡牌跳转
    jumpDetails(item){
      console.log('item: ', item);
      // this.$router.push('/carddetails')
      this.$router.push({ path: '/carddetails', query: { 'level': item.level} })
    },
    Unlock(index){
      this.cardsoltArr[index].btnstatus = 1
      this.cardsoltArr[index].src = ''
      Vue.set(this.cardsoltArr,this.cardsoltArr.length,{
        src:require("../../assets/images/cardlock.png"),
        btnstatus:3,//1---插入卡槽 2----解除卡槽   3-----解锁卡槽
      })
      console.log('this.cardsoltArr: ', this.cardsoltArr);
    }
  },
  created () {
    hn().tokensOfOwnerBySize(this.getAccount,0,100000000).then( async res => {//0代表第一次拿数据  100000000代表用户所拥有的全部卡的id
      console.log('用户卡牌res: ', res);
      let arr = []
      for(let i = 0;i < res[0].length;i++){
        let obj = {}
        obj.level = await hn().level(res[0][i])
        arr.push(obj)
      }
      arr.forEach(item => {
        if(item.level == 1){
          this.gradeArr[0].hold++
        }
        if(item.level == 2){
          this.gradeArr[1].hold++
        }
        if(item.level == 3){
          this.gradeArr[2].hold++
        }
        if(item.level == 4){
          this.gradeArr[3].hold++
        }
        if(item.level == 5){
          this.gradeArr[4].hold++
        }
      })
      console.log('arr:', arr);
    }).catch(err => {
      console.log('用户卡牌err: ', err);
    })
  },
  mounted () {
    new Swiper('.swiper-container', {
      // loop: true,//循环播放
      // pagination: '.swiper-pagination',// 如果需要分页器
      // 如果需要前进后退按钮
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      slidesPerView : 3,
      // slidesOffsetBefore : 100,
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
        font-size: 40px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        line-height: 56px;
        letter-spacing: 5px;
      }
      .span2 {
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ccbebe;
        line-height: 37px;
      }
    }
    .synthesis_btn {
      width: 196px;
      height: 84px;
      background-image: url("../../assets/images/nft_btn1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #ffffff;
      line-height: 84px;
      cursor: pointer;
    }
  }
  .swiper-container{
    width: 100%;
    height: 800px;
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
            margin-top: -70px;
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
              font-size: 40px;
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
            font-size: 40px;
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
              top: 25%;
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
            font-size: 40px;
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
  .margin_top_card{
    margin-top: -100px;
  }
}
</style>
