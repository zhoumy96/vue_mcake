import axios from './http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const goods = {
  // 商品列表
  goodsList (type) {
    return axios.get(`goods/getGoods`,{
      params: {
        type
      }
    });
  },
  // 商品详情
  goodsDetail (goodsId) {
    return axios.post(`goods/goodsDetail`, {
      goodsId
    });
  },
  // 添加商品到购物车
  addCart(goods){
    return axios.post(`goods/addCart`, goods);
  }

}

export default goods;
