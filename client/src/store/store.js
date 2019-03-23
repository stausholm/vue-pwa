import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import A2HS from './modules/A2HS';
import sitesettings from './modules/sitesettings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    deviceOrientation: 'portrait',
    deviceLayoutSmall: true,
    navSearchOpen: false,
    notification: {
      content: 'REPLACE ME',
      duration: 1000, // ms
      theme: 'default', // color settings,
      action: null,
      label: 'Dismiss',
      dismissable: true
    }
  },
  getters: {
    navSearchIsOpen(state) {
      return state.navSearchOpen;
    },
    notificationSettings(state) {
      return state.notification;
    },
    deviceLayoutIsSmall(state) {
      return state.deviceLayoutSmall;
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
        theme: changes.theme || 'default',
        action: changes.action || null,
        label: changes.label || '',
        dismissable: changes.dismissable || true
      }
    },
    layoutSizeChanged(state, bool) {
      state.deviceLayoutSmall = bool;
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
    },
    changeDeviceLayout({commit}, bool) {
      commit('layoutSizeChanged', bool);
    }
  },
  modules: {
    auth, A2HS, sitesettings
  }
});