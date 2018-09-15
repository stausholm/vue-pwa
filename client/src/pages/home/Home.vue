<template>
  <div>
    <hero-block-split :background="['image', 'fade']"/>
    <div class="container--content">
      <h1>this is home</h1>
      <offline />
      <header>
        <span v-if="!isLoggedIn"><router-link to="/login">Login</router-link></span>
        <span v-if="!isLoggedIn"><router-link to="/register">Register</router-link></span>
        <span v-if="isLoggedIn"><a @click.prevent="logout">Logout</a></span>
      </header>
      <a2hs-button v-if="showPWAButton"/>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/example">Example</router-link>
        <router-link to="/exampleWithAuth">Example auth</router-link>
        <router-link to="/exampleWithAuthRole">Example auth role</router-link>
        <router-link to="/search">Search</router-link>
        <router-link to="/account">Account</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import A2HSButton from '@/components/A2HS/A2HSbutton';
import offline from '@/components/offline/OfflineNotice';
import HeroBlockSplit from '@/components/hero/HeroBlockSplit';

export default {
  name: 'Home',
  components: {
    'a2hs-button': A2HSButton, offline, HeroBlockSplit
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
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
  }
}
</script>
