<template>
  <transition name="fade">
    <div class="A2HS-overlay">
      <b>Add APPNAME to Homescreen</b>
      <p>
        Tap your browser's settings icon in the corner, to bring up your browser menu and select 'Add to homescreen' to pin the APPNAME web app and enjoy offline support
      </p>
      <button @click.stop="toggleOverlay">Got it!</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'A2HSOverlay',
  methods: {
    toggleOverlay() {
      this.$store.dispatch('togglePWAOverlay');
    }
  }
}
</script>
