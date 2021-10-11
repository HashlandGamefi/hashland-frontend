<template>
  <div class="home_page">
    <div class="box" :style="{ height: pageHeight }">
      <div class="topbox">这是一张持续增值的卡牌</div>
      <div class="bottom">
        <div class="bottombox">得到您的第一张卡牌</div>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <span class="span1">高达180%的APY</span>
        <span class="span1">去农场 >>></span>
      </div>
      <div class="left">
        <span class="span1 span2">收集NFT卡牌</span>
        <span class="span1 span2">去市场 >>></span>
      </div>
    </div>
    <div class="card_content">
      <div class="compositeCard">合成卡牌</div>
      <img src="../../assets/images/compositecard.png" class="img" />
      <div class="cardboxs">
        <div class="one_box">
          <img src="../../assets/images/issue.png" class="img" />
          <span class="span1">已发行</span>
          <span class="span2">3000</span>
        </div>
        <div class="one_box">
          <img src="../../assets/images/sale.png" class="img" />
          <span class="span1">已发行</span>
          <span class="span2">3000</span>
        </div>
        <div class="one_box">
          <img src="../../assets/images/destroy.png" class="img" />
          <span class="span1">已发行</span>
          <span class="span2">3000</span>
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
            <span class="span2">2021.10.16</span>
          </div>
        </div>
        <div class="hashland_bottom">
          <div class="onebox">
            <span class="span1">今日产出</span>
            <span class="span2">2,700</span>
          </div>
          <div class="onebox">
            <span class="span1">总量/产出比</span>
            <span class="span2">21,000,000/0.0128%</span>
          </div>
          <div class="onebox">
            <span class="span1">流通量</span>
            <span class="span2">2,700</span>
          </div>
          <div class="onebox">
            <span class="span1">销毁量</span>
            <span class="span2">2,700</span>
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
export default {
  data(){
    return {
      pageHeight:0,//当前可视区域的高度
    }
  },
  mounted(){
    this.pageHeight = document.body.clientHeight + 'px'
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
    background-image: url("../../assets/images/homebg.png");
    background-size:100% 100%;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: 155px;
    .topbox{
      width: 492px;
      height: 101px;
      background-image: url("../../assets/images/bg1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 35px;
      font-family: AliHYAiHei;
      color: #7D4516;
      line-height: 101px;
      cursor: pointer;
    }
    .bottom{
      width: 100%;
      display: flex;
      justify-content: flex-end;
      padding-right: 135px;
      cursor: pointer;
      .bottombox{
        width: 348px;
        height: 185px;
        background-image: url("../../assets/images/bg2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        font-size: 26px;
        font-family: AliHYAiHei;
        color: #7B3000;
        line-height: 147px;
      }
    }
  }
  .content{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 60px;
    .left{
      width: 49.5%;
      height: 318px;
      background: linear-gradient(360deg, rgba(33, 226, 251, 0) 0%, rgba(11, 161, 205, 0.36) 100%);
      box-shadow: 0px 17px 44px 0px rgba(0, 0, 0, 0.5);
      border: 4px solid;
      border-image: linear-gradient(180deg, rgba(62, 188, 237, 0.5), rgba(42, 86, 103, 0)) 4 4;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 30px;
      .span1{
        font-size: 50px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #00E7F0;
        line-height: 70px;
      }
      .span2{
        color: #fff;
      }
    }
  }
  .card_content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 95px;
    .compositeCard{
      width: 100%;
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 84px;
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
        height: 318px;
        box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
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
          font-size: 30px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 42px;
        }
        .span2{
          font-size: 30px;
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
    padding: 20px;
    .hashland_content{
      width: 100%;
      // background-image: url("../../assets/images/hashland.png");
      // background-size:100% 100%;
      // background-repeat: no-repeat;
      padding: 10px;
      display: flex;
      flex-direction: column;
      padding: 0 40px;
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
          font-size: 40px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #19CDEC;
        }
        .span2{
          background-image: url("../../assets/images/extract_btn.png");
          background-size:100% 100%;
          padding: 10px 20px;
          padding-bottom: 16px;
          font-size: 30px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #000;
        }
      }
      .trend_boxs{
        width: 100%;
        display: flex;
        margin-top: 30px;
        .imgbox{
          flex: 2;
          position: relative;
          .img{
            width: 100%;
            object-fit: contain;
          }
          .span1{
            position: absolute;
            font-size: 40px;
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
            font-size: 26px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 37px;
          }
          .span2{
            font-size: 40px;
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
            font-size: 26px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 55px;
          }
          .span2{
            font-size: 40px;
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
      font-size: 40px;
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
            font-size: 26px;
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
</style>
