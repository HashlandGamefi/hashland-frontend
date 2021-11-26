<template>
  <div class="btn_page">
    <div class="connect_box fontsize18" v-if="!getIstrue">Connect</div>
    <div class="connect_box fontsize18" v-else-if="!isapprove" @click="sonapprove">{{$t("message.approve")}}<BtnLoading :isloading="approveloading"></BtnLoading></div>
    <div class="connect_box fontsize18" v-else @click="dosomething">{{word}}<BtnLoading :isloading="isloading"></BtnLoading></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { hc, hn, erc20, token, getSigner  } from 'hashland-sdk';
export default {
  props: {
    word: {
      type: String,
      default: ''
    },
    isloading:{
      type: Boolean,
      default: false // 授权成功以后的操作按钮loading
    },
    // approveloading:{
    //   type: Boolean,
    //   default: false // 授权成功以后的操作按钮loading
    // },
  },
  data(){
    return {
      isapprove:false,// 是否授权
      approveloading:false, // 授权按钮loading
    }
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  methods:{
    // 判断是否授权
    isApproveFun(type, contractAdrdess) {
      if (type == 'hn') {
        hn().isApprovedForAll(this.getAccount, contractAdrdess).then(res => {
          console.log('子组件方法--hn是否授权res: ', res);
          if (res) {
            this.isapprove = true
          } else {
            this.isapprove = false
          }
        }).catch(err => {
          console.log('子组件方法--hn是否授权err: ', err);
          this.isapprove = false
        })
      } else if(type == 'hc') {
        hc().allowance(this.getAccount, contractAdrdess).then(res => {
          console.log('子组件方法--hc是否授权res: ', res);
          if (res.toString() > 0) {
            this.isapprove = true;
          } else {
            this.isapprove = false;
          }
        }).catch(err => {
          console.log('子组件方法--hc是否授权err: ', err);
          this.isapprove = false
        })
      }else if(type == 'busd'){
        erc20(token().BUSD).allowance(this.getAccount,contractAdrdess).then(res => {
          console.log('子组件方法--busd是否授权res: ', res);
          if (res.toString() > 0) {
            this.isapprove = true;
          } else {
            this.isapprove = false;
          }
        }).catch(err => {
          console.log('子组件方法--hc是否授权err: ', err);
          this.isapprove = false
        })
      }
    },
    // 去授权
    goApproveFun(type, contractAdrdess) {
      if(this.approveloading)return
      this.approveloading = true
      if (type == 'hn') {
        hn().connect(getSigner()).setApprovalForAll(contractAdrdess, true).then(async res => {
          console.log('子组件方法--hn去授权res: ', res);
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.isapprove = true
            this.approveloading = false
          }else{
            this.isapprove = false
            this.approveloading = false
          }
        }).catch(err => {
          console.log('子组件方法--hn去授权err: ', err);
          this.approveloading = false
        })
      }else if(type == 'hc') {
        const TOKEN_amount = "50000000000000000000000000000000000000000000000000000000000";
        hc().connect(getSigner()).approve(contractAdrdess, TOKEN_amount).then(async res => {
          console.log('子组件方法--hc去授权res: ', res);
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.isapprove = true
            this.approveloading = false
          }else{
            this.isapprove = false
            this.approveloading = false
          }
        }).catch(err => {
          console.log('子组件方法--hc去授权err: ', err);
          this.approveloading = false
        })
      }else if(type == 'busd'){
        const TOKEN_amount = '50000000000000000000000000000000000000000000000000000000000';
        erc20(token().BUSD).connect(getSigner()).approve(contractAdrdess,TOKEN_amount).then(async res => {
          console.log('子组件方法--busd去授权res: ', res);
          const etReceipt = await res.wait();
          if(etReceipt.status == 1){
            this.isapprove = true
            this.approveloading = false
          }else{
            this.isapprove = false
            this.approveloading = false
          }
        }).catch(err => {
          console.log('子组件方法--busd去授权err: ', err);
          this.approveloading = false
        })
      }
    },
    // 授权完按钮的操作
    dosomething(){
      this.$emit('dosomething')
    },
    // 授权按钮的操作
    sonapprove(){
      this.$emit('sonapprove')
    }
  }
}
</script>
<style lang="scss" scoped>
.btn_page{
  width: 100%;
  height: 100%;
  .connect_box {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
}
@media screen and (max-width: 980px){
  .btn_page{
    width: 100%;
    height: 100%;
    .connect_box {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
