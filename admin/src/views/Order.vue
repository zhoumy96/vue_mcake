<template>
    <div class="order">

    </div>
</template>

<script>
    export default {
        name: "Order",
      data: () => {
        return {
          orderList:[],
        }
      },
      created() {
        this.$api.admin.getNews()
          .then(res=>{
            this.orderList = res.data;
          }).catch(err=>{
          console.log(err);
        })
      },
    }
</script>

<style scoped lang="less">

</style>
