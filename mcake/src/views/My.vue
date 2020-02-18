<template>
  <div class="myContent">
    gfd
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex';
  export default {
    name: "My",
    data: () => {
      return {
        userName: '',
        userPwd: '',
        data: [],

      }
    },
    mounted() {
      // console.log(`this.$store.state.isLogin is ${this.$store.state.isLogin}`);
    },
    methods: {
      ...mapActions(['setUser']),
      //登录
      signIn() {
        this.$api.user.signIn(this.userName, this.userPwd).then(res => {
          if (res.status == '0') {
            this.data = res.data;
            this.setUser(res.data);
          } else {
            console.log(res.msg);
          }
        }).catch(err => {
          console.log(err.msg);
        });
      }
    }
  }
</script>

<style lang="less">

</style>
