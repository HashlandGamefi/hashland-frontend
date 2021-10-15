<template>
  <div class='insertcard_page'>
    <div class="title_title">插入卡槽</div>
    <span class="title1_txt">选择您想要插入卡槽的卡牌</span>
    <span class="title1_txt title2_txt">卡牌增长系数越高，算力越高，收益越多</span>
    <div class="content_box">
      <div class="stratbox" v-for="(ele,index1) in arr" :key="index1">
        <div class="top_line">
          <span class="span1">{{ele.name}}星（共{{ele.num}}张）</span>
          <span class="span2">卡槽有限，可合成后再质押</span>
        </div>
        <!-- 卡牌轮播 -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in ele.gradeArr" :key="index">
              <div class="swiper_content_box">
                <img :src="item.src" class="swiper_img" />
                <img src="../../assets/images/select.png" class="select_img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_box">插入卡槽</div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  data () {
    return {
      arr:[
        {
          name:1,
          num:31,
          gradeArr:[
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
          ]
        },
        {
          name:2,
          num:10,
          gradeArr:[
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
          ],
        },
        {
          name:3,
          num:30,
          gradeArr:[
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
          ],
        },
        {
          name:4,
          num:40,
          gradeArr:[
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
          ],
        },
        {
          name:5,
          num:50,
          gradeArr:[
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
            {
              src:require("../../assets/images/record.png")
            },{
              src:require("../../assets/images/record.png")
            },
          ],
        }
      ]
    }
  },
  methods: {},
  mounted () {
    new Swiper('.swiper-container', {
      slidesPerView: 4,
      centeredSlides: true,
    })
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
                right: 0px;
                top: 19px;
                width: 100px;
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
