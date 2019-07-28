import SiteSettings from '@/constants/SiteSettings';

const state = {
  ...SiteSettings
};

const getters = {
  sitesettings(state) {
    return {...state}
  }
};

export default {
  state,
  getters
}