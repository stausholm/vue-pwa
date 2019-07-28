<template>
  <span class="spoiler spoiler-image" :title="revealed ? '' : 'Reveail Spoiler'" :class="{'spoiled':revealed}" @click="revealed = true">
    <span class="spoiler-mask">
      <img :src="src" :alt="alt">
    </span>
  </span>
</template>

<script>
export default {
  name: 'spoilerImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String
    }
  },
  data() {
    return {
      revealed: false
    }
  }
}
</script>