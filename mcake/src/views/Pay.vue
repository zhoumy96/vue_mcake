<template>
  <div class="pay">
    <div class="pay-address">
      <span>收货人：{{order.address.name}}</span>
      <span>联系方式：{{order.address.phone}}</span>
      <p>联系地址：{{order.address.address}}</p>
    </div>
    <div class="pay-top">
      <span class="first">商品信息</span>
      <span>规格</span>
      <span>数量</span>
      <span>单价</span>
    </div>
    <div class="pay-list">
      <div class="cart-item" v-for="goods in order.list" :key="goods._id">
        <div class="cart-img">
          <img v-lazy="goods.img" @click="toDetail(goods.goodsId)">
        </div>
        <div class="cart-name">
          <p class="name" @click="toDetail(goods.goodsId)">{{goods.goodsName}}</p>
        </div>
        <div class="cart-sku-list">
          <span>{{goods.sku.weight}}</span>
        </div>
        <div class="cart-num">
          <!--          <span class="jian" @click="num(false,goods)">-</span>-->
          <span class="number">{{goods.cartNum}}</span>
          <!--          <span class="jia" @click="num(true,goods)">+</span>-->
        </div>
        <div class="cart-money">
          <span>￥{{goods.sku.price}}</span>
        </div>
        <!--        <div class="cart-operate">-->
        <!--          <span class="del" @click="delGoods(goods)"></span>-->
        <!--        </div>-->
      </div>
    </div>
    <div class="pay-mark">
      备注：{{order.mark||'无'}}
    </div>
    <div class="cart-pay">
      <div class="pay-info">
        共计{{order.totalNum}}件商品
      </div>
      <div class="pay-money">
        合计：<span>￥{{order.totalPrice}}</span>
      </div>
    </div>
    <div class="cart-btn">
      <div class="pay-btn cancel" @click="cancel">取消订单</div>
      <div class="pay-btn" @click="pay">付款</div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: "Pay",
    data() {
      return {}
    },
    computed: {
      ...mapGetters({
        order: 'getOrder'
      }),
    },
    methods: {
      //进入详情页
      toDetail(id) {
        this.$router.push({name: 'goodsDetail', params: {goodsId: id}})
      },
      //付款
      pay() {
        this.$api.user.pay(this.order)
          .then(res => {
              if(res.status==0){
                this.$message.success('付款成功');
                this.$router.push('/my');
              }else{
                this.$message.warning('余额不足');
              }
          }).catch(err => {
          this.$message.error(err.msg)
        })
      },
      //取消订单
      cancel() {
        this.$api.user.cancel(this.order)
          .then(res => {
            if(res.status==0){
              this.$message.success('取消订单成功');
              this.$router.push('/my');
            }
          }).catch(err => {
          this.$message.error(err.msg)
        })
      },
    }
  }
</script>

<style lang="less">
  .pay {
    .pay-address {
      font-size: 14px;

      span:first-child {
        margin-right: 14px;
      }

      p {
        margin-top: 14px;
      }
    }

    .pay-top {
      height: 44px;
      line-height: 44px;
      margin-top: 18px;
      margin-bottom: 12px;
      background-color: white;

      span {
        color: #000;
        font-size: 15px;
        margin-right: 128px;
      }

      span:nth-child(2) {
        margin-right: 160px;
      }

      span:nth-child(4) {
        margin-right: 118px;
      }

      .first {
        margin-left: 135px;
        margin-right: 340px;
      }

    }

    .pay-list {
      margin-bottom: 26px;

      .cart-item {
        display: flex;
        align-items: center;
        padding-top: 36px;
        padding-bottom: 18px;
        border-bottom: 1px solid #e8e8e8;

        .cart-img {
          margin: 0 12px;

          img {
            width: 135px;
            height: 135px;
            cursor: pointer;
          }
        }

        .cart-name {
          margin-right: 30px;
          width: 220px;

          .name {
            font-weight: bold;
            font-size: 16px;
            color: #000;
            margin-bottom: 2px;
            cursor: pointer;
          }
        }

        .cart-sku-list {
          width: 280px;
          /*padding-left: 16px;*/
          /*padding-right: 24px;*/
          color: #a2a2a2;
          font-size: 16px;
          height: 50px;
          line-height: 50px;
          text-align: center;
        }

        .cart-num {
          display: flex;
          align-items: center;
          width: 185px;

          .number {
            width: 30px;
            text-align: center;
            border: none;
            outline: none;
            font-weight: bold;
            font-size: 16px;
            padding-right: 20px;
            padding-left: 35px;
            /*margin: 0px 10px 0px;*/
          }
        }

        .cart-money {
          min-width: 130px;

          span {
            font-size: 16px;
            font-weight: bold;
            color: #000;
          }

        }

        .cart-operate {
          text-align: right;
          margin-left: 42px;

          .del {
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(../assets/imgs/icon41.png) no-repeat center;
            cursor: pointer;
          }

          .del:hover {
            background: url(../assets/imgs/icon42.png) no-repeat center;
          }
        }
      }
    }

    .pay-mark {
      font-size: 14px;
    }

    .cart-pay {
      padding-left: 449px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;

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
        background: url(../assets/imgs/icon12.png) no-repeat center;
      }

      .cancel {
        margin-right: 18px;
        background: url(../assets/imgs/icon13.png) no-repeat center;
      }
    }
  }
</style>
