<template>
  <div class="myContent">
    <div class="myHeader">
      <h2>{{data.userName}}</h2>
      <div class="money">
        <span>余额：{{data.money}}</span>
        <el-button round size="small" class="add-cart" @click="moneyBoxVisible = true">充值</el-button>
      </div>
      <router-link v-bind:to="'/my/order'">
        <h2>我的订单</h2>
      </router-link>
      <router-link v-bind:to="'/my/address'">
        <h2>我的收货地址</h2>
      </router-link>

    </div>
    <div class="myContent">
      <router-view></router-view>
    </div>


    <!--  充值弹窗 -->
    <div class="moneyBox" @click.stop="">
      <el-dialog :visible.sync="moneyBoxVisible" width="400px">
        <div class="moneyBoxContent" slot="">
          <h2>充值金额：</h2>
          <input class="username" type="number" v-model="money">
        </div>
        <div slot="footer" class="moneyBoxFooter">
          <div @click="moneyBoxVisible = false">取消</div>
          <div @click="recharge">确认</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "My",
    data: () => {
      return {
        data: [],
        moneyBoxVisible: false,//充值弹窗
        money: 0,//充值金额
      }
    },
    mounted() {
      this.getUser();
    },
    methods: {
      ///获取用户信息
      getUser() {
        this.$api.user.getUser()
          .then(res => {
            this.data = res;
            let data = {
              user: res,
              token: this.$store.state.token
            };
            this.$store.commit('userStatus', data);
          }).catch(err => {
          console.log(err);
        })
      },
      //充值
      recharge() {
        if (this.money && this.money > 0) {
          this.$api.user.recharge(this.money)
            .then(res => {
              this.$message.success(res.msg);
              this.data.money = res.data;
              this.moneyBoxVisible = false;
              this.money = 0;
            }).catch(err => {
            this.$message.error(err.msg);
            this.money = 0;
          })
        } else {
          this.$message.warning('请输入正确的金额')
        }

      },
    }
  }
</script>

<style lang="less">
  .myContent {
    .myHeader {
      display: flex;
      align-items: center;

      h2 {
        margin-right: 22px;
        cursor: pointer;
      }

      .money {
        margin-right: 22px;

        span {
          margin-right: 4px;
        }
      }

      a {
        display: inline-block;
        color: black;
      }
    }

    .moneyBox {
      /deep/ .el-dialog__body {
        padding: 0;
      }

      /deep/ .el-dialog__footer {
        padding: 0;
      }

      .moneyBoxContent {
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;

        input {
          height: 28px;
        }
      }

      .moneyBoxFooter {
        display: flex;

        div {
          width: 50%;
          height: 50px;
          font-size: 20px;
          text-align: center;
          background-color: #ffe32a;
          line-height: 50px;
          cursor: pointer;
        }

        div:nth-child(1) {
          background-color: #888;
          color: #fff;
        }
      }
    }
  }
</style>
