import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const user = {
  //注册
  signUp(userName,userPwd){
    return axios.post(`user/signUp`, {
      userName,userPwd
    });
  },
  //登录
  signIn(userName,userPwd){
    return axios.post(`user/signIn`, {
      userName,userPwd
    });
  },
  //查询用户信息
  getUser(){
    return axios.get(`user/getUser`);
  },
  //充值
  recharge(money){
    return axios.post(`user/recharge`, {
      money
    });
  },
  //新增收获地址
  addAddress(address){
    return axios.post(`user/addAddress`, {
      address
    });
  },
  // 删除收获地址
  deleteAddress(id){
    return axios.post(`user/deleteAddress`, {
      id
    });
  },
  // 编辑收获地址
  changeAddress(id,address){
    return axios.post(`user/changeAddress`, {
      id,address
    });
  },
  // 添加商品到购物车
  addCart(goods){
    return axios.post(`user/addToCart`, {
      goods
    });
  },
  // 保存整个购物车
  saveCart(cart){
    return axios.post(`user/saveCart`, {
      cart
    });
  },

}

export default user;
