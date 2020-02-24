<template>
  <div class="check-box">
    <span :class="[state?'icon active':'icon']" @click="changeState"></span>
  </div>
</template>

<script>
  export default {
    name: "checkBox",
    props: {
      isCheck: {
        type: Boolean,
        default: false
      },
    },
    data: () => {
      return {
        // state: this.isCheck,
        state: false,
      }
    },
    mounted() {
      // console.log(`this is ${this.isCheck}`);
      this.state = this.isCheck
    },
    methods: {
      changeState(){
        this.state = !this.state;
        this.$emit('check', this.state)
      }
    }
  }
</script>

<style lang="less">
  .check-box {
    width: 24px;
    height: 24px;
    .icon{
      cursor: pointer;
      display: inline-block;
      width: 24px;
      height: 24px;
      background: url(../assets/imgs/icon09.png) no-repeat center;
    }
    .active{
      background: url(../assets/imgs/icon10.png) no-repeat center;
    }
  }
</style>
