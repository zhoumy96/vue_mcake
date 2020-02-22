import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Message, MessageBox, Select, Option, Dialog, Row, Col, Button, Table, TableColumn,
  Form, FormItem, Input
} from 'element-ui';
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
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox;
Vue.use(VueLazyload);
Vue.prototype.$api = api; // 将api挂载到vue的原型上

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token && to.path == '/my') {
    next('/login');
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
