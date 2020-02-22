<template>
  <div class="goodsList">
    <goods-item v-for="item in goodsList" :key="item._id" :goods="item"/>
  </div>
</template>

<script>
    import GoodsItem from '../../components/goodsItem';
    export default {
        name: "Goods",
        components: {
            GoodsItem
        },
        data(){
            return{
                goodsList:[],
            }
        },
        watch:{
            '$route'(to,from){
                this.getGoodsList(this.$route.params.type);
            }
        },
        mounted:function () {
            this.getGoodsList(this.$route.params.type);
        },
        methods:{
            //获取数据
            getGoodsList(type){
                this.$api.goods.goodsList(type).then(res=>{
                    if(res.status == '0'){
                        this.goodsList = res.data;
                    }else{
                        this.goodsList = [];
                    }
                }).catch(err=>{
                    console.log(err.message);
                });
            },


        },
    }

</script>

<style scoped lang="less">
  .goodsList{

  }
</style>
