<template>
  <div class="page">
    <div class="ranking_box ranking_box_box1 pc">
      <span class="ranking_title">{{ $t("message.gameFi.text90") }}</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col1">
              <div class="row">
                <div>{{ $t("message.gameFi.text91") }}</div>
              </div>
              <div class="row">
                <div>{{ $t("message.gameFi.text92") }}</div>
              </div>
              <div class="row">
                <div>{{ $t("message.gameFi.text93") }}</div>
              </div>
            </div>
            <div class="col1" v-for="(item, index) in RewardPoolData" :key="index">
              <div class="row">
                <div>
                  {{ item.title }} <br />
                  {{ item.totalR ? "" : $t("message.gameFi.text79") }}
                </div>
              </div>
              <div class="row">
                <div>{{ item.totalR | numToFix }}</div>
              </div>
              <div class="row">
                <div>
                  {{ item.personalR | numToFix }}
                  <div class="claim_btn" v-if="item.totalR" @click="extractableClick(item)">
                    <span>{{ $t("message.gameFi.text98") }}</span>
                    <BtnLoading :isloading="item.loading"></BtnLoading>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking_box ranking_box_box2 pc">
      <span class="ranking_title">{{ $t("message.gameFi.text33") }}</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col1">
              <div class="row">
                <div>
                  <div>
                    <span> {{ $t("message.gameFi.text91") }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ $t("message.gameFi.text99") }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ $t("message.gameFi.text100") }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ $t("message.gameFi.text94") }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ $t("message.gameFi.text95") }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col2">
              <div class="row" v-for="(item, index) in PVEData" :key="index">
                <div>
                  <div>
                    <span>{{ $t("message.gameFi.text101") }} {{ index + 1 }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ item.totalPassed }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ item.passedOrNot ? "✓" : "x" }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ item.totalR | numToFix }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ item.personalR | numToFix }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking_box ranking_box_box3 pc">
      <div class="ranking_title">
        <div>{{ $t("message.gameFi.text35") }}</div>
        <div>
          <span>{{ $t("message.gameFi.text96") }}: {{ PVPData1.totalHc | numToFix }}</span>
          <span>{{ $t("message.gameFi.text97") }}: {{ PVPData1.rank }}</span>
        </div>
      </div>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col1">
              <div>
                <span> {{ $t("message.gameFi.text91") }}</span>
              </div>
              <div>
                <span> {{ $t("message.gameFi.text35") }}</span>
              </div>
            </div>
            <div class="col2">
              <div class="row">
                <div>
                  <span>{{ $t("message.gameFi.text102") }}</span>
                </div>
                <div>
                  <span>{{ $t("message.gameFi.text103") }}</span>
                </div>
                <div>
                  <span>{{ $t("message.gameFi.text104") }}</span>
                </div>
              </div>
              <div class="row">
                <ul>
                  <li v-for="(item, index) in PVPData2" :key="index">
                    <div>
                      <span>{{ item.rank }}</span>
                    </div>
                    <div>
                      <span>{{ item.walletAddress | ellipsis }}</span>
                    </div>
                    <div>
                      <span>{{ item.totalHc | numToFix }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- <div class="select_list">
              <span>第1赛季</span>
              <img class="accrow" :src="`${$store.state.imgUrl}accrow.png`" />
              <ul class="list">
                <li>第1赛季</li>
                <li>第2赛季</li>
                <li>第3赛季</li>
              </ul>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="ranking_box ranking_box_box1 mobile">
      <span class="ranking_title">{{ $t("message.gameFi.text91") }}</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="row">
              <div>{{ $t("message.gameFi.text91") }}</div>
            </div>
            <div class="row">
              <ul>
                <li>
                  <div></div>
                  <div>{{ $t("message.gameFi.text92") }}</div>
                  <div>{{ $t("message.gameFi.text93") }}</div>
                </li>
                <li v-for="(item, index) in RewardPoolData" :key="index">
                  <div>
                    {{ item.title }} <br />
                    {{ item.totalR ? "" : $t("message.gameFi.text79") }}
                  </div>
                  <div>{{ item.totalR | numToFix }}</div>
                  <div>
                    {{ item.personalR | numToFix }}
                    <div class="claim_btn" v-if="item.totalR" @click="extractableClick(item)">
                      <span>{{ $t("message.gameFi.text98") }}</span>
                      <BtnLoading :isloading="item.loading"></BtnLoading>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking_box ranking_box_box2 mobile">
      <span class="ranking_title">{{ $t("message.gameFi.text33") }}</span>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="row">
              <div>{{ $t("message.gameFi.text91") }}</div>
            </div>
            <div class="row">
              <ul>
                <li>
                  <div></div>
                  <div>{{ $t("message.gameFi.text99") }}</div>
                  <div>{{ $t("message.gameFi.text100") }}</div>
                  <div>{{ $t("message.gameFi.text94") }}</div>
                  <div>{{ $t("message.gameFi.text95") }}</div>
                </li>
                <li v-for="(item, index) in PVEData" :key="index">
                  <div>{{ $t("message.gameFi.text101") }} {{ index + 1 }}</div>
                  <div>{{ item.totalPassed }}</div>
                  <div>{{ item.passedOrNot ? "✓" : "x" }}</div>
                  <div>{{ item.totalR | numToFix }}</div>
                  <div>{{ item.personalR | numToFix }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking_box ranking_box_box3 mobile">
      <div class="ranking_title">
        <div>{{ $t("message.gameFi.text35") }}</div>
        <div>
          <span>{{ $t("message.gameFi.text96") }}: {{ PVPData1.totalHc | numToFix }}</span>
          <span>{{ $t("message.gameFi.text97") }}: {{ PVPData1.rank }}</span>
        </div>
      </div>
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="row">
              <div>
                <span>{{ $t("message.gameFi.text91") }}</span>
              </div>
            </div>
            <div class="row">
              <div>
                <span>{{ $t("message.gameFi.text35") }}</span>
              </div>
              <div>
                <div>{{ $t("message.gameFi.text102") }}</div>
                <div>{{ $t("message.gameFi.text103") }}</div>
                <div>{{ $t("message.gameFi.text104") }}</div>
              </div>
              <ul>
                <li v-for="(item, index) in PVPData2" :key="index">
                  <div>{{ item.rank }}</div>
                  <div>{{ item.walletAddress | ellipsis }}</div>
                  <div>{{ item.totalHc | numToFix }}</div>
                </li>
              </ul>
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
import { hwPvPPool, hwPvEPool, getSigner } from "hashland-sdk";
export default {
  data() {
    return {
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      // 奖励池
      RewardPoolData: [
        { title: "PVE", totalR: 20000, personalR: 0, loading: false },
        { title: "PVP", totalR: 20000, personalR: 0, loading: false },
        { title: "GVE", totalR: 0, personalR: 0, loading: false },
        { title: "GVG", totalR: 0, personalR: 0, loading: false },
        { title: "BOSS", totalR: 0, personalR: 0, loading: false },
      ],
      // PVE
      PVEData: [
        { charpterId: 1, totalPassed: 0, passedOrNot: false, totalR: 10.8, personalR: 0 },
        { charpterId: 2, totalPassed: 0, passedOrNot: false, totalR: 21.6, personalR: 0 },
        { charpterId: 3, totalPassed: 0, passedOrNot: false, totalR: 54, personalR: 0 },
        { charpterId: 4, totalPassed: 0, passedOrNot: false, totalR: 108, personalR: 0 },
        { charpterId: 5, totalPassed: 0, passedOrNot: false, totalR: 108, personalR: 0 },
        { charpterId: 6, totalPassed: 0, passedOrNot: false, totalR: 216, personalR: 0 },
        { charpterId: 7, totalPassed: 0, passedOrNot: false, totalR: 216, personalR: 0 },
        { charpterId: 8, totalPassed: 0, passedOrNot: false, totalR: 216, personalR: 0 },
        { charpterId: 9, totalPassed: 0, passedOrNot: false, totalR: 129.6, personalR: 0 },
      ],
      // PVP
      PVPData1: { rank: 0, totalHc: 0 },
      PVPData2: [],
      HCUnitPrice: 0,
    };
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount", "getCoinPrice"]),
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
    // HC的单价
    getCoinPrice: {
      handler: function (newValue) {
        if (newValue) {
          this.HCUnitPrice = Number(newValue.hc);
          // console.log("🐏 ~ HC的单价", this.HCUnitPrice, typeof this.HCUnitPrice);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.queryPVEData();
    this.queryPVPData();
  },
  methods: {
    queryPVEData() {
      // Total Passed PVE各章节已通过玩家数
      this.$api
        .getPVEandPVPinfo(`queryType=pve_charpter_pass_user_count&issue=1`)
        .then((res) => {
          if (res.data.result == "SUCCESS") {
            res.data.data.forEach((element1) => {
              this.PVEData.forEach((element2) => {
                if (element2.charpterId == element1.charpterId) element2.totalPassed = element1.passCount; // {passCount: 0, charpterId: 9}
              });
            });
          }
        })
        .catch((err) => {
          console.warn(err);
        });
      if (!localStorage.getItem("hashlandGameFiInfo")) return;
      // return this.$common.selectLang("请先登录游戏账号！", "Please sign in the game account first!", this);
      const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
      // Passed or Not PVE某玩家最高通过章节数
      this.$api
        .getPVEandPVPinfo(`queryType=pve_charpter_pass_charpter_count&issue=1&queryAccount=${gameFiInfo.mailAccount}`)
        .then((res) => {
          if (res.data.result == "SUCCESS") {
            res.data.data.forEach((element1) => {
              this.PVEData.forEach((element2) => {
                if (element2.charpterId == element1.charpterId) element2.passedOrNot = element1.isPass; // {isPass: true, charpterId: 1}
              });
            });
          }
        })
        .catch((err) => {
          console.warn(err);
        });

      // 赛季每章总奖励  每期数据都写死

      // 赛季每章个人奖励  PVE各章节某玩家已获得HC奖励（当前数据会每12个小时更新）
      this.$api
        .getPVEandPVPinfo(`queryType=pve_charpter_reward_hc&issue=1&queryAccount=${gameFiInfo.mailAccount}`)
        .then((res) => {
          if (res.data.result == "SUCCESS") {
            res.data.data.forEach((element1) => {
              this.PVEData.forEach((element2) => {
                if (element2.charpterId == element1.charpterId) element2.personalR = element1.totalHc; // {totalHc: 6, charpterId: 1}
              });
            });
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    queryPVPData() {
      // PVP所有玩家已获得HC奖励，当前已获得HC奖励的排名（当前数据会每12个小时更新）
      this.$api
        .getPVEandPVPinfo(`queryType=pvp_reward_hc&issue=1`)
        .then((res) => {
          if (res.data.result == "SUCCESS") {
            // console.log("PVP所有玩家", res.data.data);
            this.PVPData2 = res.data.data;
          }
        })
        .catch((err) => {
          console.warn(err);
        });

      // PVP某玩家已获得HC奖励，当前已获得HC奖励的排名（当前数据会每12个小时更新）
      if (!localStorage.getItem("hashlandGameFiInfo")) return;
      // return this.$common.selectLang("请先登录游戏账号！", "Please sign in the game account first!", this);
      const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
      this.$api
        .getPVEandPVPinfo(`queryType=pvp_reward_hc&issue=1&queryAccount=${gameFiInfo.mailAccount}`)
        .then((res) => {
          if (res.data.result == "SUCCESS") {
            // console.log("PVP某玩家", res.data.data);
            this.PVPData1.rank = res.data.data.rank ? res.data.data.rank : 0;
            this.PVPData1.totalHc = res.data.data.totalHc ? res.data.data.totalHc : 0;
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    },

    // 奖励池  赛季个人奖励  PVP  PVE
    getWalletInfo() {
      if (!this.getAccount || this.getAccount == "no") return this.$common.selectLang("请连接钱包！", "Please connect the wallet!", this);
      hwPvPPool()
        .userStoredToken(this.getAccount)
        .then((res) => {
          this.RewardPoolData.forEach((element) => {
            if (element.title == "PVP") {
              element.personalR = this.$common.convertBigNumberToNormal(res.toString(), 2);
              // console.log("PVP当前可提取HC: ", element.personalR);
            }
          });
        })
        .catch((err) => {
          console.log("hwPvPPool", err);
        });
      hwPvEPool()
        .userStoredToken(this.getAccount)
        .then((res) => {
          this.RewardPoolData.forEach((element) => {
            if (element.title == "PVE") {
              element.personalR = this.$common.convertBigNumberToNormal(res.toString(), 2);
              // console.log("PVE当前可提取HC: ", element.personalR);
            }
          });
        })
        .catch((err) => {
          console.log("hwPvEPool", err);
        });
    },
    // HC提取
    extractableClick(item) {
      // if (!item.personalR) return this.$common.selectLang("没有可提取余额", "No Remaining Balance to Claim", this);
      if (item.loading) return;
      item.loading = true;
      if (item.title == "PVE") {
        hwPvEPool()
          .connect(getSigner())
          .harvestToken()
          .then(async (res) => {
            const etReceipt = await res.wait();
            if (etReceipt.status == 1) {
              this.$common.selectLang("提取成功", "Claim Successful", this);
              this.getWalletInfo();
            }
            item.loading = false;
          })
          .catch((err) => {
            console.log("hwPvEPool", err);
            item.loading = false;
          });
      } else if (item.title == "PVP") {
        hwPvPPool()
          .connect(getSigner())
          .harvestToken()
          .then(async (res) => {
            const etReceipt = await res.wait();
            if (etReceipt.status == 1) {
              this.$common.selectLang("提取成功", "Claim Successful", this);
              this.getWalletInfo();
            }
            item.loading = false;
          })
          .catch((err) => {
            console.log("hwPvPPool", err);
            item.loading = false;
          });
      }
    },
    // 取消按钮(关闭弹窗)
    CloseFun() {
      this.proupDis = false;
    },
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      const index = value.length;
      return value.slice(0, 6) + "..." + value.slice(index - 4, index);
    },
    mailEllipsis(value) {
      if (!value) return "";
      const index = value.length;
      const index2 = value.indexOf("@");
      return value.slice(0, 2) + "***" + value.slice(index2, index);
    },
    numToFix(value) {
      if (!value) return "0";
      let val = value.toFixed(4).toString();
      const valEnd = val.substring(val.lastIndexOf("."), val.length);
      valEnd.split("").forEach((element) => {
        if (val.charAt(val.length - 1) == "0" || val.charAt(val.length - 1) == ".") {
          val = val.slice(0, val.length - 1);
        }
      });
      return val;
    },
  },
};
</script>

<style lang="scss" scoped>
// 重置滚动条样式
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  background: #68b0c8;
  border-radius: 5px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
.pc {
  display: block;
}
.mobile {
  display: none;
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
.claim_btn {
  cursor: pointer;
  background: #29cdda;
  border-radius: 7px;
  padding: 5px;
  font-size: 12px;
  margin-left: 1em;
  display: flex;
  align-items: center;
  .donut {
    width: 15px;
    height: 15px;
  }
}

.ranking_box_box1.pc {
  .ranking_content {
    display: flex;
    text-align: center;
    font-size: 12px;
    .col1 {
      width: calc(100% / 6);
      background: #082545;
      border-radius: 6px;
      padding: 5px;
      margin-right: 5px;
      .row {
        width: 100%;
        height: 50px;
        padding: 5px;
        display: flex;
        align-items: center;
        > div {
          width: 100%;
          height: 100%;
          background: #103763;
          border-radius: 4px;
          padding: 5px 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      &:nth-child(1) .row > div {
        background: #3d4f64;
        border-radius: 6px;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
.ranking_box_box2.pc {
  .ranking_content {
    display: flex;
    text-align: center;
    font-size: 12px;
    .col1 {
      width: calc(100% / 6);
      background: #082545;
      border-radius: 6px;
      padding: 5px;
      margin-right: 5px;
      font-size: 16px;
      font-weight: bold;
      .row {
        > div {
          width: 100%;
          height: 50px;
          padding: 5px;
          > div {
            width: 100%;
            height: 100%;
            background: #3d4f64;
            border-radius: 6px;

            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    .col2 {
      width: calc(100% / 6 * 5);
      background: #082545;
      border-radius: 6px;
      padding: 5px;
      display: flex;
      overflow-x: scroll;
      .row {
        min-width: 120px;
        width: calc(100% / 9);
        > div {
          height: 50px;
          padding: 5px;
          > div {
            width: 100%;
            height: 100%;
            background: #103763;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
.ranking_box_box3.pc {
  .ranking_title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      &:nth-child(2) {
        font-size: 20px;
        span {
          margin-left: 50px;
        }
      }
    }
  }
  .ranking_content {
    font-size: 12px;
    .col1 {
      width: calc(100% / 6);
      margin-right: 5px;
      font-size: 16px;
      font-weight: bold;
      div {
        background: #082545;
        border-radius: 6px;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-child(1) {
          height: 50px;
          margin-bottom: 5px;
        }
        &:nth-child(2) {
          min-height: 100px;
          height: 200px;
        }
      }
    }
    .col2 {
      width: calc(100% / 6 * 5);
      // overflow-x: scroll;
      .row {
        width: 100%;
        border-radius: 6px;
        display: flex;
        align-items: center;
        &:nth-child(1) {
          width: 100%;
          height: 50px;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
          > div {
            // min-width: 400px;
            height: 100%;
            background: #082545;
            padding: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:nth-child(1),
            &:nth-child(2),
            &:nth-child(3) {
              width: 50%;
            }
          }
        }
        &:nth-child(2) {
          min-height: 100px;
          height: 200px;
          ul {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            background: #082545;
            font-size: 15px;
            font-weight: 400;
            li {
              width: 100%;
              display: flex;
              align-items: center;
              > div {
                // min-width: 400px;
                height: 100%;
                padding: 5px 0;
                display: flex;
                align-items: center;
                justify-content: center;
                &:nth-child(1),
                &:nth-child(2),
                &:nth-child(3) {
                  width: 50%;
                }
              }
            }
          }
        }
      }
    }
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
      // height: $singleMediumCellHeight;
      // line-height: $singleMediumCellHeight;
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
@media screen and (max-width: 980px) {
  // 重置滚动条样式
  ::-webkit-scrollbar {
    width: 0.01rem;
    height: 0.01rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #68b0c8;
    border-radius: 0.01rem;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  .pc {
    display: none;
  }
  .mobile {
    display: block;
  }
  .ranking_box {
    padding: 0.1rem;
    margin-top: 0.5rem;
    .ranking_title {
      font-size: 18px;
    }
    .ranking_content {
      display: block;
    }
  }

  .claim_btn {
    cursor: pointer;
    background: #29cdda;
    border-radius: 0.07rem;
    padding: 0.02rem 0.05rem;
    font-size: 0.12rem;
    .donut {
      width: 0.1rem;
      height: 0.1rem;
    }
  }
  .ranking_box_box1.mobile {
    .ranking_content {
      font-size: 12px;
      .row {
        width: 100%;
        background: #082545;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-child(1) {
          height: 0.3rem;
          margin-bottom: 0.05rem;
        }
      }
      ul {
        width: 100%;
        padding: 0.05rem;
        li {
          width: 100%;
          display: flex;
          align-items: center;
          &:nth-child(1) div {
            height: 0.3rem;
            background: transparent;
            border-radius: 0;
          }
          > div {
            margin: 0 0.05rem 0.05rem 0;
            height: 0.6rem;
            background: #103763;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:nth-child(1) {
              width: 25%;
            }
            &:nth-child(2) {
              width: 30%;
            }
            &:last-child {
              width: 45%;
              margin-right: 0;
            }
          }
        }
      }
    }
  }
  .ranking_box_box2.mobile {
    .ranking_content {
      font-size: 12px;
      .row {
        width: 100%;
        background: #082545;
        border-radius: 6px;
        padding: 0.05rem;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-child(1) {
          height: 0.3rem;
          margin-bottom: 0.05rem;
        }
      }
      ul {
        overflow-x: auto;
        li {
          display: flex;
          align-items: center;
          &:nth-child(1) div {
            height: 0.6rem;
            background: transparent;
            border-radius: 0;
          }
          div {
            min-width: 1rem;
            width: 20%;
            height: 0.3rem;
            margin: 0 0.05rem 0.05rem 0;
            background: #103763;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            &:first-child {
              width: 30%;
            }
          }
        }
      }
    }
  }

  .ranking_box_box3.mobile {
    font-size: 12px;
    .ranking_title {
      flex-wrap: wrap;
      div {
        &:nth-child(2) {
          font-size: 12px;
          text-align: right;
          span {
            margin-left: 0.2rem;
          }
        }
      }
    }
    .ranking_content {
      .row {
        width: 100%;
        margin-bottom: 0.05rem;
        background: #082545;
        border-radius: 6px;
        font-size: 12px;
        > div {
          width: 100%;
          height: 0.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &:nth-child(2) {
          > div {
            &:nth-child(1) {
              padding: 0 0.1rem;
              justify-content: start;
            }
          }
        }
      }
      .row:nth-child(2) > div:nth-child(2) div,
      ul li > div {
        &:nth-child(1) {
          width: 20%;
        }
        &:nth-child(2) {
          width: 50%;
        }
        &:nth-child(3) {
          width: 30%;
        }
      }
      ul {
        width: 100%;
        min-height: 0.5rem;
        max-height: 3rem;
        overflow-y: auto;
        font-weight: 100;
        li {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            height: 100%;
            padding: 5px 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>
