import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const admin = {
  //登录
  signIn(userName, userPwd) {
    return axios.post(`admin/signIn`, {
      userName, userPwd
    });
  },
  //查询用户信息
  getUser() {
    return axios.get(`user/users`);
  },
  // 获取新闻
  getNews(){
    return axios.get(`news/getNews`, );
  },
  //新增新闻
  addNews(news){
    return axios.post(`news/addNews`, news);
  },
  //修改新闻
  changeNews(news){
    return axios.post(`news/changeNews`, news);
  },
  //删除新闻
  delNews(id){
    return axios.post(`news/delNews`, {id});
  },
  //新增商品
  addGoods(goods){
    return axios.post(`goods/addGoods`, goods);
  },
  //修改商品
  changeGoods(goods){
    return axios.post(`goods/changeGoods`, goods);
  },
  //删除商品
  delGoods(id){
    return axios.post(`goods/delGoods`, {id});
  },

  //发货
  deliver(userId,orderId){
    return axios.post(`admin/deliver`, {userId,orderId});
  }

};

export default admin;
