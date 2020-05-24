<template>
  <div>
    <div class="container--content">
      <h1>this is example yo</h1>

      <nav class="block-link-wrapper">
        <block-link v-for="link in childRoutes" :key="link.path" :to="'/example/' + link.path">{{link.name}}</block-link>
      </nav>

      <sparkles>wow some text</sparkles>
      <br>
      <br>
      <sparkles :colors="['#fff']" :maxSize="30" sparkleType="random">
        <img src="a" alt="" width="100px">
      </sparkles>




      <h1>header 1</h1>
      <h2>header 2</h2>
      <h3>header 3</h3>
      <h4>header 4</h4>
      <h5>header 5</h5>
      <h6>header 6</h6>

      <br>
      <span class="tooltip">tooltip top<span class="tooltip-text tooltip-text--top">a tooltip</span></span>
      <br>
      <span class="tooltip">tooltip left<span class="tooltip-text tooltip-text--left">a tooltip</span></span>
      <br>
      <span class="tooltip">tooltip right<span class="tooltip-text tooltip-text--right">a tooltip</span></span>
      <br>
      <span class="tooltip">tooltip <span class="tooltip-text">a tooltip</span></span>

      <p style="margin-top:200px">more height!</p>
      <b>Jump menu can also be opened with ctrl+j. The menu can be navigated with arrow keys, cursor, and touch swipes. ctrl+q opens the search tab</b>
      <button class="btn" @click="$root.$emit('jumpmenu')">open jumpmenu</button>
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
import Sparkles from '@/components/sparkles/Sparkles';

export default {
  name: 'Example',
  components: {
    SearchBar,
    BlockLink,
    Sparkles
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
