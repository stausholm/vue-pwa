import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import A2HS from './modules/A2HS';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deviceOrientation: 'portrait',
    navSearchOpen: false
  },
  getters: {
    navSearchIsOpen(state) {
      return state.navSearchOpen;
    }
  },
  mutations: {
    orientationChanged(state, orientation) {
      state.deviceOrientation = orientation;
    },
    navSearchOpenChanged(state, value) {
      state.navSearchOpen = value;
      if (value) {
        document.body.classList.add('overlay-active');
      } else {
        document.body.classList.remove('overlay-active');
      }
    }
  },
  actions: {
    changeOrientation({commit}, orientation) {
      commit('orientationChanged', orientation);
    },
    changeNavSearchOpenState({commit}, value) {
      commit('navSearchOpenChanged', value);
    }
  },
  modules: {
    auth, A2HS
  }
});