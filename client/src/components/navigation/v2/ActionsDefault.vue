<template>
  <div>
    <div class="nav-search">
      <!-- <button class="search-btn btn-icon btn-icon--animate" v-if="layoutSize < MQ.md" @click="toggleSearch">
        <icon-base iconName="search" width="24" height="24">
          <transition name="icon-scale">
            <icon-close v-if="showMobileSearch" />
            <icon-search v-else />
          </transition>
        </icon-base>
      </button> -->
      <button class="search-btn btn-icon" v-if="layoutSize < MQ.md" @click="toggleSearch">
        <icon-base iconName="open search" width="24" height="24">
          <icon-search />
        </icon-base>
      </button>
      <search-bar v-else />
    </div>
    <div class="nav-avatar">
      <button class="avatar-btn btn-icon">
        <img src="test.png" alt="">
      </button>
    </div>

    <transition name="fade">
      <div class="nav-search-overlay" v-if="layoutSize < MQ.md && showMobileSearch">
        <button class="search-btn btn-icon" @click="toggleSearch">
          <icon-base iconName="close search" width="24" height="24">
            <icon-close />
          </icon-base>
        </button>
        <div class="search-wrapper">
          <search-bar :focusOnMount="true" @searchString="toggleSearch" @searchterm="toggleSearch"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Breakpoints from '@/constants/Breakpoints';

import IconBase from '@/components/icons/IconBase';
import IconSearch from '@/components/icons/IconSearch';
import IconClose from '@/components/icons/IconClose';
import SearchBar from '@/components/search/SearchBar';

export default {
  name: 'ActionsDefault',
  components: {
    IconBase,
    IconSearch,
    IconClose,
    SearchBar
  },
  data() {
    return {
      layoutSize: window.innerWidth,
      MQ: Breakpoints,
      showMobileSearch: false
    }
  },
  computed: {
  },
  methods: {
    resizeWatcher() {
      this.layoutSize = window.innerWidth;
    },
    toggleSearch() {
      this.showMobileSearch = !this.showMobileSearch;

      document.body.classList.toggle('search-open')
    }
  },
  created() {
    window.addEventListener('resize', this.resizeWatcher)
  },
  beforeDestroy() {
    window.removeEventListener(this.resizeWatcher)
  }
}
</script>
