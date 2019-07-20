<template>
  <div>
    <div class="container--content">
      <breadcrumbs />

      <div class="error-notice">
        <h1>404</h1>
        <h2>Woah.. that wasn't supposed to happen</h2>
        <p>Looks like you requested a page that doesn't exists</p>
        <router-link to="/topsecret" class="btn">Go home!</router-link>
      </div>


    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-notice {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20vh;
  text-align: center;

  h1 {
    color: #cacedb;
    font-weight: 700;
    font-size: 3.75rem;
    margin-bottom: 1.5625rem;
  }
  h2 {
    font-weight: 500;
    font-size: 2.1875rem;
    margin-bottom: .625rem;
    color: #3d5170;
  }
  p {
    color: #818ea3;
    margin-bottom: 1.75rem;
  }
}
</style>


<script>
import Breadcrumbs from '@/components/navigation/Breadcrumbs';

export default {
  components: {
    Breadcrumbs
  },
  data() {
    return {
    }
  }
}
</script>
