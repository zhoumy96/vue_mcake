<template>
  <footer>
    <el-row>
      <el-col :span="18" :offset="3" >
        <el-row type="flex" justify="space-between">
          <el-col :span="6">
            <div class="logo">
              <img src="../assets/imgs/logo1.png" alt="">
              <div>
                <p>订购热线：4006-678-678（8:00 - 22:00)</p>
                <p>客服邮箱：cs@mcake.com</p>
                <p>地址：上海市普陀区同普路1130弄3号楼</p>
                <p>食品生产许可证：SC12431010700121</p>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="about">
              <div>
                <p class="title">关于我们</p>
                <p>企业介绍</p>
                <p>媒体合作</p>
                <p>招贤纳士</p>
                <p>呼叫中心</p>
              </div>
              <div>
                <p class="title">帮助中心</p>
                <p>投诉与建议</p>
                <p>会员权益</p>
                <p>购物指南</p>
                <p>支付类</p>
                <p>订单相关</p>
                <p>配送服务</p>
              </div>
              <div>
                <p class="title">发现</p>
                <p>公告</p>
              </div>
            </div>
          </el-col>
          <div class="share">
            <img src="../assets/imgs/weibo.png" alt="">
            <img src="../assets/imgs/weixin.png" alt="">
          </div>
        </el-row>
      </el-col>
    </el-row>
  </footer>
</template>

<script>
  export default {
    name: 'ZFooter',
  }
</script>

<style scoped lang="less" type="text/less">
  footer{
    padding-top: 70px;
    padding-bottom: 70px;
    background-color: #000;
    color: #9c9c9c;
    flex: 0 0 auto;
    min-width: 1280px;
    p{
      margin-bottom: 6px;
      text-align: left;
    }
    .logo{
      img{
        margin-bottom: 20px;
      }
    }
    .about{
      display: flex;
      justify-content: space-between;
      .title{
        color: #ebebeb;
        font-size: 1.6rem;
        margin-bottom: 20px;
      }
    }
    .share{
      display: flex;
      align-items: center;
      img:first-child{
        margin-right: 1.8rem;
      }
    }
  }
</style>
