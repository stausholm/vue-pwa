<template>
  <div>
    <h1>this is account page</h1>
    <account-card />
  </div>
</template>

<script>
import AccountCard from '../components/account/AccountCard';

export default {
  name: 'Account',
  components: {
    AccountCard
  }
}
</script>
