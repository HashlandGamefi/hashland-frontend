<template>
  <div class="bottom">
    <div class="hc_btc_box">
      <div class="hc_coefficient">
        <span class="span1 fontsize12_400">9999.9999</span>
      </div>
      <div class="hc_coefficient">
        <span class="span1 fontsize12_400">9999.9999</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.bottom {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  .hc_btc_box {
    display: flex;
    align-items: center;
    .hc_coefficient {
      display: flex;
      align-items: center;
      .span1 {
        color: #ffffff;
      }
    }
  }
}
</style>
