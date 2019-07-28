<template>
  <div>
    <icon-base width="100%" height="30vh" class="fade-up">
      <icon-search />
    </icon-base>
    <h1>Welcome to {{appName}}!</h1>
    <p>Your all in one wonder solution for that thing this app solves</p>
    <button class="btn" @click="$router.replace('/onboarding/step2')">Get Started</button>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconSearch from '@/components/icons/IconSearch';

export default {
  components: {
    IconBase, IconSearch
  },
  computed: {
    appName() {
      return this.$store.getters.sitesettings.APPNAME
    }
  }
}
</script>
