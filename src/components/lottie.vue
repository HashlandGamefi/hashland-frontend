
<template>
  <div :style="style" class="positon_absoult" ref="lavContainer"></div>
</template>

<script>
import lottie from 'lottie-web';
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    height: Number,
    width: Number,
    left:{
      type: String,
      default:'0'
    },
    top:{
      type: String,
      default:'0'
    },
    transform:{
      type: Boolean,
      default: false
    },
  },
  watch: {
    'options': {
      handler: function (newValue) {
        if (newValue) this.loadAnimation(newValue)
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      style: {
        width: this.width ? `${this.width}px` : '100%',
        height: this.height ? `${this.height}px` : '100%',
        overflow: 'hidden',
        margin: '0 auto',
        left:this.left?`${this.left}`:0,
        top:this.top?`${this.top}`:0,
        transform:this.transform?'translate(-50%, -50%)':''
      },
      ani: null
    }
  },
  mounted () {
    this.loadAnimation(this.options)
  },
  methods: {
    loadAnimation (options) {
      if (this.ani) this.ani.destroy()
      this.ani = lottie.loadAnimation({
        container: this.$refs.lavContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: options
      })
    }
  }

}
</script>
<style lang="scss" scoped>
.positon_absoult {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
