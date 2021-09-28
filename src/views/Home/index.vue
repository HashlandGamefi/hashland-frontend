<template>
  <div class="page">主页</div>
</template>
<script>
export default {
  mounted(){
    let time = this.$common.editE(1.1231e+23)
    console.log('time: ', time);
  }
}
</script>
<style lang="scss" scoped>
.page{
  width:100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgb(167, 211, 247);
  font-size: 1rem;
}
</style>
