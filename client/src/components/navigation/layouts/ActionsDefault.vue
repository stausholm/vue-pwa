<template>
  <div>
    <div class="nav-a2hs" v-if="showPWAButton">
      <a2hs-button class="btn-icon a2hs-button"/>
    </div>
    <div class="nav-search">
      <button class="search-btn btn-icon" v-if="useSmallLayout" @click="toggleSearch">
        <icon-base iconName="open search" width="24" height="24">
          <icon-search />
        </icon-base>
      </button>
      <search-bar v-else @searchterm="handleSearch"/>
    </div>
    <div class="nav-avatar dropdown-wrapper">
      <button class="avatar-btn btn-icon" @click="handleAvatarClick">
        <img src="test.png" alt="">
      </button>

      <transition name="slide-up">
        <div class="nav-avatar__dropdown dropdown" v-if="!useSmallLayout && showAvatarDropdown" v-click-outside="hideDropdown">
          <div v-if="isLoggedIn">
            <account-card />
            <router-link to="/account" @click.native="hideDropdown">Settings</router-link>
            <a @click.prevent="logout">Logout</a>
          </div>
          <div v-else>
            <sign-in-sign-up @click.native="hideDropdown"/>
            <router-link to="/account" @click.native="hideDropdown">Settings</router-link>
          </div>
        </div>
      </transition>
    </div>

    <transition name="fade">
      <div class="nav-search-overlay" v-if="useSmallLayout && showMobileSearch">
        <button class="search-btn btn-icon" @click="toggleSearch">
          <icon-base iconName="close search" width="24" height="24">
            <icon-close />
          </icon-base>
        </button>
        <div class="search-wrapper">
          <search-bar :focusOnMount="true" @searchString="toggleSearch" @searchterm="handleMobileSearch"/>
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

import A2HSButton from '@/components/A2HS/A2HSbutton';

import AccountCard from '@/components/account/AccountCard';
import SignInSignUp from '@/components/account/SignInSignUp';

export default {
  name: 'ActionsDefault',
  components: {
    IconBase,
    IconSearch,
    IconClose,
    SearchBar,
    'a2hs-button': A2HSButton,
    AccountCard,
    SignInSignUp
  },
  data() {
    return {
      layoutSize: window.innerWidth,
      MQ: Breakpoints,
      showMobileSearch: false,
      showAvatarDropdown: false
    }
  },
  computed: {
    showPWAButton() {
      return this.$store.getters.showPWAButton
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    useSmallLayout() {
      return this.layoutSize < this.MQ.md;
    }
  },
  methods: {
    resizeWatcher() {
      this.layoutSize = window.innerWidth;
    },
    toggleSearch() {
      this.showMobileSearch = !this.showMobileSearch;

      document.body.classList.toggle('search-open')
    },
    handleMobileSearch(searchResult) {
      this.toggleSearch();
      this.handleSearch(searchResult)
    },
    handleAvatarClick() {
      if (this.useSmallLayout) {
        // small screen: go to account page
        this.$router.push('/account');
      } else {
        // large screen: show dropdown instead
        this.showAvatarDropdown = !this.showAvatarDropdown;
      }
    },
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.hideDropdown();
          this.$router.replace('/');
        })
    },
    hideDropdown() {
      console.log('hiding dropdown')
      this.showAvatarDropdown = false;
    },
    handleSearch(searchResult) {
      console.log(searchResult)
      this.$store.dispatch('changeNotification', {
        content: 'TODO: handle result #' + JSON.stringify(searchResult), 
        duration: 40000,
        theme: 'warning', 
        label: 'dismiss'})
    }
  },
  created() {
    window.addEventListener('resize', this.resizeWatcher)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeWatcher)
  }
}
</script>
