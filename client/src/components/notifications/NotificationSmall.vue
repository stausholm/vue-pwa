<template>
  <transition name="snackbar">
    <div class="snackbar" :class="[notificationClass]" v-if="showing" @click="handleAction">
      <div class="snackbar-inner">
        <div class="snackbar__content"><span>{{notification.content}}</span></div>
        <span class="snackbar__label" v-if="notification.label">{{notification.label}}</span>
      </div>
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
    notification() {
      return this.$store.getters.notificationSettings
    },
    notificationClass() {
      return 'snackbar--' + this.notification.theme;
    }
  },
  watch: {
    notification() {
      console.log('new notification')
      if (this.showing) {
        clearTimeout(this.timer);
      }

      this.showing = true;

      this.timer = setTimeout(() => {
        this.showing = false;
        console.log('hiding notification now')
        this.timer = null;
      }, this.notification.duration);
    }
  },
  methods: {
    handleAction() {
      if (this.notification.dismissable) {
        this.showing = false;
        clearTimeout(this.timer)
      }
      if (this.notification.action) {
        this.notification.action()
      }
    }
  }
}
</script>
