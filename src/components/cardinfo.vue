<template>
  <div class="cardinfo_bottom">
    <div class="cardinfo_hc_btc_box">
      <div class="cardinfo_hc_coefficient">
        <span class="cardinfo_span1 fontsize12_400">{{hc}}</span>
      </div>
      <div class="cardinfo_hc_coefficient">
        <span class="cardinfo_span1 fontsize12_400">{{btc}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    hc: {
      type: String,
      default: ''
    },
    btc: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.cardinfo_bottom {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  .cardinfo_hc_btc_box {
    display: flex;
    align-items: center;
    .cardinfo_hc_coefficient {
      display: flex;
      align-items: center;
      .cardinfo_span1 {
        color: #ffffff;
      }
    }
  }
}
</style>
