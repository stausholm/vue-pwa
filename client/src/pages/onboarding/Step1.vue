<template>
  <div>
    <icon-base width="100%" height="30vh" class="fade-up">
      <icon-search />
    </icon-base>
    <h1>Welcome to APPNAME</h1>
    <p>To get started we need to show you these messages</p>
    <button class="btn" @click="$router.replace('/onboarding/step2')">Get Started</button>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconSearch from '@/components/icons/IconSearch';

export default {
  components: {
    IconBase, IconSearch
  }
}
</script>
