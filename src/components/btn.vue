<template>
  <div class="btn_page">
    <div class="connect_box fontsize18" v-if="!getIstrue">Connect</div>
    <div class="connect_box fontsize18" v-else-if="!isapprove">{{$t("message.approve")}}</div>
    <div class="connect_box fontsize18" v-else @click="buyBox">{{word}}<BtnLoading :isloading="btn_isloading"></BtnLoading></div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    isapprove: {
      type: Boolean,
      default: false
    },
    word: {
      type: String,
      default: ''
    },
    btn_isloading:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["getIstrue"])
  },
  methods:{
    buyBox(){
      this.$emit('buybox')
    }
  }
}
</script>
<style lang="scss" scoped>
.btn_page{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .connect_box {
    width: 274px;
    height: 59px;
    text-align: center;
    line-height: 47px;
    background-image: url("//cdn.hashland.com/images/SpeciaBtn2.png");
    background-size: contain;
    background-repeat: no-repeat;
    color: #ffffff;
    cursor: pointer;
  }
}
</style>
