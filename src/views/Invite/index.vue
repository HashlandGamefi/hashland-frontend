<template>
  <div class="invite_page">
    <span class="title1_txt fontsize32">{{ $t("message.nav.txt9") }}</span>
    <div class="content">
      <span class="inviteme fontsize22">{{ $t("message.invite.txt1") }}</span>
      <div class="input_box">
        <input
          type="text"
          :style="{ width: dis ? '100%' : '' }"
          :readonly="redonlyDis"
          v-model="peopleAddress"
          class="input fontsize16"
          :placeholder="$t('message.invite.txt14')"
        />
        <div v-if="!dis" class="btn fontsize16" @click="besure">
          {{ $t("message.invite.txt7") }}
          <BtnLoading :isloading="btnloading"></BtnLoading>
        </div>
      </div>
      <span class="meinvite fontsize22" v-if="isshowbox">{{ $t("message.invite.txt2") }}</span>
      <span class="meinvite_txt fontsize12_400" v-if="isshowbox">{{ $t("message.invite.txt3") }}</span>
      <div class="center_box" v-if="isshowbox">
        <div class="box">
          <img :src="`${$store.state.imgUrl}inviteimg1.png`" class="center_img" />
          <div class="positionbox">
            <div class="top_box">
              <span class="span1 fontsize22" v-if="!isNumber">{{$t(ishowRankNum)}}</span>
              <span class="span1 fontsize22" v-else>{{ishowRankNum}}</span>
              <span class="span2 fontsize12">{{ $t("message.invite.txt15") }}</span>
            </div>
            <div class="bottom_box">
              <div class="one_line">
                <span class="span1 fontsize22">{{CENUM}}</span>
                <span class="span2 fontsize12">{{ $t("message.invite.txt16") }}</span>
              </div>
              <div class="one_line">
                <span class="span1 fontsize22">{{CENUM_ratio}}%</span>
                <!-- <span class="span2 fontsize12">Territory proportion</span> -->
                <span class="span2 fontsize12">{{ $t("message.invite.txt17") }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page_bottom" v-if="isshowbox">
        <div class="embedded_box">
          <div class="leftbox">
            <img :src="`${$store.state.imgUrl}hclogo.png`" class="img" />
            <span class="span1 fontsize22">HC reward</span>
          </div>
          <div class="boxs_reward">
            <div class="onebox">
              <span class="span1 fontsize16">{{ $t("message.invite.txt18") }}</span>
              <span class="span1 fontsize16">{{add_rewards}}</span>
            </div>
            <div class="onebox">
              <span class="span1 fontsize16">{{ $t("message.invite.txt19") }}</span>
              <div class="btn_box">
                <span class="span1 fontsize16"  v-if="rewards == 0">{{rewards}}</span>
                <span class="span1 fontsize16" v-else>
                  <countTo
                    :decimals="btcnumShow.length"
                    :startVal="btcStarValue"
                    :endVal="rewards"
                    :duration="1500"
                  ></countTo>
                </span>
                <span class="btn fontsize16" @click="extractClick">{{ $t("message.invite.txt20") }}<BtnLoading :isloading="extract_btnloading"></BtnLoading></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="Ranking fontsize22">{{ $t("message.invite.txt21") }}</span>
      <span class="Ranking_txt fontsize12_400">{{ $t("message.invite.txt22") }}</span>
      <div class="listbox">
        <div class="topline">
          <div class="title_onebox fontsize18">{{ $t("message.invite.txt15") }}</div>
          <div class="onebox">
            <div class="insertbox1 fontsize18">{{ $t("message.invite.txt23") }}</div>
          </div>
          <div class="onebox">
            <div class="insertbox1 fontsize18">{{ $t("message.invite.txt24") }}</div>
          </div>
          <div class="onebox">
            <div class="insertbox2 fontsize18">{{ $t("message.invite.txt25") }}</div>
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
              <div class="insertbox1 fontsize16">{{item.stakedHC}}</div>
            </div>
            <div class="onebox">
              <div class="insertbox1 fontsize16">{{item.address}}</div>
            </div>
            <div class="onebox">
              <div class="insertbox2 fontsize16">{{item.ratio}}%</div>
            </div>
          </div>
          <div class="loadingbox fontsize16" v-if="list.length == 0 && pageshowLoading" >
            Loading...
          </div>
          <NoData v-else-if="list.length == 0 && !pageshowLoading" :isshow="false"></NoData>
        </div>
      </div>
    </div>
    <Proup
      :btntxt="btntxt"
      :word="word"
      :proupDis="proupDis"
      @besurefun="closeFun"
      @closedis="closeFun"
    ></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { invitePool,getSigner,invitePoolInfo } from "hashland-sdk";
export default {
  data () {
    return {
      pageshowLoading: true,// 数据没有加载完之前显示loading
      isNumber:false,
      ishowRankNum:'message.invite.txt27',//我的战队排名
      CENUM:0,//战力
      CENUM_ratio:0,//战力比
      btcStarValue:0,// btc 可提取初始值
      timernull:null,//定时器对象
      btcnumShow:'12345678', // 数字滚动插件默认显示小数位数8位
      extract_btnloading:false,//提取奖励按钮
      rewards:0,// 领主可提取奖励
      add_rewards:0,// 累计奖励
      btnloading:false,// 按钮loading
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      list:[],
      peopleAddress: "",
      redonlyDis: false, //input输入框  是否只读
      dis: false, // 确认按钮 是否禁用
      userlist:[
        '0x16FEC748C51B702eCC4ACCe122EcF9059f7fBd1C',
        '0x1b8651a2D6Bd1BA4eE3E053930aeaE612f2489D3',
        '0xA30D18C731c9944F904fFB1011c17B75280d2A08',
        '0xf379d24dCE0Bb73d87d3499D4F1cC87F0Bd0091F',
        '0xEeF038C88884fFb8A22Afd516c91690d1666ED18',
      ]
    }
  },
  watch: {
    getIstrue: {
      handler (newValue) {
        console.log('邀请页面newValue: ', newValue)
        if(newValue){
          this.sdkInfo()
          clearInterval(this.timernull)
          this.timernull = setInterval(() => {
            this.getRewardsFun()
          },5000)
        }else{
          clearInterval(this.timernull)
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount"]),
    isshowbox(){
      for (let index = 0; index < this.userlist.length; index++) {
        if (this.getAccount.toLocaleLowerCase() === this.userlist[index].toLocaleLowerCase()) {
          return true
        }else{
          return false
        }
      }
    }
  },
  methods:{
    // 取消按钮(关闭弹窗)
    closeFun () {
      this.proupDis = false;
    },
    // 提取奖励
    extractClick(){
      if(this.extract_btnloading)return
      if(this.rewards == 0){
        this.$common.selectLang("没有奖励需要提取", "No claimable rewards", this)
        return
      }
      this.extract_btnloading = true
      invitePool().connect(getSigner()).harvestToken().then(res => {
        console.log('提取奖励res: ', res);
        this.$common.selectLang("提取成功", "Claim success", this)
        this.sdkInfo()
        this.extract_btnloading = false
      }).catch(err => {
        console.log('提取奖励err: ', err);
        this.extract_btnloading = false
      })
    },
    async besure() {
      if(this.btnloading)return
      // 判断用户输入的地址不能为空
      if (this.peopleAddress === "") {
        this.$common.selectLang("请输入以太坊地址", "Please enter Ethereum address", this)
        return;
      }
      if(this.peopleAddress.length !== 42){
        this.$common.selectLang("以太坊地址不正确", "Wrong Ethereum address", this)
        return
      }
      if(this.peopleAddress.toLocaleLowerCase() == this.getAccount.toLocaleLowerCase()){
        this.$common.selectLang("不能绑定自己", "Cannot bind yourself", this)
        this.peopleAddress = ''
        return
      }
      if(this.userlist.indexOf(this.peopleAddress.toLocaleLowerCase()) == -1){
        this.$common.selectLang("该战队暂未开放，请选择其他战队", "This team is not yet open, please choose another team", this)
        this.peopleAddress = ''
        return
      }
      this.btnloading = true
      invitePool().connect(getSigner()).bindInviter(this.peopleAddress).then(async res => {
        console.log('绑定地址res: ', res);
        const etReceipt = await res.wait();
        if (etReceipt.status == 1) {
          this.$common.selectLang("绑定成功", "Success", this);
          this.btnloading = false
          this.sdkInfo()
        }else{
          this.btnloading = false
        }
      }).catch(err => {
        console.log('绑定地址:err ', err);
        this.btnloading = false
      })
    },
    // 链接sdk后获取的信息
    sdkInfo(){
      this.getUserAddress()
      this.getRewardsFun()
      this.getUserList()
    },
    // 邀请地址获取
    getUserAddress(){
      invitePool().userInviter(this.getAccount).then(res => {
        console.log('邀请地址res: ', res);
        if(res == '0x0000000000000000000000000000000000000000'){
          this.peopleAddress = "";
          this.dis = false;
          this.redonlyDis = false;
        }else{
          this.peopleAddress = res;
          this.dis = true;
          this.redonlyDis = true;
        }
      })
    },
    // 定时器刷新邀请奖励
    getRewardsFun(){
      // 累积奖励
      invitePool().getTokenTotalRewards(this.getAccount).then(res => {
        this.add_rewards = this.$common.useBigNumberDiv(res.toString())
      })
      // 可提取奖励
      invitePool().getTokenRewards(this.getAccount).then(res => {;
        if ((res.toString() / 1e18) < 1e-8) {
          this.rewards = 0
        }else{
          let num = this.$common.useBigNumberDiv(res.toString())
          this.btcnumShow = num.substring(num.indexOf('.') + 1,num.length)
          this.btcStarValue = this.rewards
          this.rewards = Number(num)
        }
      })
    },
    // 获取列表
    getUserList(){
      this.getDataBaseInfo().then(res => {
        console.log('封装返回的res: ', res);
        if(res.arr.length == 0){
          this.list = []
          this.pageshowLoading = false
        }else{
          console.log("进入else",res)
          this.list = res.arr.filter(item => {
            return item.status
          })
          for (let index = 0; index < this.list.length; index++) {
            const ele = this.list[index];
            if(this.getAccount.toLocaleLowerCase() == ele.inviter.toLocaleLowerCase()){
              console.log("返回数据多会放")
              let RankNum = this.list.findIndex(item => this.getAccount.toLocaleLowerCase() == item.inviter.toLocaleLowerCase() );
              this.ishowRankNum = RankNum + 1
              this.isNumber = true
              this.CENUM = this.$common.getBit(ele.stakedHC, 2) //战力
              this.CENUM_ratio = this.$common.getBit((ele.stakedHC / res.data), 2)//战力比
              return
            }else{
              console.log("else大明风华")
              this.ishowRankNum = 'message.invite.txt27'
              this.isNumber = false
            }
          }
        }
      })
      return
      invitePoolInfo.getInviterInfo(10,0,'stakedHC','desc',this.getAccount).then(response => {
        console.log('response: ', response);

        // console.log('获取某领主的基于指针(从0开始)和数量的被邀请人的地址数组和最后一个数据的指针: ',res);
        let resres = JSON.parse(JSON.stringify(response))
        // let res = JSON.parse(JSON.stringify(response))
        let res = {
          data:{
            inviterInfos:[{
              ratio:20.22,
              address:'0x16FEC748C51B702eCC4ACCe122EcF9059f7fBd1C',
              stakedHC:1200
            },
            {
              ratio:12.12,
              address:'0xEeF038C88884fFb8A22Afd516c91690d1666ED18',
              stakedHC:20000
            },
            {
              ratio:50.2,
              address:'0x16FEC748C51B702eCC4ACCe122EcF9059f7fBdvv',
              stakedHC:400
            }
            ]
          }
        }
        invitePool().stake().then(data => {
          console.log('总战力data: ', data);
          res.data.inviterInfos.forEach((element,i) => {
            if(this.userlist.indexOf(element.address.toLocaleLowerCase()) != -1){
              element.ratio = this.$common.getBit((element.stakedHC / data.toNumber()), 2)
              console.log('element.stakedHC / data.toNumber(): ', element.stakedHC / data.toNumber())
              element.address = this.$common.getSubStr(element.address,5)
              element.stakedHC = this.$common.getBit(element.stakedHC, 2)
            }else{
              res.data.inviterInfos.splice(i,1)
            }
          });
          this.list = res.data.inviterInfos
          console.log('res.data.inviterInfos: ', res.data.inviterInfos);

          for (let index = 0; index < resres.data.inviterInfos.length; index++) {
            const ele = resres.data.inviterInfos[index];
            if(this.getAccount.toLocaleLowerCase() == ele.address.toLocaleLowerCase()){
              let RankNum = resres.data.inviterInfos.findIndex(item => this.getAccount.toLocaleLowerCase() == item.address.toLocaleLowerCase() );
              this.ishowRankNum = RankNum + 1
              this.isNumber = true
              this.CENUM = this.$common.getBit(ele.stakedHC, 2) //战力
              this.CENUM_ratio = this.$common.getBit((ele.stakedHC / data.toNumber()), 2)//战力比
            }else{
              this.ishowRankNum = 'message.invite.txt27'
              this.isNumber = false
            }
          }
        })
      })
    },
    getDataBaseInfo(){
      let ConversionArr = this.userlist.map(item => {
        return item.toLocaleLowerCase()
      })
      return new Promise((resolve,reject) => {
        invitePoolInfo.getInviterInfo(10,0,'stakedHC','desc',this.getAccount).then(res => {
          invitePool().stake().then(data => {
            if(res.data.inviterInfos.length == 0){
              let res = [{
                    ratio:20.22,
                    inviter:'0x16FEC748C51B702eCC4ACCe122EcF9059f7fBd1C',
                    stakedHC:1200
                  },
                  {
                    ratio:12.12,
                    inviter:'0xEeF038C88884fFb8A22Afd516c91690d1666ED18',
                    stakedHC:20000
                  },
                  {
                    ratio:50.2,
                    inviter:'0x16FEC748C51B702eCC4ACCe122EcF9059f7fBdvv',
                    stakedHC:400
                  }
                  ]
              res.forEach(element => {
                if(ConversionArr.indexOf(element.inviter.toLocaleLowerCase()) != -1){
                  element.status = true
                }else{
                  element.status = false
                }
                element.ratio = this.$common.getBit((element.stakedHC / data.toNumber()), 2)
                element.address = this.$common.getSubStr(element.inviter,5)
                element.stakedHC = this.$common.getBit(element.stakedHC, 2)
              })
              resolve({'arr': res, 'msg':'Success','data':data.toNumber()});
            }else{
              res.data.inviterInfos.forEach(element => {
                if(ConversionArr.indexOf(element.inviter.toLocaleLowerCase()) != -1){
                  element.status = true
                }else{
                  element.status = false
                }
                element.ratio = this.$common.getBit((element.stakedHC / data.toNumber()), 2)
                element.address = this.$common.getSubStr(element.inviter,5)
                element.stakedHC = this.$common.getBit(element.stakedHC, 2)
              })
              resolve({'arr': res.data.inviterInfos, 'msg':'Success','data':data.toNumber()});
            }
          }).catch(() => {
            reject({'arr': [], 'msg':'Total contract power error'});
          })
        }).catch(() => {
          reject({'arr': [], 'msg':'Database error'});
        })
      })
    }
  },
}
</script>

<style lang='scss' scoped>
.invite_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 126px;
  .title1_txt {
    color: #ffffff;
  }
  .content{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    .inviteme{
      width: 100%;
      color: #ffffff;
    }
    .input_box {
      width: 640px;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
      border-radius: 35px;
      margin: 0 auto;
      margin-top: 44px;
      .input {
        background: transparent;
        height: 100%;
        border: none;
        outline: none;
        color: #ffffff;
        padding-left: 15px;
        width: calc(100% - 144px);
      }
      .btn {
        cursor: pointer;
        width: 144px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url('//cdn.hashland.com/images/extract_btn.png');
        background-size: 100% 100%;
        color: #fff;
      }
    }
    .meinvite{
      width: 100%;
      color: #ffffff;
      margin-top: 75px;
    }
    .meinvite_txt{
      width: 100%;
      color: #ffffff;
      line-height: 40px;
    }
    .center_box{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 44px;
      .box{
        position: relative;
        width: 618px;
        min-height: 359px;
        .center_img{
          width: 100%;
          object-fit: contain;
        }
        .positionbox{
          position: absolute;
          left: 50%;
          top: 30px;
          width: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateX(-50%);
          .top_box{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            // border: 1px solid red;
            .span1{
              color: #DBAE29;
            }
            .span2{
              color: #ffffff;
              font-weight: bold;
            }
          }
          .bottom_box{
            width: 100%;
            // border: 1px solid red;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;
            .one_line{
              display: flex;
              flex-direction: column;
              align-items: center;
              .span1{
                color: #DBAE29;
              }
              .span2{
                color: #ffffff;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .page_bottom {
      width: 100%;
      padding: 20px;
      background: linear-gradient(90deg, #021F3E 0%, #01142A 100%, #034088 100%);
      box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
      margin-top: 73px;
      border-radius: 6px;
      .embedded_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        .leftbox {
          display: flex;
          align-items: center;
          .img {
            width: 34px;
            object-fit: contain;
          }
          .span1 {
            color: #d8d8d8;
            margin-left: 15px;
          }
        }
        .boxs_reward{
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 23px;
          .onebox{
            width: 473px;
            height: 78px;
            background: #032C5B;
            border-radius: 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
            .span1{
              color: #00F0FF;
            }
            .btn_box{
              display: flex;
              align-items: center;
              .btn{
                width: 144px;
                height: 49px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-image: url("//cdn.hashland.com/images/extract_btn.png");
                background-size: 100% 100%;
                color: #fff;
                cursor: pointer;
                margin-left: 14px;
              }
            }
          }
        }
      }
    }
    .Ranking{
      width: 100%;
      color: #ffffff;
      margin-top: 63px;
    }
    .Ranking_txt{
      width: 100%;
      color: #ffffff;
      line-height: 40px;
    }
    .listbox{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 60px;
      .topline{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 30px;
        .onebox{
          flex: 1;
          color: #ffffff;
          .insertbox1{
            width: 100%;
            text-align: center;
          }
          .insertbox2{
            width: 100%;
            text-align: right;
          }
        }
        .title_onebox{
          min-width: 80px;
          color: #ffffff;
        }
      }
      .bottomline{
        width: 100%;
        display: flex;
        flex-direction: column;
        .boxs{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
          .onebox{
            flex: 1;
            color: #ffffff;
            .insertbox1{
              width: 100%;
              text-align: center;
            }
            .insertbox2{
              width: 100%;
              text-align: right;
            }
          }
          .title_onebox{
            min-width: 80px;
            color: #ffffff;
            .sort1_img{
              width: 27px;
              object-fit: contain;
            }
            .pad_left{
              padding-left: 10px;
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
  }
}
@media screen and (min-width: 1280px) {
  .invite_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
.invite_page {
  padding-top: 0.94rem;
  .title1_txt {
    color: #ffffff;
  }
  .content{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0.17rem;
    padding: 0.2rem;
    .inviteme{
      width: 100%;
      color: #ffffff;
    }
    .input_box {
      width: 100%;
      height: 0.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.5) inset, -2px 1px 22px 0px rgba(194, 190, 190, 0.52) inset;
      border-radius: 0.35rem;
      margin: 0 auto;
      margin-top: 0.37rem;
      .input {
        background: transparent;
        height: 100%;
        border: none;
        outline: none;
        color: #ffffff;
        padding-left: 0.1rem;
        width: calc(100% - 0.71rem);
      }
      .btn {
        width: 0.71rem;
        height: 0.24rem;
        background-image: url('//cdn.hashland.com/images/extract_btn.png');
        background-size: 100% 100%;
        color: #fff;
      }
    }
    .meinvite{
      width: 100%;
      color: #ffffff;
      margin-top: 0.37rem;
    }
    .meinvite_txt{
      width: 100%;
      color: #ffffff;
      line-height: 0.14rem;
      margin-top: 0.07rem;
    }
    .center_box{
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 0.37rem;
      padding: 0 0.16rem;
      .box{
        width: 100%;
        min-height: 1.7rem;
        .center_img{
          width: 100%;
          object-fit: contain;
        }
        .positionbox{
          position: absolute;
          left: 50%;
          top: 0.2rem;
          width: 3rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateX(-50%);
          .top_box{
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .span1{
              color: #DBAE29;
            }
            .span2{
              color: #ffffff;
              font-weight: bold;
            }
          }
          .bottom_box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 0.1rem;
            padding: 0 0.4rem;
            .one_line{
              display: flex;
              flex-direction: column;
              align-items: center;
              .span1{
                color: #DBAE29;
              }
              .span2{
                color: #ffffff;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
    .page_bottom {
      width: 100%;
      padding: 0.1rem;
      background: linear-gradient(90deg, #021F3E 0%, #01142A 100%, #034088 100%);
      box-shadow: -13px 10px 11px -2px rgba(2, 12, 23, 0.4), -2px -33px 101px 0px rgba(25, 47, 74, 0.5);
      margin-top: 0.3rem;
      border-radius: 0.06rem;
      .embedded_box {
        width: 100%;
        display: flex;
        flex-direction: column;
        .leftbox {
          display: flex;
          align-items: center;
          .img {
            width: 0.2rem;
            object-fit: contain;
          }
          .span1 {
            color: #d8d8d8;
            margin-left: 0.15rem;
          }
        }
        .boxs_reward{
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.2rem;
          .onebox{
            width: 100%;
            height: 0.39rem;
            background: #032C5B;
            border-radius: 0.06rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 0.2rem;
            .span1{
              color: #00F0FF;
            }
            .btn_box{
              display: flex;
              align-items: center;
              .btn{
                width: auto;
                padding: 0 0.1rem;
                height: 0.25rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background-image: url("//cdn.hashland.com/images/extract_btn.png");
                background-size: 100% 100%;
                color: #fff;
                cursor: pointer;
                margin-left: 0.1rem;
              }
            }
          }
        }
      }
    }
    .Ranking{
      width: 100%;
      color: #ffffff;
      margin-top: 0.34rem;
    }
    .Ranking_txt{
      width: 100%;
      color: #ffffff;
      line-height: 0.14rem;
    }
    .listbox{
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 0.15rem;
      .topline{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.1rem;
        .onebox{
          flex: 1;
          color: #ffffff;
          .insertbox1{
            width: 100%;
            text-align: center;
          }
          .insertbox2{
            width: 100%;
            text-align: right;
          }
        }
        .title_onebox{
          min-width: 0.4rem;
          color: #ffffff;
        }
      }
      .bottomline{
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 0.2rem;
        .boxs{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.2rem;
          .onebox{
            flex: 1;
            color: #ffffff;
            .insertbox1{
              width: 100%;
              text-align: center;
            }
            .insertbox2{
              width: 100%;
              text-align: right;
            }
          }
          .title_onebox{
            min-width: 0.5rem;
            color: #ffffff;
            .champion_box{
              display: flex;
              .sort1_img{
                width: 0.2rem;
                object-fit: contain;
              }
              .pad_left{
                padding-left: 0.03rem;
              }
            }
          }
        }
      }
    }
  }
}
}
</style>
