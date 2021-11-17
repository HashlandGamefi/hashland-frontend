<template>
  <div class="donut" v-if="isloading"></div>
</template>
<script>
export default {
  props: {
    isloading: {
      type: Boolean,
      default: false
    }
  }
} 
</script>
<style lang="scss" scoped>
.donut {
  display: inline-block;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ffffff;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  animation: donut-spin 1.2s linear infinite;
  margin-left:5px;
}
// button  loading动画
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@media screen and (max-width: 980px) {
  .donut {
    display: inline-block;
    border: 0.02rem solid rgba(0, 0, 0, 0.1);
    border-left-color: #ffffff;
    border-radius: 50%;
    width: 0.16rem;
    height: 0.16rem;
    animation: donut-spin 1.2s linear infinite;
    margin-left: 0.05rem;
  }
}
</style>
