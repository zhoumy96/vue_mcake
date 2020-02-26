import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: '',
    user: {},
    order:{},//下单的信息
  },
  mutations: {
    userStatus(state, data) {
      if (data) {
        state.isLogin = true;
        state.token = data.token;
        state.user = data.user;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        state.isLogin = false;
        state.token = '';
        state.user = {};
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    userAddress(state,address){
      state.user.addressList = address;
      // console.log(`state.user is ${JSON.stringify(state.user)}`);
      localStorage.setItem('user', JSON.stringify(state.user));
    },

    order(state,data){
      state.order = data;//临时保存
    }
  },
  actions: {
    setUser({commit}, data) {
      commit('userStatus', data)
    },
    setAddress({commit}, address){
      commit('userAddress', address)
    },
    setOrder({commit}, order){
      commit('order', order)
    }
  },
  getters: {
    getUser: state => state.user || localStorage.getItem('user'),
    getToken: state => state.token || localStorage.getItem('token'),
    isLogin: state => state.isLogin,

    getAddress:(state)=>{
        return state.user.addressList
    },
    getOrder:state => state.order,
  },
})
