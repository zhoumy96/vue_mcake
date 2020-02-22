<template>
  <div class="goodsItem" >
    <img class='goodsImg' v-bind:src="goods.img" alt="" @click="toDetail">
    <h3>{{goods.goodsName}}</h3>
    <div class="goodsPrice">
      <span>￥{{goods.skuList[0].price}}</span>
      <el-button type="text" @click.stop="addCartBoxVisible = true">
        <img src="../assets/imgs/car.png">
      </el-button>
    </div>

    <!--  隐藏的弹窗 -->
    <div class="cartBox" @click.stop="">
      <el-dialog :visible.sync="addCartBoxVisible" width="400px">
        <div class="cartBoxContent" slot="">
          <div class="cartImg">
            <img v-lazy="goods.img">
            <div>
              <span>{{goods.goodsName}}</span>
              <span>￥{{price * num}}</span>
            </div>
          </div>
          <div class="cartSku">
            <span>规格选择</span>
            <el-select v-model="showSku" @change="chooseSku">
              <el-option
                v-for="(item,index) in goods.skuList"
                :key="index"
                :value="item.fit?item.weight+' - '+item.fit:item.weight"
                :value-key='item._id'>
              </el-option>
            </el-select>
          </div>
          <div class="cartNum">
            <span>数量选择</span>
            <div class="num">
              <span class="jian" @click="changeNum(0)">-</span>
              <input type="text" v-model="_num" class="number">
              <span class="jia" @click="changeNum(1)">+</span>
            </div>
          </div>
        </div>
        <div slot="footer" class="cartBoxFooter">
          <div @click="closeAddCartBox">取消</div>
          <div @click="commit">确认</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "goodsItem",
        data() {
            return {
                num: 1,
                addCartBoxVisible: false,
                price: this.goods.skuList[0].price,//单价
                totalPrice: 0,//
                sku: this.goods.skuList[0],//选中的sku 加入购物车
                showSku: this.goods.skuList[0].fit ? this.goods.skuList[0].weight + ' - ' + this.goods.skuList[0].fit : this.goods.skuList[0].weight,
            }
        },
        props: ['goods'],
        computed: {
            _num: {
                get: function () {
                    return this.num;
                },
                set: function (newValue) {
                    this.num = newValue.replace(/[^\d]/g, '');
                }
            }
        },
        methods: {
            //进入详情页
            toDetail() {
                this.$router.push({name: 'goodsDetail', params: {goodsId: this.goods._id}})
            },
            //关闭弹窗
            closeAddCartBox() {
                this.addCartBoxVisible = false
            },
            //选择sku
            chooseSku(value) {
                let sku = {};
                let weight = '';
                if (value.indexOf(' - ') != -1) {
                    weight = value.split(' - ')[0];
                } else {
                    weight = value;
                }
                this.goods.skuList.map(item => {
                    if (item.weight == weight) {
                        sku = item;
                    }
                });
                this.sku = sku;
                this.price = sku.price;
            },
            //增加数量
            changeNum(type) {
                if (type) {
                    this.num++;
                } else {
                    this.num > 1 ? this.num-- : null;
                }
            },
            //确认加入购物车
            commit() {
              if(!this.$store.state.isLogin){
                this.$message.warning('未登录');
                this.$router.push('/login');
                return;
              }
                let params = {
                    'goodsName': this.goods.goodsName,//商品名称
                    'img': this.goods.img,
                    'sku': this.sku,
                    'cartNum': this.num,//购买数量
                };
                this.addCart(params);
            },
            //加入购物车
            addCart(params) {
              this.$api.goods.addCart(params).then(res => {
                if (res.status == '0') {
                        this.addCartBoxVisible = false;
                        this.$message({
                            message: '添加到购物车成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '添加到购物车失败',
                            type: 'error'
                        });
                    }
                })
            },
        }
    }
</script>

<style scoped lang="less">
  .goodsItem {
    float: left;
    width: 350px;
    padding-top: 20px;
    margin-left: 16px;
    .goodsImg {
      width: 350px;
      height: 350px;
      margin-bottom: 12px;
      cursor: pointer;
    }

    h3 {
      margin-bottom: 6px;
      line-height: 20px;
    }

    h4 {
      font-weight: normal;
      font-size: 12px;
      color: #7a7a7a;
      margin-bottom: 10px;
    }

    .goodsPrice {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        font-weight: 500;
        font-size: 18px;
        color: #000;
      }

      img {
        vertical-align: middle;
        cursor: pointer;
        margin-right: 38px;
      }
    }

    .cartBox {
      /deep/ .el-dialog__body {
        padding: 0;
      }

      /deep/ .el-dialog__footer {
        padding: 0;
      }

      .cartBoxContent {
        .cartImg {
          display: flex;
          height: 120px;

          img {
            width: 100px;
            height: 100px;
            margin-right: 24px;
            margin-left: 16px;
          }

          span {
            display: block;
            font-size: 16px;
            margin-bottom: 6px;
          }

          span:nth-child(2) {
            color: #a2a2a2;
          }
        }

        .cartSku, .cartNum {
          padding-left: 16px;
          padding-right: 24px;
          color: #a2a2a2;
          font-size: 16px;
          height: 50px;
          line-height: 50px;
          border-top: 1px solid #eaeaea;
          border-bottom: 1px solid #eaeaea;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;

          /deep/ input.el-input__inner {
            height: 30px;
            font-size: 16px;
            border: none;
            color: #888;
            text-align: right;
            outline: none;
            appearance: none;
          }
        }

        .cartNum {
          border: none;

          .num {
            display: flex;
            align-items: center;

            .number {
              width: 30px;
              text-align: center;
              border: none;
              outline: none;
              /*margin: 0px 10px 0px;*/
            }

            span {
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

            span:hover {
              background: #ffe32a;
            }
          }
        }
      }

      .cartBoxFooter {
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
