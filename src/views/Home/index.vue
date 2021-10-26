<template>
  <div class="home_page">
    <div class="box">
      <div class="topbox">
        <img src="../../assets/images/homebg.png" class="homebgimg">
      </div>
      <div class="content">
        <div class="left">
          <span class="span1">高达180%的APY</span>
          <span class="span1">去挖矿 >>></span>
        </div>
        <div class="left">
          <span class="span1 span2">NFT卡牌</span>
          <span class="span1 span2">去购买 >>></span>
        </div>
      </div>
    </div>
    <div class="card_content">
      <div class="compositeCard">NFT卡牌</div>
      <img src="../../assets/images/compositecard.png" class="img" />
      <div class="cardboxs">
        <div class="one_box">
          <img src="../../assets/images/issue.png" class="img" />
          <span class="span1">已发行</span>
          <span class="span2">{{issued}}</span>
        </div>
        <div class="one_box">
          <img src="../../assets/images/sale.png" class="img" />
          <span class="span1">待销售</span>
          <span class="span2">{{sold}}</span>
        </div>
        <div class="one_box">
          <img src="../../assets/images/destroy.png" class="img" />
          <span class="span1">已销毁</span>
          <span class="span2">{{Destroy}}</span>
        </div>
      </div>
    </div>
    <div class="hashland_boxs">
      <div class="hashland_content">
        <img src="../../assets/images/hashlandimg.png" class="img" />
        <div class="Trend_chart">
          <span class="span1">趋势图</span>
          <div class="span2">去提取</div>
        </div>
        <div class="trend_boxs">
          <div class="imgbox">
            <img src="../../assets/images/lineChart.png" class="img" />
            <span class="span1 span2">$15</span>
            <span class="span1 span3">$1.5</span>
          </div>
          <div class="nowPrice">
            <span class="span1">当前价格</span>
            <span class="span2">5$</span>
            <span class="span1">减产日期</span>
            <span class="span2">{{nextDay}}</span>
          </div>
        </div>
        <div class="hashland_bottom">
          <div class="onebox">
            <span class="span1">今日产出</span>
            <span class="span2">{{todynums}}</span>
          </div>
          <div class="onebox">
            <span class="span1">总量/产出比</span>
            <span class="span2">21,000,000/{{proportion}}%</span>
          </div>
          <div class="onebox">
            <span class="span1">流通量</span>
            <span class="span2">{{totalSupply}}</span>
          </div>
          <div class="onebox">
            <span class="span1">销毁量</span>
            <span class="span2">{{hcDestroy}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="page_bottom">
      <div class="embedded_box">
        <span class="span1">平台币使用背景</span>
        <div class="horizontal">
          <div class="horizontal_onebox">
            <div class="top">
              <img src="../../assets/images/use1.png" class="img" />
              <span class="span1_">卡牌升级</span>
            </div>
            <span class="bottom">节约合成高星级卡片时间</span>
          </div>
          <div class="horizontal_onebox">
            <div class="top">
              <img src="../../assets/images/use2.png" class="img" />
              <span class="span1_">盲盒卡牌</span>
            </div>
            <span class="bottom">节约合成高星级卡片时间</span>
          </div>
          <div class="horizontal_onebox">
            <div class="top">
              <img src="../../assets/images/use3.png" class="img" />
              <span class="span1_">多重算力卡牌</span>
            </div>
            <span class="bottom">获得其他算力的收益</span>
          </div>
          <div class="horizontal_onebox">
            <div class="top">
              <img src="../../assets/images/use4.png" class="img" />
              <span class="span1_">挖矿</span>
            </div>
            <span class="bottom">农场、pool池  LP挖矿</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { hc,hn,hnPool } from 'hashland-sdk';
export default {
  data(){
    return {
      pageHeight:0,//当前可视区域的高度
      issued:0,//已发行
      Destroy:0,//已销毁
      sold:'NAN',//待销售
      todynums:0,//今日产出
      totalSupply:0,//流通量
      hcDestroy:0,//hc销毁量
      proportion:0,//比例
      nextDay:'00-00-00'//下次减产时间
    }
  },
  methods:{
    async getSDKInfo(){
      // 已发行
      hn().totalSupply().then(data => {
        this.$common.checkNumber(data.toString(),res => {
          this.issued = res
        })
      })

      // 已销毁
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
      // 已销毁
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
    .content{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 204px;
      .left{
        width: 49%;
        height: 200px;
        background: linear-gradient(360deg, rgba(33, 226, 251, 0) 0%, rgba(11, 161, 205, 0.36) 100%);
        // box-shadow: 0px 17px 44px 0px rgba(0, 0, 0, 0.5);
        border: 4px solid;
        border-image: linear-gradient(180deg, rgba(62, 188, 237, 0.5), rgba(42, 86, 103, 0)) 4 4;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        .span1{
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #00E7F0;
          line-height: 70px;
          // text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #81C6E3,0 0 35px #81C6E3, 0 0 40px #81C6E3, 0 0 50px #81C6E3, 0 0 75px #81C6E3;
        }
        .span2{
          color: #fff;
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
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 60px;
      letter-spacing: 4px;
      padding-left: 40px;
    }
    .img{
      width: 1226px;
      object-fit: contain;
    }
    .cardboxs{
      width: 1056px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .one_box{
        width: 236px;
        height: 286px;
        box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.1), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
        border-radius: 14px;
        border-image: linear-gradient(180deg, rgba(139, 230, 254, 1), rgba(139, 230, 254, 0)) 1 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 30px 0;
        .img{
          width: 114px;
          object-fit: contain;
        }
        .span1{
          font-size: 24px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 42px;
        }
        .span2{
          font-size: 24px;
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
      // background-image: url("../../assets/images/hashland.png");
      // background-size:100% 100%;
      // background-repeat: no-repeat;
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
          margin-left: 65px;
        }
      }
    }
  }
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
        width: 100%;
        .homebgimg{
          width: 100%;
          object-fit: contain;
        }
      }
      .content{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0;
        .left{
          width: 49%;
          height: 2rem;
          background: linear-gradient(360deg, rgba(33, 226, 251, 0) 0%, rgba(11, 161, 205, 0.36) 100%);
          border: 0.04rem solid;
          border-image: linear-gradient(180deg, rgba(62, 188, 237, 0.5), rgba(42, 86, 103, 0)) 4 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0.2rem;
          .span1{
            font-size: 0.2rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #00E7F0;
            line-height: 0.3rem;
          }
          .span2{
            color: #fff;
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
      margin-top: 0.2rem;
      .compositeCard{
        width: 100%;
        font-size: 0.2rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 0.3rem;
        letter-spacing: 4px;
        padding-left: 0.2rem;
      }
      .img{
        width: 2.5rem;
        object-fit: contain;
      }
      .cardboxs{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .one_box{
          width: 30%;
          height: 286px;
          box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.1), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
          border-radius: 14px;
          border-image: linear-gradient(180deg, rgba(139, 230, 254, 1), rgba(139, 230, 254, 0)) 1 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 30px 0;
          .img{
            width: 114px;
            object-fit: contain;
          }
          .span1{
            font-size: 24px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 42px;
          }
          .span2{
            font-size: 24px;
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
        // background-image: url("../../assets/images/hashland.png");
        // background-size:100% 100%;
        // background-repeat: no-repeat;
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
          flex-direction: column;
          align-items: flex-start;
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
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        .horizontal_onebox{
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
            margin-left: 65px;
          }
        }
      }
    }
  }
}
</style>
