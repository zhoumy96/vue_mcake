<template>
  <div class="my-cart">
    <div class="cart-title">
      <img v-bind:src="require('..//assets/imgs/mycart.png')">
    </div>
    <div class="cart-top">
      <span class="first">商品信息</span>
      <span>规格</span>
      <span>数量</span>
      <span>单价</span>
      <span class="last">操作</span>
    </div>
    <div class="cart-list">
      <div class="cart-item" v-for="goods in cartList" :key="goods._id">
        <div class="cart-img">
          <img v-lazy="goods.img" @click="toDetail(goods.goodsId)">
        </div>
        <div class="cart-name">
          <p class="name" @click="toDetail(goods.goodsId)">{{goods.goodsName}}</p>
        </div>
        <div class="cart-sku-list">
          <el-select v-model="goods.sku.weight" @change="chooseSku">
            <el-option
              v-for="(item,index) in goods.skuList"
              :key="index"
              :value="item.weight"
              :value-key='item.id'>
            </el-option>
          </el-select>
        </div>
        <div class="cart-num">
          <span class="jian" @click="goods.cartNum==1?null:goods.cartNum--">-</span>
          <span class="number">{{goods.cartNum}}</span>
          <span class="jia" @click="goods.cartNum++">+</span>
        </div>
        <div class="cart-money">
          <span>￥{{goods.sku.price}}</span>
        </div>
        <div class="cart-operate">
          <span class="del"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Cart",
    data: () => {
      return {
        cartList: [],
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
            this.cartList = res.cartList;
          }).catch(err => {
          console.log(err);
        })
      },
      //进入详情页
      toDetail(id) {
        this.$router.push({name: 'goodsDetail', params: {goodsId: id}})
      },
      ///
      chooseSku(){

      }
    }
  }
</script>

<style lang="less">
  .my-cart{
    .cart-top{
      height: 44px;
      line-height: 44px;
      margin-top: 58px;
      margin-bottom: 12px;
      background-color: white;
      span{
        color: #000;
        font-size: 15px;
        margin-right: 128px;
      }
      .first{
        margin-left: 135px;
        margin-right: 340px;
      }
      .last{
        margin-right: 0px;
      }
    }
    .cart-list{
      .cart-item{
        display: flex;
        align-items: center;
        padding-top: 36px;
        padding-bottom: 18px;
        border-bottom: 1px solid #e8e8e8;
        .cart-img{
          margin: 0 12px;
          img{
            width: 135px;
            height: 135px;
            cursor: pointer;
          }
        }
        .cart-name{
          margin-right: 30px;
          width: 220px;
          .name{
            font-weight: bold;
            font-size: 16px;
            color: #000;
            margin-bottom: 2px;
            cursor: pointer;
          }
        }
        .cart-sku-list{
          padding-left: 16px;
          padding-right: 24px;
          color: #a2a2a2;
          font-size: 16px;
          height: 50px;
          line-height: 50px;
          /deep/ input.el-input__inner {
            height: 30px;
            font-size: 16px;
            border: none;
            color: #888;
            text-align: center;
            outline: none;
            appearance: none;
          }
        }
        .cart-num {
          display: flex;
          align-items: center;
          width: 150px;
          .number {
            width: 30px;
            text-align: center;
            border: none;
            outline: none;
            /*margin: 0px 10px 0px;*/
          }

          span:first-child,span:last-child {
            width: 25px;
            height: 25px;
            font-size: 20px;
            display: inline-block;
            text-align: center;
            line-height: 25px;
            background: #f0f0f0;
            border-radius: 50%;
            cursor: pointer;
            user-select: none;
          }

          span:first-child:hover,span:last-child:hover {
            background: #ffe32a;
          }
        }
        .cart-money{
          min-width: 130px;
          span{
            font-size: 16px;
            font-weight: bold;
            color: #000;
          }

        }
        .cart-operate{
          text-align: right;
          margin-left: 42px;
          .del{
            display: inline-block;
            width: 24px;
            height: 24px;
            background: url(../assets/imgs/icon41.png) no-repeat center;
            cursor: pointer;
          }
          .del:hover{
            background: url(../assets/imgs/icon42.png) no-repeat center;
          }
        }
      }
    }
  }
</style>
