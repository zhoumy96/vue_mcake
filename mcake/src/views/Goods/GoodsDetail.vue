<template>
  <div class="GoodsDetail">
    <img v-lazy="goodsData.bannerImg" class="bannerImg">
    <div class="detailBox">
      <div class="detailContent">
        <div class="detail">
          <div class="info">
            <h2>{{goodsData.goodsName}}</h2>
            <span>提前{{goodsData.time}}小时预定</span>
            <p>
              <span>口感</span>
              <span>{{goodsData.taste}}</span>
            </p>
            <p>
              <span>口味</span>
              <span>{{goodsData.flavor}}</span>
            </p>
            <p>
              <span>口味基底</span>
              <span>{{goodsData.flavorBase}}</span>
            </p>
            <p>
              <span>甜味</span>
            </p>
            <div>
              <span v-if="sku.tablewareNum!=0">标配餐具{{sku.tablewareNum}}份</span>
              <span>SIZE:{{sku.size}}</span>
            </div>
            <div class="tip">
              <i></i>
              若不及时食用，请放置0-10℃冷藏
            </div>
          </div>
          <div class="sku">
            <div :class="{'skuItemChose':sku==item,'skuItem':true} " v-for="item in skuList" :key="item.skuId" @click="chooseSku(item)">
              <p>{{item.weight}}</p>
              <p>{{item.fit}}</p>
            </div>
          </div>
        </div>
        <div class="add">
          <p class="p-rmb">
            <span>￥</span>
            <span class="span-rmb">{{sku.price}}</span>
          </p>
          <div class="add-button">
            <el-row>
              <el-button round size="medium" class="add-cart" @click="addCart">加入购物车</el-button>
              <el-button round size="medium" class="buy-now">立即订购</el-button>
            </el-row>
          </div>
        </div>
      </div>
      <img class="detailImg" v-lazy="goodsData.detailImg">
    </div>
  </div>
</template>

<script>
    export default {
        name: "GoodsDetail",
        data() {
            return {
                goodsData:{},//商品详情
                skuList:[],
                sku:{},//当前选中的sku
            }
        },
        mounted() {
            this.getData(this.$route.params.goodsId);
        },
        methods: {
            // 获取商品的详情
            getData(goodsId) {
                this.$api.goods.goodsDetail(goodsId).then(res=>{
                    if(res.status == '0'){
                        this.goodsData = res.data;
                        this.skuList = res.data.skuList;
                        this.sku = this.skuList[0];
                    }
                }).catch(err=>{
                  this.$message.error(err)
                })
            },
            // 选择不同的sku
            chooseSku(sku){
                this.sku = sku;
            },
            addCart(){
              if(!this.$store.state.isLogin){
                this.$message.warning('未登录');
                this.$router.push('/login');
                return;
              }
              let params = {
                'goodsId': this.goodsData._id,//商品id
                'goodsName': this.goodsData.goodsName,//商品名称
                'img': this.goodsData.img,
                'sku': this.sku,//购买的sku
                'skuList': this.skuList,//该商品所有skuList
                'cartNum': 1,//购买数量
              };
              this.$api.goods.addCart(params).then(res => {
                if (res.status == '0') {
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
            }
        },
    }
</script>

<style scoped lang="less">
  .GoodsDetail {
    /*padding-top: 120px;*/
    background: #f8f8f8;
    .bannerImg{
      width: 100%;
      height: 769px;
    }
    .detailBox{
      position: relative;
      top: -100px;
      .detailContent{
        margin: 0 7.5% 68px;
        height: 608px;
        background: #fff;
        display: flex;
        .detail{
          width: 600px;
          .info{
            height: 450px;
            padding-left: 109px;
            border-bottom: 1px solid #d6d6d6;
            color: black;
            h2{
              font-size: 26px;
              padding-top: 68px;
              margin-bottom: 8px;
            }
            >span:nth-child(2){
              display: block;
              font-size: 14px;
              margin-bottom: 24px;
            }
            >span:nth-child(3){
              display: block;
              font-size: 16px;
              margin-bottom: 32px;
            }
            p{
              margin-bottom: 8px;
              font-size: 14px;
            }
            span + p{
              margin-top: 44px;
            }
            p>span:nth-child(1){
              display: inline-block;
              width: 98px;
            }
            div{
              margin-top: 22px;
              font-size: 14px;
              >span:first-child{
                display: block;
                margin-bottom: 6px;
              }
            }
            .tip{
              color: #f0250f;
              i{
                width: 2.4rem;
                height: 2.4rem;
                background-size: 1.6rem 1.6rem;
                /*background: url('../assets/imgs/icon-gantanhao-3.png') no-repeat transparent;*/
                background-image: url('../../assets/imgs/icon-gantanhao-3.png');
                background-repeat: no-repeat;
                background-position: .24rem .24rem;
                display: inline-block;
                float: left;
              }
            }
          }

          .sku{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 38px 109px 0px 109px;
            .skuItem{
              cursor: pointer;
              p:first-child{
                font-size: 18px;
                color: #848484;
                margin-bottom: 4px;
              }
              p:last-child{
                font-size: 15px;
                color: #848484;
              }
            }
            .skuItemChose{
              p{color:black !important;}
            }
          }
        }
        .add{
          padding-left: 32px;
          padding-top: 68px;
          border-left: 1px solid #d6d6d6;
          .p-rmb{
            margin-bottom: 48px;
            color: black;
            >span:first-child{
              font-size: 20px;
            }
            >span:last-child{
              font-size: 28px;
            }
          }
          button{
            width: 152px;
            height: 44px;
            font-size: 15px;
            color: #000;
            cursor: pointer;
          }
          /deep/ .el-button+.el-button{
            margin-left: 0;
          }
          .add-button{
            display: flex;
            flex-wrap: wrap;
            .add-cart{
              margin-right: 1rem;
              margin-bottom: 1rem;
            }
            .buy-now{
              background-color: #FFE100;
            }
          }
        }
      }
      .detailImg{
        width: 85%;
        margin: 0 7.5% 0;
      }
    }

  }

</style>
