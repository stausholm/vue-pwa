<template>
  <div class="account-page">
    <account :class="{dummy: yo}"/>
    <transition :name="transitionName" mode="in-out" @after-leave="afterLeave" @after-enter="yo = true" @before-leave="yo = false">
      <router-view class="bob"></router-view>
    </transition>  
  </div>
</template>

<script>
import Account from './Account'
export default {
  name: 'AccountIndex',
  components: {
    Account
  },
  data() {
    return {
      transitionName: 'slide-left',
      yo: false
    }
  },
  methods: {
    afterLeave() {
      console.log('afterLeave fired')
      this.$root.$emit('triggerScroll')
      this.yo = false;
    }
  },
   watch: {
    '$route' (to, from) {
      if (from.path === '/account') {
        setTimeout(() => {
          console.log('hack')
          this.afterLeave()
        }, 200);
      }
      //this.yo = true;
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
  background: skyblue;
  min-height: 100vh;
  z-index: 2;

  .sticky-header .list-header {
    // z-index: inherit;
  }
}

.dummy {
      position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    background: #fff;
    bottom:0;
    overflow: hidden;
}
</style>
