<template>
  <div class="page-header" ref="pageheader">
    <div class="container">
      <div class="header-navigation">
          <component :is="navigationLayout" :key="navigationLayout"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Default from './layouts/Default';
import Stripped from './layouts/Stripped';
import TransparentSimple from './layouts/TransparentSimple';

export default {
  name: 'Navigation',
  components: {
    'navigation-default': Default,
    'navigation-transparent-simple': TransparentSimple,
    'navigation-stripped': Stripped
  },
  computed: {
    navigationLayout() {
      const defaultLayout = 'navigation-default'
      let layout = this.$route.meta.navigationLayout;
      layout = layout ? 'navigation-' + layout : defaultLayout;
      this.$nextTick(() => { // $refs is undefined until mounted() hook
        this.$refs.pageheader.setAttribute('data-navigation-layout', layout);
      })
      return layout;
    }
  }

}
</script>
