<template>
  <div class="page">
    <!-- Reward Vault -->
    <div class="ranking_box ranking_box_box1 pc">
      <div class="ranking_title">
        <span>{{ $t("message.gameFi.text90") }} </span><span>Rewards distributes every half season</span>
      </div>
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
                <div>{{ item.totalR | numToFixed }}</div>
              </div>
              <div class="row">
                <div>
                  {{ item.personalR | numToFixed }}
                  <div
                    class="claim_btn"
                    @click="extractableClick(item)"
                    v-if="item.pool == 1 || item.pool == 2"
                    :class="{ disable: !item.personalR }"
                  >
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
    <!-- PVE -->
    <div class="ranking_box ranking_box_box2 pc">
      <div class="ranking_title">
        <span>{{ $t("message.gameFi.text33") }} </span>
        <span>Last Update Time: {{ updateTime }}（UTC）&nbsp;&nbsp; HC reward updates every 12 hrs</span>
      </div>
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
                    <span>{{ item.totalR | numToFixed }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ item.personalR | numToFixed }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PVP -->
    <div class="ranking_box ranking_box_box3 pc">
      <div class="ranking_title">
        <span>{{ $t("message.gameFi.text35") }}</span>
        <span>
          {{ $t("message.gameFi.text96") }}: {{ PVPData1.totalHc | numToFixed }} &nbsp;&nbsp;&nbsp;&nbsp; {{ $t("message.gameFi.text97") }}:
          {{ PVPData1.rank }}
        </span>
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
                      <span>{{ item.totalHc | numToFixed }}</span>
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
    <!-- Reward Vault -->
    <div class="ranking_box ranking_box_box1 mobile">
      <div class="ranking_title">
        <span>{{ $t("message.gameFi.text90") }}</span
        ><span>Rewards distributes every half season</span>
      </div>
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
                  <div>{{ item.totalR | numToFixed }}</div>
                  <div>
                    {{ item.personalR | numToFixed }}
                    <div
                      class="claim_btn"
                      @click="extractableClick(item)"
                      v-if="item.pool == 1 || item.pool == 2"
                      :class="{ disable: !item.personalR }"
                    >
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
    <!-- PVE -->
    <div class="ranking_box ranking_box_box2 mobile">
      <div class="ranking_title">
        <span>{{ $t("message.gameFi.text33") }} </span>
        <span>Last Update Time: {{ updateTime }}（UTC）&nbsp;&nbsp; HC reward updates every 12 hrs</span>
      </div>
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
                  <div>{{ item.totalR | numToFixed }}</div>
                  <div>{{ item.personalR | numToFixed }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- PVP -->
    <div class="ranking_box ranking_box_box3 mobile">
      <div class="ranking_title">
        <span>{{ $t("message.gameFi.text35") }} </span>
        <span>
          {{ $t("message.gameFi.text96") }}: {{ PVPData1.totalHc | numToFixed }}&nbsp;&nbsp; {{ $t("message.gameFi.text97") }}: {{ PVPData1.rank }}
        </span>
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
              <!-- <div>
                <div>{{ $t("message.gameFi.text102") }}</div>
                <div>{{ $t("message.gameFi.text103") }}</div>
                <div>{{ $t("message.gameFi.text104") }}</div>
              </div> -->
              <ul>
                <li>
                  <div>{{ $t("message.gameFi.text102") }}</div>
                  <div>{{ $t("message.gameFi.text103") }}</div>
                  <div>{{ $t("message.gameFi.text104") }}</div>
                </li>
                <li v-for="(item, index) in PVPData2" :key="index">
                  <div>{{ item.rank }}</div>
                  <div>{{ item.walletAddress | ellipsis }}</div>
                  <div>{{ item.totalHc | numToFixed }}</div>
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
import { hwPvPPool, hwPvEPool, hwWEPool, getSigner, hc, contract, util } from "hashland-sdk";
export default {
  data() {
    return {
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      // 奖励池
      RewardPoolData: [
        { title: `${this.$t("message.gameFi.text33")}`, pool: 1, totalR: 1080 * 15, personalR: 0, loading: false }, // PVE
        { title: `${this.$t("message.gameFi.text35")}`, pool: 2, totalR: 720 * 15, personalR: 0, loading: false }, // PVP
        { title: `${this.$t("message.gameFi.text37")}`, pool: 3, totalR: 0, personalR: 0, loading: false }, // GVE
        { title: `${this.$t("message.gameFi.text39")}`, pool: 4, totalR: 0, personalR: 0, loading: false }, // GVG
        { title: `${this.$t("message.gameFi.text88")}`, pool: 5, totalR: 0, personalR: 0, loading: false }, // World BOSS
      ],
      // PVE
      PVEData: [
        { charpterId: 1, totalPassed: 0, passedOrNot: false, totalR: 10.8 * 15, personalR: 0 },
        { charpterId: 2, totalPassed: 0, passedOrNot: false, totalR: 21.6 * 15, personalR: 0 },
        { charpterId: 3, totalPassed: 0, passedOrNot: false, totalR: 54 * 15, personalR: 0 },
        { charpterId: 4, totalPassed: 0, passedOrNot: false, totalR: 108 * 15, personalR: 0 },
        { charpterId: 5, totalPassed: 0, passedOrNot: false, totalR: 108 * 15, personalR: 0 },
        { charpterId: 6, totalPassed: 0, passedOrNot: false, totalR: 216 * 15, personalR: 0 },
        { charpterId: 7, totalPassed: 0, passedOrNot: false, totalR: 216 * 15, personalR: 0 },
        { charpterId: 8, totalPassed: 0, passedOrNot: false, totalR: 216 * 15, personalR: 0 },
        { charpterId: 9, totalPassed: 0, passedOrNot: false, totalR: 129.6 * 15, personalR: 0 },
      ],
      // PVP
      PVPData1: { rank: 0, totalHc: 0 },
      PVPData2: [],
      HCUnitPrice: 0,
      updateTime: "",
    };
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount", "getCoinPrice"]),
  },
  watch: {
    getIstrue: {
      handler: function (newValue) {
        if (newValue) {
          this.queryPersonalRewards();
        }
      },
      deep: true,
      immediate: true,
    },
    getCoinPrice: {
      handler: function (newValue) {
        if (newValue) {
          this.HCUnitPrice = Number(newValue.hc); // HC的单价
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    // 只显示UTC 0点12点整点时间
    this.updateTime = new Date(Math.floor(new Date().getTime() / 43200000) * 43200000).toLocaleString("en");
    this.queryHWWEPool();
    this.queryPVEData();
    this.queryPVPData();
  },
  methods: {
    /**PVE各章节 */
    queryPVEData() {
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
          console.warn("Total Passed", err); // PVE各章节已通过玩家数  Total Passed
        });
      if (!localStorage.getItem("hashlandGameFiInfo")) return;
      const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
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
          console.warn("Passed or Not", err); // PVE某玩家最高通过章节数  Passed or Not
        });
      // Chapter rewards  每期数据都写死（* 15）
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
          console.warn("Gain sharing", err); // PVE各章节某玩家已获得HC奖励（当前数据会每12个小时更新）  Gain sharing
        });
    },
    /**PVP所有玩家  PVP某玩家 */
    queryPVPData() {
      this.$api
        .getPVEandPVPinfo(`queryType=pvp_reward_hc&issue=1`)
        .then((res) => {
          if (res.data.result == "SUCCESS") {
            this.PVPData2 = res.data.data;
          }
        })
        .catch((err) => {
          console.warn("PVP所有玩家", err); // PVP所有玩家已获得HC奖励，当前已获得HC奖励的排名（当前数据会每12个小时更新）
        });
      if (!localStorage.getItem("hashlandGameFiInfo")) return;
      const gameFiInfo = JSON.parse(localStorage.getItem("hashlandGameFiInfo"));
      this.$api
        .getPVEandPVPinfo(`queryType=pvp_reward_hc&issue=1&queryAccount=${gameFiInfo.mailAccount}`)
        .then((res) => {
          if (res.data.result == "SUCCESS") {
            this.PVPData1.rank = res.data.data.rank ? res.data.data.rank : 0;
            this.PVPData1.totalHc = res.data.data.totalHc ? res.data.data.totalHc : 0;
          }
        })
        .catch((err) => {
          console.warn("PVP某玩家", err); // PVP某玩家已获得HC奖励，当前已获得HC奖励的排名（当前数据会每12个小时更新）
        });
    },
    /**查询世界池余额 */
    queryHWWEPool() {
      hc()
        .balanceOf(contract().HWWEPool)
        .then((res) => {
          this.RewardPoolData.forEach((element) => {
            if (element.pool == 5) {
              element.totalR = Number(util.formatEther(res));
            }
          });
        })
        .catch((err) => {
          console.warn("HWWEPool", err);
        });
    },
    /**奖励池  赛季个人奖励  PVP  PVE  BOSS */
    queryPersonalRewards() {
      if (!this.getAccount || this.getAccount == "no") return this.$common.selectLang("请连接钱包！", "Please connect the wallet!", this);
      this.queryhwPvEPool();
      this.queryhwPvPPool();
      this.queryhwWEPool();
    },
    /**查询PVE奖励池 */
    queryhwPvEPool() {
      hwPvEPool()
        .userStoredToken(this.getAccount)
        .then((res) => {
          this.RewardPoolData.forEach((element) => {
            if (element.pool == 1) {
              element.personalR = Number(this.$common.convertBigNumberToNormal(res.toString(), 5));
            }
          });
        })
        .catch((err) => {
          console.warn("PVE奖励池", err);
        });
    },
    /**查询PVP奖励池 */
    queryhwPvPPool() {
      hwPvPPool()
        .userStoredToken(this.getAccount)
        .then((res) => {
          this.RewardPoolData.forEach((element) => {
            if (element.pool == 2) {
              element.personalR = Number(this.$common.convertBigNumberToNormal(res.toString(), 5));
            }
          });
        })
        .catch((err) => {
          console.warn("PVP奖励池", err);
        });
    },
    /**查询BOSS奖励池 */
    queryhwWEPool() {
      hwWEPool()
        .userStoredToken(this.getAccount)
        .then((res) => {
          this.RewardPoolData.forEach((element) => {
            if (element.pool == 5) {
              element.personalR = Number(this.$common.convertBigNumberToNormal(res.toString(), 5));
            }
          });
        })
        .catch((err) => {
          console.warn("BOSS奖励池", err);
        });
    },
    /**提取个人HC奖励 */
    extractableClick(item) {
      if (!item.personalR) return;
      // this.$common.selectLang("没有可提取余额", "No Remaining Balance to Claim", this);
      if (item.loading) return;
      item.loading = true;
      switch (item.pool) {
        case 1:
          hwPvEPool()
            .connect(getSigner())
            .harvestToken()
            .then(async (res) => {
              const etReceipt = await res.wait();
              if (etReceipt.status == 1) {
                this.$common.selectLang("提取成功", "Claim Successful", this);
                this.queryhwPvEPool();
              }
              item.loading = false;
            })
            .catch((err) => {
              item.loading = false;
              console.warn("PVE提取失败", err);
            });
          break;
        case 2:
          hwPvPPool()
            .connect(getSigner())
            .harvestToken()
            .then(async (res) => {
              const etReceipt = await res.wait();
              if (etReceipt.status == 1) {
                this.$common.selectLang("提取成功", "Claim Successful", this);
                this.queryhwPvPPool();
              }
              item.loading = false;
            })
            .catch((err) => {
              item.loading = false;
              console.warn("PVP提取失败", err);
            });
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          hwWEPool()
            .connect(getSigner())
            .harvestToken()
            .then(async (res) => {
              const etReceipt = await res.wait();
              if (etReceipt.status == 1) {
                this.$common.selectLang("提取成功", "Claim Successful", this);
                this.queryhwWEPool();
              }
              item.loading = false;
            })
            .catch((err) => {
              item.loading = false;
              console.warn("BOSS提取失败", err);
            });
          break;
        default:
          break;
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
    numToFixed(value) {
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span {
      &:nth-child(1) {
        font-size: 26px;
      }
      &:nth-child(2) {
        font-size: 18px;
      }
    }
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
  margin-left: 2em;
  display: flex;
  align-items: center;
  &.disable {
    background: #ccc;
    &:hover {
      cursor: no-drop;
    }
  }
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
        min-width: 90px;
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
    width: 0.05rem;
    height: 0.05rem;
  }
  ::-webkit-scrollbar-thumb {
    background: #68b0c8;
    border-radius: 0.05rem;
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
      flex-wrap: wrap;
      > span {
        &:nth-child(1) {
          width: 100%;
          font-size: 0.2rem;
        }
        &:nth-child(2) {
          font-size: 0.12rem;
          font-weight: 100;
        }
      }
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
    margin-left: 1em;
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
            min-width: 0.8rem;
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
        width: 100%;
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3) {
          min-width: 0.5rem;
        }
      }
      ul {
        width: 100%;
        min-height: 0.5rem;
        max-height: 3rem;
        overflow-x: auto;
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
