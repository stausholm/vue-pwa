<template>
  <ul class="breadcrumbs">
    <li>
      <router-link to="/">
        <icon-base>
          <icon-home />
        </icon-base>
      </router-link>
    </li>
    <li v-for="(crumb, index) in crumbs" :key="crumb.path">
      <span class="breadcrumb-divider" aria-hidden="true">/</span>
      <router-link :to="crumb.path">
        {{crumb.meta.title || `level: ${index}`}}
      </router-link>
    </li>
  </ul>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconHome from '@/components/icons/IconHome';

export default {
  name: 'Breadcrumbs',
  components: {
    IconBase,
    IconHome
  },
  data() {
    return {

    }
  },
  computed: {
    crumbs() {
      return this.$route.matched;
    }
  }
}
</script>