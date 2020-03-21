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
        userList:[]
      }
    },
    created() {
      this.$api.admin.getUser()
      .then(res=>{
        this.userList = res;
      }).catch(err=>{
        console.log(err);
      })
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
