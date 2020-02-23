<template>
  <div id="app">
    <z-header></z-header>
    <div class="content"><router-view></router-view></div>
    <z-footer></z-footer>
  </div>
</template>
<script>
  import ZHeader from './components/ZHeader';
  import ZFooter from './components/ZFooter';
  import './assets/common.css';
  export default {
    name: 'app',
    components: {
      ZHeader,
      ZFooter
    },
    created() {
      let token = localStorage.getItem('token');
      let user = JSON.parse(localStorage.getItem('user'));
      if(token){
        let data = {user,token};
        this.$store.commit('userStatus',data);
      }else{
        this.$store.commit('userStatus',false);
      }
    }
  }
</script>
<style lang="less">
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 1280px;
    .content{
      flex: 1 0 auto;
      padding: 160px 7.5% 80px;
      background: #f8f8f8;
      /*border-top: 1px solid #e8e8e8;*/
    }
  }
</style>
