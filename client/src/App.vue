<template>
  <div id="app">
    <app-navigation />
    <bottom-nav />
    <header>
      <span>Vue.js PWA</span>
      <span><router-link to="/">Home</router-link></span>
      <span><router-link to="/example">Example</router-link></span>
      <span><router-link to="/exampleWithAuth">Example auth</router-link></span>
      <span><router-link to="/exampleWithAuthRole">Example auth role</router-link></span>
      <span v-if="!isLoggedIn"><router-link to="/login">Login</router-link></span>
      <span v-if="!isLoggedIn"><router-link to="/register">Register</router-link></span>
      <span v-if="isLoggedIn"><a @click.prevent="logout">Logout</a></span>
    </header>
    <a2hs-button v-if="showPWAButton"/>
    <main>
      <router-view></router-view>
    </main>
    <a2hs-overlay v-if="showPWAOverlay"/>
  </div>
</template>

<script>
import Navigation from './components/navigation/navigation';
import BottomNav from './components/navigation/bottomnav';
import A2HSOverlay from './components/A2HS/A2HSoverlay';
import A2HSButton from './components/A2HS/A2HSbutton';

import handleOrientationChange from './utils/orientationChange';

export default {
  name: 'app',
  components: {
    'app-navigation': Navigation,
    BottomNav,
    'a2hs-overlay': A2HSOverlay,
    'a2hs-button': A2HSButton
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    showPWAOverlay() {
      return this.$store.getters.showPWAOverlay
    },
    showPWAButton() {
      return this.$store.getters.showPWAButton
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
  created() {
    // handle expired token
    this.$http.interceptors.response.use(undefined, function (err) { // intercept axios to see if we get 401 Unauthorized. If so, token has expired and dispatch "logout" action
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });


    fetch('http://localhost:3000/auth/bean')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      })
      .catch((err) => {
        console.log(err);
      });

    // hide pwa button if launched as pwa
    if(window.location.search.includes('source=pwa')) {
      console.log('app was launched as a pwa')
      this.$store.dispatch('hidePWAButton')
    }

    // viewport orientation change listener
    handleOrientationChange(this);
  }
}
</script>