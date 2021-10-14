<template>
  <div class='basic_card_page'>
    <div class="myCard">
      <div class="card_left">
        <span class="span1">我的钱包卡牌</span>
        <span class="span2">未插入卡槽不产生收益</span>
      </div>
      <div class="synthesis_btn">合成升级</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {},
  created () {
    console.log('created')
  },
  mounted () {
    console.log('mounted')
  }
}
</script>

<style lang='scss' scoped>
.basic_card_page{
  width:100%;
  display: flex;
  flex-direction: column;
  margin-top: 160px;
  .myCard{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    .card_left{
      width: 320px;
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
    .synthesis_btn{
      width: 196px;
      height: 84px;
      background-image: url("../../assets/images/nft_btn1.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      text-align: center;
      font-size: 40px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 84px;
    }
  }
}
</style>
