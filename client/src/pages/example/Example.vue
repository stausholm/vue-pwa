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



      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>
      <h6>Header 6</h6>


      <h2>Dividers (.divider)</h2>
      <h6>.divider</h6>
      <div class="divider" role="separator"></div>
      <h6>.divider--hairline</h6>
      <div class="divider divider--hairline" role="separator"></div>
      <h6>.divider--dashed</h6>
      <div class="divider divider--dashed" role="separator"></div>
      <h6>.divider--padded</h6>
      <div class="divider divider--padded" role="separator"></div>
      <h6>.divider--content-center</h6>
      <div class="divider divider--content-center" role="separator">.divider .divider--content-center</div>
      <h6>.divider--content-center</h6>
      <div class="divider divider--content-center" role="separator">.divider .divider--content-center Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex tempore exercitationem quo nulla beatae perspiciatis accusantium. Facilis nemo eius iusto maxime iste voluptas, odio alias ipsam velit voluptatem minima reiciendis!</div>
      <h6>.divider--content-right</h6>
      <div class="divider divider--content-right" role="separator">.divider .divider--content-right</div>
      <h6>.divider--content-right</h6>
      <div class="divider divider--content-right" role="separator">.divider .divider--content-right Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas hic ullam deserunt, aliquam at beatae reprehenderit sunt ducimus cumque consequuntur voluptatibus necessitatibus rem dolor dicta delectus sit natus ratione facere.</div>
      <h6>.divider--content-left</h6>
      <div class="divider divider--content-left" role="separator">.divider .divider--content-left</div>
      <h6>.divider--content-left</h6>
      <div class="divider divider--content-left" role="separator">.divider .divider--content-left Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas hic ullam deserunt, aliquam at beatae reprehenderit sunt ducimus cumque consequuntur voluptatibus necessitatibus rem dolor dicta delectus sit natus ratione facere.</div>
      <h6>.divider custom</h6>
      <div class="divider divider--content-center" style="color: blue; border-color: blue;" role="separator">Custom styles</div>

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
