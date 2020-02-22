<template>
  <div class="addressContent">
    <el-table
      stripe
      :data="addressList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="收货人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="收货地址">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="changeAddress(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteAddress(scope.row._id)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="addressBoxVisible = true">新增收货地址</el-button>
    </div>


    <!--  新增收货地址 -->
    <el-dialog title="收货地址" :visible.sync="addressBoxVisible">
      <el-form ref="form" :model="newAddress" label-width="80px">
        <el-form-item label="收货人">
          <el-input v-model="newAddress.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="newAddress.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input v-model="newAddress.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="cartBoxFooter">
        <el-button @click="addressBoxVisible = false">取消</el-button>
        <el-button @click="addAddress">保存</el-button>
      </div>
    </el-dialog>

    <!--  编辑收货地址 -->
    <el-dialog title="收货地址" :visible.sync="addressBoxVisible2">
      <el-form ref="form" :model="address" label-width="80px">
        <el-form-item label="收货人">
          <el-input v-model="address.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="address.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货地址">
          <el-input v-model="address.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="cartBoxFooter">
        <el-button @click="addressBoxVisible2 = false">取消</el-button>
        <el-button @click="changeCommit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {mapActions,mapGetters} from 'vuex';
  export default {
    name: "Address",
    data: () => {
      return {
        addressList: [],
        addressBoxVisible:false,
        newAddress:{
          name:"",
          phone:"",
          address:"",
        },

        addressBoxVisible2:false,
        address:{
          name:"",
          phone:"",
          address:"",
        },
      }
    },
    mounted() {
      this.addressList = this.$store.state.user.addressList;
    },
    methods: {
      ...mapActions(['setAddress']),
      //新增收货地址
      addAddress(){
        let newAddress = this.newAddress;
        if(this.testAddress(newAddress)){
          this.$api.user.addAddress(newAddress)
            .then(res => {
              this.$message({
                type: 'success',
                message: res.msg
              });
              this.addressList = res.data;
              this.setAddress(res.data);
              this.newAddress={
                name:"",
                phone:"",
                address:"",
              };
              this.addressBoxVisible = false;
            }).catch(err => {
            this.$message.error(err.msg);
          })
        }

      },
      //删除收货地址
      deleteAddress(id) {
        this.$confirm('是否删除此收货地址?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.user.deleteAddress(id)
            .then(res => {
              if (res.status == 0) {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                });
              }
              this.addressList = res.data;
              this.setAddress(res.data);
            }).catch(err => {
            this.$message({
              type: 'info',
              message: err.msg
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //修改收获地址
      changeAddress(address){
        this.address = Object.assign({},address);
        this.addressBoxVisible2 = true;
      },
      //确认修改收货地址
      changeCommit(){
        let address = this.address;
        if(this.testAddress(address)){
          this.$api.user.changeAddress(address._id,address)
            .then(res=>{
              if (res.status == 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                });
              }
              this.addressList = res.data;
              this.addressBoxVisible2 = false;
              this.setAddress(res.data);
            }).catch(err=>{
            this.$message.error(err.msg);
          })
        }
      },
      //测试地址是否正确
      testAddress(address){
        if(address.name==''){
          this.$message.warning('请输入收货人！');
          return false;
        }else if(address.phone==''){
          this.$message.warning('请输入联系方式！');
          return false;
        }else if(address.address==''){
          this.$message.warning('请输入收货地址！');
          return false;
        }
        return true;
      }
    }
  }
</script>

<style lang="less">
  .addressContent {
    margin-top: 22px;

    .addressItem {
      display: flex;

      span {
        font-size: 14px;
        margin-right: 16px;
      }
    }
  }
</style>
