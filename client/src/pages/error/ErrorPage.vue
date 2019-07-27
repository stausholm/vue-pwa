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
