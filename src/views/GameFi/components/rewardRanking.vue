<template>
  <div class="page">
    <div class="ranking_box ranking_box1">
      <span class="ranking_title">奖励池</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col1">
              <div class="select_list flex_center_center">
                <span>第1赛季</span>
                <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
                <ul class="list">
                  <li>第1赛季</li>
                  <li>第2赛季</li>
                  <li>第3赛季</li>
                </ul>
              </div>
            </div>
            <div class="col2">
              <div class="col2_row">
                <div class="col2_col flex_center_center" v-for="(item, index) in RewardPool" :key="index">
                  <div class="flex_center_center">{{ item.title }}</div>
                  <div class="flex_center_center">$ {{ item.num }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking_box ranking_box2">
      <span class="ranking_title">个人奖励</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col1">
              <div class="select_list flex_center_center">
                <span>第1赛季</span>
                <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
                <ul class="list">
                  <li>第1赛季</li>
                  <li>第2赛季</li>
                  <li>第3赛季</li>
                </ul>
              </div>
              <div class="flex_center_center">
                <span>ranking</span>
              </div>
              <div class="flex_center_center">
                <span>请绑定账户</span>
              </div>
            </div>
            <div class="col2">
              <div class="col2_row">
                <div class="col2_col flex_center_center" v-for="(item, index) in personalReward" :key="index">
                  <div class="flex_center_center">{{ item.title }}</div>
                  <div class="flex_center_center">{{ item.ranking }}</div>
                  <div class="flex_center_around">
                    <span>$ {{ item.num }}</span>
                    <span class="btn" @click="extractableClick(item)"
                      >领取奖励<BtnLoading :isloading="item.loading"></BtnLoading
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ranking_box ranking_box3">
      <span class="ranking_title">当前赛季PVP奖励/排行</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col3">
              <div class="col3_top flex_center_center">
                <div class="col3_left select_list flex_center_center">
                  <span>第1赛季</span>
                  <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
                  <ul class="list">
                    <li>第1赛季</li>
                    <li>第2赛季</li>
                    <li>第3赛季</li>
                  </ul>
                </div>
                <div class="col3_right flex_center_center">
                  <span>Rank</span>
                  <span>Address</span>
                  <span>HC Raward</span>
                </div>
              </div>
              <div class="col3_bottom flex_center_center">
                <div class="col3_left flex_center_center">第1赛季</div>
                <div class="col3_right">
                  <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                  <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                  <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                  <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                </div>
              </div>
            </div>
          </div>
          <div class="ranking_content_mobile">
            <div class="col1">
              <div class="select_list flex_center_center">
                <span>第1赛季</span>
                <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
                <ul class="list">
                  <li>第1赛季</li>
                  <li>第2赛季</li>
                  <li>第3赛季</li>
                </ul>
              </div>
            </div>
            <div class="col5">
              <div class="col5_title">PVE</div>
              <div class="col5_top flex_center_center">
                <span>Rank</span>
                <span>Address</span>
                <span>$HC Raward</span>
              </div>
              <div class="col5_bottom">
                <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
              </div>
            </div>
            <div class="col5">
              <div class="col5_title">PVE</div>
              <div class="col5_top flex_center_center">
                <span>Rank</span>
                <span>Address</span>
                <span>$HC Raward</span>
              </div>
              <div class="col5_bottom">
                <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
                <div class="flex_center"><span>Rank</span><span>Address</span><span>Raward</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hwPvPPool, hwPvEPool } from "hashland-sdk";
export default {
  data() {
    return {
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      RewardPool: [
        { title: "PVE", num: 20000 },
        { title: "PVP", num: 20000 },
        // {title:'GVE',num:0},
        // {title:'GVG',num:0},
        { title: "BOSS", num: 0 },
      ],
      personalReward: [
        { title: "PVE", num: 20000, ranking: 1, loading: false },
        { title: "PVP", num: 20000, ranking: 2, loading: false },
        { title: "GVE", num: 0, ranking: 3, loading: false },
        { title: "GVG", num: 0, ranking: 4, loading: false },
        { title: "BOSS", num: 0, ranking: 5, loading: false },
      ],
    };
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount"]),
  },
  watch: {
    getIstrue: {
      handler: function (newValue) {
        if (newValue) {
          this.getWalletInfo();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    // 取消按钮(关闭弹窗)
    CloseFun() {
      this.proupDis = false;
    },
    getPVPInfoFun() {
      // 当前/历史赛季 PVE各章节已通过玩家数
      let query1 = `queryType=pve_charpter_pass_user_count&issue=1`;
      this.$api.getPVEandPVPinfo(query1).then((res) => {
        let data = res.data.data;
        // console.log('PVE各章节已通过玩家数:', data);
      });

      // 当前/历史赛季 PVE某玩家最高通过章节数
      let query2 = `queryType=pve_charpter_pass_charpter_count&issue=1&queryAccount=hashlandces1@outlook.com`;
      this.$api.getPVEandPVPinfo(query2).then((res) => {
        let data = res.data.data;
        // console.log('PVE某玩家最高通过章节数data: ', data);
      });

      // 当前/历史赛季  PVE各章节某玩家已获得HC奖励（当前数据会每12个小时更新）
      let query3 = `queryType=pve_charpter_reward_hc&issue=1&queryAccount=hashlandces1@outlook.com`;
      this.$api.getPVEandPVPinfo(query3).then((res) => {
        let data = res.data.data;
        // console.log('PVE各章节某玩家已获得HC奖励（当前数据会每12个小时更新）: ', data);
      });

      // 当前/历史赛季  PVP所有玩家已获得HC奖励，当前已获得HC奖励的排名（当前数据会每12个小时更新）
      let query4 = `queryType=pvp_reward_hc&issue=1&queryAccount=hashlandces1@outlook.com`;
      this.$api.getPVEandPVPinfo(query4).then((res) => {
        let data = res.data.data;
        console.log("PVP当前玩家已获得HC奖励，当前已获得HC奖励的排名（当前数据会每12个小时更新）:", data);
      });

      let query5 = `queryType=pvp_reward_hc&issue=1`;
      this.$api.getPVEandPVPinfo(query5).then((res) => {
        let data = res.data.data;
        console.log("PVP当前玩家已获得HC奖励，当前已获得HC奖励的排名:", data);
      });
      return;

      let data1 = `queryType=pve_list&issue=1&pageIndex=1&pageSize=10000`;
      this.$api
        .getPVEandPVPinfo(data1)
        .then((res) => {
          console.log("获取pve章节hc发放详情  支持分页查询", res);
          // let arr = []
          // res.data.data.forEach(element => {
          //   let obj = {}
          //   obj.charpterId = element.charpterId
          //   obj.rewardHcNum = element.rewardHcNum
          //   obj.rewardNum = element.rewardNum
          //   arr.push(obj)
          // });
          // console.log("arr:",arr)
        })
        .catch((err) => {
          console.log("获取pve章节hc发放详情  支持分页查询:err ", err);
        });

      let data2 = `queryType=pve_account&queryAccount=hashlandces1@outlook.com&issue=1&pageIndex=1&pageSize=10000`;
      this.$api
        .getPVEandPVPinfo(data2)
        .then((res) => {
          console.log("查询某玩家pve章节发放记录详情", res);
        })
        .catch((err) => {
          console.log("查询某玩家pve章节发放记录详情: err", err);
        });

      let data3 = `queryType=pvp_list&queryAccount=hashlandces1@outlook.com&issue=1&pageIndex=1&pageSize=10000`;
      this.$api
        .getPVEandPVPinfo(data3)
        .then((res) => {
          console.log("获取玩家pvp 排行榜hc发放详情: ", res);
          // let num = 0
          // for (let index = 0; index < res.data.data.length; index++) {
          //   const element = res.data.data[index];
          //   num = num + Number(element.rewardHcNum)
          // }
          // console.log('num: ', num);
        })
        .catch((err) => {
          console.log("获取玩家pvp 排行榜hc发放详情:err ", err);
        });
    },
    // 链接钱包才能拿到的信息
    getWalletInfo() {
      // 奖励池--->赛季个人奖励--->pvp
      hwPvPPool()
        .userStoredToken(this.getAccount)
        .then((res) => {
          console.log(
            "pvp----获取某钱包地址当前可提取HC奖励金额res: ",
            this.$common.convertBigNumberToNormal(res.toString(), 2)
          );
        })
        .catch((err) => {
          console.log("pvp----: ", err);
        });
      // 奖励池--->赛季个人奖励--->pve
      hwPvEPool()
        .userStoredToken(this.getAccount)
        .then((res) => {
          console.log(
            "pve----获取某钱包地址当前可提取HC奖励金额res: ",
            this.$common.convertBigNumberToNormal(res.toString(), 2)
          );
        })
        .catch((err) => {
          console.log("pve----: ", err);
        });
    },
    // 提取hc
    extractableClick(item) {
      console.log("item: ", item);
      if (item.num == 0) {
        this.$common.selectLang("没有可提取余额", "No Remaining Balance to Claim", this);
        return;
      }
      if (item.title == "PVE") {
        if (item.loading) return;
        item.loading = true;
        hwPvEPool()
          .connect(getSigner())
          .harvestToken()
          .then(async (res) => {
            const etReceipt = await res.wait();
            if (etReceipt.status == 1) {
              this.$common.selectLang("提取成功", "Claim Successful", this);
              item.loading = false;
              this.getWalletInfo();
            } else {
              item.loading = false;
            }
          })
          .catch(() => {
            item.loading = false;
          });
      } else {
        if (item.loading) return;
        item.loading = true;
        hwPvPPool()
          .connect(getSigner())
          .harvestToken()
          .then(async (res) => {
            const etReceipt = await res.wait();
            if (etReceipt.status == 1) {
              this.$common.selectLang("提取成功", "Claim Successful", this);
              item.loading = false;
              this.getWalletInfo();
            } else {
              item.loading = false;
            }
          })
          .catch(() => {
            item.loading = false;
          });
      }
    },
  },
  mounted() {
    this.getPVPInfoFun();
  },
};
</script>

<style lang="scss" scoped>
$singleSmallCellHeight: 30px;
$singleMediumCellHeight: 60px;
$singleOversizedCellHeight: 235px;

$mobileSingleSmallCellHeight: 0.3rem;
$mobileSingleMediumCellHeight: 0.4rem;
$mobileSingleOversizedCellHeight: 2rem;
.flex_center {
  display: flex;
  align-items: center;
}
.flex_center_center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex_center_around {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.outside_box {
  margin-top: 20px;
  width: 100%;
  background: #68b0c8;
  border-radius: 5px;
  padding: 1px;
  .in_box {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background: #01162d;
    padding: 10px;
    font-size: 16px;
  }
}
.ranking_box {
  width: 100%;
  background: #021c3b;
  box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
  border-radius: 6px;
  padding: 20px;
  margin-top: 50px;
  font-size: 0;
  .ranking_title {
    font-size: 26px;
  }
  .ranking_content {
    width: 100%;
    display: flex;
    text-align: center;
  }
}
.select_list {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .accrow {
    margin-left: 10px;
    width: 15px;
    height: auto;
    transform: rotate(-90deg);
    transition: all 0.3s;
  }
  ul {
    width: 100%;
    height: auto;
    background: #082545;
    box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
    border-radius: 0 0 6px 6px;
    overflow: hidden;
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    transform: scaleY(0);
    transition: transform 0.2s;
    transform-origin: top center;
    li {
      font-size: 16px;
      height: $singleMediumCellHeight;
      line-height: $singleMediumCellHeight;
      &:hover {
        background: #00e7f0;
      }
    }
  }
  &:hover {
    .accrow {
      transform: rotate(0);
    }
    ul {
      transform: scaleY(1);
    }
  }
}
.btn {
  cursor: pointer;
  background: #29cdda;
  border-radius: 7px;
  padding: 5px 10px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #c111c6;
  }
}
.col1 {
  width: 15%;
  margin-right: 5px;
  font-size: 16px;
  div {
    background: #082545;
    border-radius: 6px;
    width: 100%;
    height: $singleMediumCellHeight * 2 + 15px;
  }
}
.col2 {
  width: 85%;
  padding: 5px;
  background: #082545;
  border-radius: 6px;
  font-size: 12px;
  .col2_row {
    display: flex;
    .col2_col {
      width: 20%;
      flex-wrap: wrap;
      margin-right: 5px;
      &:last-child {
        margin-right: 0;
      }
      div {
        width: 100%;
        height: $singleMediumCellHeight;
        background: #103763;
        border-radius: 4px;
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
.col3 {
  width: 100%;
  .col3_top,
  .col3_bottom {
    width: 100%;
    > div {
      height: $singleMediumCellHeight;
      background: #082545;
      border-radius: 6px;
    }
  }
  .col3_left {
    width: 15%;
    margin-right: 5px;
  }
  .col3_right {
    width: 85%;
    > span,
    > div span {
      &:nth-child(1) {
        width: 30%;
      }
      &:nth-child(2) {
        width: 40%;
      }
      &:nth-child(3) {
        width: 30%;
      }
    }
  }
  .col3_bottom {
    margin-top: 5px;
    > div {
      min-height: $singleMediumCellHeight;
      height: $singleOversizedCellHeight;
      background: #082545;
      border-radius: 6px;
      margin-top: 5px;
      padding: 5px;
      overflow-y: auto;
      // 重置滚动条样式
      &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      &::-webkit-scrollbar-thumb {
        background: #68b0c8;
        border-radius: 5px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
    }
  }
}
.col4 {
  width: 85%;
  height: 100%;
  margin-left: 10px;
  font-size: 16px;
  .col4_top {
    width: 100%;
    height: $singleMediumCellHeight;
    background: #082545;
    border-radius: 6px;
    padding-right: 10px; // 去掉滚动条的位置
    span {
      &:nth-child(1) {
        width: 30%;
      }
      &:nth-child(2) {
        width: 40%;
      }
      &:nth-child(3) {
        width: 30%;
      }
    }
  }
  .col4_bottom {
    width: 100%;
    height: $singleOversizedCellHeight;
    background: #082545;
    border-radius: 6px;
    margin-top: 5px;
    padding: 5px;
    overflow-y: auto;
    // 重置滚动条样式
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background: #68b0c8;
      border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    div {
      width: 100%;
      height: $singleSmallCellHeight;
      font-size: 12px;
      span {
        &:nth-child(1) {
          width: 30%;
        }
        &:nth-child(2) {
          width: 40%;
        }
        &:nth-child(3) {
          width: 30%;
        }
      }
    }
  }
}
.ranking_box2 {
  .col1 {
    div {
      width: 100%;
      height: $singleMediumCellHeight + 5px;
      &:nth-child(2) {
        background: #3d4f64;
        margin-top: 5px;
      }
    }
  }
  .col2 {
    width: 100%;
    .col2_title {
      width: 100%;
      height: $singleSmallCellHeight;
    }
    .col2_row {
      .col2_col {
        width: 100%;
        div {
          width: 100%;
          height: $singleMediumCellHeight;
          &:nth-child(1) {
            height: $singleSmallCellHeight;
          }
        }
      }
    }
  }
}
.ranking_box3 {
  .ranking_content {
    display: flex;
    .col1 {
      div {
        width: 100%;
        height: $singleMediumCellHeight;
        &:nth-child(2),
        &:nth-child(3) {
          width: 100%;
          height: $singleOversizedCellHeight;
          margin-top: 5px;
        }
      }
    }
  }
  .ranking_content_mobile {
    display: none;
  }
}
@media screen and (max-width: 980px) {
  .ranking_box {
    padding: 0.2rem;
    margin-top: 0.5rem;
    .ranking_title {
      font-size: 18px;
    }
    .ranking_content {
      display: block;
    }
  }
  .select_list {
    ul {
      li {
        height: $singleSmallCellHeight;
        line-height: $singleSmallCellHeight;
      }
    }
  }
  .btn {
    padding: 0 5px;
  }
  .col1 {
    width: 100%;
    div {
      width: 100%;
      height: $mobileSingleMediumCellHeight;
      margin-bottom: 5px;
    }
  }
  .col2 {
    width: 100%;
    .col2_row {
      display: block;
      .col2_col {
        width: 100%;
        flex-wrap: nowrap;
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
        div {
          width: 100%;
          height: $mobileSingleSmallCellHeight;
          background: #103763;
          border-radius: 4px;
          margin-bottom: 0;
          &:nth-child(1) {
            width: 30%;
            margin-right: 5px;
          }
          &:nth-child(2) {
            width: 70%;
          }
        }
      }
    }
  }
  .ranking_box2 {
    .col1 {
      div {
        height: $mobileSingleMediumCellHeight;
      }
    }
    .col2 {
      .col2_title {
        width: 100%;
        height: $mobileSingleSmallCellHeight;
      }
      .col2_row {
        .col2_col {
          div {
            height: $mobileSingleSmallCellHeight;
            &:nth-child(1) {
              height: $mobileSingleSmallCellHeight;
            }
          }
        }
      }
    }
  }
  .ranking_box3 {
    .ranking_content {
      display: none;
    }
    .ranking_content_mobile {
      display: block;
      .col5 {
        width: 100%;
        padding: 5px;
        background: #082545;
        border-radius: 6px;
        margin-bottom: 5px;
        &:last-child {
          margin-bottom: 0;
        }
        > div {
          width: 100%;
        }
        .col5_title {
          font-size: 16px;
          text-indent: 0.5em;
        }
        .col5_top span,
        .col5_bottom div span {
          font-size: 12px;
          text-align: center;
          &:nth-child(1) {
            width: 20%;
          }
          &:nth-child(2) {
            width: 40%;
          }
          &:nth-child(3) {
            width: 40%;
          }
        }
        .col5_bottom {
          font-weight: lighter;
          min-height: $mobileSingleMediumCellHeight;
          max-height: $mobileSingleOversizedCellHeight;
          overflow-y: auto;
          // 重置滚动条样式
          &::-webkit-scrollbar {
            width: 2px;
            height: 2px;
          }
          &::-webkit-scrollbar-thumb {
            background: #68b0c8;
            border-radius: 2px;
          }
          &::-webkit-scrollbar-track {
            background: transparent;
          }
        }
      }
    }
  }
}
</style>
