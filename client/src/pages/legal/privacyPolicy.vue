<template>
  <div>
    <div class="container--content">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
import data from '@/markdown/privacy-policy.md';
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      content: data
    }
  }
}
</script>
