const state = {
  launchedAsPWA: false,
  showPWAOverlay: false
};

const getters = {
  showPWAOverlay(state) {
    return state.showPWAOverlay
  },
  showPWAButton(state) {
    return !state.launchedAsPWA
  }
};

const mutations = {
  togglePWAOverlay(state) {
    state.showPWAOverlay = !state.showPWAOverlay;
  },
  hidePWAButton(state) {
    state.launchedAsPWA = true;
  }
};

const actions = {
  togglePWAOverlay({commit}) {
    commit('togglePWAOverlay');
  },
  hidePWAButton({commit}) {
    commit('hidePWAButton');
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}