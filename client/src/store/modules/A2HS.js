const state = {
  launchedAsPWA: false,
  showPWAOverlay: false,
  deferredPrompt: null
};

const getters = {
  showPWAOverlay(state) {
    return state.showPWAOverlay
  },
  showPWAButton(state) {
    return !state.launchedAsPWA
  },
  deferredPrompt(state) {
    return state.deferredPrompt
  }
};

const mutations = {
  togglePWAOverlay(state) {
    state.showPWAOverlay = !state.showPWAOverlay;
  },
  hidePWAButton(state) {
    state.launchedAsPWA = true;
  },
  setDeferredPrompt(state, prompt) {
    state.deferredPrompt = prompt;
  }
};

const actions = {
  togglePWAOverlay({commit}) {
    commit('togglePWAOverlay');
  },
  hidePWAButton({commit}) {
    commit('hidePWAButton');
  },
  setDeferredPrompt({commit}, prompt) {
    commit('setDeferredPrompt', prompt)
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}