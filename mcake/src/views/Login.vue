<template>
    <div class="loginContent">
      <div class="login" v-if="login">
        <input class="username" type="text" name="username" placeholder="请输入用户名" v-model="userName">
        <input class="password" type="password" name="password" placeholder="请输入密码" v-model="userPwd">
        <el-button round size="medium" class="add-cart" @click="signIn">登录</el-button>
        <span class="signUp" @click="showSignUp">没有账号？立即注册</span>
      </div>
      <div class="login reg" v-if="!login">
        <input class="username" type="text" name="username" placeholder="请输入用户名" v-model="userName">
        <input class="password" type="password" name="password" placeholder="请输入密码" v-model="userPwd">
        <el-button round size="medium" class="add-cart" @click="signUp">注册</el-button>
        <span class="signUp" @click="showSignUp">已有账号？前去登录</span>
      </div>

    </div>

</template>

<script>
  import {mapActions,mapGetters} from 'vuex';
  export default {
    name: "Login",
    data: () => {
      return {
        userName: '',
        userPwd: '',
        login:true,
      }
    },
    mounted() {
    },
    methods: {
      ...mapActions(['setUser']),
      //登录
      signIn() {
        if(!this.userName){
          this.$message.warning('请输入账号');
          return;
        }else if(!this.userPwd){
          this.$message.warning('请输入密码');
          return;
        }else{
          this.$api.user.signIn(this.userName, this.userPwd).then(res => {
            if (res.status == '0') {
              this.data = res.data;
              this.setUser(res.data);
              this.$message.success('登录成功！');
              this.$router.push('/my');
            } else {
              this.$message.error(res.msg);
            }
          }).catch(err => {
            this.$message.error(err.msg);
          });
        }

      },
      showSignUp(){
        this.login = !this.login;
      },
      //注册
      signUp(){
        this.$api.user.signUp(this.userName, this.userPwd).then(res => {
          if (res.status == '0') {
            this.setUser(res.data);
            this.$message.success('注册成功！');
            this.$router.push('/my');
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          this.$message.error(err.msg);
        });
      }
    }
  }
</script>

<style lang="less">
  .loginContent{
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
      input {
        display: block;
        width: 280px;
        height: 38px;
        line-height: 38px;
        text-indent: 2px;
        font-size: 14px;
        color: #666;
        background-color: rgb(246, 244, 236);
        border-bottom: 1px solid #e8e8e8;
        border-top: none;
        border-right: none;
        border-left: none;
        outline: none;
        margin-bottom: 20px;
      }
      .signUp {
        margin-left: 12px;
        cursor: pointer;
      }

    }
  }

</style>
