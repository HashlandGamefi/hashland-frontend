<template>
  <div class="nav_box">
    <div class="logo_img" @click="menuClick(-1)">
      <img src="../assets/images/logo.png" class="imgs" />
    </div>
    <div class="menu_box">
      <ul class="ul_">
        <li :class="[index == getMenuIndex ? 'activeClass' : '']" v-for="(item,index) in navarr" :key="index" @click="menuClick(index)">
          {{$t(item)}}
          <div class="nft_hover" v-show="index == 0">
            <div class="box_nft">
              <div class="span1" @click.stop="nftFun('card')">NFT卡牌 <span class="icon-v-right"></span></div>
              <div class="span1" @click.stop="nftFun('mining')">NFT挖矿 <span class="icon-v-right"></span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="connect_box">
      <span class="span1" v-if="getIstrue">{{getSubtringAccount}}</span>
      <span class="span1" @click="signIn" v-else>Connect</span>
      <div class="lang_box">
        <img src="../assets/images/cn.png" class="cnimg" />
        <span class="lang_txt">CN</span>
        <img src="../assets/images/accrow.png" class="downimg" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { wallet,network } from 'hashland-sdk';
export default {
  inject: ['reload'],
  data () {
    return {
      navarr: ['message.nav.title1', 'message.nav.title2', 'message.nav.title3', 'message.nav.title6', 'message.nav.title4','message.nav.title5'],

    }
  },
  computed: {
    ...mapGetters(["getMenuIndex","getSubtringAccount","getIstrue"])
  },
  methods:{
    // 菜单栏切换状态
    menuClick (index) {
      this.$store.commit("HashMenu", index);
      sessionStorage.setItem("HashMenu", index);
      switch (index) {
        case -1:
          this.$router.push('/home')
          break;
        case 0:
          this.$router.push('/buy')
          break;
        default:
          break;
      }
    },
    // 登录
    signIn(){
      this.commonLink()
    },
    // 账号链接抽离方法
    connectFun(res){
      console.log('账号切换res: ', res);
      if(res.length == 0){
        this.$store.commit("setAccount",'no')
        localStorage.setItem("setAccount",'no')
      }else{
        this.$store.commit("setAccount", res[0])
        localStorage.setItem("setAccount",res[0])
      }
    },
    // 网络链接抽离方法(第一次连接,用户网络不对的情况下帮他切换网络)
    networkFun(chainID){
      let net = network() // 获取sdk返回的当前的环境
      if(chainID == net.chainId){
        this.$store.commit("setChain", chainID)
        localStorage.setItem("setChain",chainID)
      }else{
        wallet.addChain()
      }
    },
    // 网络链接抽离方法(用户自己手动切换其他网络的操作)
    OnNetworkFun(res){
      let net = network() // 获取sdk返回的当前的环境
      if (res == net.chainId){
        this.$store.commit("setChain", res)
        localStorage.setItem("setChain",res)
      }else {
        this.$store.commit("setChain", '')
        localStorage.removeItem("setChain")
      }
    },
    // 链接钱包方法
    async commonLink(){
      const account = await wallet.getAccount() //链接钱包
      this.connectFun(account)

      const chainID = await wallet.getChainId() // 连接网络
      this.networkFun(chainID)

      // 监听账号
      wallet.onAccountChanged(this.connectFun)

      // 监听网络
      wallet.onChainChanged(this.OnNetworkFun)
    }
  }
}
</script>
<style lang="scss" scoped>
.nav_box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  padding-left: 250px;
  background-image: url("../assets/images/navbg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .logo_img{
    position: absolute;
    top: 0;
    left: 20px;
    width: 223px;
    cursor: pointer;
    .imgs{
      width: 100%;
      object-fit: contain;
    }
  }
  .menu_box{
    width: calc(100% - 280px);
    .ul_{
      width: 100%;
      display: flex;
      align-items: center;
      li{
        position: relative;
        padding: 0 25px;
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        cursor: pointer;
        .nft_hover{
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99999999;
          .box_nft{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 187px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            padding: 20px 0;
            margin-top: 74px;
            .span1{
              width: 100%;
              height: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 26px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #fff;
              line-height: 82px;
              .icon-v-right {
                width: 12px;
                height: 12px;
                border: 2px solid #fff;
                border-width: 2px 2px 0 0;
                transform: rotate(45deg);
                margin-left: 10px;
              }
            }
            .span1:hover{
              color: #00E7F0;
              .icon-v-right{
                width: 12px;
                height: 12px;
                border: 2px solid #00E7F0;
                border-width: 2px 2px 0 0;
                transform: rotate(45deg);
                margin-left: 10px;
              }
            }
          }
        }
      }
      li:hover{
        .nft_hover{
          display: flex;
        }
      }
      .activeClass{
        color: #00E7F0;
      }
    }
  }
  .connect_box{
    display: flex;
    align-items: center;
    .span1{
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #FFFFFF;
      line-height: 37px;
      cursor: pointer;
    }
    .lang_box{
      display: flex;
      align-items: center;
      margin-left: 20px;
      .cnimg{
        width: 50px;
        object-fit: contain;
      }
      .lang_txt{
        font-size: 26px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 37px;
        margin: 0 8px;
      }
      .downimg{
        width: 20px;
        object-fit: contain;
      }
    }
  }
}
@media screen and (min-width: 981px) and (max-width: 1439px) {
.nav_box{
  .menu_box{
    width: calc(100% - 200px);
  }
}
}
@media screen and (max-width: 980px) {

}
</style>
