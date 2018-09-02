<template>
  <div>
    <b class="route-title" v-if="routeTitle != ''">{{routeTitle}}</b>
    
    <div class="header-buttons" :class="{'header-buttons--layout-small': layoutSmall}">
      <button 
        class="btn-icon btn-icon--large btn-icon--animate" 
        :class="{'btn-icon--search': searchOpen}" 
        @click="toggleSearch" 
        v-if="layoutSmall">
        <icon-base iconName="search" iconColor="#fff" width="24" height="24">
          <transition name="icon-scale">
            <icon-search v-if="!searchOpen"/>
            <icon-arrow-back v-else/>
          </transition>
        </icon-base>
      </button>

      <div v-if="layoutSmall">
        <transition name="fade">
          <div class="searchbar-in-nav" v-show="searchOpen" ref="searchref">
            <search-bar @blurSearch="searchOpen = false"/>
          </div>
        </transition>
      </div>
      <div v-else>
        <div class="searchbar-in-nav">
          <search-bar />
        </div>
      </div>

      <button class="btn-icon btn-icon--large">
        <icon-base iconName="account" iconColor="#fff" width="24" height="24">
          <icon-beach-access v-if="isLoggedIn"/>
          <icon-account v-else/>
        </icon-base>
      </button>
    </div>

  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconSearch from '@/components/icons/IconSearch';
import IconAccount from '@/components/icons/IconAccount';
import IconBeachAccess from '@/components/icons/IconBeachAccess';
import IconArrowBack from '@/components/icons/IconArrowBack';

import SearchBar from '@/components/search/SearchBar';

export default {
  components: {
    IconBase, IconSearch, IconAccount, IconBeachAccess, IconArrowBack, SearchBar
  },
  data() {
    return {
      searchOpen: false
    }
  },
  computed: {
    routeTitle() {
      return this.$route.meta.title || '';
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    layoutSmall() {
      return this.$store.getters.deviceLayoutIsSmall;
    }
  },
  methods: {
    toggleSearch() {
      this.searchOpen = !this.searchOpen;
      this.$route.meta.searchOpen = true;
      console.log(this.$route)
      if (this.searchOpen) {
        this.$nextTick(() => {
          this.$refs.searchref.querySelector('input').focus();
        })
      }
    }
  }
}
</script>
