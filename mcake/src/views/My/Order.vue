<template>
  <div class="order-list">
    <div class="order-item" v-for="item in orderList" :key="item._id">
      <p class="order-id">
        <span>订单号:{{item._id}}</span>
      </p>
      <div class="goods-list">
        <div class="order-goods" v-for="goods in item.list" :key="goods._id">
          <div class="goods-info">
            <img v-lazy="goods.img" @click="toDetail(goods.goodsId)">
            <p>
              <span>{{goods.goodsName}}</span>
              <span>规格：{{goods.sku.weight}}</span>
              <span>数量：{{goods.cartNum}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="order-mark">
        备注：{{item.mark||'无'}}
      </div>
      <div class="order-address">
        <span>收货人：{{item.address.name}}</span>
        <span>联系方式：{{item.address.phone}}</span>
        <p>联系地址：{{item.address.address}}</p>
      </div>
      <div class="order-pay">
        <div class="pay-info">
          共计{{item.totalNum}}件商品
        </div>
        <div class="pay-money">
          合计：<span>￥{{item.totalPrice}}</span>
        </div>
        <div class="order-status">
          <!--        0：未付款 1:已付款未发货 2：已发货 3:订单已完成 -1：用户取消-->
          <h2>
            订单状态：{{item.status==0?'未付款':item.status==1?'已付款未发货'
            :item.status==2?'已发货':item.status==3?'订单已完成':'已取消'}}
          </h2>

        </div>
      </div>
      <div class="cart-btn">
        <div v-if="item.status!=-1&&item.status!=3" class="pay-btn cancel" @click="cancel(item)">取消订单</div>
        <div v-if="item.status==0" class="pay-btn" @click="pay(item)">付款</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "Order",
    data: () => {
      return {
        orderList: [],
      }
    },
    computed: {},
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
            this.orderList = res.orderList;
          }).catch(err => {
          console.log(err);
        })
      },
      //进入详情页
      toDetail(id) {
        this.$router.push({name: 'goodsDetail', params: {goodsId: id}})
      },
      //付款
      pay(order) {
        this.$api.user.pay(order)
          .then(res => {
            if (res.status == 0) {
              this.$message.success('付款成功');
              order.status = 1;
            } else {
              this.$message.warning('余额不足');
            }
          }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      //取消订单
      cancel(order) {
        this.$api.user.cancel(order)
          .then(res => {
            if (res.status == 0) {
              this.$message.success('取消订单成功');
              order.status = -1;
            }
          }).catch(err => {
          this.$message.error(err.msg)
        })
      },
    }
  }
</script>

<style lang="less">
  .order-list {
    margin-top: 22px;
    font-size: 14px;

    .order-item {
      .goods-list {
        display: flex;
        flex-wrap: wrap;

        .order-goods {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-right: 12px;
          margin-top: 12px;

          img {
            width: 150px;
          }

          .goods-info {
            display: flex;

            p {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              margin-left: 8px;

              span:first-child {
                color: #000;
              }
            }
          }
        }
      }

      .order-mark {
        margin-top: 20px;
      }

      .order-address {
        margin-top: 20px;

        span:first-child {
          margin-right: 14px;
        }
      }

      .order-pay {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;

        .pay-info {
          font-weight: bold;
          color: #000;
        }

        .pay-money {
          > span {
            font-size: 26px;
            font-weight: bold;
            color: #000;
          }
        }

        .order-status {

        }
      }

      .cart-btn {
        display: flex;
        justify-content: flex-end;
        margin-top: 58px;

        .pay-btn {
          cursor: pointer;
          border: none;
          outline: none;
          font-size: 15px;
          color: #000;
          font-weight: bold;
          width: 150px;
          height: 44px;
          text-align: center;
          line-height: 44px;
          background: url(../../assets/imgs/icon12.png) no-repeat center;
        }

        .cancel {
          margin-right: 18px;
          background: url(../../assets/imgs/icon13.png) no-repeat center;
        }
      }
    }
  }
</style>
