import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/goods/:type',
    name: 'goods',
    component: resolve => require(['../views/Goods/Goods.vue'], resolve),
  },
  {
    path: '/goodsDetail/:goodsId',
    name: 'goodsDetail',
    component: resolve => require(['../views/Goods/GoodsDetail.vue'], resolve),
  },
  {
    path: '/news',
    name: 'news',
    component: resolve => require(['../views/News/News.vue'], resolve),
  },
  {
    path: '/newsDetail/:newsId',
    name: 'newsDetail',
    component: resolve => require(['../views/News/NewsDetail.vue'], resolve),
  },
  {
    path: '/my',
    name: 'my',
    component: resolve => require(['../views/My/My.vue'], resolve),
    children: [
      {
        path: 'address',
        name: 'address',
        component: resolve => require(['../views/My/Address.vue'], resolve),
      },
      // {
      //   path: 'trace',
      //   name: 'Trace',
      //   component: Trace
      // }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    component: resolve => require(['../views/Cart.vue'], resolve),
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['../views/Login.vue'], resolve),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
