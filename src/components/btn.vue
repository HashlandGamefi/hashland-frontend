<template>
  <div class="btn_page">
    <div class="connect_box" v-if="!getIstrue">Connect</div>
    <div class="connect_box" v-else-if="!isapprove" @click="sonapprove">{{$t("message.approve")}}<BtnLoading :isloading="approveloading"></BtnLoading></div>
    <div class="connect_box" v-else @click="dosomething">{{word}}<BtnLoading :isloading="isloading"></BtnLoading></div>
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
    approveloading:{
      type: Boolean,
      default: false // 授权操作按钮loading
    },
    isapprove:{
      type: Boolean,
      default: false //是否授权
    },
  },
  computed: {
    ...mapGetters(["getIstrue","getAccount"])
  },
  methods:{
    // 判断是否授权
    isApproveFun(type, contractAdrdess,orther = '') {
      // console.log('当前币种%s是否授权: ', type);
      if (type == 'hn') {
        return new Promise(resolve => {
          hn().isApprovedForAll(this.getAccount, contractAdrdess).then(res => {
            // console.log('子组件方法--hn是否授权res: ', res);
            if (res) {
              resolve(true)
            } else {
              resolve(false)
            }
          }).catch(err => {
            // console.log('子组件方法--hn是否授权err: ', err);
            resolve(false)
          })
        })
      } else if(type == 'hc') {
        return new Promise(resolve => {
          hc().allowance(this.getAccount, contractAdrdess).then(res => {
            // console.log('子组件方法--hc是否授权res: ', res);
            if (res.toString() > 0) {
              resolve(true)
            } else {
              resolve(false)
            }
          }).catch(err => {
            // console.log('子组件方法--hc是否授权err: ', err);
            resolve(false)
          })
        })
      }else if(orther == 'NoDescription'){
        return new Promise(resolve => {
          erc20(type).allowance(this.getAccount,contractAdrdess).then(res => {
            // console.log('子组件方法--busd是否授权res: ', res);
            if (res.toString() > 0) {
              resolve(true)
            } else {
              resolve(false)
            }
          }).catch(err => {
            // console.log('子组件方法--hc是否授权err: ', err);
            resolve(false)
          })
        })
      }else{
        return new Promise(resolve => {
          erc20(token()[type]).allowance(this.getAccount,contractAdrdess).then(res => {
            // console.log('子组件方法--busd是否授权res: ', res);
            if (res.toString() > 0) {
              resolve(true)
            } else {
              resolve(false)
            }
          }).catch(err => {
            // console.log('子组件方法--hc是否授权err: ', err);
            resolve(false)
          })
        })
      }
    },
    // 去授权
    goApproveFun(type, contractAdrdess,orther = '') {
      if (type == 'hn') {
        return new Promise((resolve,reject) => {
          hn().connect(getSigner()).setApprovalForAll(contractAdrdess, true).then(async res => {
            // console.log('子组件方法--hn去授权res: ', res);
            const etReceipt = await res.wait();
            if(etReceipt.status == 1){
              resolve(true)
            }else{
              resolve(false)
            }
          }).catch(err => {
            // console.log('子组件方法--busd去授权err: ', err);
            reject(false)
          })
        })
      }else if(type == 'hc') {
        const TOKEN_amount = "50000000000000000000000000000000000000000000000000000000000";
        return new Promise((resolve,reject) => {
          hc().connect(getSigner()).approve(contractAdrdess, TOKEN_amount).then(async res => {
            // console.log('子组件方法--hc去授权res: ', res);
            const etReceipt = await res.wait();
            if(etReceipt.status == 1){
              resolve(true)
            }else{
              resolve(false)
            }
          }).catch(err => {
            // console.log('子组件方法--busd去授权err: ', err);
            reject(false)
          })
        })
      }else if(orther == 'NoDescription'){
        const TOKEN_amount = '50000000000000000000000000000000000000000000000000000000000';
        return new Promise((resolve,reject) => {
          erc20(type).connect(getSigner()).approve(contractAdrdess,TOKEN_amount).then(async res => {
            // console.log('子组件方法--busd去授权res: ', res);
            const etReceipt = await res.wait();
            if(etReceipt.status == 1){
              resolve(true)
            }else{
              resolve(false)
            }
          }).catch(err => {
            // console.log('子组件方法--busd去授权err: ', err);
            reject(false)
          })
        })
      }else{
        const TOKEN_amount = '50000000000000000000000000000000000000000000000000000000000';
        return new Promise((resolve,reject) => {
          erc20(token()[type]).connect(getSigner()).approve(contractAdrdess,TOKEN_amount).then(async res => {
            // console.log('子组件方法--busd去授权res: ', res);
            const etReceipt = await res.wait();
            if(etReceipt.status == 1){
              resolve(true)
            }else{
              resolve(false)
            }
          }).catch(err => {
            // console.log('子组件方法--busd去授权err: ', err);
            reject(false)
          })
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
