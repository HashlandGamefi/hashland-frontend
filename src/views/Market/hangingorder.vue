<template>
  <div class="order_page">
    <div class="title" @click="back">
      <img :src="`${$store.state.imgUrl}proupclose.png`" class="backimg" />
    </div>
    <span class="title1_txt fontsize32">{{ $t("message.market.txt4") }}</span>
    <div class="tab_box">
      <div class="oneTab fontsize16" :class="{ activeTab: tabIndex == 0 }" @click="tabFun(0)">My Wallet Cards</div>
      <div class="oneTab fontsize16" :class="{ activeTab: tabIndex == 1 }" @click="tabFun(1)">My Sloted Cards</div>
    </div>
    <div class="add_title fontsize18" v-if="tabIndex == 0">{{ $t("message.market.txt26") }}</div>
    <div class="add_title" v-if="tabIndex == 1">
      <span class="fontsize18">{{ $t("message.market.txt27") }}</span>
      <span class="fontsize18">{{ $t("message.market.txt27_1") }}</span>
    </div>
    <div class="content" v-if="tabIndex == 0">
      <!-- 几阶对应数量 -->
      <div class="left_content" :class="[disablehover ? 'clear_hover' : '']">
        <span class="span1 fontsize16">{{ $t(seriesTxt) }}</span>
        <div class="span2"></div>
        <div class="left_content_hover">
          <span class="span1 fontsize16" @click="selectSeriesTxtClik(ele)" v-for="(ele, index) in seriesArr" :key="index">
            {{ $t(ele.label) }}
          </span>
        </div>
      </div>
      <div class="left_content" :class="[disablehover ? 'clear_hover' : '']">
        <span class="span1 fontsize16">
          {{ $t("message.synthesis.txt4") }} {{ queryParams.level }} ({{ $t("message.synthesis.txt8") }} {{ queryParams.amount }})
        </span>
        <div class="span2"></div>
        <div class="left_content_hover">
          <span class="span1 fontsize16" @click="selectLevelClik(ele)" v-for="ele in 5" :key="ele">
            {{ $t("message.synthesis.txt4") }} {{ ele }} ({{ $t("message.synthesis.txt8") }}
            {{
              cardarr.filter((data) => {
                return data.level == ele;
              }).length
            }})
          </span>
        </div>
      </div>

      <div class="left_content" :class="[disablehover ? 'clear_hover' : '']">
        <span class="span1 fontsize16">{{ $t(ultraTxt) }}</span>
        <div class="span2"></div>
        <div class="left_content_hover">
          <span class="span1 fontsize16" @click="selectUltraTxtClik(ele)" v-for="(ele, index) in ultraArr" :key="index">
            {{ $t(ele.label) }}
          </span>
        </div>
      </div>
      <!-- 全选按钮 -->
      <div class="right_content" @click="selectAllClick">
        <img :src="`${$store.state.imgUrl}selected.png`" class="selectimg" v-if="selectALLBtn || selectStatus" />
        <img :src="`${$store.state.imgUrl}select.png`" class="selectimg" v-else />
        <span class="select_ttx fontsize16">{{ $t("message.synthesis.txt5") }}</span>
      </div>
    </div>
    <!-- 页面展示数组 -->
    <div class="cardarr_class">
      <div class="onebox" v-for="(item, index) in pageshowarr" :key="index" @click="cardClick(item, index)">
        <img :src="item.src" class="card_picture" />
        <span class="pending fontsize14" v-if="item.issell">Pending</span>
        <img :src="`${$store.state.imgUrl}select.png`" class="select_img" v-else-if="!item.status" />
        <img :src="`${$store.state.imgUrl}selected.png`" class="select_img" v-else />
      </div>
      <div class="loadingbox fontsize16" v-if="pageshowarr.length == 0 && pageshowLoading">Loading...</div>
      <NoData v-else-if="pageshowarr.length == 0 && !pageshowLoading" :isshow="false"></NoData>
    </div>
    <div class="Suspension_btnbox" v-if="pageshowarr.length > 0">
      <div class="btn_box fontsize16">
        <Btn
          ref="mychild"
          :word="$t('message.market.txt4')"
          :isapprove="isApproveHN"
          :approveloading="synthesisDis"
          :isloading="synthesisDis"
          @sonapprove="sonapprove"
          @dosomething="synthesisFun"
        />
      </div>
    </div>
    <!-- 手续费  售卖价格弹窗 -->
    <div class="danger_proup" v-if="isdanger">
      <div class="outbox_danger">
        <div class="danger_wallet_box" @click.stop>
          <span class="txt1 fontsize18">{{ $t("message.market.txt29") }}</span>
          <div class="line_outbox">
            <span class="span1 fontsize18">{{ $t("message.market.txt30") }}:</span>
            <div class="inputbox">
              <input
                class="input_"
                type="text"
                oninput="value=value.replace(/[^\d]/g, '')"
                @input="inputchangeFun"
                v-model="dangerTxtModel"
                :placeholder="$t('message.market.txt22')"
              />
              <span class="input_txt fontsize18">BUSD</span>
            </div>
          </div>
          <div class="line_outbox">
            <div class="hoverboxs">
              <span class="span1 fontsize18">{{ fee }}% {{ $t("message.market.txt31") }}:</span>
            </div>
            <div class="Handling_fee">
              <span class="fee_span1 fontsize18">{{ HandlingFee }}</span>
              <span class="fee_span2 fontsize18">BUSD</span>
            </div>
          </div>
          <div class="line_outbox">
            <span class="span1 fontsize18">{{ $t("message.market.txt35") }}:</span>
            <div class="Handling_fee">
              <span class="fee_span1 fontsize18">{{ actualMoney }}</span>
              <span class="fee_span2 fontsize18">BUSD</span>
            </div>
          </div>
          <div class="tip_txt fontsize18">{{ $t("message.market.txt32") }}</div>
          <div class="btn_box">
            <div class="txt3" @click.stop="orderClick">Confirm<BtnLoading :isloading="synthesisDis"></BtnLoading></div>
          </div>
        </div>
        <img :src="`${$store.state.imgUrl}proupclose.png`" class="danger_close" @click.stop="isdanger = false" />
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { contract, hnMarket, getSigner, hnPool, hn, getHnImg } from "hashland-sdk";
export default {
  data() {
    return {
      disablehover: false,
      ishover: false, // hover 手续费弹窗
      fee: 0, // 手续费率
      HandlingFee: 0, //手续费
      actualMoney: 0, // 实际收益
      isdanger: false, // 售卖价格弹窗
      pageshowLoading: true, //数据没有加载完之前显示loading
      tabIndex: 0,
      dangerTxtModel: "",
      powerNumber: 0, //合成卡牌提升算力
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      cardslotArr: [], // 卡槽数据
      cardarr: [], //所有卡牌信息的数组
      pageshowarr: [], //页面展示的数组
      waletArr: [], //钱包数据

      selectedNUM: 0, //选中的卡牌数量
      selectimgArr: [], //选中的卡牌的信息
      selectALLBtn: false, //全选按钮的状态
      synthesisDis: false, // 合成按钮loading
      timerll: null,
      timerll_result: null,
      isApproveHN: false, // hn授权
      time_arrNull: null, // 获取hn是否授权计时器对象
      seriesTxt: "message.market.txt36",
      seriesArr: [
        { label: "message.market.txt36", value: "" },
        { label: "message.market.txt37", value: 1 },
        { label: "message.market.txt38", value: 2 },
      ],
      ultraTxt: "message.market.txt39",
      ultraArr: [
        { label: "message.market.txt39", value: "" },
        { label: "message.market.txt40", value: false },
        { label: "message.market.txt41", value: true },
      ],
      queryParams: {
        level: 1, //1阶
        amount: 0, //阶对应的卡牌数量
        series: "",
        ultra: "",
      },
    };
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount", "getUserCardInfo"]),
    selectStatus: {
      get() {
        if (this.selectedNUM == 0) {
          return false;
        }
        if (this.pageshowarr.length >= 10) {
          return 10 == this.selectedNUM;
        } else {
          return this.pageshowarr.length == this.selectedNUM;
        }
      },
      set(newValue) {
        return newValue;
      },
    },
  },
  watch: {
    getIstrue: {
      handler: function (newValue) {
        if (newValue) {
          this.tabIndex = 0;
          this.getConnectInfo();
          this.getUserAllCard();
          this.getUserPledgeInfo();
          clearInterval(this.time_arrNull);
          this.time_arrNull = setInterval(() => {
            if (this.pageshowarr.length > 0) {
              clearInterval(this.time_arrNull);
              this.$refs.mychild.isApproveFun("hn", contract().HNMarket).then((res) => {
                if (res) {
                  this.isApproveHN = true;
                } else {
                  this.isApproveHN = false;
                }
              });
            }
          }, 1000);
        } else {
          this.cardarr = []; //所有卡牌信息的数组
          this.pageshowarr = []; //页面展示的数组
          this.waletArr = [];
          this.cardslotArr = [];
          this.queryParams.level = 1; //1阶
          this.queryParams.amount = 0; //阶对应的卡牌数量
          this.selectedNUM = 0; //选中的卡牌数量
          this.selectimgArr = []; //选中的卡牌的信息
          this.pageshowLoading = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    imgclick() {
      this.ishover = true;
    },
    inputchangeFun() {
      console.log("this.fee", this.fee);
      this.HandlingFee = Number(this.dangerTxtModel) * Number(this.fee / 100);
      this.actualMoney = Number(this.dangerTxtModel) - Number(this.HandlingFee);
    },
    tabFun(index) {
      if (this.pageshowLoading) return;
      this.tabIndex = index;
      this.selectALLBtn = false;
      this.selectedNUM = 0; // 选中的卡牌数量
      this.selectimgArr = []; // 清掉原来选中卡牌的数组信息
      this.queryParams.level = 1; // 当前几阶
      this.queryParams.amount = this.cardarr.filter((item) => {
        return item.level == 1;
      }).length;
      this.waletArr.forEach((item) => {
        item.status = false;
      });
      this.cardslotArr.forEach((item) => {
        item.status = false;
      });
      if (index == 0) {
        this.pageshowarr = this.waletArr; //钱包数据
      } else {
        this.pageshowLoading = true;
        this.pageshowarr = [];
        // this.pageshowarr = this.cardslotArr
        this.getUserPledgeInfo()
          .then((res) => {
            console.log("重新获取用户卡槽中的卡res: ", res);
            if (res.istrue) {
              this.pageshowarr = this.cardslotArr;
              this.pageshowLoading = false;
            } else {
              this.isdanger = false;
              this.pageshowarr = [];
              this.pageshowLoading = false;
            }
          })
          .catch(() => {
            this.pageshowarr = [];
            this.pageshowLoading = false;
          });
      }
    },
    sonapprove() {
      if (this.synthesisDis) return;
      this.synthesisDis = true;
      console.log("父组件页面调用子组件的授权方法,授权hn");
      this.$refs.mychild
        .goApproveFun("hn", contract().HNMarket)
        .then((res) => {
          if (res) {
            this.isApproveHN = true;
            this.synthesisDis = false;
          } else {
            this.isApproveHN = false;
            this.synthesisDis = false;
          }
        })
        .catch(() => {
          this.isApproveHN = false;
          this.synthesisDis = false;
        });
    },
    back() {
      this.$router.go(-1);
    },
    // 取消转账
    dangerClick() {
      this.dangerTxtModel = "";
    },
    // 全选按钮选中事件
    selectAllClick() {
      if (this.pageshowarr.length == 0) return;
      if (this.selectALLBtn || this.selectStatus) {
        this.selectALLBtn = this.selectStatus = false;
        this.pageshowarr.forEach((item) => {
          item.status = false;
        });
        this.selectimgArr = [];
        this.selectedNUM = 0;
      } else {
        // 最多选择10张
        this.selectimgArr = [];
        this.selectALLBtn = this.selectStatus = true;
        if (this.pageshowarr.length < 11) {
          this.pageshowarr.forEach((item, index) => {
            item.status = true;
            let obj = {};
            obj.index = index;
            obj.id = item.cardID;
            this.selectimgArr.push(obj);
          });
          this.selectedNUM = this.pageshowarr.length;
        } else {
          this.pageshowarr.forEach((item) => {
            item.status = false;
          });
          this.pageshowarr.forEach((item, index) => {
            if (index <= 9) {
              item.status = true;
              let obj = {};
              obj.index = index;
              obj.id = item.cardID;
              this.selectimgArr.push(obj);
            }
          });
          this.selectedNUM = this.pageshowarr.filter((item) => {
            return item.status == true;
          }).length;
          this.$common.selectLang("最多10张", "Up to 10", this);
        }
      }
    },
    // 取消按钮(关闭弹窗)
    CloseFun() {
      this.proupDis = false;
      this.synthesisDis = false;
    },
    // 新增弹窗确认挂单
    orderClick() {
      if (!this.dangerTxtModel) {
        this.$common.selectLang("请输入售卖价格", "Please enter price", this);
        return;
      }
      this.synthesisDis = true;
      this.processingArrayFun(this.selectimgArr, this.$common.convertNormalToBigNumber(this.dangerTxtModel, 18)).then((info) => {
        console.log("合约需要的数组已经处理完毕: ", info);
        let cardIDArr = info.map((item) => {
          return item.cardID;
        });
        let priceArr = info.map((item) => {
          return item.prices;
        });
        let sellArr = info.map((item) => {
          return item.issell;
        });
        console.log("sellArr: ", cardIDArr, priceArr, sellArr);
        hnMarket()
          .connect(getSigner())
          .sell(cardIDArr, priceArr, sellArr)
          .then(async (res) => {
            console.log("卖家批量出售HN卡牌res: ", res);
            const etReceipt = await res.wait();
            if (etReceipt.status == 1) {
              if (this.tabIndex == 0) {
                this.$common.newgetUserCardInfoFun(this.getAccount).then((res1) => {
                  console.log("重新获取用户卡牌信息res1: ", res1);
                  sessionStorage.removeItem("count");
                  if (res1 > 1) {
                    sessionStorage.setItem("count", res1);
                  } else {
                    sessionStorage.setItem("count", 1);
                  }
                  this.synthesisDis = false;
                  this.getUserAllCard(); // 重新获取最新用户信息
                  this.$common.selectLang("出售成功", "Success", this);
                  this.isdanger = false;
                });
              } else {
                this.getUserPledgeInfo()
                  .then((res) => {
                    console.log("重新获取用户卡槽中的卡res: ", res);
                    if (res.istrue) {
                      this.$common.selectLang("出售成功", "Success", this);
                      this.isdanger = false;
                      this.synthesisDis = false;
                      this.pageshowarr = this.cardslotArr = res.arr;
                      this.selectimgArr = [];
                    } else {
                      this.isdanger = false;
                      this.synthesisDis = false;
                      this.selectimgArr = [];
                    }
                  })
                  .catch(() => {
                    this.synthesisDis = false;
                    this.selectimgArr = [];
                  });
              }
            } else {
              this.synthesisDis = false;
            }
          })
          .catch((err) => {
            this.synthesisDis = false;
            console.log("卖家批量出售HN卡牌err: ", err);
          });
      });
    },
    // 售卖
    async synthesisFun() {
      if (this.synthesisDis) return;
      if (this.selectimgArr.length < 1) {
        this.$common.selectLang("至少选择1张卡牌", "You need to select a minimal of 1 cards", this);
        return;
      }
      this.isdanger = true;
      this.dangerTxtModel = "";
      this.HandlingFee = 0; //手续费
      this.actualMoney = 0; // 实际收益
    },
    // 合约需要的三个数组处理方法
    processingArrayFun(arr, price) {
      console.log("arr: ", arr);
      return new Promise((resolve) => {
        let count = 1;
        let arr_cardinfo = [];
        arr.map(async (item) => {
          let obj = {
            cardID: "",
            prices: "",
            issell: this.tabIndex == 0 ? false : true, //获取某卖家的某HN卡牌是否正在出售
          };
          obj.cardID = item.id;
          obj.prices = price;
          arr_cardinfo.push(obj);
          if (count == arr.length) {
            resolve(arr_cardinfo);
          }
          count++;
        });
      });
    },
    //选择当前卡牌
    cardClick(data, index) {
      console.log("选择当前卡牌: ", data, index);
      if (this.tabIndex == 1) {
        if (data.issell) return;
      }
      if (this.selectedNUM >= 10) {
        if (data.status) {
          data.status = false;
          for (let i = 0; i < this.selectimgArr.length; i++) {
            if (this.selectimgArr[i].index == index) {
              this.selectimgArr.splice(i, 1);
              this.selectedNUM--;
              this.selectALLBtn = false;
            }
          }
        } else {
          this.$common.selectLang("最多10张", "Up to 10", this);
        }
        return;
      }
      data.status = !data.status;

      if (data.status) {
        console.log("status为true的状态");
        this.selectedNUM++;
        let obj = {};
        obj.id = data.cardID;
        obj.index = index;
        this.selectimgArr.push(obj);
      } else {
        console.log("status为false的状态");
        for (let i = 0; i < this.selectimgArr.length; i++) {
          if (this.selectimgArr[i].index == index) {
            this.selectimgArr.splice(i, 1);
            this.selectedNUM--;
            this.selectALLBtn = false;
          }
        }
      }
    },
    // 选择等级
    selectLevelClik(data) {
      this.queryParams.level = data;
      this.filterCardArr();
    },
    // 选择系列
    selectSeriesTxtClik(data) {
      this.seriesTxt = data.label;
      this.queryParams.series = data.value;
      this.filterCardArr();
    },
    // 选择类型
    selectUltraTxtClik(data) {
      this.ultraTxt = data.label;
      this.queryParams.ultra = data.value;
      this.filterCardArr();
    },
    // 筛选卡牌
    filterCardArr() {
      if (this.pageshowLoading) return;
      this.disablehover = true;
      setTimeout(() => {
        this.disablehover = false;
      }, 600);
      this.selectALLBtn = false;
      this.selectedNUM = 0; // 选中的卡牌数量
      this.selectimgArr = []; // 清掉原来选中卡牌的数组信息
      let arr = [];
      arr = this.cardarr.filter((item) => {
        return item.level == this.queryParams.level;
      });
      if (this.queryParams.series !== "") {
        arr = arr.filter((item) => {
          return item.series == this.queryParams.series;
        });
      }
      if (this.queryParams.ultra !== "") {
        arr = arr.filter((item) => {
          return item.ultra == this.queryParams.ultra;
        });
      }
      this.queryParams.amount = arr.filter((item) => {
        return item.level == this.queryParams.level;
      }).length;
      arr.sort((a, b) => {
        return Number(a.type) > Number(b.type) ? 1 : -1;
      });
      this.pageshowarr = arr;
    },
    back() {
      this.$router.go(-1);
    },
    // 用户钱包总卡牌数据获取
    getUserAllCard() {
      clearInterval(this.timerll);
      this.timerll = setInterval(() => {
        if (sessionStorage.getItem("count")) {
          clearInterval(this.timerll);
          this.cardarr = JSON.parse(this.getUserCardInfo);
          let arr = [];
          arr = this.cardarr.filter((item) => {
            return item.level == this.queryParams.level;
          });
          if (this.queryParams.series !== "") {
            arr = arr.filter((item) => {
              return item.series == this.queryParams.series;
            });
          }
          if (this.queryParams.ultra !== "") {
            arr = arr.filter((item) => {
              return item.ultra == this.queryParams.ultra;
            });
          }
          this.queryParams.amount = arr.filter((item) => {
            return item.level == this.queryParams.level;
          }).length;
          arr.sort((a, b) => {
            return Number(a.type) > Number(b.type) ? 1 : -1;
          });
          this.waletArr = this.pageshowarr = arr;

          this.pageshowLoading = false;
          this.synthesisDis = false;
          this.selectALLBtn = this.selectStatus = false;
          this.selectedNUM = 0;
          this.selectimgArr = [];
        }
      }, 1000);
    },
    // 获取用户在质押中的卡牌信息
    getUserPledgeInfo() {
      return new Promise((resolve) => {
        hnPool()
          .getUserHnIdsBySize(this.getAccount, 0, 1000)
          .then((res) => {
            console.log("获取用户在质押中的卡牌信息res: ", res);
            if (res[0].length == 0) {
              this.cardslotArr = [];
              resolve({ istrue: true, arr: [] });
              return;
            }
            let count = 1;
            let arr = [];
            res[0].map(async (item) => {
              let obj = {
                src: "",
                cardID: "",
                level: "",
                issell: false, // 是否在售卖
                status: false,
              };
              obj.cardID = item.toString(); // 卡牌的id
              obj.level = (await hn().level(item.toString())).toString(); // 等级
              let race = await hn().getHashrates(item); // 算力数组
              obj.src = getHnImg(Number(item), Number(obj.level), race);
              obj.issell = await hnMarket().getSellerHnIdExistence(this.getAccount, obj.cardID);
              arr.push(obj);
              if (count == res[0].length) {
                this.cardslotArr = arr;
                resolve({ istrue: true, arr: arr });
              }
              count++;
            });
          });
      });
    },
    getConnectInfo() {
      hnMarket()
        .feeRatio()
        .then((res) => {
          console.log("获取手续费率，除1e4，乘100%res: ", res.toNumber() / 1e4);
          this.fee = (res.toNumber() / 1e4) * 100;
        })
        .catch((err) => {
          this.fee = 0;
          console.log("获取手续费率，除1e4，乘100err: ", err);
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.order_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    position: absolute;
    top: 100px;
    right: 90px;
    width: 44px;
    cursor: pointer;
    .backimg {
      width: 100%;
      object-fit: contain;
    }
  }
  .title1_txt {
    color: #ffffff;
    margin-top: 208px;
  }
  .tab_box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    .oneTab {
      width: 158px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #ffffff;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5), -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
    }
    .activeTab {
      background: #29cdda; //linear-gradient(to right,#2445C1,#1E9694);
      box-shadow: 0 9px 2px #23447c;
    }
  }
  .add_title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffffff;
    margin-top: 30px;
  }
  .activeTab {
    background: #29cdda; //linear-gradient(to right,#2445C1,#1E9694);
    box-shadow: 0 9px 2px #23447c;
  }
  .content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 35px;
    .left_content {
      position: relative;
      width: 200px;
      height: 48px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(90deg, #06366d 0%, rgba(7, 31, 58, 0) 100%, #034088 100%);
      margin-right: 15px;
      .span1 {
        color: #ffffff;
        margin-right: 10px;
        cursor: pointer;
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
        top: 0;
        left: 0;
        z-index: 9;
        width: 100%;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.9);
        box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
        filter: blur(0px);
        border-radius: 4px;
        padding: 10px 0;
        margin-top: 47px;
        line-height: 39px;
        .span1 {
          color: #e2dada;
          cursor: pointer;
        }
      }
    }
    .left_content:hover {
      .left_content_hover {
        display: flex;
        .span1:hover {
          color: #00e7f0;
        }
      }
    }
    .right_content {
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 48px;
      .selectimg {
        width: 40px;
        object-fit: contain;
        margin-right: 10px;
      }
      .select_ttx {
        color: #ffffff;
      }
    }
  }
  .content_end {
    justify-content: flex-end;
  }
  .cardarr_class {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-height: 300px;
    max-height: 540px;
    overflow-y: auto;
    .onebox {
      position: relative;
      width: 237px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      margin-right: 46px;
      cursor: pointer;
      .card_picture {
        width: 100%;
        object-fit: contain;
      }
      .select_img {
        position: absolute;
        top: 0;
        right: 0;
        width: 31px;
        object-fit: contain;
      }
      .pending {
        position: absolute;
        bottom: 10px;
        right: 18px;
        padding: 10px;
        color: #ffffff;
        border-radius: 20px;
        background: rgba(0, 0, 0, 0.5);
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
  }
  .Suspension_btnbox {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
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
      margin-top: 34px;
      cursor: pointer;
    }
  }
  .danger_proup {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99;
    backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    align-items: center;
    .outbox_danger {
      position: relative;
      width: 580px;
      height: 574px;
      box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
      padding: 1px;
      border-radius: 14px;
      background: linear-gradient(180deg, #8be6fe 0%, rgba(139, 230, 254, 0) 100%);
      .danger_wallet_box {
        width: 100%;
        height: 100%;
        padding: 32px 38px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 14px;
        background: #011a31;
        .txt1 {
          width: 100%;
          text-align: center;
          font-style: normal;
          font-size: 32px;
          color: #ffffff;
        }
        .line_outbox {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .span1 {
            color: #ffffff;
          }
          .hoverboxs {
            display: flex;
            align-items: center;
            .span1 {
              color: #ffffff;
            }
            .img_boxs {
              position: relative;
              display: flex;
              margin-left: 2px;
              cursor: pointer;
              .imgs {
                width: 14px;
                object-fit: contain;
              }
              .img_box_hover {
                display: none;
                position: absolute;
                top: 24px;
                left: 0;
                z-index: 2;
                width: 308px;
                height: 153px;
                box-shadow: -1px 11px 10px 2px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
                padding: 1px;
                border-radius: 14px;
                background: linear-gradient(180deg, #8be6fe 0%, rgba(139, 230, 254, 0) 100%);
                .content_box {
                  width: 100%;
                  height: 100%;
                  padding: 20px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-between;
                  border-radius: 14px;
                  background: #011730;
                  color: #ffffff;
                }
              }
              .show_box_hover {
                display: flex;
              }
            }
          }
          .inputbox {
            position: relative;
            width: 411px;
            height: 37px;
            display: flex;
            padding: 1px;
            border-radius: 18px;
            background: linear-gradient(180deg, #8be6fe 0%, #8be6fe 100%);
            .input_ {
              width: 100%;
              padding: 0 15px;
              height: 100%;
              border: none;
              outline: none;
              color: #ffffff;
              background: #011a31;
              border-radius: 18px;
              text-align: center;
            }
            .input_txt {
              position: absolute;
              right: 10px;
              top: 5px;
              color: #ffffff;
            }
          }
          .Handling_fee {
            position: relative;
            width: 411px;
            border-bottom: 1px solid;
            padding-right: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-image: linear-gradient(22deg, rgba(43, 217, 229, 0), #2bd9e5, rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
            .fee_span1 {
              width: 100%;
              text-align: center;
              color: #ffffff;
            }
            .fee_span2 {
              position: absolute;
              right: 10px;
              top: 5px;
              color: #ffffff;
            }
          }
        }
        .tip_txt {
          width: 100%;
          text-align: center;
          color: #ffffff;
        }
        .btn_box {
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
      .danger_close {
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
.positon_img_fixedbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999;
}
.clear_hover:hover {
  display: none !important;
}
@media screen and (min-width: 1280px) {
  .order_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .order_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.2rem;
    padding-top: 1.07rem;
    .title {
      position: absolute;
      top: 0.05rem;
      right: 0.2rem;
      width: 0.36rem;
      cursor: pointer;
      .backimg {
        width: 100%;
        object-fit: contain;
      }
    }
    .title1_txt {
      color: #ffffff;
      margin-top: 0;
    }
    .tab_box {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.33rem;
      .oneTab {
        width: 158px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        border-radius: 5px;
        cursor: pointer;
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5), -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
      }
      .activeTab {
        background: #29cdda; //linear-gradient(to right,#2445C1,#1E9694);
        box-shadow: 0 9px 2px #23447c;
      }
    }
    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.33rem;

      .left_content {
        position: relative;
        width: 1.62rem;
        height: 0.34rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.54) linear-gradient(180deg, #24345d 0%, rgba(35, 52, 98, 0.18) 100%);
        box-shadow: -1px 14px 9px -9px rgba(0, 0, 0, 0.82) inset;
        margin-right: 0;
        margin-bottom: 0.1rem;
        .span1 {
          font-size: 0.12rem;
          color: #ffffff;
          margin-right: 0.1rem;
          cursor: pointer;
        }
        .span2 {
          border-width: 0.06rem;
          border-color: #00e7f0;
          border-bottom-width: 0;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
        }
        .left_content_hover {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9;
          width: 100%;
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
          .span1 {
            color: #e2dada;
            cursor: pointer;
            margin-right: 0;
          }
        }
      }
      .left_content:hover {
        .left_content_hover {
          display: flex;
        }
      }
      .right_content {
        width: 1.62rem;
        height: 0.34rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.1rem;
        .selectimg {
          width: 0.2rem;
          object-fit: contain;
          margin-right: 0.05rem;
        }
        .select_ttx {
          font-size: 0.12rem;
          color: #ffffff;
        }
      }
    }
    .cardarr_class {
      width: 100%;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      min-height: 1rem;
      max-height: 3.6rem;
      padding-bottom: 0;
      .onebox {
        position: relative;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0.1rem;
        margin-right: 0;
        .card_picture {
          width: 100%;
          object-fit: contain;
        }
        .select_img {
          position: absolute;
          top: 0;
          right: 0.09rem;
          width: 0.24rem;
          object-fit: contain;
        }
        .pending {
          position: absolute;
          bottom: 0.08rem;
          right: 0.1rem;
          padding: 0.05rem;
          color: #ffffff;
          border-radius: 0.2rem;
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .Suspension_btnbox {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.2rem;
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
        margin-top: 0.2rem;
        cursor: pointer;
      }
    }
    .danger_proup {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
      z-index: 99;
      backdrop-filter: blur(6px);
      padding: 0 0.2rem;
      .outbox_danger {
        width: 100%;
        height: 4.5rem;
        box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
        padding: 1px;
        border-radius: 0.14rem;
        background: linear-gradient(180deg, #8be6fe 0%, rgba(139, 230, 254, 0) 100%);
        .danger_wallet_box {
          width: 100%;
          height: 100%;
          padding: 0.15rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border-radius: 0.14rem;
          background: #011a31;
          .txt1 {
            width: 100%;
            font-style: normal;
            font-size: 0.26rem;
            color: #ffffff;
          }
          .line_outbox {
            .hoverboxs {
              display: flex;
              align-items: center;
              .span1 {
                color: #ffffff;
              }
              .img_boxs {
                display: flex;
                margin-left: 0.08rem;
                cursor: pointer;
                .imgs {
                  width: 0.18rem;
                  object-fit: contain;
                }
                .img_box_hover {
                  display: none;
                  position: absolute;
                  top: 0.26rem;
                  left: 0;
                  z-index: 2;
                  width: 2rem;
                  height: auto;
                  box-shadow: -1px 11px 10px 2px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
                  padding: 1px;
                  border-radius: 0.14rem;
                  background: linear-gradient(180deg, #8be6fe 0%, rgba(139, 230, 254, 0) 100%);
                  .content_box {
                    width: 100%;
                    height: 100%;
                    padding: 0.2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    border-radius: 0.14rem;
                    background: #011730;
                  }
                }
                .show_box_hover {
                  display: flex;
                }
              }
            }
            .inputbox {
              position: relative;
              width: 60%;
              height: 0.37rem;
              padding: 1px;
              display: flex;
              border-radius: 0.18rem;
              background: linear-gradient(180deg, #8be6fe 0%, #8be6fe 100%);
              .input_ {
                width: 100%;
                padding: 0 0.15rem;
                height: 100%;
                border: none;
                outline: none;
                color: #ffffff;
                background: #011a31;
                border-radius: 0.18rem;
              }
              .input_txt {
                position: absolute;
                right: 0.1rem;
                top: 0.05rem;
                color: #ffffff;
              }
            }
            .Handling_fee {
              width: 60%;
              border-bottom: 1px solid;
              padding-right: 0.1rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-image: linear-gradient(22deg, rgba(43, 217, 229, 0), #2bd9e5, rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
              .fee_span1,
              .fee_span2 {
                color: #ffffff;
              }
            }
          }
          .tip_txt {
            width: 100%;
            text-align: center;
            color: #ffffff;
          }
          .btn_box {
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
        .danger_close {
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
