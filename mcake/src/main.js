import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message, Select, Option, Dialog, Row, Col, Button,} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload';
import api from './api'

Vue.config.productionTip = false;
Vue.use(Select);
Vue.use(Option);
Vue.use(Dialog);
Vue.use(Row);
Vue.use(Col);
Vue.use(Button);
Vue.prototype.$message = Message;
Vue.use(VueLazyload);
Vue.prototype.$api = api; // 将api挂载到vue的原型上

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if(!token && to.path == '/my'){
    next('/login');
  }else{
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
