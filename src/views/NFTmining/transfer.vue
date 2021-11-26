<template>
  <div class="insertcard_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <div class="title_title fontsize32">{{$t("message.transfer.txt1")}}</div>
    <div class="title_son1 fontsize12_400">{{$t("message.transfer.txt2")}}</div>
    <div class="content">
      <!-- 几阶对应数量 -->
      <div class="left_content">
        <span class="span1 fontsize16">{{$t("message.synthesis.txt4")}} {{rank}} ({{$t("message.synthesis.txt8")}} {{amount}})</span>
        <div class="span2"></div>
        <div class="left_content_hover">
          <span class="span1 fontsize16" @click="selectRankClik(ele)" v-for="ele in 5" :key="ele">{{$t("message.synthesis.txt4")}} {{ele}} ({{$t("message.synthesis.txt8")}} {{cardarr.filter(data => {return data.level == ele}).length}})</span>
        </div>
      </div>
      <!-- 全选按钮 -->
      <div class="right_content" @click="selectAllClick">
        <img :src="`${$store.state.imgUrl}selected.png`" class="selectimg" v-if="selectALLBtn || selectStatus" />
        <img :src="`${$store.state.imgUrl}select.png`" class="selectimg" v-else />
        <span class="select_ttx fontsize16">{{$t("message.synthesis.txt5")}}</span>
      </div>
    </div>
    <!-- 选中卡牌提示数量 -->
    <div class="bottom_txtbox">
      <div class="bottom_txt1">
        <span class="span1 fontsize22">{{$t("message.transfer.txt3")}}</span>
        <span class="span2 fontsize22">{{selectedNUM}}</span>
      </div>
      <div class="bottom_txt1">
        <span class="span1 fontsize12_400">{{$t("message.transfer.txt4")}}</span>
      </div>
    </div>
    <!-- 页面展示数组 -->
    <div class="cardarr_class">
      <div class="onebox" v-for="(item,index) in pageshowarr" :key="index" @click="cardClick(item,index)">
        <img :src="item.src" class="card_picture" />
        <img :src="`${$store.state.imgUrl}select.png`" class="select_img" v-if="!item.status"/>
        <img :src="`${$store.state.imgUrl}selected.png`" class="select_img" v-else/>
      </div>
      <NoData v-if="pageshowarr.length == 0 && isshowArr"></NoData>
    </div>
    <div class="Suspension_btnbox" v-if="pageshowarr.length > 0">
      <span class="bottom_title fontsize12">{{$t("message.transfer.txt5")}}</span>
      <div class="btn_box fontsize16" @click="synthesisFun">
        {{$t("message.transfer.txt1")}}<BtnLoading :isloading="synthesisDis"></BtnLoading>
      </div>
    </div>
    <div class="danger_proup" v-if="isdanger">
      <div class="outbox_danger">
        <div class="danger_wallet_box" @click.stop>
          <span class="txt1">{{$t('message.msg')}}</span>
          <span class="txt_danger">!</span>
          <div class="txtbox_danger"><span class="txt2 fontsize16_400">{{$t("message.transfer.txt8")}}</span></div>
          <div class="inputbox">
            <Input v-model="dangerTxtModel" :placeholder="$t('message.transfer.danger_placeholder')" :inputvalue="dangerTxtModel"></Input>
          </div>
          <div class="btn_box">
            <div class="txt3" @click.stop="sureDangerClick">Confirm<BtnLoading :isloading="synthesisDis"></BtnLoading></div>
          </div>
        </div>
        <img :src="`${$store.state.imgUrl}proupclose.png`" class="danger_close" @click.stop="dangerClick"/>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSigner, hn } from 'hashland-sdk';
export default {
  data () {
    return {
      dangerTxtModel:'',
      isdanger:false,//转账提示框
      isshowArr:false,// 页面暂时不显示nodata
      powerNumber:0,//合成卡牌提升算力
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      cardarr:[],//所有卡牌信息的数组
      pageshowarr:[],//页面展示的数组
      rank:1,//1阶
      amount:0,//阶对应的卡牌数量
      selectedNUM:0,//选中的卡牌数量
      selectimgArr:[],//选中的卡牌的信息
      selectALLBtn:false,//全选按钮的状态
      synthesisDis:false,// 合成按钮loading
      timerll:null,
      timerll_result:null
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount","getUserCardInfo"]),
    selectStatus: {
      get() {
        if(this.selectedNUM == 0){
          return false
        }
        if(this.pageshowarr.length >= 100){
          return 100 == this.selectedNUM
        }else{
          return this.pageshowarr.length == this.selectedNUM
        }

      },
      set(newValue) {
        return newValue;
      }
    },
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          this.getUserAllCard(1)
        }else{
          this.cardarr = []//所有卡牌信息的数组
          this.pageshowarr = []//页面展示的数组
          this.rank = 1//1阶
          this.amount = 0//阶对应的卡牌数量
          this.selectedNUM = 0//选中的卡牌数量
          this.selectimgArr = []//选中的卡牌的信息
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 取消转账
    dangerClick(){
      this.dangerTxtModel = ''
      this.isdanger = false
    },
    // 确认转账
    sureDangerClick(){
      console.log('this.dangerTxtModel: ', this.dangerTxtModel);
      if(this.dangerTxtModel == '')return
      this.synthesisDis = true
      let arr = this.selectimgArr.map(item => {
        return item.id
      })
      console.log('向合约传的id数组arr: ', arr);
      hn().connect(getSigner()).safeTransferFromBatch(this.getAccount,this.dangerTxtModel,arr).then(async res => {
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.$common.newgetUserCardInfoFun(this.getAccount).then(res1 => {
            console.log('重新获取用户卡牌信息res1: ', res1);
            sessionStorage.removeItem('count')
            if(res1 > 1){
              sessionStorage.setItem("count",res1)
            }else{
              sessionStorage.setItem("count",1)
            }
            this.getUserAllCard(this.rank) // 重新获取最新用户信息
            this.$common.selectLang('转账成功','Gifted Successfully',this)
            arr = []
          })
        }else{
          this.selectALLBtn = this.selectStatus = false
          this.selectedNUM = 0
        }
        this.isdanger = false
        this.dangerTxtModel = ''
      }).catch(err => {
        console.log('转账err: ', err);
        this.synthesisDis = false
        this.isdanger = false
        this.dangerTxtModel = ''
      })
    },
    // 用户总卡牌数据获取
    getUserAllCard(level){
      clearInterval(this.timerll)
      this.timerll = setInterval(() => {
        if(sessionStorage.getItem('count')){
          clearInterval(this.timerll)
          this.cardarr = JSON.parse(this.getUserCardInfo)
          let arr = this.cardarr.filter(item => { return item.level == level})
          arr.sort((a, b) => {
            return Number(a.type) > Number(b.type) ? 1 : -1;
          })
          this.pageshowarr = arr
          this.isshowArr = true
          this.amount = this.cardarr.filter(item => { return item.level == level}).length
          this.synthesisDis = false
          this.selectALLBtn = this.selectStatus = false
          this.selectedNUM = 0
          this.selectimgArr = []
        }
        console.log("获取用户信息")
      }, 1000);
    },
    // 全选按钮选中事件
    selectAllClick(){
      if(this.pageshowarr.length == 0)return
      if(this.selectALLBtn || this.selectStatus){
        this.selectALLBtn = this.selectStatus = false
        this.pageshowarr.forEach(item => {
          item.status = false
        })
        this.selectimgArr = []
        this.selectedNUM = 0
      }else{
        // 最多选择5张
        this.selectimgArr = []
        this.selectALLBtn = this.selectStatus = true
        if(this.pageshowarr.length < 101){
          this.pageshowarr.forEach((item,index) => {
              item.status = true
              let obj = {}
              obj.index = index
              obj.id = item.cardID
              this.selectimgArr.push(obj)
          })
          this.selectedNUM = this.pageshowarr.length
        }else{
          this.pageshowarr.forEach(item =>{
            item.status = false
          })
          this.pageshowarr.forEach((item,index) => {
            if(index <= 99){
              item.status = true
              let obj = {}
              obj.index = index
              obj.id = item.cardID
              this.selectimgArr.push(obj)
            }
          })
          this.selectedNUM = this.pageshowarr.filter(item => {return item.status == true}).length
          this.$common.selectLang('最多100张','Up to 100',this)
        }
      }
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    // 转账
    async synthesisFun(){
      if(this.synthesisDis)return
      if(this.selectimgArr.length < 1){
        this.$common.selectLang('至少选择1张卡牌','You need to select a minimal of 1 cards',this)
        return
      }
      this.isdanger = true
    },
    //选择当前卡牌
    cardClick(data,index){
      console.log('选择当前卡牌: ', data,index);
      if(this.selectedNUM >= 100){
        if(data.status){
          data.status = false
          for(let i = 0; i < this.selectimgArr.length; i++){
            if(this.selectimgArr[i].index == index){
              this.selectimgArr.splice(i,1)
              this.selectedNUM--
              this.selectALLBtn = false
            }
          }
        }else{
          this.$common.selectLang('最多100张','Up to 100',this)
        }
        return
      }
      data.status = !data.status

      if(data.status){
        console.log("status为true的状态")
        this.selectedNUM++
        let obj = {}
        obj.id = data.cardID
        obj.index = index
        this.selectimgArr.push(obj)
      }else{
        console.log("status为false的状态")
        for(let i = 0; i < this.selectimgArr.length; i++){
          if(this.selectimgArr[i].index == index){
            this.selectimgArr.splice(i,1)
            this.selectedNUM--
            this.selectALLBtn = false
          }
        }
      }
    },
    // 选择阶数
    selectRankClik(data){
      this.selectALLBtn = false
      this.selectedNUM = 0 // 选中的卡牌数量
      this.selectimgArr = [] // 清掉原来选中卡牌的数组信息
      this.rank = data // 当前几阶
      this.pageshowarr.forEach(item => {
        item.status = false
      })
      this.amount = this.cardarr.filter(item => { return item.level == data}).length
      this.pageshowarr = this.cardarr.filter(item => { return item.level == data}).sort((a, b) => {
        return Number(a.type) > Number(b.type) ? 1 : -1;
      })
    },
    back(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss' scoped>
.insertcard_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    position: absolute;
    top: 149px;
    right: 90px;
    width: 44px;
    cursor: pointer;
    .backimg {
      width: 100%;
      object-fit: contain;
    }
  }
  .title_title {
    color: #ffffff;
    margin-bottom: 15px;
    margin-top: 208px;
  }
  .title_son1{
    color: #ffffff;
  }
  .content{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 90px;
    .left_content{
      position: relative;
      width: 204px;
      height: 48px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(90deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
      .span1{
        color: #FFFFFF;
        margin-right: 10px;
        cursor: pointer;
      }
      .span2{
        border-width: 7px;
        border-color: #00E7F0;
        border-bottom-width: 0;
        border-style: dashed;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
      }
      .left_content_hover{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        width: 204px;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.9);
        box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
        filter: blur(0px);
        border-radius: 4px;
        padding: 10px 0;
        margin-top:47px;
        line-height: 39px;
        .span1{
          color: #E2DADA;
          cursor: pointer;
        }
      }
    }
    .left_content:hover{
      .left_content_hover{
        display: flex;
        .span1:hover{
          color: #00E7F0;
        }
      }
    }
    .right_content{
      display: flex;
      align-items: center;
      cursor: pointer;
      .selectimg{
        width: 40px;
        object-fit: contain;
        margin-right: 10px;
      }
      .select_ttx{
        color: #FFFFFF;
      }
    }
  }
  .bottom_txtbox {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 23px;
    .bottom_txt1 {
      width: 100%;
      display: flex;
      align-items: center;
      .span1 {
        color: #ffffff;
        margin-right:40px;
      }
      .span2 {
        color: #00e7f0;
      }
    }
    .bottom_txt2 {
      width: 100%;
      color: #ccbebe;
    }
  }
  .cardarr_class{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20px;
    min-height: 300px;
    padding-bottom: 120px;
    .onebox{
      position: relative;
      width: 237px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      margin-right: 46px;
      cursor: pointer;
      .card_picture{
        width: 100%;
        object-fit: contain;
      }
      .select_img{
        position: absolute;
        top: 0;
        right: 0;
        width: 31px;
        object-fit: contain;
      }
    }
  }
  .Suspension_btnbox{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    width: 637px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(180deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), -1px 18px 14px -2px #041D3A;
    border-radius: 79px;
    padding-top: 24px;
    .bottom_title{
      color: #ffffff;
    }
    .btn_box {
      width: 274px;
      height: 59px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      color: #ffffff;
      cursor: pointer;
      margin-top: 14px;
    }
  }
  .danger_proup {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99999999;
    backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    align-items: center;
    .outbox_danger{
      position: relative;
      width: 580px;
      height: 574px;
      box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
      padding: 1px;
      border-radius: 14px;
      background:linear-gradient(180deg, #8BE6FE 0%, rgba(139, 230, 254, 0) 100%);
      .danger_wallet_box {
        width: 100%;
        height: 100%;
        padding: 38px 110px 85px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 14px;
        background:#011A31;
        .txt1 {
          width: 100%;
          text-align: center;
          font-style: normal;
          font-size: 36px;
          color: #ffffff;
        }
        .txt_danger{
          font-size: 66px;
          font-weight: 600;
          color: #FFFFFF;
          line-height: 55px;
          background: linear-gradient(180deg, #F7C000 0%, #E77917 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .txtbox_danger{
          width: 100%;
          display: flex;
          .txt2 {
            width: 100%;
            font-style: normal;
            color: rgba(255, 255, 255, 0.8);
          }
        }
        .inputbox {
          width: 100%;
          display: flex;
          height: 37px;
          border-radius: 14px;
          padding: 0 15px;
          background: rgba(78, 197, 227, 0.34);
        }
        .btn_box{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          justify-content: center;
          .txt3 {
            width: 281px;
            background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-style: normal;
            font-size: 24px;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
      .danger_close{
        position: absolute;
        top: 10px;
        right: 10px;
        width: 44px;
        object-fit: contain;
        cursor: pointer;
      }
    }
  }
}
@media screen and (min-width: 1280px) {
  .insertcard_page{
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px){
  .insertcard_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
    padding-top: 1.07rem;
    .title{
      position: absolute;
      top: 0.15rem;
      right: 0.2rem;
      width: 0.36rem;
      cursor: pointer;
      .backimg{
        width: 100%;
        object-fit: contain;
      }
    }
    .title_title {
      color: #ffffff;
      margin-bottom: 0.05rem;
      margin-top: 0.25rem;
    }
    .title_son1{
      width: 80%;
      text-align: center;
      color: #ffffff;
    }
    .content{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.4rem;
      .left_content{
        position: relative;
        width: 1.71rem;
        height: 0.34rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.54) linear-gradient(180deg, #24345D 0%, rgba(35, 52, 98, 0.18) 100%);
        box-shadow: -1px 14px 9px -9px rgba(0, 0, 0, 0.82) inset;
        .span1{
          font-size: 0.12rem;
          color: #FFFFFF;
          margin-right: 0.1rem;
          cursor: pointer;
        }
        .span2{
          border-width: 0.06rem;
          border-color: #00E7F0;
          border-bottom-width: 0;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
        }
        .left_content_hover{
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9;
          width: 1.71rem;
          display: none;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.74);
          box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56) inset;
          filter: blur(0px);
          border-radius: 0.04rem;
          padding: 0.05rem 0 0.05rem 0.2rem;
          margin-top: 0.35rem;
          .span1{
            color: #E2DADA;
            cursor: pointer;
            margin-right: 0;
          }
        }
      }
      .left_content:hover{
        .left_content_hover{
          display: flex;
        }
      }
      .right_content{
        display: flex;
        align-items: center;
        .selectimg{
          width: 0.2rem;
          object-fit: contain;
          margin-right: 0.05rem;
        }
        .select_ttx{
          font-size: 0.12rem;
          color: #FFFFFF;
        }
      }
    }
    .bottom_txtbox {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 0.1rem;
      .bottom_txt1 {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 0.05rem;
        .span1 {
          color: #ffffff;
          line-height: auto;
          margin-right: 0.05rem;
        }
        .span2 {
          color: #00e7f0;
          line-height: 0.28rem;
        }
      }
      .bottom_txt2 {
        width: 100%;
        color: #ccbebe;
      }
    }
    .cardarr_class{
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      min-height: 1rem;
      margin-top: 0.2rem;
      padding-bottom: 0;
      margin-bottom: 0.8rem;
      .onebox{
        position: relative;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0.1rem;
        margin-right: 0;
        .card_picture{
          width: 100%;
          object-fit: contain;
        }
        .bottom{
          position: absolute;
          top: 0.22rem;
          display: flex;
          align-items: center;
          padding:0.1rem 0.08rem;
          transform:translate(0,-50%) scale(0.4);
          .five_pointed_star{
            display: flex;
            align-items: center;
            .start_img{
              width: 0.18rem;
              object-fit: contain;
            }
          }
          .hc_btc_box{
            display: flex;
            align-items: center;
            .hc_coefficient{
              display: flex;
              align-items: center;
              border-radius: 4px;
              margin-right: 5px;
              background: rgba(5, 24, 44, 0.88);
              box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.22);
              border-radius: 11px;
              opacity: 0.56;
              .imgcard{
                width: 0.21rem;
                object-fit: contain;
              }
              .span1{
                color: #FFFFFF;
              }
            }
          }
        }
        .select_img{
          position: absolute;
          top: 0;
          right: 0.09rem;
          width: 0.24rem;
          object-fit: contain;
        }
        .selected_img{
          position: absolute;
          top: 0;
          right: 0.09rem;
          width: 0.24rem;
          object-fit: contain;
          transform: scale(1.2);
        }
        .master_img{
          position: absolute;
          bottom: -0.02rem;
          right: 0.1rem;
          width: 0.55rem;
          object-fit: contain;
        }
        .orther_img{
          position: absolute;
          bottom: 0;
          right: 0.09rem;
          width: 0.24rem;
          object-fit: contain;
        }
      }
    }
    .Suspension_btnbox{
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: linear-gradient(180deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), -1px 18px 14px -2px #041D3A;
      border-radius: 0.8rem;
      padding: 0.12rem 0;
      .bottom_title{
        color: #ffffff;
      }
      .btn_box {
        width: 1.94rem;
        height: 0.38rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        color: #ffffff;
        cursor: pointer;
        margin-top: 0.1rem;
      }
    }
    .danger_proup {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 99999999;
      backdrop-filter: blur(6px);
      padding: 0 0.38rem;
      .outbox_danger{
        width: 100%;
        height: 4.5rem;
        box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
        padding: 1px;
        border-radius: 0.14rem;
        background:linear-gradient(180deg, #8BE6FE 0%, rgba(139, 230, 254, 0) 100%);
        .danger_wallet_box {
          width: 100%;
          height: 100%;
          padding: 0.29rem 0.38rem 0.42rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border-radius: 0.14rem;
          background:#011A31;
          .txt1 {
            width: 100%;
            font-style: normal;
            font-size: 0.36rem;
            color: #ffffff;
          }
          .txt_danger{
            font-size: 0.6rem;
            font-weight: 600;
            color: #FFFFFF;
            line-height: 0.6rem;
            background: linear-gradient(180deg, #F7C000 0%, #E77917 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .txtbox_danger{
            width: 100%;
            display: flex;
            .txt2 {
              width: 100%;
              text-align: center;
              font-style: normal;
              color: rgba(255, 255, 255, 0.8);
            }
          }
          .inputbox {
            width: 100%;
            display: flex;
            height: 0.37rem;
            padding: 0 0.1rem;
            border-radius: 0.14rem;
          }
          .btn_box{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            justify-content: center;
            .txt3 {
              width: 1.67rem;
              background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              height: 0.39rem;
              display: flex;
              justify-content: center;
              align-items: center;
              font-style: normal;
              font-size: 0.24rem;
              color: #ffffff;
              cursor: pointer;
            }
          }
        }
        .danger_close{
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          width: 0.36rem;
          object-fit: contain;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
