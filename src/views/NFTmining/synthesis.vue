<template>
  <div class="insertcard_page">
    <div class="title_title">合成</div>
    <p>xinpureZhu</p>
    <div class="content_box">
      <div class="stratbox" v-for="(ele, index1) in arr" :key="index1">
        <div class="leftbox">
          <div class="top_line">
            <span class="span1">{{ ele.name }}星（共{{ ele.num }}张）</span>
            <span class="span2">卡槽有限，可合成后再质押</span>
          </div>
          <div class="right_smallbox">
            <img src="../../assets/images/selsected.png" class="selectedimg" />
            <span class="span1">全选/取消</span>
          </div>
        </div>
        <!-- 卡牌轮播 -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in ele.gradeArr"
              :key="index"
            >
              <div class="swiper_content_box">
                <img :src="item.src" class="swiper_img" />
                <img src="../../assets/images/select.png" class="select_img" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom_txtbox">
          <div class="bottom_txt1">
            <span class="span1">选中卡牌</span>
            <span class="span2">28</span>
          </div>
          <div class="bottom_txt2">
            合成后，{{ ele.name }}星卡牌消失，合成0张{{
              ele.name + 1
            }}星卡牌，算力总提升15%
          </div>
        </div>
      </div>
    </div>
    <div class="btn_box">合成</div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  data () {
    return {
      arr: [
        {
          name: 1,
          num: 31,
          gradeArr: [
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
          ]
        },
        {
          name: 2,
          num: 10,
          gradeArr: [
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
          ],
        },
        {
          name: 3,
          num: 30,
          gradeArr: [
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
          ],
        },
        {
          name: 4,
          num: 40,
          gradeArr: [
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
          ],
        },
        {
          name: 5,
          num: 50,
          gradeArr: [
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
            },
            {
              src: require("../../assets/images/record.png")
            }, {
              src: require("../../assets/images/record.png")
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
.insertcard_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
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
      margin-bottom: 80px;
      .leftbox {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .top_line {
          width: 50%;
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
        .right_smallbox {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .span1 {
            font-size: 40px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            line-height: 56px;
          }
          .selectedimg {
            width: 100px;
            object-fit: contain;
          }
        }
      }
      .swiper-container {
        width: 100%;
        height: 500px;
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
                width: 250px;
                object-fit: contain;
              }
              .select_img {
                position: absolute;
                right: 0px;
                top: 19px;
                width: 100px;
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
    }
  }
  .btn_box {
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
p {
  font-family: "Audiowide";
  text-align: center;
  color: #81C6E3;
  font-size: 7em;
  transition: all 1.5s ease;animation: Glow 1.5s ease infinite alternate;
}
@keyframes Glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #81C6E3,
      0 0 70px #81C6E3, 0 0 80px #81C6E3, 0 0 100px #81C6E3, 0 0 150px #81C6E3;
  }
  to {
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #81C6E3,
      0 0 35px #81C6E3, 0 0 40px #81C6E3, 0 0 50px #81C6E3, 0 0 75px #81C6E3;
  }
}
</style>
