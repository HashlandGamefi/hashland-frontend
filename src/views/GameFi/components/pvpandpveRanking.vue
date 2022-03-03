<template>
  <div class="page" ref="ranking_page" @touchstart="showPoolSelect = showPveSelect = showPvpSelect = false">
    <!-- 奖励池 -->
    <div class="Ranking">
      <span class="fontsize22">奖励池</span>
      <div class="select_list" @mouseover="showRewardPoolSelect = true" @mouseleave="showRewardPoolSelect = false">
        <div style="display: flex;justify-content: center;align-items: center;">
          <span>{{ $t("message.gameFi.text91") }} {{ currentIssue }}</span>
          <template v-if="issueList.length > 1">
            <img class="accrow" :class="{ active: showRewardPoolSelect }" :src="`${$store.state.imgUrl}accrow.png`" />
            <transition name="select-scaleY" appear>
              <ul class="list" v-show="showRewardPoolSelect">
                <li v-for="(item, index) in issueList" :key="index" @click="poolSelectSeason(item)">
                  {{ $t("message.gameFi.text91") }} {{ item.issue }}
                </li>
              </ul>
            </transition>
          </template>
        </div>
      </div>
    </div>
    <div class="game_model">
      <div class="Reward_Pool_box">
        <div class="onebox">
          <span class="span1 fontsize16">PVP</span>
          <span class="span2 fontsize18">1231212</span>
        </div>
        <div class="onebox">
          <span class="span1 fontsize16">PVE</span>
          <span class="span2 fontsize18">1231212</span>
        </div>
        <div class="onebox">
          <span class="span1 fontsize16">BOSS</span>
          <span class="span2 fontsize18">1231212</span>
        </div>
      </div>
    </div>
    <!-- PVE -->
    <div class="ranking_title">
      <span class="fontsize22">{{ $t("message.gameFi.text33") }}</span>
      <span class="fontsize16">
        Data updation countdown:12h:00m:00s
      </span>
    </div>
    <div class="ranking_box ranking_box_box2 pc">
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="col1">
              <div class="select_list" @mouseover="showPveSelect = true" @mouseleave="showPveSelect = false">
                <div>
                  <span>{{ $t("message.gameFi.text91") }} {{ currentIssue }}</span>
                  <template v-if="issueList.length > 1">
                    <img class="accrow" :class="{ active: showPveSelect }" :src="`${$store.state.imgUrl}accrow.png`" />
                    <transition name="select-scaleY" appear>
                      <ul class="list" v-show="showPveSelect">
                        <li v-for="(item, index) in issueList" :key="index" @click="pveSelectSeason(item)">
                          {{ $t("message.gameFi.text91") }} {{ item.issue }}
                        </li>
                      </ul>
                    </transition>
                  </template>
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
            <div class="col2">
              <div class="row" v-for="(item, index) in PVEData" :key="index">
                <div>
                  <div>
                    <span>{{ $t("message.gameFi.text101") }} {{ item.charpterId }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ item.passCount }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ item.isPass ? "✓" : "x" }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ item.chapterRewards | numToFixed }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>{{ item.totalHc | numToFixed }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ranking_box ranking_box_box2 mobile">
      <div class="outside_box">
        <div class="in_box">
          <div class="ranking_content">
            <div class="row select_list" @touchstart.stop="showPveSelect = true">
              <div>
                <span>{{ $t("message.gameFi.text91") }} {{ currentIssue }}</span>
                <template v-if="issueList.length > 1">
                  <img class="accrow" :class="{ active: showPveSelect }" :src="`${$store.state.imgUrl}accrow.png`" />
                  <transition name="select-scaleY" appear>
                    <ul class="list" v-show="showPveSelect">
                      <li v-for="(item, index) in issueList" :key="index" @click="pveSelectSeason(item)">
                        {{ $t("message.gameFi.text91") }} {{ item.issue }}
                      </li>
                    </ul>
                  </transition>
                </template>
              </div>
            </div>
            <div class="row">
              <ul class="rank_list">
                <li>
                  <div></div>
                  <div>{{ $t("message.gameFi.text99") }}</div>
                  <div>{{ $t("message.gameFi.text100") }}</div>
                  <div>{{ $t("message.gameFi.text94") }}</div>
                  <div>{{ $t("message.gameFi.text95") }}</div>
                </li>
                <li v-for="(item, index) in PVEData" :key="index">
                  <div>{{ $t("message.gameFi.text101") }} {{ item.charpterId }}</div>
                  <div>{{ item.passCount }}</div>
                  <div>{{ item.isPass ? "✓" : "x" }}</div>
                  <div>{{ item.chapterRewards | numToFixed }}</div>
                  <div>{{ item.totalHc | numToFixed }}</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新改版界面   pvp排名  pve战绩-->
    <div class="pvp_ranking-and-pve_ranking">
      <!-- pvp排名 -->
      <div class="pvp_ranking_box">
        <div class="title">
          <span class="fontsize22">PVP排名</span>
          <div class="select_list" @mouseover="showPvpSelect = true" @mouseleave="showPvpSelect = false">
            <div style="display: flex;justify-content: center;align-items: center;">
              <span>{{ $t("message.gameFi.text91") }} {{ currentIssue }}</span>
              <template v-if="issueList.length > 1">
                <img class="accrow" :class="{ active: showPvpSelect }" :src="`${$store.state.imgUrl}accrow.png`" />
                <transition name="select-scaleY" appear>
                  <ul class="list" v-show="showPvpSelect">
                    <li v-for="(item, index) in issueList" :key="index" @click="pvpSelectSeason(item)">
                      {{ $t("message.gameFi.text91") }} {{ item.issue }}
                    </li>
                  </ul>
                </transition>
              </template>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="left_content">
            <span class="fontsize12">我的排名</span>
            <div class="radious_">
              <Progress
                :percentNum="pvp_percentNum"
                speed="3"
                size="50"
                :ranking="pvp_ranking"
                color="#0CF3FF"
                backgroundColor="#fff"
              />
            </div>
            <div class="btn_box">
              <div class="btn_txt fontsize12">检查</div>
              <span class="btn_check_txt fontsize12">检查最新排名</span>
            </div>
          </div>
          <div class="right_content">
            <div class="out_onebox">
              <div class="onebox1_left">
                <div class="top_title">
                  <img class="fighting" :src="`${$store.state.imgUrl}fighting.png`" />
                  <span class="span1 fontsize16">战斗场数</span>
                </div>
                <div class="bottom_title fontsize14">
                  8场数
                </div>
              </div>
              <div class="onebox1_left">
                <div class="top_title">
                  <img class="victory" :src="`${$store.state.imgUrl}victory.png`" />
                  <span class="span1 fontsize16">胜利</span>
                </div>
                <div class="bottom_title fontsize14">
                  8场数
                </div>
              </div>
            </div>
            <div class="out_onebox">
              <div class="onebox1_left">
                <div class="reward_title"><span class="award_txt fontsize16">奖励</span></div>
                <div class="award_box">
                  <img class="hc_img" :src="`${$store.state.imgUrl}reward_hc.png`" />
                  <span class="span1 fontsize14">1212.23122</span>
                </div>
              </div>
              <div class="onebox1_left">
                <span class="btn_span fontsize12">领取</span>
              </div>
            </div>
            <div class="bonus_countdown">
              <span class="span1 fontsize16">奖金倒计时</span>
              <span class="span2 fontsize12">30d:21h:51m:4s</span>
            </div>
          </div>
        </div>
      </div>
      <!-- pve战绩 -->
      <div class="pvp_ranking_box">
        <div class="title">
          <span class="fontsize22">PVE战绩</span>
          <div class="select_list" @mouseover="showPveRecordSelect = true" @mouseleave="showPveRecordSelect = false">
            <div style="display: flex;justify-content: center;align-items: center;">
              <span>{{ $t("message.gameFi.text91") }} {{ currentIssue }}</span>
              <template v-if="issueList.length > 1">
                <img class="accrow" :class="{ active: showPveRecordSelect }" :src="`${$store.state.imgUrl}accrow.png`" />
                <transition name="select-scaleY" appear>
                  <ul class="list" v-show="showPveRecordSelect">
                    <li v-for="(item, index) in issueList" :key="index" @click="pveRecordSelectSeason(item)">
                      {{ $t("message.gameFi.text91") }} {{ item.issue }}
                    </li>
                  </ul>
                </transition>
              </template>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="left_content">
            <span class="fontsize12">通过率</span>
            <div class="radious_">
              <Progress
                :percentNum="pve_percentNum"
                speed="3"
                size="50"
                :ranking="pve_ranking"
                color="#FFBE03"
                backgroundColor="#fff"
              />
            </div>
            <div class="btn_box">
              <div class="btn_txt fontsize12">检查</div>
              <span class="btn_check_txt fontsize12">检查最新排名</span>
            </div>
          </div>
          <div class="right_content">
            <div class="out_onebox">
              <div class="onebox1_left">
                <div class="top_title">
                  <img class="fighting" :src="`${$store.state.imgUrl}pass.png`" />
                  <span class="span1 fontsize16">章节场数</span>
                </div>
                <div class="bottom_title fontsize14">
                  8场数
                </div>
              </div>
              <div class="onebox1_left">
                <div class="top_title">
                  <img class="victory" :src="`${$store.state.imgUrl}victory.png`" />
                  <span class="span1 fontsize16">通过</span>
                </div>
                <div class="bottom_title fontsize14">
                  8场数
                </div>
              </div>
            </div>
            <div class="out_onebox">
              <div class="onebox1_left">
                <div class="reward_title"><span class="award_txt fontsize16">奖励</span></div>
                <div class="award_box">
                  <img class="hc_img" :src="`${$store.state.imgUrl}reward_hc.png`" />
                  <span class="span1 fontsize14">1212.23122</span>
                </div>
              </div>
              <div class="onebox1_left">
                <span class="btn_span fontsize12">领取</span>
              </div>
            </div>
            <div class="bonus_countdown">
              <span class="span1 fontsize16">奖金倒计时</span>
              <span class="span2 fontsize12">30d:21h:51m:4s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- pvp奖励排行榜 -->
    <div class="Ranking">
      <span class="fontsize22">PVP奖励排行</span>
      <div class="select_list" @mouseover="showPvpRankingSelect = true" @mouseleave="showPvpRankingSelect = false">
        <div style="display: flex;justify-content: center;align-items: center;">
          <span>{{ $t("message.gameFi.text91") }} {{ currentIssue }}</span>
          <template v-if="issueList.length > 1">
            <img class="accrow" :class="{ active: showPvpRankingSelect }" :src="`${$store.state.imgUrl}accrow.png`" />
            <transition name="select-scaleY" appear>
              <ul class="list" v-show="showPvpRankingSelect">
                <li v-for="(item, index) in issueList" :key="index" @click="pvpRankingSelectSeason(item)">
                  {{ $t("message.gameFi.text91") }} {{ item.issue }}
                </li>
              </ul>
            </transition>
          </template>
        </div>
      </div>
    </div>
    <div class="listbox">
      <div class="topline">
        <div class="title_onebox fontsize18">Ranking</div>
        <div class="onebox1">
          <div class="insertbox1 fontsize18">Address</div>
        </div>
        <div class="onebox2">
          <div class="insertbox2 fontsize18">HC奖励</div>
        </div>
      </div>
      <div class="bottomline">
        <div class="boxs" v-for="(item,index) in list" :key="index">
          <div class="title_onebox">
            <div class="champion_box" v-if="index == 0">
              <img :src="`${$store.state.imgUrl}champion1.png`" class="sort1_img" />
            </div>
            <div class="champion_box" v-else-if="index == 1">
              <img :src="`${$store.state.imgUrl}champion2.png`" class="sort1_img" />
            </div>
            <div class="champion_box" v-else-if="index == 2">
              <img :src="`${$store.state.imgUrl}champion3.png`" class="sort1_img" />
            </div>
            <span class="pad_left fontsize16" v-else>{{index + 1}}</span>
          </div>
          <div class="onebox">
            <div class="insertbox1 fontsize16" v-if="getIsMobile">{{item.address}}</div>
            <div class="insertbox1 fontsize16" v-else>{{item.mobile_address}}</div>
          </div>
          <div class="onebox">
            <div class="insertbox2 fontsize16">{{item.num}}</div>
          </div>
        </div>
        <LoadingAnmation v-if="list.length == 0 && pageshowLoading"></LoadingAnmation>
        <NoData v-else-if="list.length == 0 && !pageshowLoading" :isshow="false"></NoData>
      </div>
    </div>
    <!-- 分页 -->
    <div class="page_nums">
      <el-pagination
        layout="prev, pager, next"
        :page-size="5"
        @current-change="handleCurrentChange"
        :total="500">
      </el-pagination>
    </div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import Progress from '@/components/progress.vue'
import { mapGetters } from "vuex";
import { hwPvPPool, hwPvEPool, hwWEPool, getSigner, hc, contract, util } from "hashland-sdk";
export default {
  components: {
    Progress
  },
  data() {
    return {
      pvp_percentNum:90,//pvp排名所占百分比
      pvp_ranking:2,//pvp排名
      pve_percentNum:0,//pve通过率所占百分比
      pve_ranking:'0%',//pve通过率
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      issueList: [], // 赛季列表
      queryAccount: "",
      currentIssue: "", // 当前赛季
      showPoolSelect: false,
      showPveSelect: false,
      showPvpSelect: false,
      showPveRecordSelect:false,//pve战绩选择赛季变量
      showPvpRankingSelect:false,//pvp奖励排行变量
      showRewardPoolSelect:false,//奖励池变量
      rewardPoolData: [
        { title: `${this.$t("message.gameFi.text33")}`, pool: 1, totalR: 0, personalR: 0, loading: false }, // PVE
        { title: `${this.$t("message.gameFi.text35")}`, pool: 2, totalR: 0, personalR: 0, loading: false }, // PVP
        { title: `${this.$t("message.gameFi.text37")}`, pool: 3, totalR: 0, personalR: 0, loading: false }, // GVE
        { title: `${this.$t("message.gameFi.text39")}`, pool: 4, totalR: 0, personalR: 0, loading: false }, // GVG
        { title: `${this.$t("message.gameFi.text88")}`, pool: 5, totalR: 0, personalR: 0, loading: false }, // World BOSS
      ],
      PVEData: [], // PVE
      PVPData: [], // PVP
      PVPPersonalData: { rank: 0, totalHc: 0 }, // PVP个人
      updateTime: "",
      pageshowLoading: true,// 数据没有加载完之前显示loading
      list:[{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },
      {
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },{
        address:'0x916577E2eFa42d84343a845C5AEA1D3D91F4BF8c',
        mobile_address:'0x91..2eFa',
        num:12123121321
      },
      ]
    };
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount", "getCoinPrice","getIsMobile"]),
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
  },
  created() {
    // 只显示UTC 0点12点整点时间
    this.updateTime = new Date(Math.floor(new Date().getTime() / 43200000) * 43200000).toLocaleString("en");
    this.queryAccount = this.queryAccount? this.queryAccount: localStorage.getItem("hashlandGameFiInfo")
      ? JSON.parse(localStorage.getItem("hashlandGameFiInfo")).mailAccount
      : "";
    this.queryHWWEPoolTotal();
    this.queryRewardData();
  },
  methods: {
    // 分页
    handleCurrentChange(){
      console.log("分页")
    },
    /**获取赛季列表 */
    queryRewardData() {
      this.$api
        .gameIssueInfo(`queryType=issue_info&queryAccount=${this.queryAccount}&issue=${this.currentIssue}`)
        .then((res) => {
          console.log('后台返回res: ', res);
          if (res.data.result == "SUCCESS") {
            this.issueList = res.data.data.issueList;
            this.currentIssue = this.currentIssue ? this.currentIssue : res.data.data.maxIssue;

            this.rewardPoolData.forEach((item) => {
              if (item.pool == 1) {
                item.totalR = res.data.data.totalRewardPveHc; // 奖池
              } else if (item.pool == 2) {
                item.totalR = res.data.data.totalRewardPvpHc;
              }
            });
            this.PVEData = res.data.data.pve; // PVE
            this.PVPData = res.data.data.pvp; // PVP
            this.PVPPersonalData.rank = res.data.data.pvpIndividualRank; // PVP个人
            this.PVPPersonalData.totalHc = res.data.data.pvpIndividualRewardHc; // PVP个人
          }
        })
        .catch((err) => {
          console.warn("rewardRanking", err);
        });
    },
    /**奖池切换赛季 */
    poolSelectSeason(ite) {
      console.log('奖池切换赛季ite: ', ite);
      if (this.currentIssue == ite.issue) return;
      this.currentIssue = ite.issue;
      this.showRewardPoolSelect = false;
      this.queryRewardData();
    },
    /**PVP奖励排行---新增 */
    pvpRankingSelectSeason(ite){
      if (this.currentIssue == ite.issue) return;
      this.currentIssue = ite.issue;
      this.showPvpRankingSelect = false;
      this.queryRewardData();
    },
    /**pve战绩切换赛季---新增 */
    pveRecordSelectSeason(ite){
      if (this.currentIssue == ite.issue) return;
      this.currentIssue = ite.issue;
      this.showPveRecordSelect = false;
      this.queryRewardData();
    },
    /**PVE切换赛季 */
    pveSelectSeason(ite) {
      if (this.currentIssue == ite.issue) return;
      this.currentIssue = ite.issue;
      this.showPveSelect = false;
      this.queryRewardData();
    },
    /**PVP切换赛季---新增 */
    pvpSelectSeason(ite) {
      if (this.currentIssue == ite.issue) return;
      this.currentIssue = ite.issue;
      this.showPvpSelect = false;
      this.queryRewardData();
    },
    /**查询世界池余额 */
    queryHWWEPoolTotal() {
      hc()
        .balanceOf(contract().HWWEPool)
        .then((res) => {
          console.log('查询世界池余额res: ', res);
          let obj = this.rewardPoolData.find((item) => item.pool == 5);
          if (obj) obj.totalR = Number(util.formatEther(res));
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
          let obj = this.rewardPoolData.find((item) => item.pool == 1);
          if (obj) obj.personalR = Number(this.$common.convertBigNumberToNormal(res.toString(), 5));
        })
        .catch((err) => {
          console.warn("PVE Pool", err);
        });
    },
    /**查询PVP奖励池 */
    queryhwPvPPool() {
      hwPvPPool()
        .userStoredToken(this.getAccount)
        .then((res) => {
          let obj = this.rewardPoolData.find((item) => item.pool == 2);
          if (obj) obj.personalR = Number(this.$common.convertBigNumberToNormal(res.toString(), 5));
        })
        .catch((err) => {
          console.warn("PVP Pool", err);
        });
    },

    /**查询BOSS奖励池 */
    queryhwWEPool() {
      hwWEPool()
        .userStoredToken(this.getAccount)
        .then((res) => {
          let obj = this.rewardPoolData.find((item) => item.pool == 5);
          if (obj) obj.personalR = Number(this.$common.convertBigNumberToNormal(res.toString(), 5));
        })
        .catch((err) => {
          console.warn("BOSS Pool", err);
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
    }
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
<style>
.el-pagination{
  height: 50px;
}
.el-pagination button:hover{
  color: #F5D719;
}
.el-pagination button:disabled{
  background: transparent;
}
.el-pagination .btn-next, .el-pagination .btn-prev{
  background: transparent;
  color: #ffffff;
}
.el-pagination .btn-next{
  background: transparent;
}
.el-pager li{
  background: transparent;
  color: #fff;
  font-family: ArialMT;
}
.el-pagination__editor.el-input .el-input__inner{
  background: transparent;
}
.el-pager li.active{
  color:#000;
  width: 20px;
  /* height: 32px; */
  background: #F5D719;
  border-radius: 6px;
}
.el-pager li:hover{
  color: #fff;
}
.el-pager li.btn-quicknext, .el-pager li.btn-quickprev{
  color: #ffffff;
}
</style>
<style lang="scss" scoped>
.page_nums {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .border_pre {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    border: 1px solid #dddddd;
    margin-right: 8px;
    .pre_img {
      width: 8px;
      height: 12px;
    }
  }
  .border_txt {
    font-size: 14px;
    font-family: PingFang SC;
    color: #ffffff;
    line-height: 22px;
    margin-right: 8px;
  }
  .span_yellow {
    background: #f5d719;
    color: #000000;
    border: none;
  }
  .txt_txt_1 {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 22px;
    margin: 0 8px;
  }
  .txt_txt_2 {
    width: 48px;
    height: 32px;
    border-radius: 4px;
    border: 1px solid #dddddd;
    display: flex;
    .page_input {
      width: 100%;
      text-align: center;
      border: none;
      outline: none;
      background: #16161a;
      font-family: Nexa Bold;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      color: #fedf1a;
      border-radius: 8px;
      padding: 10px 0;
    }
  }
}
.game_model {
  width: 100%;
  height: auto;
  background: #021c3b;
  box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
  border-radius: 6px;
  margin-top: 10px;
  padding: 20px;
  .Reward_Pool_box{
    width: 100%;
    background: #01162D;
    border-radius: 7px;
    border: 1px solid #FFBE03;
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .onebox{
      flex: 1;
      height: 80px;
      padding: 10px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #ffffff;
    }
  }
}
.pvp_ranking-and-pve_ranking{
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 100px;
  .pvp_ranking_box{
    width: 48%;
    display: flex;
    flex-direction: column;
    .title{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .content{
      width: 100%;
      display: flex;
      padding: 20px 17px;
      margin-top: 30px;
      background: linear-gradient(180deg, #010F20 0%, #021C3B 100%) linear-gradient(90deg, #021F3E 0%, #01142A 100%, #034088 100%);
      box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), inset -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
      border-radius: 6px;
      .left_content{
        width: 106px;
        height: 233px;
        border-right: 1px solid;
        border-image: linear-gradient(-41deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .radious_{
          width: 50px;
          height: 50px;
        }
        .btn_box{
          display: flex;
          flex-direction:column;
          align-items: center;
          .btn_txt{
            width: 63px;
            height: 22px;
            background: #29CDDA;
            border-radius: 7px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            cursor: pointer;
          }
          .btn_check_txt{
            color: #676F78;
            margin-top: 10px;
          }
        }
      }
      .right_content{
        width: calc(100% - 106px);
        display: flex;
        flex-direction: column;
        .out_onebox{
          width: 100%;
          border-bottom: 1px solid;
          border-image: linear-gradient(-41deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0 15px 20px;
          .onebox1_left{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .top_title{
              display: flex;
              justify-content: center;
              align-items: center;
              .fighting{
                width: 24px;
                object-fit: contain;
              }
              .victory{
                width: 19px;
                object-fit: contain;
              }
              .span1{
                color: #fff;
                margin-left: 6px;
              }
            }
            .bottom_title{
              color: #fff;
              margin-top: 12px;
            }
            .reward_title{
              width: 100%;
              display: flex;
              .award_txt{
                color: #fff;
              }
            }
            .award_box{
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 12px;
              .hc_img{
                width: 24px;
                object-fit: contain;
              }
              .span1{
                color: #fff;
                padding: 5px 15px;
                background: #010B16;
                border-radius: 0 14px 14px 0;
              }
            }
            .btn_span{
              width: 63px;
              height: 22px;
              background: #29CDDA;
              border-radius: 7px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
              cursor: pointer;
            }
          }
        }
        .bonus_countdown{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0 15px 20px;
          .span1{
            color: #fff;
          }
          .span2{
            color: #fff;
            padding: 5px 15px;
            background: #010B16;
            border-radius:14px;
          }
        }
      }
    }
  }
}
.Ranking{
  width: 100%;
  color: #ffffff;
  margin-top:100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.listbox{
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  max-height: 580px;
  overflow: hidden;
  .topline{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    .onebox1{
      flex: 1;
      color: #ffffff;
      .insertbox1{
        width: 100%;
        text-align: center;
      }
    }
    .onebox2{
      min-width: 120px;
      color: #ffffff;
      .insertbox2{
        width: 100%;
        text-align: right;
      }
    }
    .title_onebox{
      min-width: 80px;
      color: #ffffff;
      display: flex;
      .champion_box{
        display: flex;
        color: #ffffff;
      }
    }
  }
  .bottomline{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .boxs{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      .onebox1{
        flex: 1;
        color: #ffffff;
        .insertbox1{
          width: 100%;
          text-align: center;
        }
      }
      .onebox2{
        min-width: 120px;
        color: #ffffff;
        .insertbox2{
          width: 100%;
          text-align: right;
        }
      }
      .title_onebox{
        min-width: 80px;
        display: flex;
        color: #ffffff;
        .champion_box{
          display: flex;
          color: #ffffff;
        }
        .sort1_img{
          width: 27px;
          object-fit: contain;
        }
        .pad_left{
          padding-left: 5px;
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
  }
}
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
  font-size: 0;
  margin-top: 10px;
  .ranking_content {
    width: 100%;
    display: flex;
    text-align: center;
  }
}
.ranking_title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 100px;
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
.update_title {
  font-size: 20px;
  margin-top: 50px;
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
.select_list {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    font-size: 16px;
    .accrow {
      margin-left: 10px;
      width: 15px;
      height: auto;
      // transform: rotate(-90deg);
      transition: all 0.3s;
      &.active {
        transform: rotate(-90deg);
      }
    }
    .list {
      width: 100%;
      height: auto;
      background: #082545;
      box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
      border-radius: 0 0 6px 6px;
      overflow: hidden;
      position: absolute;
      top: 100%;
      left: 0;
      // transform: scaleY(0);
      transition: transform 0.2s;
      transform-origin: top center;
      li {
        font-size: 16px;
        padding: 10px;
        &:hover {
          color: #00e7f0;
        }
      }
    }
  }
  // &:hover {
  //   .accrow {
  //     transform: rotate(0);
  //   }
  //   .list {
  //     transform: scaleY(1);
  //   }
  // }
}
.select-scaleY-enter,
.select-scaleY-leave-to {
  transform: scaleY(0);
}
.select-scaleY-enter-to,
.select-scaleY-leave {
  transform: scaleY(1);
}
@media screen and (max-width: 980px) {
  .Ranking{
    width: 100%;
    color: #ffffff;
    margin-top:0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .game_model {
    width: 100%;
    height: auto;
    background: #021c3b;
    box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
    border-radius: 0.06rem;
    margin-top: 0.1rem;
    padding: 0.2rem;
    .Reward_Pool_box{
      width: 100%;
      background: #01162D;
      border-radius: 7px;
      border: 1px solid #FFBE03;
      margin-bottom: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 0.1rem 0.2rem;
      .onebox{
        flex: 0;
        width: 100%;
        height: 80px;
        padding:0.1rem 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        color: #ffffff;
      }
    }
  }
  .ranking_title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 0.5rem;
  }
  .pvp_ranking-and-pve_ranking{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 0;
    .pvp_ranking_box{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 0.5rem;
      .title{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .content{
        width: 100%;
        display: flex;
        padding: 0.1rem 0.05rem;
        margin-top: 30px;
        border-radius: 6px;
        .left_content{
          width: 106px;
          height: 233px;
          border-right: 1px solid;
          border-image: linear-gradient(-41deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .radious_{
            width: 0.5rem;
            height: 0.5rem;
          }
          .btn_box{
            display: flex;
            flex-direction:column;
            align-items: center;
            .btn_txt{
              width: 63px;
              height: 22px;
              background: #29CDDA;
              border-radius: 7px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #fff;
            }
            .btn_check_txt{
              color: #676F78;
              margin-top: 10px;
            }
          }
        }
        .right_content{
          width: calc(100% - 106px);
          display: flex;
          flex-direction: column;
          .out_onebox{
            width: 100%;
            border-bottom: 1px solid;
            border-image: linear-gradient(-41deg, rgba(43, 217, 229, 0), rgba(43, 217, 229, 1), rgba(23, 184, 203, 0.17), rgba(19, 177, 198, 0)) 1 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.05rem 0 0.1rem 0.1rem;
            .onebox1_left{
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .top_title{
                display: flex;
                justify-content: center;
                align-items: center;
                .fighting{
                  width: 24px;
                  object-fit: contain;
                }
                .victory{
                  width: 19px;
                  object-fit: contain;
                }
                .span1{
                  color: #fff;
                  margin-left: 6px;
                }
              }
              .bottom_title{
                color: #fff;
                margin-top: 12px;
              }
              .reward_title{
                width: 100%;
                display: flex;
                .award_txt{
                  color: #fff;
                }
              }
              .award_box{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0.1rem;
                .hc_img{
                  width: 24px;
                  object-fit: contain;
                }
                .span1{
                  color: #fff;
                  padding: 0.05rem 0.1rem;
                  background: #010B16;
                  border-radius: 0 14px 14px 0;
                }
              }
              .btn_span{
                width: 63px;
                height: 22px;
                background: #29CDDA;
                border-radius: 7px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                cursor: pointer;
              }
            }
          }
          .bonus_countdown{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.05rem 0 0.1rem 0.1rem;
            margin-top: 0.1rem;
            .span1{
              color: #fff;
              font-size: 0.12rem;
            }
            .span2{
              color: #fff;
              padding: 0.05rem 0.1rem;
              background: #010B16;
              border-radius:14px;
            }
          }
        }
      }
    }
  }
  .listbox{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0.3rem;
    max-height: 5.8rem;
    .topline{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.3rem;
      .onebox1{
        flex: 1;
        color: #ffffff;
        .insertbox1{
          width: 100%;
          text-align: center;
        }
      }
      .onebox2{
        min-width: 0.75rem;
        color: #ffffff;
        .insertbox2{
          width: 100%;
          text-align: right;
        }
      }
      .title_onebox{
        min-width: 0.8rem;
        color: #ffffff;
        display: flex;
        .champion_box{
          display: flex;
          color: #ffffff;
        }
      }
    }
    .bottomline{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .boxs{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        .onebox1{
          flex: 1;
          color: #ffffff;
          .insertbox1{
            width: 100%;
            text-align: center;
          }
        }
        .onebox2{
          min-width: 0.75rem;
          color: #ffffff;
          .insertbox2{
            width: 100%;
            text-align: right;
          }
        }
        .title_onebox{
          min-width: 80px;
          display: flex;
          color: #ffffff;
          .champion_box{
            display: flex;
            color: #ffffff;
          }
          .sort1_img{
            width: 27px;
            object-fit: contain;
          }
          .pad_left{
            padding-left: 5px;
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
    }
  }
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
    margin-top: 0.3rem;
    .ranking_content {
      display: block;
    }
  }
  .update_title {
    font-size: 0.15rem;
    margin-top: 0.5rem;
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
      .rank_list {
        width: 100%;
        padding: 0.05rem;
        li {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
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
      .rank_list {
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
          }
        }
      }
    }
  }

  .select_list {
    > div {
      font-size: 12px;
      .accrow {
        margin-left: 0.1rem;
        width: 0.12rem;
      }
      .list {
        li {
          font-size: 12px;
          padding: 0.1rem;
        }
      }
    }
  }
}
</style>
