<template>
  <div>
    <div class="container--content">
      <h1>this is account page</h1>
      <account-card v-if="isLoggedIn"/>
      <sign-in-sign-up v-else/>
    </div>
  </div>
</template>

<script>
import AccountCard from '../components/account/AccountCard';
import SignInSignUp from '../components/account/SignInSignUp';

export default {
  name: 'Account',
  components: {
    AccountCard, SignInSignUp
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  }
}
</script>
