import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import A2HS from './modules/A2HS';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deviceOrientation: 'portrait'
  },
  getters: {
    
  },
  mutations: {
    orientationChanged(state, orientation) {
      state.deviceOrientation = orientation;
    }
  },
  actions: {
    changeOrientation({commit}, orientation) {
      commit('orientationChanged', orientation);
    }
  },
  modules: {
    auth, A2HS
  }
});