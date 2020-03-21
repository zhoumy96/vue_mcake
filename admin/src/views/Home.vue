<template>
  <div class="home">
    <el-container>
      <el-aside>
        <el-menu
          :router="true"
          :default-active="$route.path"
          class="el-menu-vertical-demo">
          <el-menu-item index="/home/user" :route="{path:'/home/user'}">
            <i class="el-icon-user"></i>
            <span slot="title">用户</span>
          </el-menu-item>
          <el-menu-item index="/home/news" :route="{path:'/home/news'}">
            <i class="el-icon-news"></i>
            <span slot="title">新闻</span>
          </el-menu-item>
          <el-menu-item index="/home/goods" :route="{path:'/home/goods'}">
            <i class="el-icon-goods"></i>
            <span slot="title">商品</span>
          </el-menu-item>
<!--          <el-menu-item index="/home/order" :route="{path:'/home/order'}">-->
<!--            <i class="el-icon-s-order"></i>-->
<!--            <span slot="title">订单</span>-->
<!--          </el-menu-item>-->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>

  export default {
    name: 'Home',

  }
</script>

<style scoped lang="less">
  .home {
    width: 100%;
    height: 100%;
    position: fixed;
    > .el-container:first-child {
      height: 100%;
    }
  }
</style>
