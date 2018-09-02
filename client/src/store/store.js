import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import A2HS from './modules/A2HS';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deviceOrientation: 'portrait',
    navSearchOpen: false,
    notification: {
      content: 'REPLACE ME',
      duration: 1000, // ms
      alert: 'info' // color settings
    }
  },
  getters: {
    navSearchIsOpen(state) {
      return state.navSearchOpen;
    },
    notificationSettings(state) {
      return state.notification;
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
    },
    notificationChanged(state, changes) {
      state.notification = {
        content: changes.content || 'REPLACE ME',
        duration: changes.duration || 1000,
        alert: changes.alert || 'info'
      }
    }
  },
  actions: {
    changeOrientation({commit}, orientation) {
      commit('orientationChanged', orientation);
    },
    changeNavSearchOpenState({commit}, value) {
      commit('navSearchOpenChanged', value);
    },
    changeNotification({commit}, changes) {
      commit('notificationChanged', changes);
    }
  },
  modules: {
    auth, A2HS
  }
});