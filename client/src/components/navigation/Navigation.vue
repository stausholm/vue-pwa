<template>
  <div class="page-header" :class="{'fixed-header': fixed, 'header-scroll-hide': hide}">
    <div class="container">
      <div class="logo">
        <router-link to="/">LOGO</router-link>
      </div>

      <!-- Only show nav on desktop -->
      <div class="header-navigation">
        <div class="hamburger" v-if="!navSearchIsOpen && !showBack">
          <button class="btn-icon btn-icon--large">
            <icon-base iconName="Hamburger menu" iconColor="#fff" width="24" height="24" key="menu">
              <icon-menu />
            </icon-base>
          </button>
        </div>
        <div class="hamburger" v-if="!navSearchIsOpen && showBack" key="back">
          <button class="btn-icon btn-icon--large" @click="$router.go(-1)">
            <icon-base iconName="go back menu" iconColor="#fff" width="24" height="24">
              <icon-arrow-back />
            </icon-base>
          </button>
        </div>
        <div class="hamburger" v-if="navSearchIsOpen" key="searchcancel">
          <button class="btn-icon btn-icon--large" @click="closeSearch">
            <icon-base iconName="cancel search" iconColor="#fff" width="24" height="24">
              <icon-arrow-back />
            </icon-base>
          </button>
        </div>

        <b class="route-title" v-if="routeTitle != ''">{{routeTitle}}</b>

        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/example">Example</router-link>
          <router-link to="/exampleWithAuth">Example auth</router-link>
          <router-link to="/exampleWithAuthRole">Example auth role</router-link>
          <router-link to="/search">Search</router-link>
        </nav>

        <div class="header-buttons">
          <!-- Make search component -->
          

          <search-bar />
          <!-- Only show search component on desktop, and open search page on mobile? -->


          <!-- If on mobile -->
          <router-link class="account-icon btn-icon btn-icon--large account-icon-mobile" to="/account" tag="button" v-if="!navSearchIsOpen">
            <icon-base iconName="account" iconColor="#fff" width="24" height="24">
              <icon-beach-access v-if="isLoggedIn"/>
              <icon-account v-else/>
            </icon-base>
          </router-link>
          <!-- If on desktop -->
          <div class="dropdown-wrapper">
            <button class="account-icon btn-icon btn-icon--large" @click="showAccountDropdown = !showAccountDropdown">
              <icon-base iconName="account dropdown" iconColor="#fff" width="24" height="24">
                <icon-beach-access v-if="isLoggedIn"/>
                <icon-account v-else/>
              </icon-base>
            </button>
            <div class="dropdown" v-if="showAccountDropdown">
              <div v-if="isLoggedIn">
                <account-card />
                <router-link to="/account">Settings</router-link>
                <a @click.prevent="logout">Logout</a>
              </div>
              <div v-else>
                <sign-in-sign-up />
                <router-link to="/account">Settings</router-link>
              </div>
            </div>
          </div> <!-- .dropdown-wrapper -->

        </div> <!-- .header-buttons -->

      </div> <!-- .header-navigation -->
    </div> <!-- .container -->
  </div>
</template>

<script>
import IconBase from '../icons/IconBase';
import IconMenu from '../icons/IconMenu';
import IconAccount from '../icons/IconAccount';
import IconBeachAccess from '../icons/IconBeachAccess';
import IconSearch from '../icons/IconSearch';
import IconArrowBack from '../icons/IconArrowBack';
import SearchBar from '../search/SearchBar';
import AccountCard from '../account/AccountCard';
import SignInSignUp from '../account/SignInSignUp';

export default {
  name: 'Navigation',
  components: {
    IconBase, IconMenu, IconAccount, IconBeachAccess, IconSearch, IconArrowBack, SearchBar, AccountCard, SignInSignUp
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    hideOnScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hide: false,
      prevScrollPos: null,
      currentScrollPos: null,
      showAccountDropdown: false,
      searchOpen: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    navSearchIsOpen() {
      return this.$store.getters.navSearchIsOpen
    },
    routeTitle() {
      return this.$route.meta.title || '';
    },
    showBack() { // show back button instead of hamburger
      return this.$route.meta.enableBack;
    },
    overwriteHide() { // page has defined that header should not hide on scroll
      this.hide = false;
      return this.$route.meta.overwriteHide;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login');
        })
    },
    openSearch() {
      this.searchOpen = true;
    },
    closeSearch() {
      this.$store.dispatch('changeNavSearchOpenState', false);
    },
    scrollHide() {
      this.prevScrollPos = window.scrollY;
      window.onscroll = () => {
        if (this.overwriteHide) {
          return this.hide = false;
        }
        this.currentScrollPos = window.scrollY;
        if(this.prevScrollPos > this.currentScrollPos) {
          this.hide = false;
        } else {
          this.hide = true;
        }
        this.prevScrollPos = this.currentScrollPos;
      }
    }
  },
  created() {
    if(this.fixed) {
      document.documentElement.classList.add('has-fixed-header')
    }

    if(this.hideOnScroll) {
      this.scrollHide();
    }
  }
}
</script>

