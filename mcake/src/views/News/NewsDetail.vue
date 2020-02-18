<template>
  <div class="news-content">
    <div class="title">
      <h2>{{news.title}}</h2>
      <span>{{news.time}}</span>
    </div>
    <div class="detail">
      <span>{{news.detail}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NewsDetail",
    data() {
      return {
        news: {},
      }
    },
    mounted() {
      let id = this.$route.params.newsId;
      this.$api.news.getNews(id).then(res=>{
        console.log(res);
        if(res.status == '0'){
          this.news = res.data;
        }else{
          this.$message.error(res.msg);
        }
      });
    },
  }
</script>

<style lang="less">
  .news-content{
    .title{
      text-align: center;
      h2{
        margin-bottom: 12px;
      }
    }
    .detail{
      margin-top: 12px;
    }
  }
</style>
