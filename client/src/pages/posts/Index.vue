<template>
  <div>
    <child-router-view :keepAlive="true"/>
  </div>
</template>

<script>
import ChildRouterView from '@/components/navigation/ChildRouterView';

export default {
  components: {
    ChildRouterView
  }
}
</script>