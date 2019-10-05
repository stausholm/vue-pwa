<template>
  <div>
    <div class="container--content">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
import data from '@/markdown/license.md';
export default {
  name: 'Licenses',
  data() {
    return {
      content: data
    }
  }
}
</script>
