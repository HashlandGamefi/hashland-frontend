<template>
  <div class="home_page">
    <div class="box">
      <div class="topbox">
        <img :src="`${$store.state.imgUrl}homebg.jpg`" class="homebgimg" />
      </div>
      <div class="mobile_topbox">
        <div class="mobile_pretend_img">
          <img :src="`${$store.state.imgUrl}mobile_bg.jpg`" class="homebgimg" />
        </div>
      </div>
      <div class="content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in swiperArr"
              :key="index"
              @click="swiperClick(index)"
            >
              <div class="left">
                <img :src="item.src" class="home1_img" />
                <div class="txtbox">
                  <span class="span1 fontsize16">{{ $t(item.txt1) }}</span>
                  <div class="linebox">
                    <span class="span2 fontsize12">{{ $t(item.txt2) }}</span>
                    <span class="span3 fontsize12_400">GO ></span>
                  </div>
                </div>
              </div>
              <div class="mobile_box_swiper">
                <img :src="item.mobilesrc" class="mobileimg1" />
                <div class="mobile_box">
                  <span class="span1 mobile_new_familay fontsize16">{{ $t(item.txt1) }}</span>
                  <span class="span1 fontsize12">{{ $t(item.txt2) }}</span>
                  <div class="mobile_go">
                    <span class="span1_go fontsize12_400">GO ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_boxs">
      <div class="card_content">
        <div class="compositeCard fontsize22">{{ $t("message.nav.txt7") }}</div>
        <img :src="`${$store.state.imgUrl}compositecard.png`" class="img" />
        <div class="cardboxs">
          <div class="out_boxs blue_borde" v-for="(item, index) in nftArr" :key="index">
            <div class="one_box">
              <div class="containbox">
                <img :src="item.src" class="img" />
                <span class="span1 fontsize12">{{$t(item.txt)}}</span>
              </div>
              <span class="span2 blue_color fontsize26">{{ item.num }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hashland_boxs">
        <div class="hashland_content">
          <div class="hashland_title">
            <div class="leftbox">
              <img :src="`${$store.state.imgUrl}hclogo.png`" class="img" />
              <span class="span1 fontsize26">{{ $t("message.home.txt26") }}</span>
            </div>
            <div class="span2 fontsize16" @click="buyClick">{{ $t("message.home.txt10") }}</div>
          </div>
          <div class="trend_boxs">
            <div class="imgbox">
              <img :src="`${$store.state.imgUrl}lineChart.png`" class="img" />
              <span class="span1 span2 fontsize12_400">$15</span>
              <span class="span1 span3 fontsize12_400">$1.5</span>
            </div>
            <div class="nowPrice">
              <span class="span1 fontsize12">{{ $t("message.home.txt11") }}</span>
              <span class="span1 fontsize16 span2">{{getCoinPrice.hc}}$</span>
              <span class="span1 fontsize12">{{ $t("message.home.txt12") }}</span>
              <span class="span1 fontsize16">{{ nextDay }}</span>
            </div>
          </div>
          <div class="hashland_bottom">
            <div class="onebox">
              <span class="span1 fontsize12">{{ $t("message.home.txt13") }}</span>
              <span class="span1 fontsize16">{{ todynums }}</span>
            </div>
            <div class="onebox">
              <span class="span1 fontsize12">{{ $t("message.home.txt14") }}</span>
              <span class="span1 fontsize16">21,000,000/{{ proportion }}%</span>
            </div>
            <div class="onebox">
              <span class="span1 fontsize12">{{ $t("message.home.txt15") }}</span>
              <span class="span1 fontsize16">{{ totalSupply }}</span>
            </div>
            <div class="onebox">
              <span class="span1 fontsize12">{{ $t("message.home.txt16") }}</span>
              <span class="span1 fontsize16">{{ hcDestroy }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="page_bottom">
        <div class="embedded_box">
          <span class="span1 fontsize22">{{ $t("message.home.txt17") }}</span>
          <div class="horizontal">
            <div class="horizontal_onebox" v-for="(item, index) in pagebottomArr" :key="index">
              <img :src="item.src" class="img" />
              <div class="footerboxs">
                <span class="span1_ fontsize16">{{ $t(item.txt1) }}</span>
                <span class="span1_ fontsize12">{{ $t(item.txt2) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card_content">
        <div class="compositeCard fontsize22">{{ $t("message.home.txt27") }}</div>
        <div class="partner_box">
          <div class="partner_class">
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner1.png`" class="partnerimg1 partnerimg"/></div>
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner2.png`" class="partnerimg2 partnerimg"/></div>
            <div class="imgbox img_center"><img :src="`${$store.state.imgUrl}partner17.png`" class="partnerimg3 partnerimg"/></div>
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner4.png`" class="partnerimg4 partnerimg"/></div>
          </div>
          <div class="partner_class">
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner5.png`" class="partnerimg5 partnerimg"/></div>
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner6.png`" class="partnerimg6 partnerimg"/></div>
            <div class="imgbox img_center"><img :src="`${$store.state.imgUrl}partner7.png`" class="partnerimg7 partnerimg"/></div>
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner8.png`" class="partnerimg8 partnerimg"/></div>
          </div>
          <div class="partner_class">
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner9.png`" class="partnerimg9 partnerimg"/></div>
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner10.png`" class="partnerimg10 partnerimg"/></div>
            <div class="imgbox img_center"><img :src="`${$store.state.imgUrl}partner11.png`" class="partnerimg11 partnerimg"/></div>
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner12.png`" class="partnerimg12 partnerimg"/></div>
          </div>
          <div class="partner_class">
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner13.png`" class="partnerimg13 partnerimg"/></div>
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner14.png`" class="partnerimg14 partnerimg"/></div>
            <div class="imgbox img_center"><img :src="`${$store.state.imgUrl}partner15.png`" class="partnerimg15 partnerimg"/></div>
            <div class="imgbox"><img :src="`${$store.state.imgUrl}partner3.png`" class="partnerimg16 partnerimg"/></div>
          </div>
        </div>
      </div>
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
import { hc, hn, info } from 'hashland-sdk';
export default {
  data () {
    return {
      proupDis: false,// 弹窗展示消失变量
      btntxt: '',// 弹窗页面的确认按钮
      word: '',//弹窗提示文字
      pageHeight: 0,//当前可视区域的高度
      // issued: 0,//已发行
      // Destroy: 0,//已销毁
      // sold: 0,//待销售
      todynums: 0,//今日产出
      totalSupply: 0,//流通量
      hcDestroy: 0,//hc销毁量
      proportion: 0,//比例
      nextDay: '00-00-00',//下次减产时间
      swiperArr: [
        {
          mobilesrc: `${this.$store.state.imgUrl}mobilehome1.png`,
          src: `${this.$store.state.imgUrl}home1.jpg`,
          txt1: 'message.nav.txt7',
          txt2: 'message.home.txt1'
        },
        {
          mobilesrc: `${this.$store.state.imgUrl}mobilehome2.png`,
          src: `${this.$store.state.imgUrl}home2.jpg`,
          txt1: 'message.home.txt2',
          txt2: 'message.home.txt3'
        },
        {
          mobilesrc: `${this.$store.state.imgUrl}mobilehome3.png`,
          src: `${this.$store.state.imgUrl}home3.jpg`,
          txt1: 'message.home.txt4',
          txt2: 'message.home.txt5'
        }
      ],
      nftArr:[
        {
          src:`${this.$store.state.imgUrl}issue.png`,
          txt:'message.home.txt6',
          num:0
        },
        {
          src:`${this.$store.state.imgUrl}sale.png`,
          txt:'message.home.txt7',
          num:0
        },
        {
          src:`${this.$store.state.imgUrl}destroy.png`,
          txt:'message.home.txt8',
          num:0
        }
      ],
      pagebottomArr:[
        {
          src:`${this.$store.state.imgUrl}use1.png`,
          txt1:'message.home.txt18',
          txt2:'message.home.txt19'
        },
        {
          src:`${this.$store.state.imgUrl}use2.png`,
          txt1:'message.home.txt20',
          txt2:'message.home.txt21'
        },
        {
          src:`${this.$store.state.imgUrl}use3.png`,
          txt1:'message.home.txt22',
          txt2:'message.home.txt23'
        },
        {
          src:`${this.$store.state.imgUrl}use4.png`,
          txt1:'message.home.txt24',
          txt2:'message.home.txt25'
        }
      ],
      partnerArr:[
        {src:`${this.$store.state.imgUrl}partner1.png`},
        {src:`${this.$store.state.imgUrl}partner2.png`},
        {src:`${this.$store.state.imgUrl}partner3.png`},
        {src:`${this.$store.state.imgUrl}partner4.png`},
        {src:`${this.$store.state.imgUrl}partner5.png`},
        {src:`${this.$store.state.imgUrl}partner6.png`},
        {src:`${this.$store.state.imgUrl}partner7.png`},
        {src:`${this.$store.state.imgUrl}partner8.png`},
        {src:`${this.$store.state.imgUrl}partner9.png`},
        {src:`${this.$store.state.imgUrl}partner10.png`},
        {src:`${this.$store.state.imgUrl}partner11.png`},
        {src:`${this.$store.state.imgUrl}partner12.png`},
        {src:`${this.$store.state.imgUrl}partner13.png`},
        {src:`${this.$store.state.imgUrl}partner14.png`},
        {src:`${this.$store.state.imgUrl}partner15.png`},
        {src:`${this.$store.state.imgUrl}partner16.png`}
      ]
    }
  },
  computed: {
    ...mapGetters(["getCoinPrice"]),
  },
  methods: {
    buyClick(){
      window.location.href = 'https://pancakeswap.finance/swap?inputCurrency=0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56&outputCurrency=0xA6e78aD3c9B4a79A01366D01ec4016EB3075d7A0'
    },
    // 取消按钮(关闭弹窗)
    CloseFun () {
      this.proupDis = false
    },
    swiperClick (index) {
      switch (index) {
        case 0:
          this.$router.push('/buy')
          break;
        case 1:
          this.$router.push('/nftmining')
          break;
        case 2:
          this.$common.selectLang('敬请期待', 'Coming soon', this)
          break;
        default:
          break;
      }
    },
    async getSDKInfo () {
      // 已发行
      hn().totalSupply().then(data => {
        this.$common.checkNumber(data.toString(), res => {
          console.log('1234245res: ', res);
          this.nftArr[0].num = res
          this.nftArr[1].num = 60000 - data.toString()
        })
      })

      // hn 已销毁
      hn().balanceOf('0x0000000000000000000000000000000000000010').then(data => {
        this.$common.checkNumber(data.toString(), res => {
          this.nftArr[2].num = res
        })
      })

      // 流通量
      hc().totalSupply().then(data => {
        this.$common.checkNumber((data / 1e18).toString(), res => {
          this.totalSupply = this.$common.getBit(res, 2)
        })
        // 产出比
        this.proportion = this.$common.getBit((data / 1e18 / 21000000) * 100, 2)
      })
      //hc 已销毁
      hc().balanceOf('0x0000000000000000000000000000000000000010').then(data => {
        this.$common.checkNumber((data / 1e18).toString(), res => {
          this.hcDestroy = this.$common.getBit(res, 2)
        })
      })
      // 下次减产时间
      hc().getNextReductionLeftBlocks().then(data => {
        // console.log('下次减产时间data: ', data * 3,Date.parse(new Date()));
        this.nextDay = this.$common.timeFormat(data * 3 + Date.parse(new Date()) / 1000, 2)
      })
      // 今日产出
      let product = (await hc().getTokenPerBlock() / 1e18) * 28800
      // console.log('今日产出product: ', product.toString());
      this.$common.checkNumber(product.toString(), res => {
        this.todynums = this.$common.getBit(res, 2)
      }, 4)
      // hc价格
      info.getHcPrice().then(res=>{
        console.log('hc价格res: ', res);
        this.hcNowPrice = res;
      }).catch(err => {
        console.log('hc价格err: ', err)
      })
    }
  },
  mounted () {
    this.getSDKInfo()
    if (document.body.clientWidth <= 980) {
      new Swiper('.swiper-container', {
        slidesPerView: 'auto'
      })
    } else if (document.body.clientWidth > 980) {
      new Swiper('.swiper-container', {
        slidesPerView: 3
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .box {
    width: 100%;
    .topbox {
      width: 100%;
      min-height: 300px;
      .homebgimg {
        width: 100%;
        object-fit: contain;
      }
    }
    .mobile_topbox{
      display: none;
    }
    .content {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top:66px;
      padding: 0 100px;
      .swiper-container {
        width: 100%;
        .swiper-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .swiper-slide {
            width: 280px !important;
            .left {
              width: 237px;
              display: flex;
              flex-direction: column;
              padding-bottom: 20px;
              height: 239px;
              cursor: pointer;
              .home1_img {
                width: 100%;
                border-radius: 15px 15px 0 0;
                object-fit: contain;
              }
              .txtbox {
                width: 100%;
                padding: 30px 10px;
                display: flex;
                flex-direction: column;
                box-shadow: -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
                border-radius: 0 0 15px 15px;
                .span1 {
                  color: #ffffff;
                }
                .linebox {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  margin-top:3px;
                  .span2 {
                    color: #ffffff;
                  }
                  .span3 {
                    color: #00e7f0;
                  }
                }
              }
            }
            .mobile_box_swiper {
              display: none;
            }
          }
        }
      }
    }
  }
  .content_boxs {
    width: 100%;
    display: flex;
    flex-direction: column;
    .card_content {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 102px;
      .compositeCard {
        width: 100%;
        color: #ffffff;
      }
      .img {
        width: 714px;
        object-fit: contain;
      }
      .cardboxs {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 26px;
        .out_boxs{
          padding: 1px;
          border-radius: 14px;
          margin-right: 52px;
          .one_box {
            width: 135px;
            height: 166px;
            box-shadow: -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
            border-radius: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 24px 0 21px 0;
            background: #001F43;
            .containbox {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              height: 63%;
              .img {
                width: 52px;
                object-fit: contain;
              }
              .span1 {
                color: #ffffff;
              }
            }
            .span2 {
              color: #ffffff;
            }
          }
        }
        .blue_borde{
          background: linear-gradient(180deg, #8BE6FE 0%, rgba(0, 30, 66, 0) 100%);
        }
      }
      .partner_box{
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 42px;
        .partner_class{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          .imgbox{
            width: 25%;
            .partnerimg{
              object-fit: contain;
              margin-bottom: 70px;
            }
            .partnerimg1{
              width: 235px;
            }
            .partnerimg2{
              width: 245px;
            }
            .partnerimg3{
              width: 177px;
            }
            .partnerimg4{
              width: 247px;
            }
            .partnerimg5{
              width: 185px;
            }
            .partnerimg6{
              width: 174px;
            }
            .partnerimg7{
              width: 179px;
            }
            .partnerimg8{
              width: 247px;
            }
            .partnerimg9{
              width: 196px;
            }
            .partnerimg10{
              width: 251px;
            }
            .partnerimg11{
              width: 92px;
            }
            .partnerimg12{
              width: 250px;
            }
            .partnerimg13{
              width: 174px;
            }
            .partnerimg14{
              width: 203px;
            }
            .partnerimg15{
              width: 176px;
            }
            .partnerimg16{
              width: 157px;
            }
          }
        }
      }
    }
    .hashland_boxs {
      width: 100%;
      margin-top: 91px;
      padding: 20px;
      border-radius: 6px;
      background: linear-gradient(90deg, #021F3E 0%, #01142A 100%, #034088 100%);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), -13px 16px 19px -2px rgba(2, 12, 23, 0.69), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
      .hashland_content {
        width: 100%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        .hashland_title{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .leftbox{
            display: flex;
            align-items: center;
            .img {
              width: 53px;
              object-fit: contain;
            }
            .span1{
              color: #D8D8D8;
              margin-left: 7px;
            }
          }
          .span2 {
            width: 144px;
            height: 49px;
            line-height:49px;
            text-align: center;
            background-image: url("//cdn.hashland.com/images/extract_btn.png");
            background-size: 100% 100%;
            color: #fff;
            cursor: pointer;
          }
        }
        .trend_boxs {
          width: 100%;
          display: flex;
          margin-top: 18px;
          padding-left: 163px;
          .imgbox {
            flex: 2;
            position: relative;
            .img {
              width: 100%;
              object-fit: contain;
            }
            .span1 {
              position: absolute;
              color: #19cdec;
            }
            .span2 {
              top: 0;
              left: 51%;
            }
            .span3 {
              bottom:10px;
              left: 4%;
            }
          }
          .nowPrice {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .span1 {
              color: #ffffff;
              margin-bottom: 4px;
            }
            .span2{
              margin-bottom: 83px;
            }
          }
        }
        .hashland_bottom {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 40px 0;
          .onebox {
            display: flex;
            flex-direction: column;
            .span1 {
              color: #ffffff;
              margin-top: 7px;
            }
          }
        }
      }
    }
    .page_bottom {
      width: 100%;
      padding: 20px;
      background: linear-gradient(180deg, #010F20 0%, #021C3B 100%) linear-gradient(90deg, #021F3E 0%, #01142A 100%, #034088 100%);
      box-shadow: -13px 10px 13px -2px rgba(2, 12, 23, 0.69), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
      border-radius: 6px;
      margin-top: 82px;
      .embedded_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        .span1 {
          color: #d8d8d8;
        }
        .horizontal {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 23px;
          .horizontal_onebox {
            width: 18%;
            height: 145px;
            display: flex;
            flex-direction: column;
            .img {
              width: 43px;
              object-fit: contain;
            }
            .footerboxs{
              display: flex;
              flex-direction: column;
              .span1_ {
                color: #ffffff;
                margin-top: 7px;
              }
            }
          }
        }
      }
    }
  }
}
.blue_color {
  color: #14bee1 !important;
}
.red_color {
  color: #ce4d99 !important;
}
.purple_color {
  color: #8e65ff !important;
}
@media screen and (min-width: 1280px) {
  .home_page{
    .content_boxs{
      max-width: 1162px;
      margin: 0 auto;
    }
  }
}
@media screen and (max-width: 980px) {
  .home_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .box {
      width: 100%;
      .topbox {
        display: none;
      }
      .mobile_topbox{
        width: 100%;
        padding:0 0.2rem;
        padding-top: 0.8rem;
        // min-height: 2.8rem;
        height: 2.8rem;
        display: flex;
        .mobile_pretend_img{
          width: 100%;
          .homebgimg {
            width: 100%;
            border-radius: 0.15rem;
            object-fit: contain;
          }
        }
      }
      .content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0;
        padding: 0 0.2rem;
        .swiper-container {
          width: 100%;
          .swiper-wrapper {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            .swiper-slide {
              width: 2rem !important;
              .left {
                display: none;
              }
              .mobile_box_swiper {
                width: 1.89rem;
                // width: 100%;
                display: flex;
                align-items: center;
                padding: 0.1rem;
                box-shadow: -15px 11px 12px 21px rgba(3, 21, 46, 0.76) inset,
                  -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
                border-radius: 0.14rem;
                border: 1px solid rgba(139, 230, 254, 1);
                .mobileimg1 {
                  width: 0.66rem;
                  margin-right: 0.05rem;
                  object-fit: contain;
                  border-radius: 0.15rem;
                }
                .mobile_box {
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  .span1 {
                    color: #ffffff;
                    line-height: 0.17rem;
                    font-size: 0.12rem;
                  }
                  .mobile_new_familay{
                    font-family: 'Poppins';
                  }
                  .mobile_go{
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    .span1_go {
                      color: #00e7f0;
                      line-height: 0.17rem;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .content_boxs{
      padding: 0 0.2rem;
      .card_content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
        margin-top: 0.2rem;
        .compositeCard {
          width: 100%;
          color: #ffffff;
        }
        .img {
          width: 3.5rem;
          object-fit: contain;
        }
        .cardboxs {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          margin-top: 0.2rem;
          padding: 0 0.45rem;
          .out_boxs{
            width: 100%;
            padding: 1px;
            border-radius: 0.14rem;
            margin-right: 0;
            margin-bottom: 0.19rem;
            .one_box {
              width: 100%;
              height: 0.39rem;
              border-radius: 0.14rem;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              padding: 0.03rem 0.18rem;
              margin-bottom: 0;
              .containbox {
                display: flex;
                flex-direction: row;
                align-items: center;
                .img {
                  width: 0.27rem;
                  object-fit: contain;
                }
                .span1 {
                  color: #ffffff;
                  margin-left: 0.15rem;
                }
              }
              .span2 {
                color: #ffffff;
              }
            }
          }
        }
        .partner_box{
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-top: 0.41rem;
          .partner_class{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            .imgbox{
              width: 25%;
              .partnerimg{
                display: flex;
                object-fit: contain;
                margin-bottom: 0.2rem;
              }
              .partnerimg1{
                width: 0.78rem;
              }
              .partnerimg2{
                width: 0.81rem;
              }
              .partnerimg3{
                width: 0.59rem;
              }
              .partnerimg4{
                width: 0.82rem;
              }
              .partnerimg5{
                width: 0.61rem;
              }
              .partnerimg6{
                width: 0.58rem;
              }
              .partnerimg7{
                width: 0.59rem;
              }
              .partnerimg8{
                width: 0.82rem;
              }
              .partnerimg9{
                width: 0.65rem;
              }
              .partnerimg10{
                width: 0.83rem;
              }
              .partnerimg11{
                width: 0.3rem;
              }
              .partnerimg12{
                width: 0.83rem;
              }
              .partnerimg13{
                width: 0.58rem;
              }
              .partnerimg14{
                width: 0.67rem;
              }
              .partnerimg15{
                width: 0.58rem;
              }
              .partnerimg16{
                width: 0.52rem;
              }
            }
            .img_center{
              display: flex;
              padding-left: 0.1rem;
            }
          }
        }
      }
      .hashland_boxs {
        width: 100%;
        margin-top: 0.2rem;
        padding: 0.18rem;
        border-radius: 0.14rem;
        // background: linear-gradient(90deg, #021F3E 0%, #01142A 100%, #034088 100%);
        // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), -13px 16px 19px -2px rgba(2, 12, 23, 0.69), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
        box-shadow: none;
        .hashland_content {
          width: 100%;
          padding: 0;
          display: flex;
          flex-direction: column;
          .hashland_title{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .leftbox{
              display: flex;
              align-items: center;
              .img {
                width: 0.28rem;
                object-fit: contain;
              }
              .span1{
                color: #fff;
                margin-left: 0.07rem;
              }
            }
            .span2 {
              width: 0.8rem;
              height: 0.3rem;
              line-height:0.3rem;
              text-align: center;
              background-image: url("//cdn.hashland.com/images/extract_btn.png");
              background-size: 100% 100%;
              color: #fff;
            }
          }
          .trend_boxs {
            width: 100%;
            display: flex;
            margin-top: 0.19rem;
            padding-left: 0;
            .imgbox {
              flex: 2;
              position: relative;
              .img {
                width: 100%;
                object-fit: contain;
              }
              .span1 {
                position: absolute;
                color: #19cdec;
              }
              .span2 {
                top: 0.29rem;
                left: 47%;
              }
              .span3 {
                bottom:0.3rem;
                left: 0;
              }
            }
            .nowPrice {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              .span1 {
                color: #ffffff;
                margin-bottom: 0.1rem;
              }
              .span2{
                margin-bottom: 0.2rem;
              }
            }
          }
          .hashland_bottom {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin: 0.1rem 0 0 0;
            .onebox {
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              margin-bottom: 0.22rem;
              .span1 {
                color: #ffffff;
                margin-top: 7px;
                font-size: 0.12rem;
              }
            }
          }
        }
      }
      .page_bottom {
        width: 100%;
        background:linear-gradient(90deg, #021F3E 0%, #01142A 100%, #034088 100%);
        // box-shadow: -13px 10px 13px -2px rgba(2, 12, 23, 0.69), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
        box-shadow: none;
        border-radius: 0.14rem;
        margin-top: 0.4rem;
        padding:0.25rem 0.2rem;
        .embedded_box {
          width: 100%;
          display: flex;
          flex-direction: column;
          .span1 {
            color: #d8d8d8;
          }
          .horizontal {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            margin-top: 0;
            .horizontal_onebox {
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-top: 0.35rem;
              .img {
                width: 0.34rem;
                object-fit: contain;
              }
              .footerboxs{
                display: flex;
                flex-direction: column;
                margin-left: 0.05rem;
                .span1_ {
                  color: #ffffff;
                  margin-top: 0;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
