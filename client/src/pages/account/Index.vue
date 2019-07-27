<template>
  <div class="account-page">
    <child-router-view />
  </div>
</template>

<script>
import breakpoints from '@/constants/Breakpoints';

import ChildRouterView from '@/components/navigation/ChildRouterView';

export default {
  name: 'AccountIndex',
  components: {
    ChildRouterView
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>