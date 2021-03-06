import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload';
import api from './api'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyload);
Vue.prototype.$api = api; // 将api挂载到vue的原型上


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const router = to.path == '/my' || to.path == '/cart' || to.path == '/pay';
  if (!token && router) {
    next('/login');
  } else {
    next();
  }
});

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
