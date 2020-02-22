import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    token: '',
    user: {}
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
    }
  },
  actions: {
    setUser({commit}, data) {
      commit('userStatus', data)
    },
    setAddress({commit}, address){
      commit('userAddress', address)
    }
  },
  getters: {
    getUser: state => state.user || localStorage.getItem('user'),
    getToken: state => state.token || localStorage.getItem('token'),
    isLogin: state => state.isLogin,
  },
})
