<template>
  <input type="text fontsize14" :placeholder='placeholder' v-model="msg" class="input_box_componenets" />
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    inputvalue: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      msg:''
    }
  },
  watch:{
    inputvalue(nval,oval){
      if(nval != oval){
        this.msg = nval
      }
    },
    msg(nval,oval){
      if(nval != oval){
        this.$emit('input',nval)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.input_box_componenets{
  width:100%;
  height: 100%;
  border: none;
  outline: none;
  font-style: normal;
  color: #ffffff;
  border-radius: 14px;
  background: transparent;
}
input::-webkit-input-placeholder {
  color: #ffffff;
  font-size: 12px;
  font-weight: 400;
  font-family: 'Poppins-Regular';
}
@media screen and (max-width: 980px){
  .input_box_componenets{
    border-radius: 0.14rem;
  }
}
</style>
