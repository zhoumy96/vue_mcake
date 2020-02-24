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
          <el-select v-model="goods.sku.weight" @change="chooseSku($event,goods)">
            <el-option
              v-for="(item,index) in goods.skuList"
              :key="index"
              :value="item.weight"
              :value-key='item.id'>
            </el-option>
          </el-select>
        </div>
        <div class="cart-num">
          <span class="jian" @click="num(false,goods)">-</span>
          <span class="number">{{goods.cartNum}}</span>
          <span class="jia" @click="num(true,goods)">+</span>
        </div>
        <div class="cart-money">
          <span>￥{{goods.sku.price}}</span>
        </div>
        <div class="cart-operate">
          <span class="del" @click="delGoods(goods)"></span>
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
        chooseList:[],//勾选的商品
        price:0,//总价
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
      // +:true -:false
      num(type,goods){
        let isCommit = true;
        if(type){
          goods.cartNum++;
        }else{
          goods.cartNum==1?isCommit = false:goods.cartNum--;
        }

        if(isCommit){
          this.saveCart(this.cartList);
        }
      },
      //修改sku
      chooseSku(weight,goods){
        // console.log(`${weight} goods is ${JSON.stringify(goods)}`);
        //先修改本商品
        for(let item of goods.skuList){
          if(weight == item.weight){
            goods.sku = Object.assign({},item);
            goods.sku.id = item._id;
            break;
          }
        }
        //修改购物车列表 重复的合并
        if(goods.isSame){
          for(let item of this.cartList){
            if(!item.isSame || item._id == goods._id){
              // console.log('跳过不同商品和自己');
              continue;
            }else if(item.goodsId == goods.goodsId && goods.sku.id == item.sku.id){
              // console.log('同商品同sku');
              item.cartNum += goods.cartNum;
              this.cartList.remove(goods);
              break;
            }
          }
        }
        //保存到数据库
        this.saveCart(this.cartList);
      },
      //删除商品
      delGoods(goods){
        this.$confirm('是否删除此商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.cartList.remove(goods);
          this.saveCart(this.cartList);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },


      //保存数据
      saveCart(cartList){
        this.$api.user.saveCart(cartList)
          .then(res => {
            if (res.status == 0) {
              this.$message.success(res.msg);
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
