import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import A2HS from './modules/A2HS';
import sitesettings from './modules/sitesettings';
import applicationSettings from './modules/applicationSettings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //deviceOrientation: 'portrait',
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
    notificationSettings(state) {
      return state.notification;
    }
  },
  mutations: {
    // orientationChanged(state, orientation) {
    //   state.deviceOrientation = orientation;
    // },
    notificationChanged(state, changes) {
      state.notification = {
        content: changes.content || 'REPLACE ME',
        duration: changes.duration || 1000,
        theme: changes.theme || 'default',
        action: changes.action || null,
        label: changes.label || '',
        dismissable: changes.dismissable || true
      }
    }
  },
  actions: {
    // changeOrientation({commit}, orientation) {
    //   commit('orientationChanged', orientation);
    // },
    changeNotification({commit}, changes) {
      commit('notificationChanged', changes);
    }
  },
  modules: {
    auth, A2HS, sitesettings, applicationSettings
  }
});