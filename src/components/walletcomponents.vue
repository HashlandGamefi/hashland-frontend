<template>
  <div class="record_page" v-if="walletdis">
    <div class="title fontsize26">Connect to wallet</div>
    <img
      :src="`${$store.state.imgUrl}proupclose.png`"
      class="close_img"
      @click="closepage"
    />
    <div class="boxarr">
      <div class="onebox" v-for="(item, index) in walletarr" :key="index" @click="walletClick(item)">
        <span class="wallet_txt fontsize16">{{item.name}}</span>
        <img :src="item.src" class="imgcard" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    walletdis: {
      type: Boolean,
      default: false
    },
  },
  data(){
    return {
      walletarr:[
        {name:'Metamask',src:`${this.$store.state.imgUrl}wallet1.png`},
        {name:'WalletConnect',src:`${this.$store.state.imgUrl}wallet2.png`},
        {name:'TrustWallet',src:`${this.$store.state.imgUrl}wallet3.png`},
        {name:'SafePal Wallet',src:`${this.$store.state.imgUrl}wallet4.png`},
        {name:'ONTO Wallet',src:`${this.$store.state.imgUrl}wallet5.png`},
        {name:'TokenPocket',src:`${this.$store.state.imgUrl}wallet6.png`},
        {name:'Bitkeep',src:`${this.$store.state.imgUrl}wallet7.png`},
        {name:'MathWallet',src:`${this.$store.state.imgUrl}wallet8.png`},
        {name:'Onekey',src:`${this.$store.state.imgUrl}wallet9.png`},
        {name:'Bitpie',src:`${this.$store.state.imgUrl}wallet10.png`},
        {name:'Coin98',src:`${this.$store.state.imgUrl}wallet11.png`},
        {name:'Binance Chain Wallet',src:`${this.$store.state.imgUrl}wallet12.png`},
      ]
    }
  },
  methods: {
    // 弹窗关闭
    closepage () {
      this.$emit('closewalletpage')
    },
    // 各类钱包点击
    walletClick(item){
      this.$emit('walletClick',item)
    }
  }
}
</script>

<style lang='scss' scoped>
.record_page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin-top: 50px;
    width: 100%;
    text-align: center;
    color: #ffffff;
  }
  .close_img {
    position: absolute;
    top: 10px;
    right: 100px;
    width: 44px;
    object-fit: contain;
    cursor: pointer;
  }
  .boxarr {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 109px;
    max-height: 610px;
    overflow-y: auto;
    padding-bottom: 40px;
    .onebox {
      cursor: pointer;
      width: 432px;
      height: 67px;
      padding: 0 22px 0 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #032C5B;
      border-radius: 15px;
      margin-top: 32px;
      .imgcard {
        width: 41px;
        object-fit: contain;
      }
      .wallet_txt{
        color: #ffffff;
      }
    }
  }
}
@media screen and (min-width: 1280px) {
  .record_page {
    .boxarr {
      max-width: 1162px;
      margin: 40px auto;
      margin-top: 10px;
      margin-bottom: 0;
    }
  }
}
@media screen and (max-width: 980px) {
  .record_page {
    .title {
      margin-top: 1rem;
      width: 100%;
      text-align: center;
      color: #ffffff;
    }
    .close_img {
      position: absolute;
      top: 0.3rem;
      right: 0.2rem;
      width: 0.36rem;
      object-fit: contain;
    }
    .boxarr {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 0 0.2rem;
      padding-bottom: 0.2rem;
      max-height: 6rem;
      overflow-y: auto;
      margin-top: 0.27rem;
      .onebox {
        cursor: pointer;
        width: 100%;
        height: 0.52rem;
        padding: 0 0.2rem 0 0.09rem;
        border-radius: 0.15rem;
        margin-top: 0.1rem;
        .imgcard {
          width: 0.24rem;
          object-fit: contain;
        }
        .wallet_txt{
          color: #ffffff;
        }
      }
    }
  }
}
</style>
