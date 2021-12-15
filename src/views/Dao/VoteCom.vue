<template>
  <div class="vote_page">
    <div class="add_title_link">
      <h1 class="h1 fontsize22">{{ $t("message.dao.txt6") }}</h1>
      <div class="add_contract_address" @click="btcClick">
        <span>{{ $t("message.dao.txt21") }}&nbsp;</span>
        <span class="span_hover">0x5461348662229e316fCa1880890946338100731B</span>
      </div>
      <!-- <img :src="`${$store.state.imgUrl}buy_hclp.png`" class="getlp_img"> -->
    </div>
    <div class="info_box">
      <div class="onebox" v-for="(item, index) in infoArr" :key="index">
        <div
          class="add_imgbox fontsize16_400"
          :class="{btc_num_color: index == 0,hc_num_color: index == 1,busd_num_color: index == 2}"
        >
          {{ $t(item.title) }}
          <div class="img_boxs">
            <img :src="`${$store.state.imgUrl}question.png`" class="imgs" @click="imgclick(item)" />
            <div class="img_box_hover" :class="{show_box_hover:item.isshowimg}">
              <div class="content_box fontsize12_400">
                {{ $t(item.desc) }}
              </div>
            </div>
          </div>
        </div>
        <p class="fontsize22" v-if="item.loading">
          <NewLoading></NewLoading>
        </p>
        <p
          class="fontsize22"
          :class="{
            btc_num_color: index == 0,
            hc_num_color: index == 1,
            busd_num_color:index == 2,
            personal_num_color: index == 3
          }"
          v-else
        >
          $ {{ item.num }}
        </p>
      </div>
    </div>
    <div class="add_title">
      <h1 class="h1 fontsize22">{{ $t("message.dao.txt7") }}</h1>
      <div class="left_content">
        <span class="span1 fontsize22">{{ $t("message.dao.txt12") }}</span>
        <div class="span2"></div>
        <div class="left_content_hover">
          <span class="span1 fontsize16" v-for="ele in seasonArr" :key="ele">{{$t("message.dao.txt12_1")}} {{ele}}</span>
        </div>
      </div>
    </div>
    <div class="personal_infobox">
      <div class="onebox" :class="{sum_box:index == 2}" v-for="(item, index) in personalInfoArr" :key="index">
        <p class="fontsize16_400" :class="{btc_num_color: index == 0,hc_num_color: index == 1,personal_num_color: index == 2}">{{ $t(item.title) }}</p>
        <p class="fontsize22" v-if="item.loading"><NewLoading></NewLoading></p>
        <p class="fontsize22" :class="{btc_num_color: index == 0,hc_num_color: index == 1,personal_num_color: index == 2}" v-else>$ {{ item.num }}</p>
        <button @click="personalClick(item)" class="btn fontsize20" :class="{btc_bgcolor: index == 0,hc_bgcolor: index == 1}" v-if="index != 2">
          {{ $t("message.dao.txt13") }}<BtnLoading :isloading="item.loading"></BtnLoading>
        </button>
      </div>
    </div>
    <!-- <div class="add_title">
      <h1 class="h1 fontsize22">{{ $t("message.dao.txt8") }}</h1>
      <div class="left_content">
        <span class="span1 fontsize22">{{ $t("message.dao.txt12") }}</span>
        <div class="span2"></div>
        <div class="left_content_hover">
          <span class="span1 fontsize16" v-for="ele in seasonArr" :key="ele">第{{ele}}期</span>
        </div>
      </div>
    </div> -->
    <!-- <div class="listbox">
      <div class="topline">
        <div class="onebox fontsize18">{{ $t("message.invite.txt11") }}</div>
        <div class="onebox">
          <div class="insertbox1 fontsize18">{{ $t("message.invite.txt12") }}</div>
        </div>
        <div class="onebox">
          <div class="insertbox2 fontsize18">{{ $t("message.dao.txt16") }}</div>
        </div>
        <div class="onebox">
          <div class="insertbox2 fontsize18">{{ $t("message.dao.txt17") }}</div>
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
            <div class="insertbox1 fontsize16">{{item.address}}</div>
          </div>
          <div class="onebox">
            <div class="insertbox2 fontsize16">{{item.btcnum}}</div>
          </div>
          <div class="onebox">
            <div class="insertbox2 fontsize16">{{item.hcnum}}</div>
          </div>
        </div>
        <NoData v-if="list.length == 0" :isshow="false"></NoData>
      </div>
    </div> -->
    <div class="positon_img_fixedbox" v-if="ishover" @click="closeimg"></div>
    <Proup :btntxt="btntxt" :word="word" :proupDis="proupDis" @besurefun="CloseFun" @closedis="CloseFun"></Proup>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { util,erc20,token } from 'hashland-sdk';
export default {
  data () {
    return {
      ishover:false,
      btntxt:'',// 弹窗页面的确认按钮
      word:'',//弹窗提示文字
      proupDis:false,// 弹窗展示消失变量
      infoArr: [
        { desc:'message.dao.txt18',title: "message.dao.txt9", num: 0, loading: true,isshowimg:false},
        { desc:'message.dao.txt18_1',title: "message.dao.txt9_2", num: 0, loading: true,isshowimg:false},
        // { desc:'message.dao.txt19',title: "message.dao.txt10", num: 0, loading: true,isshowimg:false },
        { desc:'message.dao.txt20',title: "message.dao.txt15", num: 0, loading: true,isshowimg:false },
        // { title: "message.dao.txt11", num: 0, loading: false }
      ],
      personalInfoArr: [
        { title: "message.dao.txt9_1", num: 0, loading: false },
        { title: "message.dao.txt10_1", num: 0, loading: false },
        { title: "message.dao.txt14", num: 0, loading: false },
      ],
      seasonArr:[1,2,3,4],
      list:[
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10},
        // {address:'0X020X020X02…0X020X020X02',btcnum:123,hcnum:10}
      ],
    }
  },
  computed: {
    ...mapGetters(["getIstrue", "getAccount","getCoinPrice"])
  },
  watch: {
    'getIstrue': {
      handler: function (newValue, oldValue) {

      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    btcClick(){
      window.location.href = 'https://bscscan.com/address/0x5461348662229e316fCa1880890946338100731B'
    },
    imgclick(item){
      this.ishover = true
      item.isshowimg = true
    },
    closeimg(){
      this.ishover = false
      this.infoArr.forEach(item => {
        item.isshowimg = false
      })
    },
    // 取消按钮(关闭弹窗)
    CloseFun(){
      this.proupDis = false
    },
    personalClick(item){
      console.log('item: ', item);
      if(item.loading)return
      if(item.num == 0){
        this.$common.selectLang('没有可提取余额','No Remaining Balance to Claim',this)
        return
      }
      item.loading = true
    },
    async connectGetInfo(){
      // 0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c
      erc20(token().BTC).balanceOf('0x5461348662229e316fCa1880890946338100731B').then(res => {
        // console.log('btc的余额res: ', res,util.formatEther(res));
        let btc_balance = this.$common.getBit(util.formatEther(res) * this.getCoinPrice.btc, 2)
        console.log('btc_balance: ', btc_balance);
        this.infoArr[0].num = this.$common.numFormat(btc_balance)
        this.infoArr[0].loading = false
      }).catch(() => {
        this.infoArr[0].loading = false
      })

      // erc20(token().HC).balanceOf('0x5461348662229e316fCa1880890946338100731B').then(res => {
      //   console.log('hc的余额res: ', res);
      //   let hc_balance = this.$common.getBit(util.formatEther(res) * this.getCoinPrice.hc, 2)
      //   console.log('hc_balance: ', hc_balance);
      //   this.infoArr[1].num = this.$common.numFormat(hc_balance)
      //   this.infoArr[1].loading = false
      // }).catch(() => {
      //   this.infoArr[1].loading = false
      // })

      erc20(token().BUSD).balanceOf('0x5461348662229e316fCa1880890946338100731B').then(res => {
        console.log('busd的余额res: ', res);
        this.infoArr[2].num = this.$common.numFormat(this.$common.getBit(util.formatEther(res), 2))
        this.infoArr[2].loading = false
      }).catch(() => {
        this.infoArr[2].loading = false
      })

      let hclp_balance = await erc20(token().HCLP).balanceOf('0x5461348662229e316fCa1880890946338100731B')
      let hclp_totalSupply = await erc20(token().HCLP).totalSupply()
      erc20(token().BUSD).balanceOf(token().HCLP).then(res => {
        let last_num = (hclp_balance / hclp_totalSupply) * ((res / 1e18) * 2)
        this.$common.checkNumber(last_num.toString(), res1 => {
          this.infoArr[1].num = res1
          this.infoArr[1].loading = false
        },4)
      }).catch(err => {
        this.infoArr[1].loading = false
      })
    }
  },
  mounted(){
    this.connectGetInfo()
  }
}
</script>

<style lang='scss' scoped>
.vote_page {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 33px;
  .add_title_link{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    .add_contract_address{
      width: 100%;
      display: flex;
      align-items: center;
      color: #fff;
      cursor: pointer;
      font-size: 16px;
      margin-top: 8px;
      .span_hover{
        color: #00E7F0;
        text-decoration: underline;
      }
    }
  }
  .h1 {
    color: #fff;
  }
  .add_title{
    width: 100%;
    display: flex;
    .left_content{
      position: relative;
      padding: 0 10px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 40px;
      .span1{
        color: #FFFFFF;
        margin-right: 10px;
        cursor: pointer;
      }
      .span2{
        border-width: 7px;
        border-color: #fff;
        border-bottom-width: 0;
        border-style: dashed;
        border-top-style: solid;
        border-left-color: transparent;
        border-right-color: transparent;
      }
      .left_content_hover{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
        width: 180px;
        display: none;
        flex-direction: column;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.9);
        box-shadow: -1px 14px 9px -9px rgba(24, 24, 24, 0.56);
        border-radius: 4px;
        padding: 10px 13px;
        margin-top:32px;
        line-height: 39px;
        .span1{
          color: #E2DADA;
          cursor: pointer;
        }
      }
    }
    .left_content:hover{
      .left_content_hover{
        display: flex;
        .span1:hover{
          color: #00E7F0;
        }
      }
    }
  }
  .info_box {
    width: 100%;
    padding: 0 143px;
    display: flex;
    align-items: center;
    margin-top: 36px;
    justify-content: space-between;
    margin-bottom: 64px;
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
      padding: 24px 0 25px;
      cursor: pointer;
      .add_imgbox{
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .img_boxs{
          display: flex;
          margin-left: 8px;
          cursor: pointer;
          .imgs{
            width: 14px;
            object-fit: contain;
          }
          .img_box_hover{
            display: none;
            position: absolute;
            top: 35px;
            left: 0;
            z-index: 2;
            width: 200px;
            // height: 70px;
            box-shadow: -1px 11px 10px 2px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
            padding: 1px;
            border-radius: 14px;
            background:linear-gradient(180deg, #8BE6FE 0%, rgba(139, 230, 254, 0) 100%);
            .content_box{
              width: 100%;
              // height: 100%;
              padding: 16px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              border-radius: 14px;
              background: #011730;
            }
          }
          .show_box_hover{
            display: flex;
          }
        }
      }
    }
    .onebox:hover {
      box-shadow: 10px 5px 10px 5px rgba(2, 18, 35, 0.68);
    }
  }
  .personal_infobox{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 36px;
    justify-content: space-between;
    padding: 0 143px;
    margin-bottom: 64px;
    .onebox {
      width: 234px;
      background: #021e3e;
      box-shadow: 0px 2px 13px 0px rgba(2, 18, 35, 0.68);
      border-radius: 4px;
      cursor: pointer;
      height: 138px;
      padding: 22px 0 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .btn{
        padding: 10px 15px;
        height: 27px;
        border-radius: 7px;
        border: none;
        cursor: pointer;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .sum_box{
      padding: 37px 0;
    }
    .onebox:hover {
      box-shadow: 10px 5px 10px 5px rgba(2, 18, 35, 0.68);
    }
  }
  // .listbox{
  //   width: 100%;
  //   display: flex;
  //   flex-direction: column;
  //   margin-top: 60px;
  //   .topline{
  //     width: 100%;
  //     display: flex;
  //     align-items: center;
  //     justify-content: space-between;
  //     margin-bottom: 30px;
  //     .onebox{
  //       flex: 1;
  //       color: #ffffff;
  //       .insertbox1{
  //         width: 100%;
  //         text-align: center;
  //       }
  //       .insertbox2{
  //         width: 100%;
  //         text-align: right;
  //       }
  //     }
  //   }
  //   .bottomline{
  //     width: 100%;
  //     display: flex;
  //     flex-direction: column;
  //     max-height: 500px;
  //     overflow-y: auto;
  //     .boxs{
  //       width: 100%;
  //       display: flex;
  //       align-items: center;
  //       justify-content: space-between;
  //       margin-bottom: 30px;
  //       .onebox{
  //         flex: 1;
  //         color: #ffffff;
  //         .insertbox1{
  //           width: 100%;
  //           text-align: center;
  //         }
  //         .insertbox2{
  //           width: 100%;
  //           text-align: right;
  //         }
  //         .sort1_img{
  //           width: 27px;
  //           object-fit: contain;
  //         }
  //         .pad_left{
  //           padding-left: 10px;
  //         }
  //       }
  //     }
  //   }
  // }
  .positon_img_fixedbox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.btc_color {
  color: rgba(25, 124, 140, 0.9) !important;
}
.hc_color {
  color: rgba(124, 22, 125, 0.9) !important;
}
.busd_color{
  color: rgba(180, 130, 25, 0.9) !important;
}
.personal_color {
  color: rgba(59, 29, 161, 0.9) !important;
}
.busd_num_color {
  color: #29cdda !important;
}
.btc_num_color {
  color: #29cdda !important;
}
.hc_num_color {
  color: #29cdda !important;
}
.personal_num_color {
  color: #29cdda !important;
}
.btc_bgcolor {
  background: #29cdda !important;
}
.hc_bgcolor {
  background: #29cdda !important;
}
@media screen and (max-width: 980px){
  .vote_page {
    width: 100%;
    padding: 0 0.2rem;
    display: flex;
    flex-direction: column;
    margin-top: 0.4rem;
    .add_title_link{
      .add_contract_address{
        width: 100%;
        display: flex;
        flex-direction: column;
        // align-items: center;
        align-items: flex-start;
        color: #fff;
        cursor: pointer;
        font-size: 0.12rem;
        margin-top: 0.1rem;
      }
    }
    .h1 {
      color: #fff;
    }
    .add_title{
      width: 100%;
      display: flex;
      .left_content{
        position: relative;
        padding: 0 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.1rem;
        .span1{
          color: #FFFFFF;
          margin-right: 0.1rem;
          cursor: pointer;
        }
        .span2{
          border-width: 0.06rem;
          border-color: #00E7F0;
          border-bottom-width: 0;
          border-style: dashed;
          border-top-style: solid;
          border-left-color: transparent;
          border-right-color: transparent;
        }
        .left_content_hover{
          position: absolute;
          top: 0;
          left: 0;
          z-index: 9;
          width: 1.71rem;
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
          .span1{
            color: #E2DADA;
            cursor: pointer;
            margin-right: 0;
          }
        }
      }
      .left_content:hover{
        .left_content_hover{
          display: flex;
        }
      }
    }
    .info_box {
      width: 100%;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 0.2rem;
      justify-content: space-between;
      margin-bottom: 0;
      .onebox {
        width: 1.49rem;
        height: 0.7rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        background: #021e3e;
        // box-shadow: 0px 2px 13px 0px rgba(2, 18, 35, 0.68);
        border-radius: 0.04rem;
        padding: 0.15rem 0 0.12rem;
        cursor: pointer;
        margin-bottom: 0.24rem;
        .add_imgbox{
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .img_boxs{
            display: flex;
            margin-left: 8px;
            cursor: pointer;
            .imgs{
              width: 18px;
              object-fit: contain;
            }
            .img_box_hover{
              display: none;
              position: absolute;
              top: 35px;
              left: 0;
              z-index: 2;
              width: 160px;
              // height: 70px;
              box-shadow: -1px 11px 10px 2px rgba(0, 0, 1, 0.38), -2px 1px 34px 0px rgba(255, 255, 255, 0.22) inset;
              padding: 1px;
              border-radius: 14px;
              background:linear-gradient(180deg, #8BE6FE 0%, rgba(139, 230, 254, 0) 100%);
              .content_box{
                width: 100%;
                // height: 100%;
                padding: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                border-radius: 14px;
                background: #011730;
              }
            }
            .show_box_hover{
              display: flex;
            }
          }
        }
      }
      // .onebox:hover {
      //   box-shadow: 10px 5px 10px 5px rgba(2, 18, 35, 0.68);
      // }
    }
    .personal_infobox{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top: 0.2rem;
      justify-content: space-between;
      padding: 0;
      margin-bottom: 0;
      .onebox {
        width: 1.49rem;
        height: 0.99rem;
        background: #021e3e;
        // box-shadow: 0px 2px 13px 0px rgba(2, 18, 35, 0.68);
        border-radius: 4px;
        cursor: pointer;
        padding: 0.15rem 0 0.12rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.24rem;
        .btn{
          padding:0.1rem;
          height: 0.27rem;
          border-radius: 0.07rem;
          border: none;
          cursor: pointer;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .sum_box{
        padding: 0.24rem 0;
      }
      // .onebox:hover {
      //   box-shadow: 10px 5px 10px 5px rgba(2, 18, 35, 0.68);
      // }
    }
    // .listbox{
    //   width: 100%;
    //   display: flex;
    //   flex-direction: column;
    //   margin-top: 60px;
    //   .topline{
    //     width: 100%;
    //     display: flex;
    //     align-items: center;
    //     justify-content: space-between;
    //     margin-bottom: 30px;
    //     .onebox{
    //       flex: 1;
    //       color: #ffffff;
    //       .insertbox1{
    //         width: 100%;
    //         text-align: center;
    //       }
    //       .insertbox2{
    //         width: 100%;
    //         text-align: right;
    //       }
    //     }
    //   }
    //   .bottomline{
    //     width: 100%;
    //     display: flex;
    //     flex-direction: column;
    //     max-height: 500px;
    //     overflow-y: auto;
    //     .boxs{
    //       width: 100%;
    //       display: flex;
    //       align-items: center;
    //       justify-content: space-between;
    //       margin-bottom: 30px;
    //       .onebox{
    //         flex: 1;
    //         color: #ffffff;
    //         .insertbox1{
    //           width: 100%;
    //           text-align: center;
    //         }
    //         .insertbox2{
    //           width: 100%;
    //           text-align: right;
    //         }
    //         .sort1_img{
    //           width: 27px;
    //           object-fit: contain;
    //         }
    //         .pad_left{
    //           padding-left: 10px;
    //         }
    //       }
    //     }
    //   }
    // }
  }
}
</style>
