<template>
  <transition name="fade">
    <div class="A2HS-overlay">
      <div class="container">
        <b>Add {{appName}} to Homescreen</b>
        <p>
          Tap your browser's settings icon in the corner, to bring up your browser menu and select 'Add to homescreen' to pin the {{appName}} web app and enjoy offline support
        </p>
        <button @click.stop="toggleOverlay">Got it!</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'A2HSOverlay',
  computed: {
    appName() {
      return this.$store.getters.sitesettings.APPNAME
    }
  },
  methods: {
    toggleOverlay() {
      this.$store.dispatch('togglePWAOverlay');
    }
  }
}
</script>
