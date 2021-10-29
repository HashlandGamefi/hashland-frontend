<template>
  <div class="home_page">
    <div class="box">
      <div class="topbox">
        <img :src="`${$store.state.imgUrl}homebg.png`" class="homebgimg">
      </div>
      <div class="mobile_topbox">
        <img :src="`${$store.state.imgUrl}mobile_bg.png`" class="homebgimg">
      </div>
      <div class="content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in swiperArr" :key="index" @click="swiperClick(index)">
              <div class="left">
                <img :src="item.src" class="home1_img" />
                <div class="txtbox">
                  <span class="span1">{{$t(item.txt1)}}</span>
                  <div class="linebox">
                    <span class="span2">{{$t(item.txt2)}}</span>
                    <span class="span3">GO></span>
                  </div>
                </div>
              </div>
              <div class="mobile_box_swiper">
                <img :src="item.mobilesrc" class="mobileimg1" />
                <div class="mobile_box">
                  <span class="span1">{{$t(item.txt1)}}</span>
                  <span class="span1">{{$t(item.txt2)}}</span>
                </div>
                <div class="mobile_go">
                  <span class="span1">GO></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card_content">
      <div class="compositeCard">{{$t("message.nav.txt7")}}</div>
      <img :src="`${$store.state.imgUrl}compositecard.png`" class="img" />
      <div class="cardboxs">
        <div class="one_box">
          <div class="containbox">
            <img :src="`${$store.state.imgUrl}issue.png`" class="img" />
            <span class="span1">{{$t("message.home.txt6")}}</span>
          </div>
          <span class="span2 blue_color">{{issued}}</span>
        </div>
        <div class="one_box">
          <div class="containbox">
            <img :src="`${$store.state.imgUrl}sale.png`" class="img" />
            <span class="span1">{{$t("message.home.txt7")}}</span>
          </div>
          <span class="span2 red_color">{{sold}}</span>
        </div>
        <div class="one_box">
          <div class="containbox">
            <img :src="`${$store.state.imgUrl}destroy.png`" class="img" />
            <span class="span1">{{$t("message.home.txt8")}}</span>
          </div>
          <span class="span2 purple_color">{{Destroy}}</span>
        </div>
      </div>
    </div>
    <div class="hashland_boxs">
      <div class="hashland_content">
        <img :src="`${$store.state.imgUrl}hashlandimg.png`" class="img" />
        <div class="Trend_chart">
          <span class="span1">{{$t("message.home.txt9")}}</span>
          <div class="span2">{{$t("message.home.txt10")}}</div>
        </div>
        <div class="trend_boxs">
          <div class="imgbox">
            <img :src="`${$store.state.imgUrl}lineChart.png`" class="img" />
            <span class="span1 span2">$15</span>
            <span class="span1 span3">$1.5</span>
          </div>
          <div class="nowPrice">
            <span class="span1">{{$t("message.home.txt11")}}</span>
            <span class="span2">5$</span>
            <span class="span1">{{$t("message.home.txt12")}}</span>
            <span class="span2">{{nextDay}}</span>
          </div>
        </div>
        <div class="hashland_bottom">
          <div class="onebox">
            <span class="span1">{{$t("message.home.txt13")}}</span>
            <span class="span2">{{todynums}}</span>
          </div>
          <div class="onebox">
            <span class="span1">{{$t("message.home.txt14")}}</span>
            <span class="span2">21,000,000/{{proportion}}%</span>
          </div>
          <div class="onebox">
            <span class="span1">{{$t("message.home.txt15")}}</span>
            <span class="span2">{{totalSupply}}</span>
          </div>
          <div class="onebox">
            <span class="span1">{{$t("message.home.txt16")}}</span>
            <span class="span2">{{hcDestroy}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page_bottom">
      <div class="embedded_box">
        <span class="span1">{{$t("message.home.txt17")}}</span>
        <div class="horizontal">
          <div class="horizontal_onebox">
            <div class="top">
              <img :src="`${$store.state.imgUrl}use1.png`" class="img" />
              <span class="span1_">{{$t("message.home.txt18")}}</span>
            </div>
            <span class="bottom">{{$t("message.home.txt19")}}</span>
          </div>
          <div class="horizontal_onebox">
            <div class="top">
              <img :src="`${$store.state.imgUrl}use2.png`" class="img" />
              <span class="span1_">GameFi</span>
            </div>
            <span class="bottom">{{$t("message.home.txt20")}}</span>
          </div>
          <div class="horizontal_onebox">
            <div class="top">
              <img :src="`${$store.state.imgUrl}use3.png`" class="img" />
              <span class="span1_">DAO</span>
            </div>
            <span class="bottom">{{$t("message.home.txt21")}}</span>
          </div>
          <div class="horizontal_onebox">
            <div class="top">
              <img :src="`${$store.state.imgUrl}use4.png`" class="img" />
              <span class="span1_">{{$t("message.home.txt22")}}</span>
            </div>
            <span class="bottom">{{$t("message.home.txt23")}}</span>
          </div>
        </div>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>
<script>
import { hc,hn } from 'hashland-sdk';
export default {
  data(){
    return {
      proupDis:false,// 弹窗展示消失变量
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      pageHeight:0,//当前可视区域的高度
      issued:0,//已发行
      Destroy:0,//已销毁
      sold:0,//待销售
      todynums:0,//今日产出
      totalSupply:0,//流通量
      hcDestroy:0,//hc销毁量
      proportion:0,//比例
      nextDay:'00-00-00',//下次减产时间
      swiperArr:[
        {
          mobilesrc:require('../../assets/images/mobilehome1.png'),
          src:require('../../assets/images/home1.png'),
          txt1:'message.nav.txt7',
          txt2:'message.home.txt1'
        },
        {
          mobilesrc:require('../../assets/images/mobilehome2.png'),
          src:require('../../assets/images/home2.png'),
          txt1:'message.home.txt2',
          txt2:'message.home.txt3'
        },
        {
          mobilesrc:require('../../assets/images/mobilehome3.png'),
          src:require('../../assets/images/home3.png'),
          txt1:'message.home.txt4',
          txt2:'message.home.txt5'
        }
      ]
    }
  },
  methods:{
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    swiperClick(index){
      switch(index){
        case 0:
          this.$router.push('/buy')
          break;
        case 1:
          this.$router.push('/nftmining')
          break;
        case 2:
          this.$common.selectLang('敬请期待','Coming soon',this)
          break;
        default:
          break;
      }
    },
    async getSDKInfo(){
      // 已发行
      hn().totalSupply().then(data => {
        this.$common.checkNumber(data.toString(),res => {
          this.issued = res
        })
      })

      // hn 已销毁
      hn().balanceOf('0x0000000000000000000000000000000000000002').then(data => {
        this.$common.checkNumber((data / 1e18).toString(),res => {
          this.Destroy = res
        })
      })

      // 流通量
      hc().totalSupply().then(data => {
        this.$common.checkNumber( (data / 1e18).toString(),res => {
          this.totalSupply = res
        })
        // 产出比
        this.proportion = this.$common.getBit((data / 1e18 / 21000000) * 100,4)
      })
      //hc 已销毁
      hc().balanceOf('0x0000000000000000000000000000000000000002').then(data => {
        this.$common.checkNumber((data / 1e18).toString(),res => {
          this.hcDestroy = res
        })
      })
      // 下次减产时间
      hc().getNextReductionLeftBlocks().then(data =>{
        // console.log('下次减产时间data: ', data * 3,Date.parse(new Date()));
        this.nextDay = this.$common.timeFormat(data * 3 + Date.parse(new Date()) / 1000,2)
      })
      // 今日产出
      let product = (await hc().getTokenPerBlock() / 1e18) * 28800
      // console.log('今日产出product: ', product.toString());
      this.$common.checkNumber( product.toString(),res => {
        this.todynums = res
      },4)
    }
  },
  mounted(){
    this.getSDKInfo()
    if(document.body.clientWidth <= 980){
      new Swiper('.swiper-container', {
        slidesPerView: 2,
        // centeredSlides: true,
        // slidesOffsetBefore: 100,
      })
    }else if(document.body.clientWidth > 980){
      new Swiper('.swiper-container', {
        slidesPerView: 3,
        // spaceBetween: '10%'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home_page{
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .box{
    width: 100%;
    .topbox{
      width: 100%;
      .homebgimg{
        width: 100%;
        object-fit: contain;
      }
    }
    .mobile_topbox{
      display: none;
    }
    .content{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
      padding: 0 100px;
      .swiper-container{
        width: 100%;
        .swiper-wrapper{
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .swiper-slide{
            width: 280px !important;
            .left{
              width: 237px;
              display: flex;
              flex-direction:column;
              padding-bottom: 20px;
              .home1_img{
                width: 100%;
                object-fit: contain;
              }
              .txtbox{
                width: 100%;
                padding:0 10px;
                display: flex;
                flex-direction: column;
                margin-top: -66px;
                .span1{
                  font-size: 18px;
                  font-family: PingFangSC-Semibold, PingFang SC;
                  font-weight: 600;
                  color: #FFFFFF;
                  line-height: 25px;
                  letter-spacing: 1px;
                }
                .linebox{
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .span2{
                    font-size: 18px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 25px;
                    letter-spacing: 1px;
                  }
                  .span3{
                    font-size: 20px;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #00E7F0;
                    line-height: 28px;
                    letter-spacing: 1px;
                  }
                }
              }
            }
            .mobile_box_swiper{
              display: none;
            }
          }
        }
      }
    }
  }
  .card_content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 25px;
    .compositeCard{
      width: 100%;
      font-size: 30px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 60px;
      padding-left: 40px;
    }
    .img{
      width: 722px;
      object-fit: contain;
    }
    .cardboxs{
      width: 1056px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: -90px;
      .one_box{
        width: 236px;
        height: 258px;
        box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.1), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
        border-radius: 14px;
        border-image: linear-gradient(180deg, rgba(139, 230, 254, 1), rgba(139, 230, 254, 0)) 1 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        .containbox{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          height: 66%;
          .img{
            width: 90px;
            object-fit: contain;
          }
          .span1{
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 42px;
          }
        }
        .span2{
          font-size: 36px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 42px;
        }
      }
    }
  }
  .hashland_boxs{
    width: 100%;
    margin-top: 100px;
    padding: 40px;
    .hashland_content{
      width: 100%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      .img{
        width: 252px;
        object-fit: contain;
      }
      .Trend_chart{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        margin-top: 20px;
        .span1{
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #19CDEC;
        }
        .span2{
          width: 115px;
          height: 56px;
          line-height: 56px;
          text-align: center;
          background-image: url("../../assets/images/extract_btn.png");
          background-size:100% 100%;
          // padding: 10px 20px;
          // padding-bottom: 16px;
          font-size: 24px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #fff;
          // display: flex;
          // align-items: center;
          // justify-content: center;
        }
      }
      .trend_boxs{
        width: 100%;
        display: flex;
        margin-top: 10px;
        .imgbox{
          flex: 2;
          position: relative;
          .img{
            width: 100%;
            object-fit: contain;
          }
          .span1{
            position: absolute;
            font-size: 32px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #19CDEC;
            line-height: 56px;
          }
          .span2{
            top: -16px;
            left: 49%;
          }
          .span3{
            bottom:-10px;
            left: 0;
          }
        }
        .nowPrice{
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          padding-right: 20px;
          .span1{
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 37px;
            margin-top: 30px;
          }
          .span2{
            font-size: 32px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #00E7F0;
            line-height: 56px;
          }
        }
      }
      .hashland_bottom{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 40px 0;
        .onebox{
          display: flex;
          flex-direction: column;
          .span1{
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 55px;
          }
          .span2{
            font-size: 32px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #00E7F0;
            line-height: 55px;
          }
        }
      }
    }
  }
  .page_bottom{
    width: 100%;
    padding: 40px;
    .embedded_box{
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
    .span1{
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #D8D8D8;
      line-height: 56px;
      letter-spacing: 2px;
    }
    .horizontal{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      .horizontal_onebox{
        width: 25%;
        height: 145px;
        display: flex;
        flex-direction: column;
        .top{
          display: flex;
          align-items: center;
          .img{
            width: 61px;
            object-fit: contain;
          }
          .span1_{
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 38px;
          }
        }
        .bottom{
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #DDD9D9;
          line-height: 28px;
          margin-left: 16px;
        }
      }
    }
  }
}
.blue_color{
  color: #14BEE1 !important;
}
.red_color{
  color: #CE4D99 !important;
}
.purple_color{
  color: #8E65FF !important;
}
@media screen and (max-width: 980px) {
  .home_page{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .box{
      width: 100%;
      .topbox{
        display: none;
      }
      .mobile_topbox{
        display: flex;
        width: 100%;
        height: 1.52rem;
        .homebgimg{
          width: 100%;
          object-fit: contain;
        }
      }
      .content{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.1rem;
        padding: 0 0.2rem;
        .swiper-container{
          width: 100%;
          .swiper-wrapper{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            .swiper-slide{
              width: 2rem !important;
              .left{
                display: none;
              }
              .mobile_box_swiper{
                width: 1.89rem;
                // width: 100%;
                display: flex;
                padding: 0.1rem;
                box-shadow: -15px 11px 12px 21px rgba(3, 21, 46, 0.76) inset, -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
                border-radius: 0.14rem;
                border: 1px solid rgba(139, 230, 254, 1);
                // border-image: linear-gradient(180deg, rgba(139, 230, 254, 1), rgba(139, 230, 254, 0)) 1 1;
                .mobileimg1{
                  width: 0.66rem;
                  object-fit: contain;
                }
                .mobile_box{
                  display: flex;
                  flex-direction: column;
                  .span1{
                    font-size: 0.12rem;
                    font-family: PingFangSC-Semibold, PingFang SC;
                    font-weight: 600;
                    color: #FFFFFF;
                    line-height: 0.17rem;
                  }
                }
                .mobile_go{
                  display: flex;
                  justify-content: flex-end;
                  align-items: flex-end;
                  .span1{
                    font-size: 0.12rem;
                    font-family: PingFangSC-Medium, PingFang SC;
                    font-weight: 500;
                    color: #00E7F0;
                    line-height: 0.17rem;
                  }
                }
              }
            }
          }
        }
      }
    }
    .card_content{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.2rem;
      margin-top: 0;
      .compositeCard{
        width: 100%;
        font-size: 0.18rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 0.3rem;
        letter-spacing: 4px;
        padding-left: 0;
      }
      .img{
        width: 3.5rem;
        object-fit: contain;
      }
      .cardboxs{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .one_box{
          width: 100%;
          height: 0.37rem;
          // box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22);
          border-radius: 14px;
          // border-image: linear-gradient(180deg, rgba(139, 230, 254, 1), rgba(139, 230, 254, 0)) 1 1;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 0.3rem 0.14rem;
          margin-bottom: 0.14rem;
          .containbox{
            display: flex;
            flex-direction: row;
            align-items: center;
            .img{
              width: 0.35rem;
              object-fit: contain;
            }
            .span1{
              font-size: 0.18rem;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #FFFFFF;
              line-height: 0.25rem;
              margin-left: 0.15rem;
            }
          }
          .span2{
            font-size: 0.18rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 0.25rem;
          }
        }
      }
    }
    .hashland_boxs{
      width: 100%;
      margin-top: 0;
      padding: 0.2rem;
      .hashland_content{
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        padding: 0 0.2rem;
        box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        .img{
          width: 1.5rem;
          object-fit: contain;
        }
        .Trend_chart{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0;
          margin-top: 0.1rem;
          .span1{
            font-size: 0.2rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #19CDEC;
          }
          .span2{
            width: 0.9rem;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            background-image: url("../../assets/images/extract_btn.png");
            background-size:100% 100%;
            font-size: 0.2rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #fff;
          }
        }
        .trend_boxs{
          width: 100%;
          display: flex;
          margin-top: 10px;
          .imgbox{
            flex: 2;
            position: relative;
            .img{
              width: 100%;
              object-fit: contain;
            }
            .span1{
              position: absolute;
              font-size: 0.2rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #19CDEC;
              line-height: 56px;
            }
            .span2{
              top: -0;
              left: 44%;
            }
            .span3{
              bottom:-0.1rem;
              left: 0;
            }
          }
          .nowPrice{
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding-right: 0;
            .span1{
              font-size: 0.14rem;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #FFFFFF;
              line-height: 37px;
              margin-top: 0.1rem;
            }
            .span2{
              font-size: 0.14rem;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #00E7F0;
              line-height: 0.18rem;
            }
          }
        }
        .hashland_bottom{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          margin: 0.2rem 0;
          .onebox{
            display: flex;
            flex-direction: column;
            .span1{
              font-size: 0.18rem;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #FFFFFF;
              line-height: 0.25rem;
            }
            .span2{
              font-size: 0.18rem;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #00E7F0;
              line-height: 0.25rem;
              margin-bottom: 0.2rem;
            }
          }
        }
      }
    }
    .page_bottom{
      width: 100%;
      padding: 0.2rem;
      .embedded_box{
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0.2rem;
        box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
      .span1{
        font-size: 0.2rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #D8D8D8;
        line-height: 0.28rem;
        letter-spacing: 2px;
      }
      .horizontal{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 0.2rem;
        .horizontal_onebox{
          display: flex;
          flex-direction: column;
          width: 100%;
          height: auto;
          .top{
            display: flex;
            align-items: center;
            .img{
              width: 0.45rem;
              object-fit: contain;
            }
            .span1_{
              font-size: 0.16rem;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #FFFFFF;
              line-height: 0.25rem;
            }
          }
          .bottom{
            font-size: 0.12rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #DDD9D9;
            line-height: 0.18rem;
            margin-left: 0.45rem;
          }
        }
      }
    }
  }
}
</style>
