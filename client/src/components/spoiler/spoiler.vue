<template>
  <span class="spoiler" :title="revealed ? '' : 'Reveail Spoiler'" :class="{'spoiled':revealed}" @click="revealed = true">
    <span class="spoiler-mask">
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  name: 'spoiler',
  data() {
    return {
      revealed: false
    }
  }
}
</script>
