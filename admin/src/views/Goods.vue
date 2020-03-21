<template>
  <div class="goods">
    <el-table
      :data="goodsList"
      style="width: 100%">
      <el-table-column
        width="250"
        prop="img"
        label="图片">
        <template slot-scope="scope">
          <img v-lazy="scope.row[scope.column.property]" class="img">
        </template>
      </el-table-column>
      <el-table-column
        prop="_id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="goodsName"
        label="名称">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
          <el-button @click="delClick(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button class="add-goods" @click="handleClick(false)">添加商品</el-button>


    <div class="box" @click.stop="">
      <el-dialog :visible.sync="showDetail" width="660px" :append-to-body="true" @close='cancel'>
        <div class="box-content" slot="">

          <div class="box-item">
            <div>
              <span>商品名称：</span>
              <el-input v-model='goods.goodsName' placeholder="请输入标题"></el-input>
            </div>
            <div>
              <span>分类(0:蛋糕 1:小食)：</span>
              <el-input v-model='goods.type' placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="box-item">
            <div>
              <span>提前预约时间(小时)：</span>
              <el-input v-model='goods.time' placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>口感：</span>
              <el-input v-model='goods.taste' placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="box-item">
            <div>
              <span>口味：</span>
              <el-input v-model='goods.flavor' placeholder="请输入内容"></el-input>
            </div>
            <div>
              <span>口味基底：</span>
              <el-input v-model='goods.flavorBase' placeholder="请输入内容"></el-input>
            </div>
          </div>


          <div class="img-group">
            <!--          预览图-->
            <div class="box-img">
              <span>预览图：</span>
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action="http://localhost:3000/admin/upload"
                :on-success="imgUploadSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-show="isImgUpload" :src="goods.img" class="avatar">
                <i v-show="!isImgUpload" class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <!--          banner-->
            <div class="box-img">
              <span>banner图：</span>
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action="http://localhost:3000/admin/upload"
                :on-success="bannerImgUploadSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-show="isBannerImgUpload" :src="goods.bannerImg" class="avatar">
                <i v-show="!isBannerImgUpload" class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <!--          detail图-->
            <div class="box-img">
              <span>detail图：</span>
              <el-upload
                class="avatar-uploader"
                :show-file-list="false"
                action="http://localhost:3000/admin/upload"
                :on-success="detailImgUploadSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-show="isDetailImgUpload" :src="goods.detailImg" class="avatar">
                <i v-show="!isDetailImgUpload" class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
          </div>

          <div class="sku-list">
            <span>商品SKU：</span>
            <div class="sku" v-for="(item, index) in goods.skuList" :key="index">
              <div class="sku-item">
                <span>尺码：</span>
                <el-input v-model='item.size' placeholder="如31cm*8cm"></el-input>
              </div>
              <div class="sku-item">
                <span>重量：</span>
                <el-input v-model='item.weight' placeholder="如1磅(454g)"></el-input>
              </div>
              <div class="sku-item">
                <span>适合：</span>
                <el-input v-model='item.fit' placeholder="适合2-3人食"></el-input>
              </div>
              <div class="sku-item">
                <span>标配餐具：</span>
                <el-input v-model='item.tablewareNum' placeholder="如5"></el-input>
              </div>
              <div class="sku-item">
                <span>价格：</span>
                <el-input v-model='item.price' placeholder="如286"></el-input>
              </div>
              <div class="sku-item">
                <el-button class="add-goods" type="danger" @click="delSku(item)">删除SKU</el-button>
              </div>
            </div>
            <el-button class="add-goods" @click="addSku">添加SKU</el-button>

          </div>

        </div>
        <div slot="footer" class="box-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="commit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Goods",
    data: () => {
      return {
        goodsList: [],
        goods: {
          _id: "",
          goodsName: "",
          skuList: [],
          type: 0,
          img: "",//预览图
          bannerImg: "",//
          detailImg: "",//
          time: "",
          taste: "",
          flavor: "",
          flavorBase: "",
        },
        showDetail: false,
        isImgUpload: false,//预览图
        isBannerImgUpload: false,//banner
        isDetailImgUpload: false,//detail
        isAdd:false,
      }
    },
    created() {
      this.getGoods();
    },
    methods: {
      //获取所有商品
      getGoods() {
        this.$api.goods.goodsList(-1).then(res => {
          if (res.status == '0') {
            this.goodsList = res.data;
          } else {
            this.goodsList = [];
          }
        }).catch(err => {
          console.log(err.message);
        });
      },
      //删除商品
      delGoods(goods) {
        this.$api.admin.delGoods(goods._id).then(res => {
          if (res.status == 0) {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          this.$message.error(err.msg);
        });
      },
      //编辑商品
      handleClick(goods) {
        if(goods){
          this.goods = this._.cloneDeep(goods);
          this.isImgUpload = true;
          this.isBannerImgUpload = true;
          this.isDetailImgUpload = true;
        }else{
          this.isAdd=true;
        }
        this.showDetail = true;
      },
      //删除
      delClick(data) {
        this.$confirm('是否删除此商品?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goodsList.remove(data);
          this.delGoods(data);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      cancel() {
        this.showDetail = false;
        this.goods = {
          _id: "",
          goodsName: "",
          skuList: [],
          type: 0,
          img: "",
          bannerImg: "",
          detailImg: "",
          time: "",
          taste: "",
          flavor: "",
          flavorBase: "",
        };
        this.isImgUpload = false;
        this.isBannerImgUpload = false;
        this.isDetailImgUpload = false;
        this.isAdd = false;
      },

      //上传图片成功 预览图
      imgUploadSuccess(res, file) {
        this.goods.img=res.data.path;
        this.isImgUpload = true;
      },
      //上传图片成功 banner
      bannerImgUploadSuccess(res, file) {
        this.goods.bannerImg=res.data.path;
        this.isBannerImgUpload = true;
      },
      //上传图片成功 detail
      detailImgUploadSuccess(res, file) {
        this.goods.detailImg=res.data.path;
        this.isDetailImgUpload = true;
      },
      // 上传前对文件的一些校验处理
      beforeAvatarUpload(file) {
        // 获取文件对象
        let isJPG;
        //判断图片类型
        if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/JPG') {
          isJPG = true
        } else {
          isJPG = false
        }
        // 判断图片大小
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传产品图片只能是 JPG/PNG/JPEG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传产品图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },

      //删除sku
      delSku(sku){
        this.goods.skuList.remove(sku);
      },
      //删除sku
      addSku(){
        let sku = {
          size: "",//尺码 如31cm*8cm
          weight: "",//重量 如1磅(454g)
          fit: "",//适合2-3人食
          tablewareNum: "",//标配餐具
          price: ""//价格
        };
        this.goods.skuList.push(sku);
      },
      commit(){
        if(this.isAdd){
          delete this.goods._id;
          //新增
          this.$api.admin.addGoods(this.goods)
            .then(res => {
              if (res.status == 0) {
                this.$message.success(res.msg);
                this.cancel();
                this.getGoods();
              } else {
                this.$message.error(res.msg);
              }
            }).catch(err => {
            console.log(err);
          });
          return;
        }
        //修改
        this.$api.admin.changeGoods(this.goods)
          .then(res => {
            if (res.status == 0) {
              this.$message.success(res.msg);
              this.cancel();
              this.getGoods();
            } else {
              this.$message.error(res.msg);
            }
          }).catch(err => {
          console.log(err);
        });
      }
    }
  }
</script>

<style scoped lang="less">
  .goods {
    .img {
      height: 200px;
    }
    .add-goods{
      margin-top: 20px;
    }
  }

  .box-content {
    .box-item {
      display: flex;
      div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
        span {
          min-width: 160px;
        }
      }
    }
    .img-group{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .box-img{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 10px;
      span{
        margin-bottom: 10px;
      }
    }
    .sku-list{
      .sku{
        margin-bottom: 20px;
        padding-left: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .sku-item{
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          span {
            min-width: 80px;
          }
        }
      }
    }
  }
</style>
