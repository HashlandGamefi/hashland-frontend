<template>
  <div class="insertcard_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <div class="title_title fontsize32">{{$t("message.synthesis.txt1")}}</div>
    <div class="title_son1 fontsize12_400">{{$t("message.synthesis.txt3")}}</div>
    <div class="content">
      <div class="add_content_box">
        <div class="left_content" :class="[disablehover?'clear_hover':'']">
          <span class="span1 fontsize16">{{$t("message.series")}} {{seriesTxt}}</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="selectSeries(1)">{{$t("message.series")}} {{seriesTxt1}}</span>
            <span class="span1 fontsize16" @click="selectSeries(2)">{{$t("message.series")}} {{seriesTxt2}}</span>
          </div>
        </div>
        <div class="left_content" :class="[disablehover?'clear_hover':'']">
          <span class="span1 fontsize16">{{$t("message.synthesis.txt4")}} {{rank}} ({{$t("message.synthesis.txt8")}} {{amount}})</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="selectRankClik(ele)" v-for="ele in 5" :key="ele">{{$t("message.synthesis.txt4")}} {{ele}} ({{$t("message.synthesis.txt8")}} {{cardarr.filter(data => {return data.series == seriesTxt && data.level == ele}).length}})</span>
          </div>
        </div>
        <!-- 移动端的全选按钮 (pc不展示) -->
        <div class="right_content pc_right_content" @click="selectAllClick">
          <img :src="`${$store.state.imgUrl}selected.png`" class="selectimg" v-if="selectALLBtn || selectedArr.length >= selectedCardnum " />
          <img :src="`${$store.state.imgUrl}select.png`" class="selectimg" v-else />
          <span class="select_ttx fontsize16">{{$t("message.synthesis.txt5")}}</span>
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
      <div class="bottom_txt1">
        <span class="span1 fontsize12_400">{{$t("message.synthesis.txt2")}}</span>
      </div>
      <!-- <div class="bottom_txt2 fontsize16_400" v-if="selectedArr.length > 0">
        {{$t("message.synthesis.txt7")}}{{rank}}{{$t("message.synthesis.txt10")}} {{compose}} {{rank + 1 }}{{$t("message.synthesis.txt11")}} {{powerNumber}}%
      </div> -->
    </div>
    <!-- 选中以后的卡牌数组 -->
    <div class="cardarr_class cardarr_class_selected" v-if="selectedArr.length > 0">
      <div class="onebox" :class="{margin0:index % 4 == 3 }" v-for="(item,index) in selectedArr" :key="index" @click="selectedCardClick(item,index)">
        <img :src="item.src" class="card_picture" :class="{scaleimg:index % 4 == 0}" />
        <!-- && item.ultra -->
        <Lottie :options="anmationArr.filter(ele => {return ele.level == item.level && ele.type == item.type})[0].dataJson" :width="getIsMobile?256:'50%'" v-if="item.ultra && anmationArr.length > 0"></Lottie>
        <img :src="`${$store.state.imgUrl}selected.png`" class="selected_img" />
        <img :src="`${$store.state.imgUrl}zhu.png`" class="master_img" :class="{newCardMaster:item.series == 2}" v-if="index % 4 == 0" />
      </div>
    </div>
    <!-- 页面展示数组 -->
    <div class="cardarr_class">
      <div class="onebox" :class="{margin0:index % 4 == 3 }" v-for="(item,index) in pageshowarr" :key="index" @click="cardClick(item,index)">
        <img :src="item.src" class="card_picture" />
        <Lottie :options="anmationArr.filter(ele => {return ele.level == item.level && ele.type == item.type})[0].dataJson" :width="getIsMobile?256:'50%'" v-if="item.ultra"></Lottie>
        <img :src="`${$store.state.imgUrl}select.png`" class="select_img" />
      </div>
      <LoadingAnmation v-if="pageshowarr.length == 0 && pageshowLoading"></LoadingAnmation>
      <NoData v-else-if="pageshowarr.length == 0 && selectedArr.length == 0 && !pageshowLoading"></NoData>
    </div>
    <!-- 按钮 -->
    <div class="Suspension_btnbox" v-if="pageshowarr.length > 0 || selectedArr.length > 0">
      <span class="bottom_title fontsize12">{{$t("message.consumption")}} {{hcnum}} HC !</span>
      <div class="btn_box fontsize16" @click="synthesisFun" v-if="isApproveHN && isApproveHC ">
        {{$t("message.synthesis.txt1")}}<BtnLoading :isloading="synthesisDis"></BtnLoading>
      </div>
      <div class="btn_box fontsize16" @click="authorizationClick('hn')" v-if="!isApproveHN">
        NFT {{$t("message.approve")}}<BtnLoading :isloading="hnisloading"></BtnLoading>
      </div>
      <div class="btn_box fontsize16" @click="authorizationClick('hc')" v-else-if="!isApproveHC">
        HC {{$t("message.approve")}}<BtnLoading :isloading="hcisloading"></BtnLoading>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="BesureFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getSigner, hnUpgradeV2, util, hc, hn, contract, getHnImg } from 'hashland-sdk';
export default {
  data () {
    return {
      disablehover:false,
      anmationArr:[],//动画数组的json
      pageshowLoading:true,
      seriesTxt:1,
      seriesTxt1:1,
      seriesTxt2:2,
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
      selectedCardnum:10000000000,// 本次全选可以选中的卡牌数量
      hcnum:0, // 本次合成消耗多少hc
      synthesisDis:false,// 合成按钮loading
      timerll:null,
      timerll_result:null,
      infoArr:[], // 选中的卡牌过滤以后的数组信息
      isFlag:true,// 是否开启flag--新卡合成
      maximumNumberOfCards:16,// 新卡牌在isFlag为true的情况下  最多选择合成数
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount","getUserCardInfo","getIsMobile"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        if(newValue){
          this.pageshowLoading = true
          this.resetData()
          this.getSDKInfo()
          this.getUserAllCard()
        }else{
          this.pageshowLoading = false
          this.resetData()
        }
      },
      deep: true,
      immediate: true
    },
    'selectedArr': {
      handler: async function (newValue) {
        if(newValue.length > 0 && newValue.length % 4 == 0){
          let arr = this.selectedArr.map(item => {
            return item.cardID
          })
          this.hcnum = (await hnUpgradeV2().getUpgradePrice(arr) / 1e18).toString()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 重置数据
    resetData(){
      this.cardarr = []//所有卡牌信息的数组
      this.selectedArr = []//页面展示的选中的数组
      this.pageshowarr = []//页面展示的数组
      this.rank = 1//1阶
      this.amount = 0//阶对应的卡牌数量
      this.selectedNUM = 0//选中的卡牌数量
      this.compose = 0//合成的卡牌数量
      this.selectimgArr = []//选中的卡牌的信息
      this.seriesTxt = 1
      this.selectALLBtn = false
      this.hcnum = 0
    },
    // 选择卡牌系列
    selectSeries(data){
      this.disablehover = true
      setTimeout(() => {
        this.disablehover = false
      },600)
      if(!this.getIstrue)return this.$common.selectLang("请连接钱包！", "Please connect the wallet!", this)
      if(this.pageshowLoading)return
      this.selectimgArr = [] //选中的卡牌的信息
      this.selectedArr = [] // 页面展示的选中的数组
      this.selectALLBtn = false // 全选按钮的展示
      this.selectedNUM = 0//选中的卡牌数量
      this.pageshowLoading = true
      this.pageshowarr = []
      this.hcnum = 0
      if(this.isFlag){
        this.selectedCardnum = this.maximumNumberOfCards // 开启link的情况下,老卡新卡最大合成数为16张
      }else{
        this.selectedCardnum = 10000000000
      }
      if(data == 1){
        this.seriesTxt = this.seriesTxt1
        this.SeparateMethodToGetData(1,this.rank)
      }else{
        this.seriesTxt = this.seriesTxt2
        this.SeparateMethodToGetData(2,this.rank)
      }
      this.getSDKInfo() // 重新判断是否授权
    },
    // 用户总卡牌数据获取
    getUserAllCard(){
      clearInterval(this.timerll)
      this.timerll = setInterval(() => {
        if(sessionStorage.getItem('count')){
          clearInterval(this.timerll)
          this.pageshowLoading = true
          this.SeparateMethodToGetData(1,1)
        }
      }, 1000);
    },
    // 获取对应系列的卡牌
    SeparateMethodToGetData(series,level = 1){
      this.cardarr = JSON.parse(this.getUserCardInfo)
      let arr = this.cardarr.filter(item => { return item.level == level})
      arr.sort((a, b) => {
        if(a.ultra == b.ultra == true){
          if(b.type == a.type){
            return b.type - a.type
          }else{
            return a.type - b.type
          }
        }else{
          return b.ultra - a.ultra
        }
      })
      this.pageshowarr = arr.filter(item => {
        return item.series == series
      })
      this.amount = this.pageshowarr.filter(item => { return item.level == level}).length
      this.pageshowLoading = false
    },
    selectAllClick(){
      if(this.pageshowarr.length < 4 && this.selectedArr.length == 0)return // 先判断页面上展示的卡牌数组是否大于4,全选按钮才可以选
      if(this.selectedArr.length >= this.selectedCardnum){ //选中数组长度等于计算出来的数字时,证明按钮现在是选中状态
        this.selectALLBtn = false
        this.hcnum = 0
      }else{
        this.selectALLBtn = true
      }
      if(this.selectedArr.length > 0){ // 判断选中卡牌数组书否大于0  大于0的情况下说明已选卡牌,清空重新计算
        this.selectedArr = []
        let arr = this.cardarr.filter(item => { return item.series == this.seriesTxt && item.level == this.rank})
        arr.sort((a, b) => {
          return Number(a.type) > Number(b.type) ? 1 : -1;
        })
        this.pageshowarr = arr //this.cardarr.filter(item => { return item.level == this.rank})
        this.selectedNUM = 0
        this.compose = 0
      }
      // this.selectedCardnum = this.pageshowarr.length - this.pageshowarr.length % 4
      if(this.isFlag){
        this.selectedCardnum = this.pageshowarr.length >= 16?this.maximumNumberOfCards:this.pageshowarr.length - this.pageshowarr.length % 4 // 开启link的情况下,老卡新卡最大合成数为16张
      }else{
        this.selectedCardnum = this.pageshowarr.length - this.pageshowarr.length % 4
      }
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
      }
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
      this.synthesisDis = false
    },
    BesureFun(){
      if(!this.synthesisDis){
        this.proupDis = false
        return
      }
      this.proupDis = false
      hnUpgradeV2().connect(getSigner()).upgrade(this.infoArr).then(res => {
        this.watchResult()
      }).catch(err => {
        console.log('卡牌系列合成方法err: ', err);
        this.synthesisDis = false
      })
    },
    // 合成结果
    watchResult(){
      let filter = hnUpgradeV2().filters.UpgradeHns(this.getAccount)
      hnUpgradeV2().on(filter, (user, boxslengths, boxarrID,events,isUcard) => {
        console.log('合成结果:user', user);
        console.log('合成结果:boxslengths', boxslengths);
        console.log('合成结果:boxarrID', boxarrID);
        console.log('合成结果:events', events);
        console.log('合成结果:isUcard',isUcard);
        this.$common.newgetUserCardInfoFun(this.getAccount).then(res1 => {
          if(res1 > 1){
            sessionStorage.setItem("count",res1)
          }
        })
        let imgarr = []
        events.map(async item => {
          let obj = {}
          obj.level = (await hn().level(item.toString())).toString() // 卡牌等级
          let race = await hn().getHashrates(item) // 算力数组
          // obj.ultra = (await hn().data(item, 'ultra')).toNumber() >= 1?true:false
          isUcard.forEach(item => {
            obj.ultra = item
          })
          obj.series = (await hn().series(item)).toString() // 系列
          if(obj.series == '1'){
            obj.src = getHnImg(Number(item),Number(obj.level),race,obj.ultra)
          }else if(obj.series == '2'){
            obj.src = getHnImg(Number(item), obj.level,race,obj.ultra,true)
          }
          obj.type = (
              await hn().getRandomNumber(item, "class", 1, 4)
            ).toString();
          obj.loading = false
          imgarr.push(obj)
        })
        let lotteryObject = setInterval(() => {
          if(imgarr.length == events.length){
            clearInterval(lotteryObject)
            let transferArr = imgarr.sort((a,b) => {
              if(a.ultra == b.ultra == true){
                return a.type > b.type?1:-1
              }else{
                return a.type > b.type?1:-1
              }
            })
            let lastObj = {
              minserDis:true,
              boxarr:transferArr ,
              proupTitle:'Craft Detail',
            }
            this.$store.commit("setrewardsInfo", lastObj);
            this.synthesisDis = false
          }
        },1000)

        clearInterval(this.timerll_result)
        this.timerll_result = setInterval(() => {
          if(sessionStorage.getItem('count')){
            clearInterval(this.timerll_result)
            this.selectRankClik(this.rank)
          }
          // console.log("合成以后获取用户信息:",sessionStorage.getItem('count'))
        }, 1000);
      })
    },
    // 合成方法
    async synthesisFun(){
      if(this.rank == 5){
        this.$common.selectLang('已经是最高等级','Already the highest level',this)
        return
      }
      if(this.synthesisDis)return
      if(this.selectedArr.length < 4){
        this.$common.selectLang('至少选择4张卡牌','You need to select a minimal of 4 cards',this)
        return
      }
      this.infoArr = this.selectedArr.map(item => {
        return item.cardID
      })
      if(this.infoArr.length % 4 !== 0){
        this.$common.selectLang('选择的卡牌必须4的倍数哦','You must select',this)
        return
      }
      // 获取用户的hc余额
      let balance = util.formatEther(await hc().balanceOf(this.getAccount))

      if(Number(this.hcnum) <= Number(balance)){
        this.synthesisDis = true
        this.proupDis = true
        this.$common.selectLang('Game data will be cleared beside the main NFT once NFTs are crafted.','Game data will be cleared beside the main NFT once NFTs are crafted.',this)
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
      if(this.isFlag){
        if(this.selectedNUM >= this.maximumNumberOfCards)return
      }
      data.status = true
      this.selectedNUM++
      this.compose = parseInt(this.selectedNUM / 4)
      this.selectedArr.push(data)
      this.pageshowarr.splice(index,1)
    },
    // 选择阶数
    selectRankClik(data){
      this.disablehover = true
      setTimeout(() => {
        this.disablehover = false
      },600)
      this.hcnum = 0 // 合成卡牌所需的hc金额
      this.selectedNUM = 0 // 选中的卡牌数量
      this.compose = 0 // 选中的卡牌可以合成多少张更高以及的卡牌
      this.selectimgArr = [] // 清掉原来选中卡牌的数组信息
      this.rank = data // 当前几阶

      this.cardarr = JSON.parse(this.getUserCardInfo)
      this.amount = this.cardarr.filter(item => { return item.level == data && item.series == this.seriesTxt}).length
      this.pageshowarr = this.cardarr.filter(item => { return item.series == this.seriesTxt && item.level == data}).sort((a, b) => {
        if(a.ultra == b.ultra == true){
          if(b.type == a.type){
            return b.type - a.type
          }else{
            return a.type - b.type
          }
        }else{
          return b.ultra - a.ultra
        }
      })
      this.selectedArr = [] // 页面展示的选中的数组
      this.selectALLBtn = false // 全选按钮的展示
      this.selectedCardnum = 100000000000
    },
    back(){
      this.$router.go(-1)
    },
    // sdk一系列方法---------判断是否授权
    getSDKInfo(){
      this.$common.isApproveFun(1,this.getAccount, contract().HNUpgradeV2).then(res => {
        if (res) {
          this.isApproveHN = true
        } else {
          this.isApproveHN = false
        }
      }).catch(err => {
        this.isApproveHN = false
      })
      this.$common.isApproveFun(2,this.getAccount,contract().HNUpgradeV2).then(res => {
        if(res.toString() > 0){
          this.isApproveHC = true
        }else{
          this.isApproveHC = false
        }
      }).catch( err => {
        this.isApproveHC = false
      })
    },
    // 授权操作
    authorizationClick(data){
      if(data == 'hn'){
        if(!this.isApproveHN){
          this.hnisloading = true
          this.$common.delegatingFun(1, contract().HNUpgradeV2).then(async res => {
            const etReceipt = await res.wait();
            if (etReceipt.status == 1) {
              this.isApproveHN = true
              this.hnisloading = false
            }
          }).catch(err => {
            this.isApproveHN = false
            this.hnisloading = false
          })
        }
      }else{
        if(!this.isApproveHC){
          this.hcisloading = true
          this.$common.delegatingFun(2,contract().HNUpgradeV2).then(res => {
            this.isApproveHC = true
            this.hcisloading = false
          }).catch(err => {
            this.isApproveHC = false
            this.hcisloading = false
          })
        }
      }
    },
  },
  mounted(){
    let timerObject = setInterval(() => {
      if(localStorage.getItem('Animation')){
        this.anmationArr = JSON.parse(localStorage.getItem('Animation'))
        clearInterval(timerObject)
      }
    },1000)
    hnUpgradeV2().vrfFlag().then(res => {
      console.log('是否开启了LINK随机数功能res: ', res);
      this.isFlag = res
    })
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
    .add_content_box{
      width: 50%;
      display: flex;
      align-items: center;
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
      .pc_right_content{
        display: none;
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
      width: 256px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
      margin-right: 40px;
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
      .selected_img{
        position: absolute;
        top: -5px;
        right: 10px;
        width: 30px;
        -o-object-fit: contain;
        object-fit: contain;
      }
      .master_img{
        position: absolute;
        bottom: 0;
        right: 0;
        width: 78px;
        object-fit: contain;
      }
      .newCardMaster{
        width: 40px;
      }
    }
  }
  .cardarr_class_selected{
    padding: 0;
  }
  .Suspension_btnbox{
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    width: 637px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(180deg, #06366D 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5), -1px 18px 14px -2px #041D3A;
    border-radius: 79px;
    padding: 12px 0;
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
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-top: 0.33rem;
      .add_content_box{
        width: 100%;
        flex-wrap: wrap;
        .left_content{
          position: relative;
          width: 50%;
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
        .pc_right_content{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-right: 0.2rem;
          margin-top: 0.1rem;
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
      .right_content{
        display: none;
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
        // .scaleimg{
        //   transform: scale(1);
        // }
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
        .newCardMaster{
          width: 0.25rem;
        }
      }
    }
    .cardarr_class_selected{
      margin-top: 0.2rem;
      margin-bottom: 0;
      .onebox{
        margin-bottom: 0.2rem;
        // .selected_bottom{
        //   position: absolute;
        //   top: 0;
        //   transform: scale(0.5);
        // }
        // .scalebottom{
        //   position: absolute;
        //   top: 0;
        //   transform: scale(0.5);
        // }
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
  }
}
</style>
