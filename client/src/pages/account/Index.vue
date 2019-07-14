<template>
  <div class="account-page">
    <transition :name="transitionName" :mode="transitionMode" @after-leave="afterLeave">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>  
  </div>
</template>

<script>
import breakpoints from '@/constants/Breakpoints';

export default {
  name: 'AccountIndex',
  data() {
    return {
      transitionName: 'router-slide-mobile-left',
      transitionMode: 'out-in'
    }
  },
  methods: {
    afterLeave() {
      console.log('afterLeave fired')
      this.$root.$emit('triggerScroll')
    }
  },
   watch: {
    '$route' (to, from) {
      console.log('changed')
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length

      if(window.innerWidth < breakpoints.sm) {
        this.transitionMode = toDepth < fromDepth ? 'out-in' : ''
        this.transitionName = toDepth < fromDepth ? 'router-fade-left-fast' : 'router-slide-mobile-left'
      } else {
        this.transitionMode = 'out-in'
        this.transitionName = toDepth < fromDepth ? 'router-fade-left' : 'router-fade-right'
      }
    }
  }
}
</script>

<style lang="scss">



</style>

