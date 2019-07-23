<template>
  <div>
    <div class="container--content">
      <h1>this is example yo</h1>
      <breadcrumbs />

      <ul class="block-link-wrapper">
        <li v-for="link in childRoutes" :key="link.path">
          <block-link :to="'/example/' + link.path">{{link.name}}</block-link>
        </li>
      </ul>

      <router-view class="router-view"/>

      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
      <search-bar />
      <p style="margin-top:200px">more height!</p>
      <p style="margin-top:200px">more height!</p>
    </div>
  </div>
</template>

<script>

import SearchBar from '@/components/search/SearchBar';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import BlockLink from '@/components/navigation/BlockLink';

export default {
  name: 'Example',
  components: {
    SearchBar,
    Breadcrumbs,
    BlockLink
  },
  data() {
    return {
    }
  },
  computed: {
    childRoutes() {
      return this.$router.options.routes.find(route => route.path === '/example').children
    }
  },
  methods: {
  }
}
</script>
