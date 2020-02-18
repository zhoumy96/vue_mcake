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
  }

}

export default user;
