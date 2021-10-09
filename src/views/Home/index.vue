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
    <div class="compositeCard">合成卡牌</div>
    <div class="card_content">
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
        <div class=""></div>
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
  .compositeCard{
    width: 100%;
    padding-left: 60px;
    font-size: 40px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 84px;
    letter-spacing: 4px;
    margin-top: 95px;
  }
  .card_content{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    padding-left: 60px;
    .hashland_content{
      width: 100%;
      // background-image: url("../../assets/images/hashland.png");
      // background-size:100% 100%;
      // background-repeat: no-repeat;
      padding: 10px;
      display: flex;
      flex-direction: column;
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
    }
  }
}
</style>
