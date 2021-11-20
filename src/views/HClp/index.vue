<template>
  <div class="hclp_page">
    <span class="title1_txt fontsize32">{{ $t("message.hclp.txt1") }}</span>
    <span class="title1_txt title2_txt fontsize16_100">{{ $t("message.hclp.txt2") }}</span>
    <div class="content">
      <div class="outbox">
        <div class="boxs">
          <div class="title_box">
            <div class="img"></div>
            <span class="span1 fontsize22">HC-BUSD  LP</span>
          </div>
          <div class="oneline">
            <span class="left fontsize16">年化</span>
            <span class="right fontsize16">120.89%</span>
          </div>
          <div class="oneline">
            <span class="left fontsize16">流通性</span>
            <span class="right fontsize16">$XXX</span>
          </div>
          <div class="oneline">
            <span class="left fontsize16">产出</span>
            <span class="right fontsize16">HC</span>
          </div>
        </div>
        <div class="bottom_box">
          <div class="insetbox">
            <div class="top_box">
              <div class="title_txt">
                <span class="span1 fontsize12_400">我的质押</span>
                <div class="get_hclp">
                  <span class="span1 fontsize12_400">Get HC-BUSD LP</span>
                  <span class="span2"></span>
                  <!-- <img src="" alt=""> -->
                </div>
              </div>
              <div class="_box">
                <div class="left_span fontsize16">{{userPledge}}</div>
                <div class="right_btn">
                  <div class="btn1 btn fontsize16" @click="pledgeClick">
                    质押
                  </div>
                  <div class="btn2 btn fontsize16"  @click="removeClick">
                    解除质押
                  </div>
                </div>
              </div>
            </div>
            <div class="top_box">
              <div class="title_txt">
                <span class="span1 fontsize12_400">我的产出</span>
              </div>
              <div class="_box">
                <div class="left_span_img">
                  <img :src="`${$store.state.imgUrl}hclogo.png`" class="img_hc" />
                  <span class="span1 fontsize16">{{extactNUm}}</span>
                </div>
                <div class="right_btn">
                  <div class="btn1 btn fontsize16"  @click="extractClick">
                    提取
                    <BtnLoading :isloading="extractDis"></BtnLoading>
                  </div>
                </div>
              </div>
              <div class="add_produce fontsize12_400">(累计产出：{{userAddPledge}})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="danger_proup" v-if="isdanger">
      <div class="outbox_danger">
        <div class="danger_wallet_box" @click.stop>
          <span class="txt1 fontsize18" v-if="ispledge">质押</span>
          <span class="txt1 fontsize18" v-else>解除质押</span>
          <span class="txt2 fontsize16_400">HC-BUSD LP</span>
          <div class="inputbox">
            <div class="userBalance fontsize12">账户余额:{{userbalance}}</div>
            <div class="outbox_input">
              <input type="text fontsize14" placeholder='请输入数量' v-model="dangerTxtModel" class="input" oninput="value=value.replace(/[^\d.]/g, '').replace(/\.{2,}/g, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.').replace(/^(\-)*(\d+)\.(\d\d\d\d\d\d\d\d).*$/, '$1$2.$3').replace(/^\./g, '')" />
              <div class="btn" @click="maxClick">MAX</div>
            </div>
          </div>
          <div class="btn_box">
            <div class="txt3 fontsize18" @click.stop="sureDangerClick" v-if="hclpApprove">
              Confirm<BtnLoading :isloading="synthesisDis"></BtnLoading>
            </div>
            <div class="txt3 fontsize18" @click.stop="autionClick" v-else>
              授权<BtnLoading :isloading="synthesisDis"></BtnLoading>
            </div>
            <div class="buy_hclp">
              <span class="span1 fontsize16">Get HC-BUSD LP</span>
              <div style="width:10px;height:10px;background:red"></div>
            </div>
          </div>
        </div>
        <img :src="`${$store.state.imgUrl}proupclose.png`" class="danger_close" @click.stop="dangerClick"/>
      </div>
    </div>
    <Proup :btntxt="btntxt" :word="word" @besurefun="CloseFun" :proupDis="proupDis" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { hclpPool, erc20, token, getSigner, contract } from 'hashland-sdk';
export default {
  data () {
    return {
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      dangerTxtModel:'',
      ispledge:true,// 弹窗显示质押还是解除质押  默认质押
      isdanger:false,//转账提示框
      userPledge:0,//用户质押hclp量
      userAddPledge:0,//累计产量
      extactNUm:0,//可提取
      userbalance:0,// 用户hclp余额
      userbalance_one:0,// 用户hclp余额 计算使用
      userPledge_one:0,// 用户质押hclp余额 计算使用
      extractDis:false,// 提取按钮loading
      synthesisDis:false,//质押弹窗loading
      hclpApprove:false,// hclp是否授权
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  watch:{
    'getIstrue':{
      handler: function (newValue) {
        console.log('hclp页面newValue: ', newValue);
        if(newValue){
          this.getSDKInfo()
          this.isApprove()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods:{
    maxClick(){
      if(this.ispledge){
        this.dangerTxtModel = this.userbalance_one
      }else{
        this.dangerTxtModel = this.userPledge_one
      }
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    // 弹窗确认质押
    sureDangerClick(){
      if(this.synthesisDis)return
      if(!this.dangerTxtModel)return
      this.synthesisDis = true
      if(this.ispledge){
        hclpPool().connect(getSigner()).deposit(this.$common.convertNormalToBigNumber(this.dangerTxtModel,18)).then(async res => {
          console.log('用户质押HCLP---res: ', res);
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.synthesisDis = false
            this.isdanger = false
            this.getSDKInfo()
          }else{
            this.synthesisDis = false
            this.isdanger = false
          }
        }).catch(err => {
          console.log('用户质押HCLP----err: ', err);
          this.synthesisDis = false
          this.isdanger = false
        })
      }else{
        hclpPool().connect(getSigner()).withdraw(this.$common.convertNormalToBigNumber(this.dangerTxtModel,18)).then(async res => {
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.synthesisDis = false
            this.isdanger = false
            this.getSDKInfo()
          }else{
            this.synthesisDis = false
            this.isdanger = false
          }
        }).catch(() => {
          this.synthesisDis = false
          this.isdanger = false
        })
      }
    },
    // 关闭质押弹窗
    dangerClick(){
      this.isdanger = false
    },
    // 质押
    pledgeClick(){
      console.log("质押")
      this.dangerTxtModel = ''
      erc20(token().HCLP).balanceOf(this.getAccount).then(res => {
        console.log('用户hclp余额res: ', res.toString());
        // this.$common.checkNumber((res / 1e18).toString(), res1 => {
        //   this.userbalance = res1
        // })
        // this.userbalance_one = res / 1e18

        let nums = this.$common.useBigNumberDiv(res.toString())
        console.log('nums: ', nums);
        if (res / 1e18 < 1e-8) {
          this.userbalance = 0
          this.userbalance_one = 0
        }else{
          this.userbalance = this.$common.numFormat(parseFloat(nums))
          this.userbalance_one = parseFloat(nums)
        }
      }).catch(err => {
        console.log('用户hclp余额err: ', err);
      })
      this.isdanger = true
      this.ispledge = true
    },
    // 解除
    removeClick(){
      console.log("解除",this.userPledge)
      this.dangerTxtModel = ''
      this.userbalance = this.userPledge
      this.isdanger = true
      this.ispledge = false
    },
    // 提取
    extractClick(){
      if(this.extractDis)return
      if(this.extactNUm){
        this.extractDis = true
        hclpPool().connect(getSigner()).harvestToken().then(async res => {
          console.log('提取成功res: ', res)
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.extractDis = false
            this.$common.selectLang('提取成功','Claim success',this)
            this.getSDKInfo()
          }else{
            this.extractDis = false
          }
        }).catch(() => {
            this.extractDis = false
        })
      }else{
        this.$common.selectLang('没有奖励需要提取','No claimable rewards',this)
      }
    },
    // 链接sdk获取信息
    getSDKInfo(){
      hclpPool().userStake(this.getAccount).then(res => {
        console.log('获取某用户在池子里的HCLP质押量res: ', res,res / 1e18);
        // this.userPledge = res.toNumber() / 1e18
        // this.$common.checkNumber((res / 1e18).toString(), res1 => {
        //   this.userPledge = res1
        // })
        if ((res.toString() / 1e18) < 1e-8) {
          this.userPledge = 0
          this.userPledge_one = 0
        }else{
          this.userPledge = this.$common.getBit(this.$common.editE(res.toString() / 1e18),8)
          this.userPledge_one = this.$common.getBit(this.$common.editE(res.toString() / 1e18),8)
        }
      })
      hclpPool().getTokenTotalRewards(this.getAccount).then(res => {
        // console.log('获取某用户的HC累计产量: ', res);
        if ((res.toString() / 1e18) < 1e-8) {
          this.userAddPledge = 0
        }else{
          this.userAddPledge = this.$common.getBit(this.$common.editE(res.toString() / 1e18),8)
        }
      })
      hclpPool().getTokenRewards(this.getAccount).then(res => {
        // console.log('获取某用户可提取的HC数量: ', res);
        if ((res.toString() / 1e18) < 1e-8) {
          this.extactNUm = 0
        }else{
          this.extactNUm = this.$common.getBit(this.$common.editE(res.toString() / 1e18),8)
        }
      })
    },
    isApprove(){
      erc20(token().HCLP).allowance(this.getAccount,contract().HCLPPool).then(res => {
        // console.log('是否授权hclp--res: ', res);
        if(res.toString() > 0){
          this.hclpApprove = true
        }else{
          this.hclpApprove = false
        }
      })
    },
    // 去授权
    autionClick(){
      if(this.synthesisDis)return
      this.synthesisDis = true
      const TOKEN_amount = '50000000000000000000000000000000000000000000000000000000000';
      erc20(token().HCLP).connect(getSigner()).approve(contract().HCLPPool,TOKEN_amount).then(async res => {
        const etReceipt = await res.wait();
        if(etReceipt.status == 1){
          this.hclpApprove = true
          this.synthesisDis = false
        }else{
          this.hclpApprove = false
          this.synthesisDis = false
        }
      }).catch(() => {
        this.synthesisDis = false
      })
    },
  }
}
</script>

<style lang='scss' scoped>
.hclp_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 126px;
  .title1_txt {
    color: #ffffff;
  }
  .title2_txt {
    margin-top: 10px;
  }
  .content{
    margin-top: 74px;
    width: 580px;
    box-shadow: -5px 10px 10px 1px rgba(0, 0, 1, 0.38), -2px 1px 1px 0px rgba(255, 255, 255, 0.22) inset;
    padding: 1px;
    border-radius: 14px;
    background:linear-gradient(180deg, #8BE6FE 0%, rgba(139, 230, 254, 0) 100%);
    .outbox{
      width: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 14px;
      background:#011A31;
      .boxs{
        width: 100%;
        padding: 28px 30px 0 35px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .title_box{
          width: 100%;
          display: flex;
          align-items: center;
          margin-bottom: 47px;
          .img{
            width: 49px;
            height: 49px;
            background: red;
          }
          .span1{
            color: #ffffff;
            margin-left: 10px;
          }
        }
        .oneline{
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 35px;
          .left{
            color: #ffffff;
          }
          .right{
            color: #ffffff;
          }
        }
      }
      .bottom_box{
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 34px 27px 12px;
        .insetbox{
          width: 100%;
          border-radius: 31px;
          padding: 17px 21px 0 23px;
          box-shadow: -6px 1px 13px 0px #04112E;
          background: linear-gradient(90deg, rgba(4, 34, 73, 0.44) 0%, rgba(4, 35, 76, 0.8) 100%);
          .top_box{
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 50px;
            .title_txt{
              width: 100%;
              display:flex;
              align-items: center;
              justify-content: space-between;
              .span1{
                color: #ffffff;
              }
              .get_hclp{
                display: flex;
                align-items: center;
                .span1{
                  color: #D79C00;
                }
                .span2{
                  width: 10px;
                  height: 10px;
                  background: red;
                  margin-left: 8px;
                }
              }
            }
            ._box{
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 25px;
              .left_span{
                color: #ffffff;
              }
              .left_span_img{
                display: flex;
                align-items: center;
                .img_hc{
                  width: 25px;
                  object-fit: contain;
                }
                .span1{
                  color: #ffffff;
                  margin-left: 8px;
                }
              }
              .right_btn{
                display: flex;
                align-items: center;
                .btn{
                  width: 97px;
                  height: 33px;
                  background-size: 100% 100%;
                  background-repeat: no-repeat;
                  color: #FFFFFF;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .btn1{
                  background-image: url("//cdn.hashland.com/images/nft_btn2.png");
                }
                .btn2{
                  background-image: url("//cdn.hashland.com/images/lock.png");
                  margin-left: 15px;
                }
              }
            }
            .add_produce{
              width: 100%;
              color: #A6A2A2;
              margin-top: 17px;
            }
          }
        }
      }
    }
  }
  .danger_proup {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 99999999;
    backdrop-filter: blur(6px);
    display: flex;
    justify-content: center;
    align-items: center;
    .outbox_danger{
      position: relative;
      width: 580px;
      // height: 574px;
      box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
      padding: 1px;
      border-radius: 14px;
      background:linear-gradient(180deg, #8BE6FE 0%, rgba(139, 230, 254, 0) 100%);
      .danger_wallet_box {
        width: 100%;
        // height: 100%;
        padding: 38px 110px 85px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border-radius: 14px;
        background:#011A31;
        .txt1 {
          width: 100%;
          text-align: center;
          font-style: normal;
          color: #ffffff;
        }
        .txt2 {
          margin-top: 15px;
          color: rgba(255, 255, 255, 0.8);
        }
        .inputbox {
          width: 100%;
          display: flex;
          flex-direction: column;
          margin-top: 100px;
          .userBalance{
            width: 100%;
            text-align: right;
            color: #ffffff;
            margin-bottom: 20px;
          }
          .outbox_input{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-radius: 14px;
            box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
            .input {
              width: 80%;
              padding:0 15px;
              height: 37px;
              border: none;
              outline: none;
              font-style: normal;
              color: #ffffff;
              border-radius: 14px;
              background: transparent;
            }
            .btn{
              width: 80px;
              height: 37px;
              text-align: center;
              line-height: 37px;
              border-radius: 14px;
              color: #ffffff;
              background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
              background-size: 100% 100%;
              background-repeat: no-repeat;
              cursor: pointer;
            }
          }
        }
        .btn_box{
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 60px;
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
            color: #ffffff;
            cursor: pointer;
          }
          .buy_hclp{
            display: flex;
            align-items: center;
            margin-top: 15px;
            .span1{
              color: #D79C00;
              margin-right: 5px;
            }
          }
        }
      }
      .danger_close{
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
@media screen and (min-width: 1280px) {
  .hclp_page {
    max-width: 1162px;
    margin: 0 auto;
  }
}
@media screen and (max-width: 980px) {
  .hclp_page {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.37rem;
    padding-top: 0.94rem;
    .title1_txt {
      color: #ffffff;
    }
    .title2_txt {
      color: #ffffff;
    }
    .content{
      margin-top: 0.33rem;
      width: 100%;
      box-shadow: -5px 10px 10px 1px rgba(0, 0, 1, 0.38), -2px 1px 1px 0px rgba(255, 255, 255, 0.22) inset;
      padding: 1px;
      border-radius: 0.14rem;
      background:linear-gradient(180deg, #8BE6FE 0%, rgba(139, 230, 254, 0) 100%);
      .outbox{
        width: 100%;
        display: flex;
        flex-direction: column;
        border-radius: 0.14rem;
        background:#011A31;
        .boxs{
          width: 100%;
          padding: 0.16rem 0.16rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          .title_box{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.4rem;
            .img{
              width: 0.49rem;
              height: 0.49rem;
              background: red;
            }
            .span1{
              color: #ffffff;
              margin-left: 0;
            }
          }
          .oneline{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.35rem;
            .left{
              color: #ffffff;
            }
            .right{
              color: #ffffff;
            }
          }
        }
        .bottom_box{
          width: 100%;
          display: flex;
          flex-direction: column;
          padding: 0 0.08rem 0.33rem 0.08rem;
          .insetbox{
            width: 100%;
            border-radius: 31px;
            padding: 0.19rem 0.09rem 0 0.09rem;
            box-shadow: -6px 1px 13px 0px #04112E;
            background: linear-gradient(90deg, rgba(4, 34, 73, 0.44) 0%, rgba(4, 35, 76, 0.8) 100%);
            .top_box{
              width: 100%;
              display: flex;
              flex-direction: column;
              margin-bottom: 0.35rem;
              .title_txt{
                width: 100%;
                display:flex;
                align-items: center;
                justify-content: space-between;
                .span1{
                  color: #ffffff;
                }
                .get_hclp{
                  display: flex;
                  align-items: center;
                  .span1{
                    color: #D79C00;
                  }
                  .span2{
                    width: 0.1rem;
                    height: 0.1rem;
                    background: red;
                    margin-left: 8px;
                  }
                }
              }
              ._box{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 0.2rem;
                .left_span{
                  color: #ffffff;
                }
                .left_span_img{
                  display: flex;
                  align-items: center;
                  .img_hc{
                    width: 0.25rem;
                    object-fit: contain;
                  }
                  .span1{
                    color: #ffffff;
                    margin-left: 0.08rem;
                  }
                }
                .right_btn{
                  display: flex;
                  align-items: center;
                  .btn{
                    width: 97px;
                    height: 33px;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    color: #FFFFFF;
                    cursor: pointer;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  }
                  .btn1{
                    background-image: url("//cdn.hashland.com/images/nft_btn2.png");
                  }
                  .btn2{
                    background-image: url("//cdn.hashland.com/images/lock.png");
                    margin-left: 15px;
                  }
                }
              }
              .add_produce{
                width: 100%;
                color: #A6A2A2;
                margin-top: 17px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
