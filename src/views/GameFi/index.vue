<template>
  <div class="page">
    <div class="outside_box">
      <div class="in_box">
        <img
          class="center_img"
          :src="`${$store.state.imgUrl}gamefibg1.png`"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 150px 0;
  font-size: 0;
  .outside_box {
    background: linear-gradient(rgba(139, 230, 254, 1), rgba(139, 230, 254, 0));
    box-shadow: -15px 11px 40px 21px rgba(0, 0, 1, 0.38),
      -2px 1px 34px 0px rgba(255, 255, 255, 0.22);
    border-radius: 14px;
    padding: 1px;
    .in_box {
      border-radius: 14px;
      background: linear-gradient(180deg, #010f20 0%, #021c3b 100%);
    }
  }
}
@media screen and (min-width: 981px) {
  .in_box {
    padding: 25px;
    .center_img {
      width: 785px;
      height: auto;
    }
  }
}
@media screen and (max-width: 980px) {
  .in_box {
    padding: 10px;
    .center_img {
      width: 310px;
      height: auto;
    }
  }
}
</style>
