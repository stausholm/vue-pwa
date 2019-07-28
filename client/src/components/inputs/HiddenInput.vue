<template>
  <input type="hidden" :name="name" :value="value">
</template>

<script>
export default {
  name: 'HiddenInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>
