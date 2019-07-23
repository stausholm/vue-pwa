<template>
  <div>
    <div class="container--content">
      <button @click="testNotification">test notification</button>
      <button @click="testNotification2">test notification warning</button>
      <div style="width:200px;height:200px;background:red;" v-if="showBox"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExampleNotifications',
  data() {
    return {
      showBox: true
    }
  },
  methods: {
    testNotification() {
      this.$store.dispatch('changeNotification', {content: '5 files deleted', duration: 4000, label: 'Undo'})
    },
    testNotification2() {
      this.showBox = false

      this.$store.dispatch('changeNotification', {
        content: 'some warning content that is very long, what will happen now huh', 
        duration: 400000, 
        theme: 'warning',
        // action: () => this.showBox = !this.showBox,
        // action: this.test,
        action: () => this.test200(200),
        label: 'yoyo'
        })
    },
    test200(val) {
      console.log(val)
      this.showBox = !this.showBox
    }
  }
}
</script>
