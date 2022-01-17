<template>
  <div class="loading_page">
    <div class="loader"></div>
  </div>
</template>
<style lang="scss" scoped>
.loading_page{
  width: 100vw;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader{
    font-size: 12px;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    animation: loadingA 1s infinite linear;
  }
}
@keyframes loadingA{
  0% {
    box-shadow: -3em 2em 0 .5em #FFF, 0 2em 0 0 #FFF, 3em 2em 0 -.5em #FFF;
  }
  25% {
    box-shadow: -3em 2em 0 0 #FFF, 0 2em 0 -.5em #FFF, 3em 2em 0 0 #FFF;
  }
  50% {
    box-shadow: -3em 2em 0 -0.5em #FFF, 0 2em 0 0 #FFF, 3em 2em 0 .5em #FFF;
  }
  75% {
    box-shadow: -3em 2em 0 0 #FFF, 0 2em 0 .5em #FFF, 3em 2em 0 0 #FFF;
  }
  100% {
    box-shadow: -3em 2em 0 .5em #FFF, 0 2em 0 0 #FFF, 3em 2em 0 -.5em #FFF;
  }
}
</style>
