<template>
  <div class="buy_page">
    <span class="title1_txt">NFT卡牌</span>
    <span class="title2_txt">这是一张持续增值的卡牌</span>
    <div class="tab_box">
      <div class="oneTab">合成卡牌</div>
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
    console.log('created')
  }
}
</script>

<style lang='scss' scoped>
.buy_page{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 130px;
  .title1_txt{
    font-size: 60px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    line-height: 84px;
    letter-spacing: 4px;
    text-shadow: 0px 8px 17px rgba(2, 12, 52, 0.5);
    background: linear-gradient(360deg, rgba(47, 215, 242, 0) 0%, #00EBF3 100%);
    background-clip: text;
    color: transparent;
  }
  .title2_txt{
    font-size: 26px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #0AA6B5;
    line-height: 37px;
    letter-spacing: 19px;
  }
  .tab_box{
    display: flex;
    align-items: center;
    justify-content: center;
    .oneTab{
      width: 360px;
      line-height: 130px;
      text-align: center;
    }
  }
}
</style>
