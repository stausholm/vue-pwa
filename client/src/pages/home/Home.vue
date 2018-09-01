<template>
  <div>
    <div class="container--content">
      <h1>this is home</h1>
      <header>
        <span v-if="!isLoggedIn"><router-link to="/login">Login</router-link></span>
        <span v-if="!isLoggedIn"><router-link to="/register">Register</router-link></span>
        <span v-if="isLoggedIn"><a @click.prevent="logout">Logout</a></span>
      </header>
      <a2hs-button v-if="showPWAButton"/>
    </div>
  </div>
</template>

<script>
import A2HSButton from '@/components/A2HS/A2HSbutton';

export default {
  name: 'Home',
  components: {
    'a2hs-button': A2HSButton
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
