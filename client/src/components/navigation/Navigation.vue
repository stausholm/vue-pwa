<template>
  <div class="page-header">
    <div class="container">
      <div class="logo">
        <router-link to="/">LOGO</router-link>
      </div>

      <!-- Only show nav on desktop -->
      <div class="header-navigation">
        <div class="hamburger">
          <button class="btn-icon btn-icon--large">
            <icon-base iconName="Hamburger menu" iconColor="#fff" width="24" height="24">
                <icon-menu />
            </icon-base>
          </button>
        </div>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/">Bean</router-link>
        </nav>

        <div class="header-buttons">
          <!-- Make search component -->
          <search-bar />
          <!-- Only show search component on desktop, and open search page on mobile? -->


          <!-- If on mobile -->
          <router-link class="account-icon btn-icon btn-icon--large account-icon-mobile" to="/account" tag="button">
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
                <!-- stats and icon + email could be their own component -->
                <account-card />
                <router-link to="/account">Settings</router-link>
                <a @click.prevent="logout">Logout</a>
              </div>
              <div v-else>
                <!-- Make own component -->
                sign in with Google, Facebook | Email
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
import SearchBar from '../search/SearchBar';
import AccountCard from '../account/AccountCard';

export default {
  name: 'Navigation',
  components: {
    IconBase, IconMenu, IconAccount, IconBeachAccess, SearchBar, AccountCard
  },
  data() {
    return {
      showAccountDropdown: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login');
        })
    }
  },
}
</script>

