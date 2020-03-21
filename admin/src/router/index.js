import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children:[
      {
        path: 'news',
        name: 'news',
        component: () => import("../views/News.vue")
      },
      {
        path: 'user',
        name: 'user',
        component: () => import("../views/User.vue")
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import("../views/Goods.vue")
      },
      {
        path: 'order',
        name: 'order',
        component: () => import("../views/Order.vue")
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
