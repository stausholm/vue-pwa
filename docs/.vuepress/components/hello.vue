<template>
  <div>
    <h1>{{ message }}</h1>
    <p>Clicks: {{ clicks }}</p>
    <button @click="increment">Increment!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'hello test',
      clicks: 0
    }
  }, 
  methods: {
    increment() {
      this.clicks++;
    }
  }
}
</script>

<style scoped>

</style>
