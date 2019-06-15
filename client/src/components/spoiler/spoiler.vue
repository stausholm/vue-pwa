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

<style lang="scss" scoped>
.spoiler {
    position: relative;
    display: inline;
    background: #222;
    padding: 0.25em 0.5em;
    transition: 500ms ease;
    cursor: pointer;
}

.spoiler > .spoiler-mask {
    opacity: 0;
    transition: 500ms ease;
}

.spoiler.spoiled {
    background: #f1f2f3;
    cursor: unset;
}

.spoiler.spoiled > .spoiler-mask {
    opacity: 1;
}
</style>
