<template>
  <transition name="slide-up">
    <div class="notification-small" :class="[notificationClass]" v-if="showing">
      {{globalNotification.content}}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotificationSmall',
  data() {
    return {
      showing: false,
      timer: null
    }
  },
  computed: {
    globalNotification() {
      return this.$store.getters.notificationSettings
    },
    notificationClass() {
      return 'notification-small-' + this.globalNotification.alert;
    }
  },
  watch: {
    globalNotification() {
      console.log('new notification')
      if (this.showing) {
        clearTimeout(this.timer);
      }

      this.showing = true;
      
      this.timer = setTimeout(() => {
        this.showing = false;
        console.log('hiding notification now')
        this.timer = null;
      }, this.globalNotification.duration);
    }
  }
}
</script>
