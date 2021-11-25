<template>
  <div class="loader" :style="styleObject"></div>
</template>
<script>
export default {
  props:{
    styleObject:{
      type:Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.loader {
  font-size: 4px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  text-indent: -9999em;
  animation: load-effect 1s infinite linear;
}
@keyframes load-effect {
  0% {
    box-shadow: 0 -3em 0 0.2em #fff, /*上*/ 2em -2em 0 0 #fff,
      /*右上*/ 3em 0 0 -0.5em #fff, /*右*/ 2em 2em 0 -0.5em #fff,
      /*右下*/ 0 3em 0 -0.5em #fff, /*下*/ -2em 2em 0 -0.5em #fff,
      /*左下*/ -3em 0 0 -0.5em #fff, /*左*/ -2em -2em 0 0 #fff; /*左上*/
  }
  12.5% {
    box-shadow: 0 -3em 0 0 #fff, 2em -2em 0 0.2em #fff, 3em 0 0 0 #fff,
      2em 2em 0 -0.5em #fff, 0 3em 0 -0.5em #fff, -2em 2em 0 -0.5em #fff,
      -3em 0 0 -0.5em #fff, -2em -2em 0 -0.5em #fff;
  }
  25% {
    box-shadow: 0 -3em 0 -0.5em #fff, 2em -2em 0 0 #fff, 3em 0 0 0.2em #fff,
      2em 2em 0 0 #fff, 0 3em 0 -0.5em #fff, -2em 2em 0 -0.5em #fff,
      -3em 0 0 -0.5em #fff, -2em -2em 0 -0.5em #fff;
  }
  37.5% {
    box-shadow: 0 -3em 0 -0.5em #fff, 2em -2em 0 -0.5em #fff, 3em 0 0 0 #fff,
      2em 2em 0 0.2em #fff, 0 3em 0 0 #fff, -2em 2em 0 -0.5em #fff,
      -3em 0 0 -0.5em #fff, -2em -2em 0 -0.5em #fff;
  }
  50% {
    box-shadow: 0 -3em 0 -0.5em #fff, 2em -2em 0 -0.5em #fff,
      3em 0 0 -0.5em #fff, 2em 2em 0 0 #fff, 0 3em 0 0.2em #fff,
      -2em 2em 0 0 #fff, -3em 0 0 -0.5em #fff, -2em -2em 0 -0.5em #fff;
  }
  62.5% {
    box-shadow: 0 -3em 0 -0.5em #fff, 2em -2em 0 -0.5em #fff,
      3em 0 0 -0.5em #fff, 2em 2em 0 -0.5em #fff, 0 3em 0 0 #fff,
      -2em 2em 0 0.2em #fff, -3em 0 0 0 #fff, -2em -2em 0 -0.5em #fff;
  }
  75% {
    box-shadow: 0 -3em 0 -0.5em #fff, 2em -2em 0 -0.5em #fff,
      3em 0 0 -0.5em #fff, 2em 2em 0 -0.5em #fff, 0 3em 0 -0.5em #fff,
      -2em 2em 0 0 #fff, -3em 0 0 0.2em #fff, -2em -2em 0 0 #fff;
  }
  87.5% {
    box-shadow: 0 -3em 0 0 #fff, 2em -2em 0 -0.5em #fff, 3em 0 0 -0.5em #fff,
      2em 2em 0 -0.5em #fff, 0 3em 0 -0.5em #fff, -2em 2em 0 0 #fff,
      -3em 0 0 0 #fff, -2em -2em 0 0.2em #fff;
  }
  100% {
    box-shadow: 0 -3em 0 0.2em #fff, 2em -2em 0 0 #fff, 3em 0 0 -0.5em #fff,
      2em 2em 0 -0.5em #fff, 0 3em 0 -0.5em #fff, -2em 2em 0 -0.5em #fff,
      -3em 0 0 -0.5em #fff, -2em -2em 0 0 #fff;
  }
}
@media screen and (max-width: 980px){
  .loader {
    font-size: 2px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    text-indent: -9999em;
    animation: load-effect 1s infinite linear;
    margin-top: 0.05rem;
    margin-left: 0.1rem;
  }
}
</style>
