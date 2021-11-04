<template>
  <div class="insertcard_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <div class="title_title fontsize32">{{$t("message.synthesis.txt1")}}</div>
    <!-- <div class="title_son1 fontsize12_400">{{$t("message.synthesis.txt2")}}</div> -->
    <div class="title_son1 fontsize12_400">{{$t("message.synthesis.txt3")}}</div>
    <div class="content">
      <div class="left_content">
        <span class="span1 fontsize16">{{$t("message.synthesis.txt4")}} {{rank}} ({{$t("message.synthesis.txt8")}} {{amount}})</span>
        <div class="span2"></div>
        <div class="left_content_hover">
          <span class="span1 fontsize16" @click="selectRankClik(ele)" v-for="ele in 5" :key="ele">{{$t("message.synthesis.txt4")}} {{ele}} ({{$t("message.synthesis.txt8")}} {{cardarr.filter(data => {return data.level == ele}).length}})</span>
        </div>
      </div>
      <div class="right_content" @click="selectAllClick">
        <img :src="`${$store.state.imgUrl}selected.png`" class="selectimg" v-if="selectALLBtn || selectedArr.length >= selectedCardnum " />
        <img :src="`${$store.state.imgUrl}select.png`" class="selectimg" v-else />
        <span class="select_ttx fontsize16">{{$t("message.synthesis.txt5")}}</span>
      </div>
    </div>
    <div class="bottom_txtbox" v-if="rank < 5">
      <div class="bottom_txt1">
        <span class="span1 fontsize22">{{$t("message.synthesis.txt6")}}</span>
        <span class="span2 fontsize22"> {{selectedNUM}}</span>
      </div>
      <!-- <div class="bottom_txt2 fontsize16_400" v-if="selectedArr.length > 0">
        {{$t("message.synthesis.txt7")}}{{rank}}{{$t("message.synthesis.txt10")}} {{compose}} {{rank + 1 }}{{$t("message.synthesis.txt11")}} {{powerNumber}}%
      </div> -->
    </div>
    <!-- 选中以后的卡牌数组 -->
    <div class="cardarr_class cardarr_class_selected" v-if="selectedArr.length > 0">
      <div class="onebox selected_onebox" v-for="(item,index) in selectedArr" :key="index" @click="selectedCardClick(item,index)">
        <img :src="item.src" class="card_picture" :class="{scaleimg:index % 4 == 0}" />
        <div class="bottom selected_bottom" :class="{scalebottom:index % 4 !== 0}">
          <div class="five_pointed_star">
            <img :src="`${$store.state.imgUrl}start.png`" v-for="item1 in rank" :key="item1" class="start_img" />
          </div>
          <div class="hc_btc_box">
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
              <span class="span1">{{item.hc}}</span>
            </div>
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}btclogo.png`" class="imgcard" />
              <span class="span1">{{item.btc}}</span>
            </div>
          </div>
        </div>
        <img :src="`${$store.state.imgUrl}selected.png`" class="selected_img" />
        <img :src="`${$store.state.imgUrl}zhu.png`" class="master_img" v-if="index % 4 == 0" />
      </div>
    </div>
    <!-- 页面展示数组 -->
    <div class="cardarr_class">
      <div class="onebox" v-for="(item,index) in pageshowarr" :key="index" @click="cardClick(item,index)">
        <img :src="item.src" class="card_picture" />
        <div class="bottom">
          <div class="five_pointed_star">
            <img :src="`${$store.state.imgUrl}start.png`" v-for="item1 in rank" :key="item1" class="start_img" />
          </div>
          <div class="hc_btc_box">
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}hclogo.png`" class="imgcard" />
              <span class="span1">{{item.hc}}</span>
            </div>
            <div class="hc_coefficient">
              <img :src="`${$store.state.imgUrl}btclogo.png`" class="imgcard" />
              <span class="span1">{{item.btc}}</span>
            </div>
          </div>
        </div>
        <img :src="`${$store.state.imgUrl}select.png`" class="select_img" />
        <img :src="`${$store.state.imgUrl}fu.png`" class="orther_img" />
      </div>
      <NoData v-if="pageshowarr.length == 0 && selectedArr.length == 0 && isshowArr"></NoData>
    </div>
    <div class="Suspension_btnbox" v-if="pageshowarr.length > 0 || selectedArr.length > 0">
      <span class="bottom_title fontsize12">{{$t("message.consumption")}} {{hcnum}} HC !</span>
      <div class="btn_box fontsize16" @click="synthesisFun" v-if="isApproveHN && isApproveHC ">
        {{$t("message.synthesis.txt1")}}<BtnLoading :isloading="synthesisDis"></BtnLoading>
      </div>
      <div class="btn_box fontsize16" @click="authorizationClick('hn')" v-if="!isApproveHN">
        HN {{$t("message.approve")}}<BtnLoading :isloading="hnisloading"></BtnLoading>
      </div>
      <div class="btn_box fontsize16" @click="authorizationClick('hc')" v-else-if="!isApproveHC">
        HC {{$t("message.approve")}}<BtnLoading :isloading="hcisloading"></BtnLoading>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSigner, hnUpgrade, util, hc, hn, contract, getHnImg } from 'hashland-sdk';
export default {
  data () {
    return {
      isshowArr:false,// 页面暂时不显示nodata
      hnisloading:false,// hn 授权loading
      hcisloading:false,// hc 授权loading
      powerNumber:0,//合成卡牌提升算力
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      cardarr:[],//所有卡牌信息的数组
      selectedArr:[],//页面展示的选中的数组
      pageshowarr:[],//页面展示的数组
      rank:1,//1阶
      amount:0,//阶对应的卡牌数量
      selectedNUM:0,//选中的卡牌数量
      compose:0,//合成的卡牌数量
      selectimgArr:[],//选中的卡牌的信息
      isApproveHN:false,// hn授权
      isApproveHC:false,// hc授权
      selectALLBtn:false,//全选按钮的状态
      selectedCardnum:100000000,// 本次全选可以选中的卡牌数量
      hcnum:0, // 本次合成消耗多少hc
      synthesisDis:false,// 合成按钮loading
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount","getUserCardInfo"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue, oldValue) {
        console.log('合成页面的连接:', newValue,oldValue);
        if(newValue){
          setTimeout(() => {
            this.getSDKInfo()
            this.cardarr = JSON.parse(this.getUserCardInfo)
            this.pageshowarr = this.cardarr.filter(item => { return item.level == 1})
            this.isshowArr = true
            this.amount = this.cardarr.filter(item => { return item.level == 1}).length
          },1500)
        }
      },
      deep: true,
      immediate: true
    },
    'selectedArr': {
      handler: async function (newValue, oldValue) {
        console.log('选中的卡牌数组变化newValue: ', newValue);
        if(newValue.length > 0 && newValue.length % 4 == 0){
          let arr = this.selectedArr.map(item => {
            return item.cardID
          })
          this.hcnum = (await hnUpgrade().getUpgradePrice(arr) / 1e18).toString()
          console.log('合成金额money: ', this.hcnum);
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    selectAllClick(){
      if(this.selectedArr.length >= this.selectedCardnum){ //选中数组长度等于计算出来的数字时,证明按钮现在是选中状态
        this.selectALLBtn = false
        this.hcnum = 0
      }else{
        this.selectALLBtn = true
      }
      // this.selectALLBtn = !this.selectALLBtn
      console.log('this.selectALLBtn: ', this.selectALLBtn);
      if(this.selectedArr.length > 0){ // 判断选中卡牌数组书否大于0  大于0的情况下说明已选卡牌,清空重新计算
        this.selectedArr = []
        this.pageshowarr = this.cardarr.filter(item => { return item.level == this.rank})
      }
      this.selectedCardnum = this.pageshowarr.length - this.pageshowarr.length % 4
      console.log('本次全选可以选中的卡牌数量this.selectedCardnum: ', this.selectedCardnum);
      if(this.selectALLBtn){//选中的状态下
        if(this.selectedCardnum == this.pageshowarr.length){
          this.selectedArr = this.pageshowarr
          this.pageshowarr = []
        }else{
          // 可选卡牌不是4的倍数的逻辑
          this.selectedArr = this.pageshowarr.filter((item,index) => {
            return index < this.selectedCardnum
          })
          this.pageshowarr.splice(0,this.selectedCardnum)
        }
        this.selectedNUM = this.selectedCardnum
        this.compose = this.selectedNUM / 4
      }else{
        this.selectedArr = []
        this.pageshowarr = this.cardarr.filter(item => { return item.level == this.rank})
        this.selectedNUM = 0
        this.compose = 0
      }
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    // 合成结果
    watchResult(){
      console.log("合成结果监听方法")
      hnUpgrade().on('UpgradeHns',async (user, boxslengths, boxarrID,events) => {
        console.log('合成结果user: ',user, boxslengths, boxarrID,events)
        console.log('合成结果events: ',events)
        // let str = boxarrID.toString()
        // let arr = str.split(',')
        if(user.toLocaleLowerCase() == this.getAccount.toLocaleLowerCase()){
          let imgarr = []
          events.map(async item => {
            let obj = {}
            obj.level = (await hn().level(item.toString())).toString() // 卡牌等级
            // obj.src = await getHnImg(Number(item.toString()),Number(obj.level))
            obj.src = `//cdn.hashland.com/nft/images/hashland-nft-${item.toString()}-${obj.level}.png`
            let race = await hn().getHashrates(item.toString())
            obj.hc = race[0].toString()// hc 算力
            obj.btc = race[1].toString()// btc 算力
            imgarr.push(obj)
          })

          let lastObj = {
            minserDis:true,
            boxarr:imgarr,
            proupTitle:'Craft Detail',
          }
          this.selectRankClik(this.rank)
          this.$store.commit("setrewardsInfo", lastObj);
          this.$common.getUserCardInfoFun(this.getAccount) // 全局更新数据
        }
      })
    },
    // 合成方法
    async synthesisFun(){
      if(this.synthesisDis)return
      console.log('this.synthesisDis: ', this.synthesisDis);
      if(this.selectedArr.length < 4){
        this.$common.selectLang('至少选择4张卡牌','You need to select a minimal of 4 cards',this)
        return
      }
      let arr = this.selectedArr.map(item => {
        return item.cardID
      })
      if(arr.length % 4 !== 0){
        this.$common.selectLang('选择的卡牌必须4的倍数哦','You must select',this)
        return
      }
      // 获取用户的hc余额
      let balance = util.formatEther(await hc().balanceOf(this.getAccount))
      console.log('balance:%s', balance);

      // this.hcnum = (await hnUpgrade().getUpgradePrice(arr) / 1e18).toString()
      // console.log('合成金额money: ', this.hcnum);

      if(Number(this.hcnum) <= Number(balance)){
        this.synthesisDis = true
        hnUpgrade().connect(getSigner()).upgrade(arr).then(res => {
          console.log('合成res: ', res);
          this.synthesisDis = false
          this.watchResult()
        }).catch(err => {
          console.log('合成err: ', err);
          this.synthesisDis = false
        })
      }else{
        this.$common.selectLang('余额不足','Insufficent Balance',this)
      }
    },
    // 选中的卡牌的点击事件
    selectedCardClick(data,index){
      this.selectedArr.splice(index,1) // 删除对应图片
      this.selectedNUM--
      this.compose = parseInt(this.selectedNUM / 4)
      this.pageshowarr.push(data)
      this.selectALLBtn = false
    },
    //选择单张卡牌
    cardClick(data,index){ // index---当前数组的索引
      console.log('data: ', data);
      data.status = true
      this.selectedNUM++
      this.compose = parseInt(this.selectedNUM / 4)

      this.selectedArr.push(data)
      console.log('选中的数组this.selectedArr: ', this.selectedArr);

      this.pageshowarr.splice(index,1)
    },
    // 选择阶数
    selectRankClik(data){
      this.hcnum = 0 // 合成卡牌所需的hc金额
      this.selectedNUM = 0 // 选中的卡牌数量
      this.compose = 0 // 选中的卡牌可以合成多少张更高以及的卡牌
      this.selectimgArr = [] // 清掉原来选中卡牌的数组信息
      this.rank = data // 当前几阶
      this.amount = this.cardarr.filter(item => { return item.level == data}).length
      this.isshowArr = false
      this.pageshowarr = this.cardarr.filter(item => { return item.level == data}) // 页面展示的卡牌数组重新置换
      this.isshowArr = true
      this.selectedArr = [] // 页面展示的选中的数组
      this.selectALLBtn = false // 全选按钮的展示
    },
    back(){
      this.$router.go(-1)
    },
    // sdk一系列方法---------判断是否授权
    getSDKInfo(){
      this.$common.isApproveFun(1,this.getAccount, contract().HNUpgrade).then(res => {
        console.log('hn是否授权res: ', res);
        if (res) {
          this.isApproveHN = true
        } else {
          this.isApproveHN = false
        }
      }).catch(err => {
        console.log('是否授权err: ', err);
        this.isApproveHN = false
      })
      this.$common.isApproveFun(2,this.getAccount,contract().HNUpgrade).then(res => {
        console.log('hc是否授权res: ', res);
        if(res.toString() > 0){
          this.isApproveHC = true
        }else{
          this.isApproveHC = false
        }
      }).catch( err => {
        console.log('解锁是否授权err: ', err);
        this.isApproveHC = false
      })
    },
    // 授权操作
    authorizationClick(data){
      if(data == 'hn'){
        if(!this.isApproveHN){
          this.hnisloading = true
          this.$common.delegatingFun(1, contract().HNUpgrade).then(async res => {
            console.log('hn授权res: ', res);
            const etReceipt = await res.wait();
            if (etReceipt.status == 1) {
              this.isApproveHN = true
              this.hnisloading = false
            }
          }).catch(err => {
            console.log('hn授权err: ', err);
            this.isApproveHN = false
            this.hnisloading = false
          })
        }
      }else{
        if(!this.isApproveHC){
          this.hcisloading = true
          this.$common.delegatingFun(2,contract().HNUpgrade).then(res => {
            console.log('hc授权res: ', res);
            this.isApproveHC = true
            this.hcisloading = false
          }).catch(err => {
            console.log('hc授权err: ', err);
            this.isApproveHC = false
            this.hcisloading = false
          })
        }
      }
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
      }
    }
    .right_content{
      display: flex;
      align-items: center;
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
    .onebox{
      position: relative;
      width: 237px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 90px;
      margin-right: 46px;
      .card_picture{
        width: 100%;
        object-fit: contain;
      }
      .scaleimg{
        transform: scale(1.3);
      }
      .bottom{
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        padding:10px 8px;
        transform: scale(0.5);
        .five_pointed_star{
          display: flex;
          align-items: center;
          .start_img{
            width: 26px;
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
              width: 43px;
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
        right: 0;
        width: 31px;
        object-fit: contain;
      }
      .selected_img{
        position: absolute;
        top: -42px;
        right: -45px;
        width: 43px;
        object-fit: contain;
        transform: scale(1.2);
      }
      .master_img{
        position: absolute;
        bottom: -35px;
        right: -14px;
        width: 78px;
        object-fit: contain;
      }
      .orther_img{
        position: absolute;
        bottom: 10px;
        right: 17px;
        width: 44px;
        object-fit: contain;
      }
    }
  }
  .cardarr_class_selected{
    margin-top: 80px;
    .onebox{
      margin-bottom: 100px;
      .selected_bottom{
        position: absolute;
        top: -37px;
        transform: scale(0.7);
      }
      .scalebottom{
        position: absolute;
        top: 8px;
        transform: scale(0.5);
      }
    }
  }
  .Suspension_btnbox{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    width: 637px;
    // height: 136px;
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
    padding-top: 1rem;
    .title{
      position: absolute;
      top: 0.3rem;
      left: 0.2rem;
      width: 0.36rem;
      cursor: pointer;
      .backimg{
        width: 100%;
        object-fit: contain;
      }
    }
    .title_title {
      color: #ffffff;
      margin-bottom: 0.1rem;
    }
    .title_son1{
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
      width: 1.88rem;
      height: 0.37rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.54) linear-gradient(180deg, #24345D 0%, rgba(35, 52, 98, 0.18) 100%);
      box-shadow: -1px 14px 9px -9px rgba(0, 0, 0, 0.82) inset;
      .span1{
        color: #FFFFFF;
        margin-right: 0.1rem;
        cursor: pointer;
      }
      .span2{
        border-width: 0.12rem;
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
        width: 1.88rem;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.74);
        box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56) inset;
        filter: blur(0px);
        // background: rgba(0, 0, 0, 0.8);
        // box-shadow: -2px 1px 20px 0px rgba(184, 175, 175, 0.29) inset;
        border-radius: 0.04rem;
        padding: 0.2rem 0;
        margin-top: 0.35rem;
        .span1{
          color: #E2DADA;
          cursor: pointer;
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
        width: 0.3rem;
        object-fit: contain;
        margin-right: 0.05rem;
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
    margin-top: 0.1rem;
    .bottom_txt1 {
      width: 100%;
      display: flex;
      align-items: center;
      .span1 {
        color: #ffffff;
        line-height: 0.28rem;
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
    .onebox{
      position: relative;
      width: 25%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.1rem;
      .card_picture{
        width: 100%;
        object-fit: contain;
      }
      .scaleimg{
        transform: scale(1);
      }
      .bottom{
        position: absolute;
        top: -22px;
        display: flex;
        align-items: center;
        padding:0.1rem 0.08rem;
        transform: scale(0.1);
        .five_pointed_star{
          display: flex;
          align-items: center;
          .start_img{
            width: 0.26rem;
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
              width: 43px;
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
        width: 0.24rem;
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
  .cardarr_class_selected{
    margin-top: 0.4rem;
    .onebox{
      margin-bottom: 0.4rem;
      .selected_bottom{
        position: absolute;
        top: -0.28rem;
        transform: scale(0.2);
      }
      .scalebottom{
        position: absolute;
        top: -0.21rem;
        transform: scale(0.2);
      }
    }
  }
  .btn_box {
    position: fixed;
    bottom: 0.2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 1.8rem;
    height: 0.36rem;
    text-align: center;
    line-height: 0.36rem;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    color: #ffffff;
    cursor: pointer;
  }
}
}
// p {
//   font-family: "Audiowide";
//   text-align: center;
//   color: #81C6E3;
//   font-size: 7em;
//   transition: all 1.5s ease;animation: Glow 1.5s ease infinite alternate;
// }
// @keyframes Glow {
//   from {
//     text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #81C6E3,
//       0 0 70px #81C6E3, 0 0 80px #81C6E3, 0 0 100px #81C6E3, 0 0 150px #81C6E3;
//   }
//   to {
//     text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #81C6E3,
//       0 0 35px #81C6E3, 0 0 40px #81C6E3, 0 0 50px #81C6E3, 0 0 75px #81C6E3;
//   }
// }
</style>
