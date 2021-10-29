<template>
  <div class="nav_box" :class="{navbg:addbg}">
    <div class="logo_img" @click="menuClick(-1)">
      <img :src="`${$store.state.imgUrl}logo.png`" class="imgs" />
    </div>
    <div class="menu_box">
      <ul class="ul_">
        <li :class="[index == getMenuIndex ? 'activeClass' : '']" v-for="(item,index) in navarr" :key="index" @click="menuClick(index)">
          {{$t(item)}}
          <div class="nft_hover" v-show="index == 0">
            <div class="box_nft">
              <div class="span1" @click.stop="nftFun('card')">{{$t("message.nav.txt7")}} <span class="icon-v-right"></span></div>
              <div class="span1" @click.stop="nftFun('mining')">{{$t("message.nav.txt8")}} <span class="icon-v-right"></span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="connect_box">
      <span class="span1" v-if="getIstrue">{{getSubtringAccount}}</span>
      <span class="span1" @click="signIn" v-else>Connect</span>
      <div class="lang_box">
        <!-- <img src="../assets/images/cn.png" class="cnimg" /> -->
        <span class="lang_txt">EN</span>
        <!-- <img src="../assets/images/accrow.png" class="downimg" /> -->
      </div>
    </div>
    <div class="mobile_menu" @click="mobilemenuClick">
      <img :src="`${$store.state.imgUrl}mobilemenu.png`" class="mobile_menu_class" />
    </div>
    <div class="mobile_fixed_menu" v-if="mobilemenu" @click="mobilemenu = false">
      <div class="mobile_box">
        <div class="mobile_logo" @click="menuClick(-1)"><img :src="`${$store.state.imgUrl}logo.png`" class="mobile_logo_class" /></div>
        <ul class="ul_">
          <li :class="[index == getMenuIndex ? 'mobile_activeClass' : '']" v-for="(item,index) in navarr" :key="index" @click="menuClick(index)">
            {{$t(item)}} <span class="mobile_triangle" v-if="index == 0" @click.stop="nftClick"></span>
            <div class="box_nft" v-if="mobile_menuDis && index == 0">
              <div class="span1" @click.stop="nftFun('card')">{{$t("message.nav.txt7")}}<span class="icon-v-right"></span></div>
              <div class="span1" @click.stop="nftFun('mining')">{{$t("message.nav.txt8")}} <span class="icon-v-right"></span></div>
            </div>
          </li>
        </ul>
        <div class="mobile_lang">EN</div>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { wallet,network } from 'hashland-sdk';
export default {
  inject: ['reload'],
  data () {
    return {
      addbg:false,//导航栏背景色
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      navarr: ['message.nav.txt1', 'message.nav.txt2', 'message.nav.txt3', 'message.nav.txt6', 'message.nav.txt4','message.nav.txt5'],
      mobilemenu:false,//移动端菜单
      mobile_menuDis:false, // nfts展开菜单,
    }
  },
  computed: {
    ...mapGetters(["getMenuIndex","getSubtringAccount","getIstrue"])
  },
  methods:{
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    // nfts子菜单选择项
    nftFun(data){
      this.$store.commit("HashMenu", 0);
      sessionStorage.setItem("HashMenu", 0);
      if(data == 'card'){
        this.$router.push('/buy')
      }else if(data == 'mining'){
        this.$router.push('/nftmining')
      }
      this.mobile_menuDis = false
      this.mobilemenu = false
    },
    // 菜单栏切换状态
    menuClick (index) {
      console.log('index: ', index);
      this.$store.commit("HashMenu", index);
      sessionStorage.setItem("HashMenu", index);
      switch (index) {
        case -1:
          this.mobile_menuDis = false
          this.mobilemenu = false
          this.$router.push('/home')
          break;
        case 0:
          this.$router.push('/buy')
          break;
        case 5:
          window.location.href = 'https://land-hash.gitbook.io/white-paper/'
          break;
        default:
          this.$common.selectLang('敬请期待','Coming soon',this)
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
        this.$store.commit("setCardInfo",JSON.stringify([]))
        localStorage.setItem("setCardInfo",JSON.stringify([]))
      }else{
        // this.$store.commit("setCardInfo",JSON.stringify([]))
        // localStorage.setItem("setCardInfo",JSON.stringify([]))
        this.$store.commit("setAccount", res[0])
        localStorage.setItem("setAccount",res[0])
        this.$common.getUserCardInfoFun(res[0])
      }
      // this.reload()
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
    },
    // 移动端展开菜单
    mobilemenuClick(){
      this.mobilemenu = true
    },
    nftClick(){
      this.mobile_menuDis = !this.mobile_menuDis
    },
    handleScroll(){
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop > 0){
        this.addbg = true
      }else {
        this.addbg = false
      }
    }
  },
  mounted(){
    window.addEventListener('mousewheel', this.handleScroll);
    this.commonLink()
  },
  beforeDestroy () {
    window.removeEventListener("mousewheel", this.handleScroll);
  }
}
</script>
<style lang="scss" scoped>
.nav_box {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  padding-left: 250px;
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
        padding: 0 18px;
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #FFFFFF;
        cursor: pointer;
        .nft_hover{
          display: none;
          position: absolute;
          top: 0;
          left: -29px;
          z-index: 99999999;
          .box_nft{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 183px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 12px;
            padding: 20px 0;
            margin-top: 30px;
            .span1{
              width: 100%;
              height: 60px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 18px;
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
      padding:2px 7px;
      border-radius: 12px;
      box-shadow:26px 11px 40px 21px rgba(0,0,1,0.38), -5px 1px 34px 0px rgba(255, 255, 255,0.22) inset;
      font-size: 16px;
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
        font-size: 20px;
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
  .mobile_menu{
    display: none;
  }
  .mobile_fixed_menu{
    display: none;
  }
}
.navbg{
  animation: fade-in 1.5s;
  background-image: url("//cdn.hashland.com/images/navbg.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
@media screen and (min-width: 981px) and (max-width: 1439px) {
  .nav_box{
    .menu_box{
      width: calc(100% - 200px);
    }
  }
}
@media screen and (max-width: 980px) {
  .nav_box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    // height: 110px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0.2rem;
    .logo_img{
      position: absolute;
      top: -20px;
      left: 20px;
      width: 0.8rem;
      .imgs{
        width: 100%;
        object-fit: contain;
      }
    }
    .menu_box{
      display: none;
    }
    .connect_box{
      display: none;
    }
    .mobile_menu{
      display: flex;
      width: 0.24rem;
      .mobile_menu_class{
        width: 100%;
        object-fit: contain;
      }
    }
    .mobile_fixed_menu{
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999999;
      background: rgba(0, 0, 0, 0.2);
      display: flex;
      animation: fade-in 1.5s;
      .mobile_box{
        width: 1.78rem;
        display: flex;
        flex-direction: column;
        padding: 0.2rem 0;
        background: #010E1B;//linear-gradient('top',#031D39,#010E1B);
        .mobile_logo{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(270deg, rgba(4, 223, 230, 0) 0%, rgba(0, 231, 240, 0.78) 50%, rgba(0, 231, 240, 0) 100%);
          border: 1px solid;
          border-image: linear-gradient(90deg, rgba(0, 231, 240, 0), rgba(0, 231, 240, 0.78), rgba(0, 231, 240, 0)) 1 1;
          .mobile_logo_class{
            width: 0.8rem;
          }
        }
        .ul_{
          width: 100%;
          li{
            width: 100%;
            text-align: center;
            font-size: 0.16rem;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #FFFFFF;
            cursor: pointer;
            // height: 0.78rem;
            line-height: 0.78rem;
            border: 1px solid;
            border-image: linear-gradient(90deg, rgba(0, 231, 240, 0), rgba(0, 231, 240, 0.78), rgba(0, 231, 240, 0)) 1 1;
            .box_nft{
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              background: #010E1B;
              .span1{
                width: 100%;
                height: 0.78rem;
                line-height: 0.78rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.18rem;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #fff;
                line-height: 0.4rem;
                .icon-v-right {
                  width: 0.12rem;
                  height: 0.12rem;;
                  border: 0.02rem solid #fff;
                  border-width: 0.02rem 0.02rem 0 0;
                  transform: rotate(45deg);
                  margin-left: 0.05rem;
                }
              }
            }
            .mobile_triangle{
              font-size: 0;
              line-height: 0;
              border-width: 0.1rem;
              border-color: #FFFFFF;
              border-bottom-width: 0;
              border-style: dashed;
              border-top-style: solid;
              border-left-color: transparent;
              border-right-color: transparent;
            }
          }
          .mobile_activeClass{
            background: linear-gradient(270deg, rgba(4, 223, 230, 0) 0%, rgba(0, 231, 240, 0.78) 50%, rgba(0, 231, 240, 0) 100%);
            border: 1px solid;
            border-image: linear-gradient(90deg, rgba(0, 231, 240, 0), rgba(0, 231, 240, 0.78), rgba(0, 231, 240, 0)) 1 1;
            color: #00E7F0;
          }
        }
        .mobile_lang{
          margin-top: 0.1rem;
          width: 100%;
          padding-right: 0.2rem;
          display: flex;
          justify-content: flex-end;
          font-size: 0.2rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 0.3rem;
        }
      }
    }
  }
  .navbg{
    animation: fade-in 1.5s;
    background-image: url("//cdn.hashland.com/images/mobilenavbg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
}
@keyframes fade-in {
  0% {opacity: 0;}/*初始状态 透明度为0*/
  100% {opacity: 1;}/*结束状态 透明度为1*/
}
</style>
