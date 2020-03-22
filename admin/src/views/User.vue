<template>
  <div class="user">
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="用户名">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="userPwd"-->
<!--        label="密码"-->
<!--        width="180">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="money"
        label="金额">
      </el-table-column>

      <el-table-column
        width="300"
        prop="addressList"
        label="收货地址">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row[scope.column.property]" :key="index">
            <p>
              <span>{{++index}}.</span>
              <span>联系人：</span>
              <span>{{ item.name }}</span>
              <span>收货地址：</span>
              <span>{{ item.address }}</span>
              <span>联系方式：</span>
              <span>{{ item.phone }}</span>
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        width="300"
        prop="cartList"
        label="购物车">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row[scope.column.property]" :key="index">
            <p>
              <span>{{++index}}.</span>
              <span>商品名称：</span>
              <span>{{ item.goodsName }}</span>
              <span>数量：</span>
              <span>{{ item.cartNum }}</span>
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        width="300"
        prop="orderList"
        label="订单">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row[scope.column.property]" :key="index">
            <p>
              <span>{{++index}}.</span>
              <span>订单ID：</span>
              <span>{{ item._id }}</span>
              <span>金额：</span>
              <span>{{ item.totalPrice }}</span>
              <span>状态：</span>
              <span>{{ item.status==0?'未付款':item.status==1?'已付款未发货':item.status==2?'已发货':item.status==-1?'用户取消':'订单已完成'}}</span>
              <el-button v-if="item.status==1"  @click="deliver(scope.row._id,item._id)">发货</el-button>
            </p>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "User",
    data: () => {
      return {
        userList:[],
        showDetail: false,
      }
    },
    created() {
      this.getUser();
    },
    methods:{
      getUser(){
        this.$api.admin.getUser()
          .then(res=>{
            this.userList = res;
          }).catch(err=>{
          console.log(err);
        })
      },
      cancel() {
        this.showDetail = false;
      },
      //发货
      deliver(userId,orderId){
        // console.log(userId);
        // console.log(orderId);
        this.$api.admin.deliver(userId,orderId)
          .then(res=>{
            this.$message.success('发货成功');
            this.getUser();
          }).catch(err=>{
          console.log(err);
        })
      },
    }
  }
</script>

<style scoped>

</style>
