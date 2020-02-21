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
}

export default user;
