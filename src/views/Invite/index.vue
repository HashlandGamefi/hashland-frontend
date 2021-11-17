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
        />
        <div v-if="!dis" class="btn fontsize16" @click="besure">
          {{ $t("message.invite.txt7") }}
          <BtnLoading :isloading="btnloading"></BtnLoading>
        </div>
      </div>
      <span class="meinvite fontsize22">{{ $t("message.invite.txt2") }}</span>
      <span class="meinvite_txt fontsize12_400">{{ $t("message.invite.txt3") }}</span>
      <div class="center_box">
        <div class="box">
          <img :src="`${$store.state.imgUrl}inviteimg1.png`" class="center_img" />
          <div class="positionbox">
            <span class="span1 fontsize32">11.5</span>
            <span class="span2 fontsize12">{{ $t("message.invite.txt4") }}</span>
          </div>
        </div>
        <div class="reward_box">
          <div class="leftbox">
            <img :src="`${$store.state.imgUrl}hclogo.png`" class="hclogo_img" />
            <span class="span1 fontsize22">HC reward</span>
          </div>
          <span class="span2 fontsize22">{{rewards}}</span>
        </div>
        <div class="btnbox fontsize16" @click="extractClick">
          {{ $t("message.invite.txt8") }}
          <BtnLoading :isloading="extract_btnloading"></BtnLoading>
        </div>
      </div>
      <span class="Ranking fontsize22">{{ $t("message.invite.txt9") }}</span>
      <span class="Ranking_txt fontsize12_400">{{ $t("message.invite.txt10") }}</span>
      <div class="listbox">
        <div class="topline">
          <div class="onebox fontsize12">{{ $t("message.invite.txt11") }}</div>
          <div class="onebox">
            <div class="insertbox1 fontsize12">{{ $t("message.invite.txt12") }}</div>
          </div>
          <div class="onebox">
            <div class="insertbox2 fontsize12">{{ $t("message.invite.txt13") }}</div>
          </div>
        </div>
        <div class="bottomline">
          <div class="boxs" v-for="(item,index) in list" :key="index">
            <div class="onebox">
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
              <div class="insertbox1 fontsize12">{{item}}</div>
            </div>
            <div class="onebox">
              <div class="insertbox2 fontsize12">1</div>
            </div>
          </div>
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
import { invitePool,getSigner } from "hashland-sdk";
export default {
  data () {
    return {
      extract_btnloading:false,//提取奖励按钮
      rewards:0,// 领主可提取奖励
      btnloading:false,// 按钮loading
      btntxt: "", // 弹窗页面的确认按钮
      word: "", //弹窗提示文字
      proupDis: false, // 弹窗展示消失变量
      list:[
        // {address:'0X020X020X02…0X020X020X02',num:123},
        // {address:'0X020X020X02…0X020X020X02',num:123},
        // {address:'0X020X020X02…0X020X020X02',num:123},
        // {address:'0X020X020X02…0X020X020X02',num:123},
        // {address:'0X020X020X02…0X020X020X02',num:123},
        // {address:'0X020X020X02…0X020X020X02',num:123},
        // {address:'0X020X020X02…0X020X020X02',num:123},
        // {address:'0X020X020X02…0X020X020X02',num:123},
        // {address:'0X020X020X02…0X020X020X02',num:123},
        // {address:'0X020X020X02…0X020X020X02',num:123}
      ],
      peopleAddress: "",
      redonlyDis: false, //input输入框  是否只读
      dis: false, // 确认按钮 是否禁用
    }
  },
  watch: {
    getIstrue: {
      handler (newValue) {
        console.log('邀请页面newValue: ', newValue)
        this.sdkInfo()
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount"]),
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
        this.$common.selectLang("不能绑定自己", "NO", this)
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
    // 可提取奖励
    getRewardsFun(){
      invitePool().getTokenRewards(this.getAccount).then(res => {
        console.log('获取某领主可提取的HC数量res: ', this.$common.useBigNumberDiv(res.toString()));
        this.rewards = this.$common.useBigNumberDiv(res.toString())
      }).catch(err => {
        console.log('获取某领主可提取的HC数量err: ', err);
      })
    },
    // 获取列表
    getUserList(){
      invitePool().getInviterUsersBySize(this.getAccount,0,21).then(res => {
        console.log('获取某领主的基于指针(从0开始)和数量的被邀请人的地址数组和最后一个数据的指针: ',res);
        res[0].map(item => {
          return {
            item:this.$common.getSubStr(item,5)
          }
        })
        console.log('是法人股东会官方',res[0]);
        this.list = res[0]
      }).catch(err => {
        console.log('获取某领主的基于指针err: ', err);
      })
    }
  },
  mounted(){
    // if(document.body.clientWidth <= 980){
    //   this.list.forEach(item => {
    //     item.address = this.$common.getSubStr(item.address,4)
    //   })
    // }else{
    //   this.list.forEach(item => {
    //     item.address = this.$common.getSubStr(item.address,10)
    //   })
    // }
  }
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
          top: 44px;
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateX(-50%);
          .span1{
            color: #DBAE29;
          }
          .span2{
            color: #ffffff;
            font-weight: bold;
          }
        }
      }
      .reward_box{
        width: 618px;
        padding: 0 76px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .leftbox{
          display: flex;
          align-items: center;
          .hclogo_img{
            width: 34px;
            object-fit: contain;
          }
          .span1{
            color: #ffffff;
            margin-left: 7px;
          }
        }
        .span2{
          color: #00F0FF;
        }
      }
      .btnbox{
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
        margin-top: 37px;
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
      }
      .bottomline{
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: 500px;
        overflow-y: auto;
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
            .sort1_img{
              width: 27px;
              object-fit: contain;
            }
            .pad_left{
              padding-left: 10px;
            }
          }
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
          display: flex;
          flex-direction: column;
          align-items: center;
          transform: translateX(-50%);
          .span1{
            color: #DBAE29;
          }
          .span2{
            color: #ffffff;
            font-weight: bold;
          }
        }
      }
      .reward_box{
        width: 100%;
        padding:0;
        margin-top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .leftbox{
          display: flex;
          align-items: center;
          .hclogo_img{
            width: 0.18rem;
            object-fit: contain;
          }
          .span1{
            color: #ffffff;
            margin-left: 0.07rem;
          }
        }
        .span2{
          color: #00F0FF;
        }
      }
      .btnbox{
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
        margin-top: 0.35rem;
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
      }
      .bottomline{
        width: 100%;
        display: flex;
        flex-direction: column;
        max-height: 5rem;
        overflow-y: auto;
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
            .champion_box{
              display: flex;
              .sort1_img{
                width: 0.17rem;
                object-fit: contain;
              }
            }
            .pad_left{
              display: flex;
              padding-left: 0.03rem;
            }
          }
        }
      }
    }
  }
}
}
</style>
