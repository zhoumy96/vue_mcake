<template>
  <div class="login">
    <div class="login-form">
      <el-input v-model="name" placeholder="请输入用户名"></el-input>
      <el-input v-model="password" placeholder="请输入密码" type="password" :show-password="true"></el-input>
      <span v-show="showTip">用户名或者密码错误</span>
      <el-button type="primary" @click="submit">登录</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data: () => {
      return {
        name: '',
        password: '',
        showTip: false,
      };
    },
    methods: {
      submit() {
        this.$api.admin.signIn(this.name, this.password)
          .then(res => {
            if (res.status == '0') {
              this.showTip = false;
              this.$router.push('/home');
            } else {
              this.showTip = true;
            }
          }).catch(err => {
          this.showTip = true;
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: fixed;
    background: url("../assets/login-background.png") no-repeat;

    .login-form {
      .el-input {
        margin-top: 8px;
        width: 200px;
        display: block;
      }

      span {
        display: block;
        margin-top: 8px;
        color: red;
      }

      .el-button {
        margin-top: 8px;
        width: 200px;
      }
    }
  }
</style>
