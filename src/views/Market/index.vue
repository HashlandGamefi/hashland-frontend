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
        <!-- 几阶对应数量 -->
        <div class="left_content">
          <span class="span1 fontsize16"
            >{{ $t("message.synthesis.txt4") }} {{ rank }} ({{
              $t("message.synthesis.txt8")
            }}
            {{ amount }})</span
          >
          <div class="span2"></div>
          <div class="left_content_hover">
            <span
              class="span1 fontsize16"
              @click="selectRankClik(ele, index)"
              v-for="(ele, index) in cardLengthArr"
              :key="index"
              >{{ $t("message.synthesis.txt4") }} {{ index + 1 }} ({{
                $t("message.synthesis.txt8")
              }}
              {{ ele }})</span
            >
          </div>
        </div>
        <!-- 排序 -->
        <div class="left_content_price" v-for="(item,index) in orderArr" :key="index">
          <span class="span1 fontsize16">{{ item.name }}</span>
          <div class="span2"></div>
          <div class="left_content_hover">
            <span class="span1 fontsize16" v-for="(ele,index1) in item.arr" :key="index1" @click="sortPriceClik(item,ele)">
              {{ ele.name }}
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
        <img :src="getsrc(item)" />
        <!-- <img :src="item.loading ? item.src : `${$store.state.imgUrl}defaultcard.png`" class="img" /> -->
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
              :word="'购买'"
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
import { hnMarketInfo, hnMarket, hn, getHnImg, erc20, token, contract, getSigner, util } from 'hashland-sdk';
export default {
  data () {
    return {
      orderArr:[
        {name:'价格排序',arr:[{name:'升序',describe:'1'},{name:'降序',describe:'2'}]},
        {name:'等级排序',arr:[{name:'Level 1',describe:'1'},{name:'Level 2',describe:'2'},{name:'Level 3',describe:'3'},{name:'Level 4',describe:'4'},{name:'Level 5',describe:'5'}]},
        {name:'职业排序',arr:[{name:'Cavalryman',describe:'1'},{name:'Holy',describe:'2'},{name:'Blade',describe:'3'},{name:'Hex',describe:'4'}]}
      ],
      raceSort: 'message.market.txt10',//种族排序
      priceSort: 'message.market.txt9',//价格排序
      pulldown: true,// 上拉加载变量
      pageshowLoading: true,// 数据没有加载完之前显示loading
      pageshowarr: [],
      cardLengthArr: [],// 几阶对应的数量数组
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
      pagenum:2,//每页展示数量
      dabasenum:0,//页数
      nodata:false,// 没有数据展示字段
      isPull:false,// 是否可以再次上拉字段
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
    getsrc (item) {
      return getHnImg(item.hnId, item.level, [item.hcHashrate, item.btcHashrate])
    },
    sonapprove (item) {
      if (item.isstatus) return
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
            this.getDatabaseaFun(this.pagenum,0).then(data => {
              this.dabasenum += this.pagenum
              if (data.status == 0) {
                this.pageshowarr = data.arr
                this.pageshowLoading = false
                this.nodata = false
                this.pulldown = true
                this.$common.selectLang('购买成功', '购买成功', this)
                this.getSDKInfo()
                this.connectInfo()
                item.isstatus = false
              } else if (data.status == 1) {
                this.pageshowarr = []
                this.pageshowLoading = false
                this.nodata = true
              }
            })
            // this.getMarketCardInfo(this.rank, 0).then(data => {
            //   console.log('data: ', data);
            //   if (data.istrue) {
            //     this.pageshowarr = data.arr
            //     this.$common.selectLang('购买成功', '购买成功', this)
            //     this.getSDKInfo()
            //     this.connectInfo()
            //     item.isstatus = false
            //   }
            //   if (data.arr.length == 0) {
            //     this.pagesize = 0 // 没有数据  设为0
            //     return
            //   }
            //   if (this.pagesize > 0) {
            //     this.pulldown = true // 还有数据,显示上拉加载更多
            //   }
            // })
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
      this.priceSort = 'message.market.txt9'
      this.pageshowarr = []
      this.pulldown = true// 上拉加载变量
      this.pageshowLoading = true// 数据秘没有加载玩之前显示loading
      this.nodata = false
      this.dabasenum = 0 // 从第0页开始
      this.getDatabaseaFun(this.pagenum,0,this.rank).then(res => {
        this.dabasenum += this.pagenum
        if (res.status == 0) {
          this.pageshowarr = res.arr
          this.pageshowLoading = false
        } else if (res.status == 1) {
          this.pageshowarr = []
          this.pageshowLoading = false
        }
      })
    },
    // 排序
    sortPriceClik (item,data) {
      // console.log('data: ',item, data);
      if(item.name == '等级排序'){
        switch (data.describe) {
          case '1':
            console.log("等级1")
            break;
          case '2':
            console.log("等级2")
            break;
          case '3':
            console.log("等级3")
            break;
          case '4':
            console.log("等级4")
            break;
          case '5':
            console.log("等级5")
            break;
          default:
            break;
        }
      }else if(item.name == '价格排序'){
        switch (data.describe) {
          case '1':
            console.log("升序")
            break;
          case '2':
            console.log("降序")
            break;
          default:
            break;
        }
      }else if(item.name == '职业排序'){
        switch (data.describe) {
          case '1':
            console.log("职业1")
            this.getDatabaseaFun(this.pagenum,0).then(res => { // 页面加载的时候  查询第一页(0)的数据--每页展示1条数据(测试)
              this.dabasenum += this.pagenum
              if (res.status == 0) {
                this.pageshowarr = res.arr
                this.pageshowLoading = false
              } else if (res.status == 1) {
                this.pageshowarr = []
                this.pageshowLoading = false
              }
            })
            break;
          case '2':
            console.log("职业2")
            break;
          case '3':
            console.log("职业3")
            break;
          case '4':
            console.log("职业4")
            break;
          default:
            break;
        }
      }
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
              this.pulldownFun(this.dabasenum)
            }, 500)
          } else {
            if (this.isPull || this.nodata) return
            this.pulldown = false // 显示加载中
            this.timeoutOBJ = setTimeout(() => {
              this.pulldownFun(this.dabasenum)
            }, 300)
          }
        }
      })
    },
    pulldownFun (num) {
      console.log('上拉加载传进来的num: ', num);
        this.isPull = true
        this.getDatabaseaFun(this.pagenum,num).then(res => {
          this.isPull = false
          this.dabasenum += this.pagenum
          if (res.status == 0) {
            this.pageshowarr = this.pageshowarr.concat(res.arr)
            this.pulldown = true
            this.nodata = false
          } else if (res.status == 1) {
            this.nodata = true
          }
        })
    },
    getDatabaseaFun (first = 8, skip = 0, level = 1, orderBy = 'sellTime', orderDirection = 'asc', hnClass = '', seller = '') {
      //first?: number,  //查询结果数量，比如填10，就展示前10个结果
      //skip?: number,  //跳过结果数量，用于分页，比如填50，相当于从第6页开始
      //orderBy?: string,  // 排序字段，填字段名，所有字段见下文查询结果
      //orderDirection?: string,  // 降序or升序，填desc或asc
      //level?: number, // 按等级筛选，填1-5
      //hnClass?: number, // 按职业筛选，填1-4
      //seller?: string, // 按卖家筛选，填钱包地址
      return new Promise((resolve) => {
        hnMarketInfo.getSellInfo(first, skip, orderBy, orderDirection, level, hnClass, seller).then(res => {
          // console.log('第一步合约数据库返回信息res: ', res);
          if (res.data.sellInfos.length > 0) {

            const arr = JSON.parse(JSON.stringify(res.data.sellInfos))
            arr.forEach(element => {
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
    this.getDatabaseaFun(this.pagenum,0).then(res => { // 页面加载的时候  查询第一页(0)的数据--每页展示1条数据(测试)
      // console.log("调用数据库返回信息:", res)
      this.dabasenum += this.pagenum
      if (res.status == 0) {
        this.pageshowarr = res.arr
        this.pageshowLoading = false
      } else if (res.status == 1) {
        this.pageshowarr = []
        this.pageshowLoading = false
      }
    })
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
    max-height: 370px;
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
          object-fit: contain;
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
              width: 0.18rem;
              object-fit: contain;
              margin-right: 0.02rem;
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
      }
    }
  }
}
</style>
