<template>
  <div class="card_details_page">
    <span class="span_title">详情</span>
    <div class="boxarr">
      <div class="onebox" v-for="(item,index) in boxarr" :key="index">
        <img src="../../assets/images/card.png" class="imgcard" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img src="../../assets/images/start.png" v-for="(item1,index1) in Number(item.level)" :key="index1" class="start_img" />
          </div>
          <div class="hc_coefficient">
            <img src="../../assets/images/hclogo.png" class="imgcard" />
            <span class="span1">20%</span>
          </div>
          <div class="hc_coefficient">
            <img src="../../assets/images/btclogo.png" class="imgcard" />
            <span class="span1">20%</span>
          </div>
        </div>
      </div>
    </div>
    <span class="bottom_title">购买的NFT卡牌可前往“NFT挖矿”中质押挖矿</span>
    <div class="connect_box">确认</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hn } from 'hashland-sdk';
export default {
  data () {
    return {
      boxarr:[]
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  methods: {},
  created () {
    hn().tokensOfOwnerBySize(this.getAccount,0,100000000).then( async res => {//0代表第一次拿数据  100000000代表用户所拥有的全部卡的id
      // console.log('用户卡牌res: ', res);
      let arr = []
      for(let i = 0;i < res[0].length;i++){
        let obj = {}
        obj.level = (await hn().level(res[0][i])).toString() //卡牌等级
        if(obj.level == this.$route.query.level){
          obj.hc = (await hn().hashrates(res[0][i], 0)).toString() // hc 算力
          obj.btc = (await hn().hashrates(res[0][i], 1)).toString()// btc 算力
          arr.push(obj)
        }
      }
      this.boxarr = arr
      console.log('卡牌详情arr:', arr);
    }).catch(err => {
      console.log('卡牌详情err: ', err);
    })
  },
}
</script>

<style lang='scss' scoped>
.card_details_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 149px;
  .span_title{
    font-size: 60px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 84px;
    letter-spacing: 4px;
    text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    background: linear-gradient(360deg, rgba(47, 215, 242, 0) 0%, #00EBF3 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .boxarr{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 90px;
    padding-right: 40px;
    margin-top: 70px;
    max-height: 980px;
    overflow-y: auto;
    .onebox{
      position: relative;
      width: 320px;
      // height: 305px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      margin-right: calc((100% - 1480px) / 5);
      margin-bottom: 30px;
      .imgcard{
        width: 100%;
        object-fit: contain;
      }
      .bottom{
        position: absolute;
        top: 30px;
        left: 0;
        // width: 100%;
        background-image: url("../../assets/images/cardtop.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        padding:10px 8px;
        transform: scale(0.5);
        // transform: translate(-50%,-50%);
        .five_pointed_star{
          display: flex;
          align-items: center;
          .start_img{
            width: 26px;
            object-fit: contain;
          }
        }
        .hc_coefficient{
          display: flex;
          align-items: center;
          background: #302F2E;
          box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
          border-radius: 4px;
          margin-right: 5px;
          .imgcard{
            width: 43px;
            object-fit: contain;
          }
          .span1{
            // padding: 0 8px;
            // background: #302F2E;
            // box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.78);
            font-size: 26px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 37px;
          }
        }
      }
    }
  }
  .bottom_title{
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 32px;
    letter-spacing: 1px;
  }
  .connect_box {
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
    margin-top: 30px;
    cursor: pointer;
  }
}
</style>
