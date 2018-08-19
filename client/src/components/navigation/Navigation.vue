<template>
  <div class="navigation">
    <div class="container">
      <div class="logo">
        <router-link to="/">LOGO</router-link>
      </div>

      <!-- Only show nav on desktop -->
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/">Bean</router-link>
      </nav>

      <div class="header-links">
        <!-- Make search component -->
        <div class="search">O\</div>
        <!-- Only show search component on desktop, and open search page on mobile? -->


        <!-- If on mobile -->
        <router-link to="/account">ACCOUNT</router-link>
        <!-- If on desktop -->
        <div>
          <button class="account-icon" @click="showAccountDropdown = !showAccountDropdown">
            <icon-base iconName="account dropdown" iconColor="#fff" width="24" height="24">
              <icon-beach-access v-if="isLoggedIn"/>
              <icon-casino v-else/>
            </icon-base>
          </button>
          <div class="dropdown" v-if="showAccountDropdown">
            <div v-if="isLoggedIn">
              <!-- stats and icon + email could be their own component -->
              <div>
                <icon-base iconName="account" iconColor="#fff" width="48" height="48">
                  <!-- Account icon -->
                  <icon-beach-access /> 
                </icon-base>
                <p>ACCOUNT EMAIL</p>
              </div>
              <div class="dropdown-stats">
                <ul>
                  <li><b>Saved recipes: </b>25</li>
                  <li><b>Drinks: </b>7</li>
                  <li><b>Food: </b>18</li>
                </ul>
              </div>
              <router-link to="/account">Settings</router-link>
              <a @click.prevent="logout">Logout</a>
            </div>
            <div v-else>
              <!-- Make own component -->
              sign in with Google, Facebook | Email
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '../icons/IconBase';
import IconCasino from '../icons/IconCasino';
import IconBeachAccess from '../icons/IconBeachAccess';

export default {
  name: 'Navigation',
  components: {
    IconBase, IconCasino, IconBeachAccess
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

<style lang="scss" scoped>
.navigation {
  background: red;
}
</style>
