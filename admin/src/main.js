import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload';
import api from './api'
import _ from 'lodash'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyload);
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype._ = _;
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
}).$mount('#app')
