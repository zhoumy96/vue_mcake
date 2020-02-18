<template>
  <div class="news">
    <div v-for="item in newsList" :key="item._id" class="newsItem">
      <div class="news-left">
        <h2 @click="toDetail(item._id)">{{item.title}}</h2>
        <p>{{item.time}}</p>
      </div>
      <img class='newsImg' v-lazy="item.img" alt="">
    </div>
  </div>
</template>

<script>
    export default {
      name: "News",
      data(){
        return{
          newsList:[],
        }
      },
      mounted:function () {
        this.$api.news.getNews().then(res=>{
          if(res.status == '0'){
            this.newsList = res.data;
          }else{
            this.newsList = [];
          }
        }).catch(err=>{
          console.log(err.msg);
        });
      },
      methods:{
        toDetail(id) {
          this.$router.push({name: 'newsDetail', params: {newsId: id}})
        },
      }
    }
</script>

<style lang="less">
  .news{
   .newsItem{
      display: flex;
      justify-content: space-between;
      .news-left{
        width: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        h2{
          font-size: 28px;
          color: #000;
          margin-bottom: 50px;
          cursor: pointer;
        }
        p{
          font-size: 16px;
          color: #656565;
          cursor: pointer;
        }
      }
      img{
        width: 750px;
        height: 320px;
      }
    }
  }
</style>
