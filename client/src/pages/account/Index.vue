<template>
  <div class="account-page">
    <transition :name="transitionName" mode="in-out">
      <router-view class="bob"></router-view>
    </transition>  
  </div>
</template>

<script>
export default {
  name: 'AccountIndex',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
   watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style lang="scss">
.bob {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background: #fff;
  min-height: 100vh;

  .sticky-header .list-header {
    // z-index: inherit;
  }
}
</style>
