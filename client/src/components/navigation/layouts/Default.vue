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
          <icon-search v-if="!searchOpen"/>
          <transition name="icon-scale">
            <icon-arrow-back v-if="searchOpen"/>
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

      <div class="dropdown-wrapper" v-if="!searchOpen">
        <button class="btn-icon btn-icon--large" @click="handleAccount">
          <icon-base iconName="account" iconColor="#fff" width="24" height="24">
            <icon-beach-access v-if="isLoggedIn"/>
            <icon-account v-else/>
          </icon-base>
        </button>

        <transition name="slide-up">
          <div class="dropdown" v-if="showAccountDropdown && !layoutSmall" v-click-outside="hideDropdown">
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

import AccountCard from '@/components/account/AccountCard';
import SignInSignUp from '@/components/account/SignInSignUp';

export default {
  components: {
    IconBase, IconSearch, IconAccount, IconBeachAccess, IconArrowBack, SearchBar, AccountCard, SignInSignUp
  },
  data() {
    return {
      searchOpen: false,
      showAccountDropdown: false
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
      if (this.searchOpen) {
        this.$nextTick(() => {
          this.$refs.searchref.querySelector('input').focus();
        })
      }
    },
    handleAccount() {
      if(this.layoutSmall) {
        this.$router.push('/account');
      } else {
        this.showAccountDropdown = !this.showAccountDropdown;
      }
    },
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login');
        })
    },
    hideDropdown() {
      console.log('hiding dropdown')
      this.showAccountDropdown = false;
    }
  }
}
</script>
