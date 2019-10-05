<template>
  <div>
    <div class="container--content">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
import data from '@/markdown/tos.md';
export default {
  name: 'TOS',
  data() {
    return {
      content: data
    }
  }
}
</script>
