<template>
  <div class="loader-overlay">
    <loader />
    <p class="loader-overlay__message">{{message}}</p>
  </div>
</template>

<script>
import Loader from './Loader'

export default {
  name: 'LoaderOverlay',
  components: {
    Loader
  },
  props: {
    message: {
      type: String,
      default: ''
    }
  }
}
</script>
