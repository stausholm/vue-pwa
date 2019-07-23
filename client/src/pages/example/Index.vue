<template>
  <div>
    <div class="container--content">
      <breadcrumbs />
      <child-router-view :useAlternativeTransition="true"/>
    </div>
  </div>
</template>

<script>

import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import ChildRouterView from '@/components/navigation/ChildRouterView';

export default {
  components: {
    Breadcrumbs,
    ChildRouterView
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
