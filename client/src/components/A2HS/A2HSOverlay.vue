<template>
  <transition name="fade">
    <div class="A2HS-overlay" v-if="showOverlay">
      <b>Add APPNAME to Homescreen</b>
      <p>
        Tap your browser's settings icon in the corner, to bring up your browser menu and select 'Add to homescreen' to pin the APPNAME web app and enjoy offline support
      </p>
      <button @click.stop="showOverlay = false">Got it!</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'A2HSOverlay',
  data() {
    return {
      showOverlay: false
    }
  }
}
</script>
