<template>
  <div class="gamefi_page">
    <span class="title1_txt fontsize32">{{ $t("message.market.txt1") }}</span>
    <!-- 市场信息 -->
    <div class="info_box">
      <div class="onebox" v-for="(item, index) in infoArr" :key="index">
        <p class="p1 fontsize12">{{ $t(item.title) }}</p>
        <p class="p1 fontsize22" v-if="item.loading">
          <NewLoading></NewLoading>
        </p>
        <p class="p1 fontsize22" v-else-if="(index == 2 || index == 1) && !item.loading ">
          $ {{ item.num }}
        </p>
        <p class="p1 fontsize22" v-else>{{ item.num }}</p>
      </div>
    </div>
    <div class="content">
      <!-- 排序  卡牌信息 -->
      <div class="leftboxs">
        <!-- 等级排序 -->
        <div class="left_content">
          <span class="span1 fontsize16">{{ $t("message.synthesis.txt4") }} {{ rank }} ({{$t("message.synthesis.txt8")}} {{ amount }})</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="selectRankClik(ele, index)" v-for="(ele, index) in cardLengthArr" :key="index">{{ $t("message.synthesis.txt4") }} {{ index + 1 }} ({{$t("message.synthesis.txt8")}} {{ ele }})</span>
          </div>
        </div>
        <!-- 职业排序 -->
        <div class="left_content">
          <span class="span1 fontsize16">{{$t(occupationTxt)}}</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="occupationFun(ele)" v-for="(ele, index) in occupationArr" :key="index">{{$t(ele.name)}}</span>
          </div>
        </div>
        <!-- 筛选-->
        <div class="left_content_price" v-for="(item,index) in orderArr" :key="index">
          <span class="span1 fontsize16">{{ $t(item.name) }}</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" v-for="(ele,index1) in item.arr" :key="index1" @click="sortPriceClik(item,ele)">
              {{ $t(ele.name) }}
            </span>
          </div>
        </div>
        <!-- 倒叙--正序 -->
        <div class="left_content_price">
          <span class="span1 fontsize16">{{$t(sequenceTxt)}}</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" @click="sequenceFun('message.market.txt14','asc')">
              {{ $t("message.market.txt14") }}
            </span>
            <span class="span1 fontsize16" @click="sequenceFun('message.market.txt15','desc')">
              {{ $t("message.market.txt15") }}
            </span>
          </div>
        </div>
      </div>
      <!-- 去挂单 -->
      <div class="right_content">
        <img
          :src="`${$store.state.imgUrl}record.png`"
          class="record_img"
          @click="recordClick"
        />
        <div class="synthesis_btn fontsize16" @click="goOrder">
          {{ $t("message.market.txt4") }}
        </div>
      </div>
    </div>
    <!-- 页面展示卡牌盒子 -->
    <div class="show_gameArr" ref="showBoxRef">
      <div class="onebox" v-for="(item, index) in pageshowarr" :key="index">
        <!-- <img :src="getsrc(item)" /> -->
        <img :src="item.loading ? item.src : `${$store.state.imgUrl}defaultcard.png`" class="img" />
        <div class="bottom_box">
          <div class="left_price">
            <img :src="`${$store.state.imgUrl}bsc.png`" class="bsc_img" />
            <span class="span1 fontsize16">{{ item.price }} BUSD</span>
          </div>
          <div class="btn fontsize12">
            <Btn
              :isapprove="isapprove"
              :approveloading="item.isstatus"
              :isloading="item.isstatus"
              :word="'buy'"
              ref="mychild"
              @sonapprove="sonapprove(item)"
              @dosomething="buyCard(item)"
            />
          </div>
        </div>
      </div>
      <div
        class="loadingbox fontsize16"
        v-if="pageshowarr.length == 0 && pageshowLoading"
      >
        Loading...
      </div>
      <NoData v-else-if="pageshowarr.length == 0 && !pageshowLoading"></NoData>
      <div class="bottom_loading" v-if="pageshowarr.length > 1">
        <span class="fontsize16" v-if="!nodata && pulldown">上拉加载更多</span>
        <span class="fontsize16" v-else-if="!nodata && !pulldown">加载中...</span>
        <span class="fontsize16" v-else-if="nodata">到底了</span>
      </div>
    </div>
    <Proup
      :btntxt="btntxt"
      :word="word"
      @besurefun="CloseFun"
      :proupDis="proupDis"
      @closedis="CloseFun"
    ></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hnMarketInfo, hnMarket, getHnImg, erc20, token, contract, getSigner, util } from 'hashland-sdk';
export default {
  data () {
    return {
      orderArr:[
        {name:'message.market.txt16',
          arr:[
            {name:'message.market.txt17',describe:'btc'},
            {name:'message.market.txt18',describe:'hc'},
            {name:'message.market.txt19',describe:'price'},
            {name:'message.market.txt20',describe:'time'}
          ]
        }
      ],
      sequenceTxt:'message.market.txt14',// 正序 --倒序
      occupationTxt:'message.market.txt9',//职业排序
      occupationArr:[
        {name:'message.market.txt10',describe:1},
        {name:'message.market.txt11',describe:2},
        {name:'message.market.txt12',describe:3},
        {name:'message.market.txt13',describe:4}
      ],//职业排序数组
      cardLengthArr: [],// 几阶对应的数量数组
      pulldown: true,// 上拉加载变量
      pageshowLoading: true,// 数据没有加载完之前显示loading
      pageshowarr: [],//页面展示数组
      rank: 1,//1阶
      amount: 0,//阶对应的卡牌数量
      selectedNUM: 0,//选中的卡牌数量
      btntxt: '',// 弹窗页面的确认按钮
      word: '',//弹窗提示文字
      proupDis: false,// 弹窗展示消失变量
      isapprove: false,// 是否授权busd
      user_busd_balance: 0,//用户busd余额
      time_btn: null,//判断是否授权按钮的定时器
      infoArr: [
        { title: "message.market.txt5", num: 0, loading: true },
        { title: "message.market.txt6", num: 0, loading: true },
        { title: "message.market.txt7", num: 0, loading: true },
        { title: "message.market.txt8", num: 0, loading: true }
      ],
      timeoutOBJ: null,// 下拉加载定时器对象
      nodata:false,// 没有数据展示字段
      isPull:false,// 是否可以再次上拉字段
      sortObj:{
        first: 15,  //查询结果数量，比如填10，就展示前10个结果
        skip: 0,  //跳过结果数量，用于分页，比如填50，相当于从第6页开始
        orderBy: 'sellTime',  // 排序字段，填字段名，所有字段见下文查询结果
        orderDirection: 'asc',  // 降序or升序，填desc或asc
        level: 1, // 按等级筛选，填1-5
        hnClass:'', // 按职业筛选，填1-4
        seller: '' // 按卖家筛选，填钱包地址
      }
    }
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount", 'getCoinPrice'])
  },
  watch: {
    'getIstrue': {
      handler: function (newValue) {
        if (newValue) {
          this.connectInfo()
          clearInterval(this.time_btn)
          this.time_btn = setInterval(() => {
            if (this.pageshowarr.length > 0) {
              clearInterval(this.time_btn)
              for (let index = 0; index < this.$refs.mychild.length; index++) {
                this.$refs.mychild[index].isApproveFun('BUSD', contract().HNMarket).then(res => {
                  // console.log("shishou:",res)
                  if (res) {
                    this.isapprove = true
                  } else {
                    this.isapprove = false
                  }
                });
              }
            }
            // console.log("链接状态为true时判断是否授权")
          }, 1000)
        }
      },
      deep: true,
      immediate: true
    },
    'pageshowarr': {
      handler: function (newValue) {
        // console.log('pageshowarr----newValue: ', newValue);
        if (newValue.length > 0) {
          newValue.map(item => {
            let newImg = new Image()
            newImg.src = item.src
            newImg.onload = () => { // 图片加载成功后把地址给原来的img
              item.loading = true
            }
          })
        }
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    // 正序--倒叙方式
    sequenceFun(data,style){
      console.log('正序--倒叙方式data: ', data,style);
      this.sequenceTxt = data
      this.sortObj.orderDirection = style
      this.sortObj.skip = 0
      this.pageshowLoading = true
      this.encapsulationFun()
    },
    sonapprove (item) {
      if (item.isstatus) return
      item.isstatus = true
      console.log('父组件页面调用子组件的授权方法,授权busd', item)
      for (let index = 0; index < this.pageshowarr.length; index++) {
        const element = this.pageshowarr[index];
        element.isstatus = true
      }
      this.$refs.mychild[0].goApproveFun('BUSD', contract().HNMarket).then(res => {
        if (res) {
          for (let index = 0; index < this.pageshowarr.length; index++) {
            const element = this.pageshowarr[index];
            element.isstatus = false
          }
          this.isapprove = true
        } else {
          for (let index = 0; index < this.pageshowarr.length; index++) {
            const element = this.pageshowarr[index];
            element.isstatus = false
          }
          this.isapprove = false
        }
      }).catch(err => {
        for (let index = 0; index < this.pageshowarr.length; index++) {
          const element = this.pageshowarr[index];
          element.isstatus = false
        }
        this.isapprove = false
      })
      // this.$refs.mychild[0].goApproveFun('busd',contract().HNMarket);
    },
    // 购买卡牌
    buyCard (item) {
      console.log('item: ', item);
      if (item.isstatus) return
      if (Number(this.user_busd_balance) >= Number(item.price)) {
        item.isstatus = true
        let arr = []
        // this.pageshowarr.forEach(item => {
        //   arr.push(item.cardID)
        // })
        arr.push(item.hnId)
        hnMarket().connect(getSigner()).buy(arr).then(async ele => {
          console.log('买家批量购买卡牌res: ', ele);
          const etReceipt = await ele.wait();
          if (etReceipt.status == 1) {
            this.$common.newgetUserCardInfoFun(this.getAccount).then(res1 => {
              console.log('重新获取用户卡牌信息res1: ', res1);
              sessionStorage.removeItem('count')
              if (res1 > 1) {
                sessionStorage.setItem("count", res1)
              } else {
                sessionStorage.setItem("count", 1)
              }
            })
            this.sortObj.skip = 0
            this.getDatabaseaFun(this.sortObj).then(data => {
              if (data.status == 0) {
                this.pageshowarr = data.arr
                this.nodata = false
                this.pulldown = true
                this.$common.selectLang('购买成功', '购买成功', this)
                this.getSDKInfo()
                this.connectInfo()
                item.isstatus = false
              } else if (data.status == 1) {
                this.pageshowarr = []
                this.nodata = true
              }
            })
          } else {
            item.isstatus = false
          }
        }).catch(err => {
          item.isstatus = false
          console.log('买家批量购买卡牌err: ', err);
        })
      } else {
        this.$common.selectLang('余额不足', '余额不足', this)
      }
    },
    // 选择阶数
    selectRankClik (ele, index) {
      if (this.pageshowLoading) return
      this.rank = index + 1 // 当前几阶
      this.amount = ele
      this.pageshowarr = []
      this.pulldown = true// 上拉加载变量
      this.pageshowLoading = true// 数据秘没有加载玩之前显示loading
      this.nodata = false
      this.occupationIstrue = true // 职业排序此字段的true与false决定排序数组是否有值
      this.sortObj.level = this.rank // 选择当前等级
      this.sortObj.skip = 0 // 当前页数重置为0
      this.encapsulationFun('ccupation')
    },
    // 职业排序
    occupationFun(ele){
      console.log('ele: ', ele);
      this.occupationTxt = ele.name
      this.sortObj.hnClass = ele.describe
      this.sortObj.skip = 0
      this.pageshowLoading = true
      this.encapsulationFun('ccupation')
    },
    // 筛选
    sortPriceClik (item,data) {
      console.log('data: ',item, data);
      item.name = data.name
      this.sortObj.skip = 0
      this.pageshowLoading = true
      switch (data.describe) {
        case 'btc':
          this.sortObj.orderBy = 'btcHashrate'
          this.encapsulationFun()
          break;
        case 'hc':
          this.sortObj.orderBy = 'hcHashrate'
          this.encapsulationFun()
          break;
        case 'price':
          this.sortObj.orderBy = 'price'
          this.encapsulationFun()
          break;
        case 'time':
          this.sortObj.orderBy = 'sellTime'
          this.encapsulationFun()
          break;
        default:
          break;
      }
    },
    // 排序--筛选--封装函数
    encapsulationFun(type = ''){
      this.getDatabaseaFun(this.sortObj).then(res => { // 页面加载的时候  查询第一页(0)的数据--每页展示1条数据(测试)
        if(type = 'ccupation'){
          this.sortObj.skip += this.sortObj.first
        }
        if (res.status == 0) {
          this.pageshowarr = res.arr
          this.pageshowLoading = false
        } else if (res.status == 1) {
          this.pageshowarr = []
          this.pageshowLoading = false
        }
      }).catch(() => {
        this.pageshowarr = []
        this.pageshowLoading = false
      })
    },
    // 去挂单
    goOrder () {
      this.$router.push('/hangingorder')
    },
    // 挂单记录
    recordClick () {
      this.$router.push('/pendingrecord')
    },
    // 取消按钮(关闭弹窗)
    CloseFun () {
      this.proupDis = false
    },
    //获取sdk信息
    async getSDKInfo () {
      // 获取各阶所售卖的总卡牌数量
      hnMarket().getEachLevelHnIdsLength(5).then(res => {
        // console.log('获取各阶所售卖的总卡牌数量res: ', res);
        this.cardLengthArr = res
        this.amount = res[this.rank - 1]
      })
      // 获取市场正在出售的所有HN卡牌数量
      hnMarket().getHnIdsLength().then(res => {
        // console.log('获取市场正在出售的所有HN卡牌数量: ', res)
        this.infoArr[3].num = res.toNumber()
        this.infoArr[3].loading = false
      })
      // 获取总成交次数
      this.infoArr[0].num = await hnMarket().totalSellCount()
      this.infoArr[0].loading = false
      // 获取总成交额，除1e18
      hnMarket().totalSellAmount().then(res => {
        // console.log('获取总成交额，除1e18: ', res)
        this.infoArr[1].num = this.$common.convertBigNumberToNormal(res.toString(), 2)
        this.infoArr[2].num = this.$common.divBigNumber(this.infoArr[1].num, (this.infoArr[0].num).toString(), 2)
        this.infoArr[2].loading = false
        this.infoArr[1].loading = false
      })
    },
    connectInfo () {
      // 获取用户余额
      erc20(token().BUSD).balanceOf(this.getAccount).then(res => {
        this.user_busd_balance = util.formatEther(res)
      })
    },
    // 监听盒子的滚动事件
    listenerBoxScroll () {
      this.$refs.showBoxRef.addEventListener('scroll', () => {
        // console.log("滚动事件")
        if(this.pageshowarr.length == 0)return
        if (this.$refs.showBoxRef.scrollTop + 50 > this.$refs.showBoxRef.scrollHeight - this.$refs.showBoxRef.offsetHeight) {
          if (this.timeoutOBJ) {
            clearTimeout(this.timeoutOBJ)
            if (this.isPull || this.nodata) return
            this.pulldown = false // 显示加载中
            this.timeoutOBJ = setTimeout(() => {
              this.pulldownFun(this.sortObj.skip)
            }, 500)
          } else {
            if (this.isPull || this.nodata) return
            this.pulldown = false // 显示加载中
            this.timeoutOBJ = setTimeout(() => {
              this.pulldownFun(this.sortObj.skip)
            }, 300)
          }
        }
      })
    },
    pulldownFun (num) {
      console.log('上拉加载传进来的num: ', num);
        this.isPull = true
        this.sortObj.skip = num
        this.getDatabaseaFun(this.sortObj).then(res => {
          this.isPull = false
          this.sortObj.skip += this.sortObj.first
          if (res.status == 0) {
            this.pageshowarr = this.pageshowarr.concat(res.arr)
            this.pulldown = true
            this.nodata = false
          } else if (res.status == 1) {
            this.nodata = true
          }
        }).catch(err => {
          console.log('士大夫十分err: ', err);
          this.pageshowarr = []
          this.nodata = true
        })
    },
    // 合约数据库信息
    getDatabaseaFun (sortObj) {
      //first?: number,  //查询结果数量，比如填10，就展示前10个结果
      //skip?: number,  //跳过结果数量，用于分页，比如填50，相当于从第6页开始
      //orderBy?: string,  // 排序字段，填字段名，所有字段见下文查询结果
      //orderDirection?: string,  // 降序or升序，填desc或asc
      //level?: number, // 按等级筛选，填1-5
      //hnClass?: number, // 按职业筛选，填1-4
      //seller?: string, // 按卖家筛选，填钱包地址
      return new Promise((resolve,reject) => {
        hnMarketInfo.getSellInfo(sortObj.first,sortObj.skip,sortObj.orderBy,sortObj.orderDirection,sortObj.level,sortObj.hnClass,sortObj.seller).then(res => {
          console.log('第一步合约数据库返回信息res: ', res);
          if (res.data.sellInfos.length > 0) {
            const arr = JSON.parse(JSON.stringify(res.data.sellInfos))
            arr.forEach(element => {
              element.loading = false // 图片加载的loading
              element.isstatus = false // 授权以及其他按钮操作的loading
              element.src = getHnImg(element.hnId, element.level, [element.hcHashrate, element.btcHashrate])
              element.price = this.$common.convertBigNumberToNormal(element.price.toString(),2)
            });
            resolve({ 'status': 0, 'arr': arr, 'msg': 'Success' })
          } else {
            resolve({ 'status': 1, 'msg': 'No data' });
          }
        }).catch(() => {
          reject({ 'status': 1, 'msg': 'Fail' });
        })
      })
    },
  },
  mounted () {
    this.getSDKInfo()
    this.$nextTick(() => {
      this.listenerBoxScroll()
    })
    this.encapsulationFun('ccupation')
  }
}
</script>

<style lang='scss' scoped>
.gamefi_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 126px;
  .info_box {
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 54px;
    .onebox {
      width: 234px;
      height: 115px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background: #021e3e;
      box-shadow: 0px 2px 13px 0px rgba(2, 18, 35, 0.68);
      border-radius: 4px;
      padding: 28px 0 25px;
      margin-right: 54px;
      .p1 {
        color: #ffffff;
      }
    }
  }
  .title1_txt {
    color: #ffffff;
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 71px;
    .leftboxs {
      display: flex;
      align-items: center;
      justify-content: center;
      .left_content {
        position: relative;
        width: 200px;
        height: 44px;
        background: #031224;
        box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18),
          -2px 1px 8px 0px rgba(194, 190, 190, 0.52) inset;
        border-radius: 9px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        margin-right: 15px;
        .span1 {
          color: #ffffff;
          margin-right: 10px;
        }
        .span2 {
          border-width: 7px;
          border-color: #00e7f0;
          border-bottom-width: 0;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
        }
        .left_content_hover {
          position: absolute;
          top: -3px;
          left: 0;
          z-index: 9;
          width: 200px;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.9);
          box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
          filter: blur(0px);
          border-radius: 4px;
          padding: 10px 19px;
          margin-top: 47px;
          line-height: 39px;
          .span1 {
            color: #e2dada;
            cursor: pointer;
          }
        }
      }
      .left_content:hover,.left_content_price:hover {
        .left_content_hover {
          display: flex;
          .span1:hover {
            color: #00e7f0;
          }
        }
      }
      .left_content_price {
        margin-left: 15px;
        width:160px;
        position: relative;
        height: 44px;
        background: #031224;
        box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18),
          -2px 1px 8px 0px rgba(194, 190, 190, 0.52) inset;
        border-radius: 9px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        .span1 {
          color: #ffffff;
          margin-right: 10px;
        }
        .span2 {
          border-width: 7px;
          border-color: #00e7f0;
          border-bottom-width: 0;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
        }
        .left_content_hover {
          position: absolute;
          top: -3px;
          left: 0;
          z-index: 9;
          width:160px;
          display: none;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(0, 0, 0, 0.9);
          box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
          filter: blur(0px);
          border-radius: 4px;
          padding: 10px 19px;
          margin-top: 47px;
          line-height: 39px;
          .span1 {
            color: #e2dada;
            cursor: pointer;
          }
        }
      }
    }
    .right_content {
      display: flex;
      align-items: center;
      cursor: pointer;
      .synthesis_btn {
        width: 144px;
        height: 49px;
        line-height: 49px;
        background-image: url(//cdn.hashland.com/images/nft_btn1.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        text-align: center;
        color: #ffffff;
        cursor: pointer;
      }
      .record_img {
        width: 40px;
        object-fit: contain;
        margin-right: 20px;
      }
    }
  }
  .show_gameArr {
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    max-height: 425px;
    // max-height: 370px;
    // max-height: 720px;
    .onebox {
      width: 228px;
      display: flex;
      flex-direction: column;
      margin-right: 60px;
      margin-bottom: 30px;
      .img {
        width: 228px;
        object-fit: contain;
        min-height: 280px;
      }
      .bottom_box {
        width: 100%;
        margin-top: 20px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
        padding: 4px 8px;
        .left_price {
          display: flex;
          align-items: center;
          .bsc_img {
            width: 24px;
            object-fit: contain;
            margin-right: 4px;
          }
          .span1 {
            color: #ffffff;
          }
        }
        .btn {
          min-width: 56px;
          padding: 10px 5px;
          height: 22px;
          border-radius: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #dd9005;
          color: #ffffff;
          cursor: pointer;
        }
      }
    }
    .loadingbox {
      width: 100%;
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
    }
    .bottom_loading {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      margin-top: 60px;
    }
  }
}
@media screen and (min-width: 1280px) {
  .gamefi_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .gamefi_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.2rem;
    padding-top: 0.94rem;
    .info_box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 0.33rem;
      .onebox {
        width: 1.49rem;
        height: 0.84rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: #021e3e;
        box-shadow: 0px 2px 13px 0px rgba(2, 18, 35, 0.68);
        border-radius: 0.04rem;
        padding: 0.18rem 0;
        margin-right: 0;
        margin-bottom: 0.18rem;
        .p1 {
          color: #ffffff;
        }
      }
    }
    .title1_txt {
      color: #ffffff;
    }
    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.23rem;
      .leftboxs {
        display: flex;
        align-items: center;
        justify-content: center;
        .left_content {
          position: relative;
          width: 0.96rem;
          height: 0.27rem;
          background: #031224;
          box-shadow: 5px 30px 31px 0px rgba(0, 0, 0, 0.18),
            -2px 1px 8px 0px rgba(194, 190, 190, 0.52) inset;
          border-radius: 0.06rem;
          padding: 0 0.05rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          .span1 {
            color: #ffffff;
            margin-right: 0.1rem;
          }
          .span2 {
            border-width: 0.07rem;
            border-color: #00e7f0;
            border-bottom-width: 0;
            border-style: dashed;
            border-top-style: solid;
            border-left-color: transparent;
            border-right-color: transparent;
          }
          .left_content_hover {
            position: absolute;
            top: -3px;
            left: 0;
            z-index: 9;
            width: 222px;
            display: none;
            flex-direction: column;
            justify-content: space-between;
            background: rgba(0, 0, 0, 0.9);
            box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
            filter: blur(0px);
            border-radius: 4px;
            padding: 10px 19px;
            margin-top: 47px;
            line-height: 39px;
            .span1 {
              color: #e2dada;
              cursor: pointer;
            }
          }
        }
        .left_content_price {
          margin-left: 71px;
        }
        .left_content:hover {
          .left_content_hover {
            display: flex;
            .span1:hover {
              color: #00e7f0;
            }
          }
        }
      }
      .right_content {
        display: flex;
        align-items: center;
        cursor: pointer;
        .synthesis_btn {
          width: 144px;
          height: 49px;
          line-height: 49px;
          background-image: url(//cdn.hashland.com/images/nft_btn1.png);
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          color: #ffffff;
          cursor: pointer;
        }
        .record_img {
          width: 40px;
          object-fit: contain;
          margin-right: 20px;
        }
      }
    }
    .show_gameArr {
      margin-top: 40px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow-y: scroll;
      max-height: 720px;
      .onebox {
        width: 1.6rem;
        display: flex;
        flex-direction: column;
        margin-right: 0;
        margin-bottom: 0.2rem;
        .img {
          width: 100%;
          min-height: 1rem;
          object-fit: contain;
        }
        .bottom_box{
          width: 100%;
          margin-top: 0.1rem;
          border-radius: 0.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
          padding: 0.02rem 0.04rem;
          .left_price{
            display: flex;
            align-items: center;
            .bsc_img{
              width: 0.18rem;
              object-fit: contain;
              margin-right: 0.02rem;
            }
            .span1{
              color: #ffffff;
            }
          }
          .btn{
            min-width: 0.56rem;
            padding: 0.05rem;
            height: 0.22rem;
            border-radius: 0.15rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background:#DD9005;
            color: #ffffff;
            cursor: pointer;
          }
        }
      }
      .loadingbox {
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
      }
      .bottom_loading {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
      }
    }
  }
}
</style>
