const getLocalStorageValue = (key, defaultValue) => {
  if (localStorage.getItem(key)) {
    try {
      const val = JSON.parse(localStorage.getItem(key));
      return val
    } catch(e) {
      console.error('Failed to parse as JSON from localStorage: ', key)
      // localStorage.removeItem(key);
      return null;
    }
  } else if (defaultValue) {
    return defaultValue;
  }

  return null;
}

const setLocalStorageValue = (key, newVal) => {
  const parsed = JSON.stringify(newVal);
  localStorage.setItem(key, parsed);
}


const SETTINGS_STORAGE_KEY = 'localSettings';

const state = {
  localSettings: getLocalStorageValue(SETTINGS_STORAGE_KEY, {
    darkmode: false,
    preferReducedMotion: false
  })
};

const getters = {
  localSettings(state) {
    return state.localSettings
  }
};

const mutations = {
  updateLocalSetting(state, {key, val}) {
    state.localSettings[key] = val;
    //state.localSettings = {...state.localSettings, [key]: val} // TODO: which way is most performant
    setLocalStorageValue(SETTINGS_STORAGE_KEY, state.localSettings)
  }
};

const actions = {
  updateLocalSetting({commit}, update) {
    commit('updateLocalSetting', update);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}