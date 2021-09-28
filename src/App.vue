<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
