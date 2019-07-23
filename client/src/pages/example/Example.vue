<template>
  <div>
    <div class="container--content">
      <h1>this is example yo</h1>

      <ul class="block-link-wrapper">
        <li v-for="link in childRoutes" :key="link.path">
          <block-link :to="'/example/' + link.path">{{link.name}}</block-link>
        </li>
      </ul>

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
import BlockLink from '@/components/navigation/BlockLink';

export default {
  name: 'Example',
  components: {
    SearchBar,
    BlockLink
  },
  data() {
    return {
    }
  },
  computed: {
    childRoutes() {
      return this.$router.options.routes.find(route => route.path === '/example').children.filter(child => child.path !== '');
    }
  },
  methods: {
  }
}
</script>
