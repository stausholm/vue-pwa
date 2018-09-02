<template>
  <div>
    <b class="route-title" v-if="routeTitle != ''">{{routeTitle}}</b>
  </div>
</template>

<script>
export default {
  computed: {
    routeTitle() {
      return this.$route.meta.title || '';
    }
  }
}
</script>
