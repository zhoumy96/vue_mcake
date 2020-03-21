<template>
  <div class="news">
    <el-table
      :data="newsList"
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
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="内容">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间">
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

    <el-button class="add-news" @click="handleClick(false)">添加新闻</el-button>


    <div class="box" @click.stop="" >
      <el-dialog :visible.sync="showDetail" width="600px" :append-to-body="true" @close='cancel'>
        <div class="box-content" slot="">

          <div>
            <span>标题：</span>
            <el-input v-model='detailData.title' placeholder="请输入标题"></el-input>
          </div>
          <div>
            <span>内容：</span>
            <el-input type="textarea" v-model='detailData.detail' placeholder="请输入内容"></el-input>
          </div>
          <div v-if="!isAdd">
            <span>时间：</span>
            <el-input v-model='detailData.time' placeholder="请输入时间"></el-input>
          </div>

          <div>
            <span>图片：</span>
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              action="http://localhost:3000/admin/upload"
              :on-success="handleUploadSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-show="uploadSuccess" :src="detailData.img" class="avatar">
              <i v-show="!uploadSuccess" class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
    name: "News",
    data: () => {
      return {
        newsList:[],
        showDetail:false,
        detailData:{
          _id:'',
          title:"",
          detail:"",
          img:""
        },
        uploadSuccess:false,
        isAdd:false,
      }
    },
    created() {
      this.getNews();
    },
    methods:{
      getNews(){
        this.$api.admin.getNews()
          .then(res=>{
            this.newsList = res.data;
          }).catch(err=>{
          console.log(err);
        })
      },
      delNews(news){
        this.$api.admin.delNews(news._id).then(res => {
          if (res.status == 0) {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        }).catch(err => {
          this.$message.error(err.msg);
        });
      },
      cancel(){
        this.showDetail = false;
        this.detailData ={
          _id:'',
          title:"",
          detail:"",
          img:""
        };
        this.uploadSuccess = false;
        this.isAdd = false;
      },
      handleClick(data){
        if(data){
          let deepData = this._.cloneDeep(data);
          this.detailData = deepData;
          this.uploadSuccess = true;
        }else{
          this.isAdd = true;
        }
        this.showDetail = true;
      },
      delClick(news){
        this.$confirm('是否删除此新闻?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.newsList.remove(news);
          this.delNews(news);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //上传图片成功
      handleUploadSuccess(res, file){
        this.detailData.img = res.data.path;
        this.uploadSuccess = true;
      },
      // 上传前对文件的一些校验处理
      beforeAvatarUpload(file){
        // 获取文件对象
        // console.log(file);
        //判断图片类型
        if (file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/JPG') {
          var isJPG =  true
        } else {
          isJPG =  false
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
      //提交
      commit(){
        if(this.isAdd){
          this.$api.admin.addNews(this.detailData)
            .then(res=>{
              if (res.status == 0) {
                this.$message.success(res.msg);
                this.cancel();
                this.getNews();
              } else {
                this.$message.error(res.msg);
              }
            }).catch(err=>{
            console.log(err);
          })
          return;
        }
        this.$api.admin.changeNews(this.detailData)
          .then(res=>{
            if (res.status == 0) {
              this.$message.success(res.msg);
              this.cancel();
              this.getNews();
            } else {
              this.$message.error(res.msg);
            }
          }).catch(err=>{
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .news{
    .img{
      height: 100px;
    }
    .add-news{
      margin-top: 20px;
    }
  }
  .box-content{
    div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      span{
        min-width: 60px;
      }
    }
    .avatar{
      height: 100px;
      width: 240px;
      line-height: 100px !important;
    }
  }
</style>
