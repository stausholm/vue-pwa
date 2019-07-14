<template>
  <div class="account-page">
    <!-- <account :class="{dummy: yo}"/> -->
    <!-- <transition :name="transitionName" mode="in-out" @after-leave="afterLeave" @after-enter="yo = true" @before-leave="yo = false">
      <router-view class="bob"></router-view>
    </transition>   -->
    <!-- <button @click="dod">yoyo</button> -->
    <transition :name="transitionName" :mode="transitionMode" @after-leave="afterLeave">
      <keep-alive>
        <router-view class="bob"></router-view>
      </keep-alive>
    </transition>  
  </div>
</template>

<script>
import Account from './Account';

import breakpoints from '@/constants/Breakpoints';

export default {
  name: 'AccountIndex',
  components: {
    Account
  },
  data() {
    return {
      transitionName: 'wow-left',
      transitionMode: 'in-out'
      // yo: false
    }
  },
  methods: {
    // afterLeave() {
    //   console.log('afterLeave fired')
    //   this.$root.$emit('triggerScroll')
    //   this.yo = false;
    // }
    afterLeave() {
      console.log('afterLeave fired')
      this.$root.$emit('triggerScroll')
    },
    dod() {
      console.log(this.$route)
      this.$router.push({hash:'modal'})
    }
  },
   watch: {
    // '$route' (to, from) {
    //   if (from.path === '/account') {
    //     setTimeout(() => {
    //       console.log('hack')
    //       this.afterLeave()
    //     }, 200);
    //   }
    //   //this.yo = true;
    //   const toDepth = to.path.split('/').length
    //   const fromDepth = from.path.split('/').length
    //   this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    // }
    '$route' (to, from) {
      console.log('changed')
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length

      if(window.innerWidth < breakpoints.sm) {
        this.transitionMode = toDepth < fromDepth ? 'out-in' : ''
        this.transitionName = toDepth < fromDepth ? 'router-fade-left-fast' : 'wow-left'
      } else {
        this.transitionMode = 'out-in'
        this.transitionName = toDepth < fromDepth ? 'router-fade-left' : 'router-fade-right'
      }
    }
  }
}
</script>

<style lang="scss">
// .bob {
//   position: absolute;
//   width: 100%;
//   top: 0;
//   left: 0;
//   background: skyblue;
//   min-height: 100vh;
//   z-index: 2;

//   .sticky-header .list-header {
//     // z-index: inherit;
//   }
// }

// .dummy {
//       position: absolute;
//     width: 100%;
//     top: 0;
//     left: 0;
//     background: #fff;
//     bottom:0;
//     overflow: hidden;
// }


.wow-left-enter {
  //opacity: 0;
  transform: translateX(100%);
  
}
.wow-left-enter-active {
  transition: opacity .15s ease-out, transform .3s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: #f8f9fe;
  position: fixed;
  padding-top: 60px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.wow-left-leave-active {
  transition: opacity .15s ease-out, transform .3s cubic-bezier(0.165, 0.84, 0.44, 1);
  //opacity: 0;
  transform: translateX(-20%);

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    z-index: 2;
    opacity: 0;
    transition: opacity .2s;
  }
}

.wow-left-leave-to {
  &::after {
    opacity: .3;
  }
}
// .wow-right-enter {
//   //opacity: 0;
//   transform: translateX(-100%);
  
// }
// .wow-right-enter-active {
//   transition: opacity 10.15s ease-out, transform 10.2s ease-in-out;
//   background-color: green;
//   position: fixed;
//   top: 60px;
//   left: 0;
//   right: 0;
//   bottom: 0;
// }
// .wow-right-leave-active {
//   transition: opacity 10.15s ease-out, transform 10.2s ease-in-out;
//   //opacity: 0;
//   transform: translateX(100%);
// }



.router-fade-left-enter {
  opacity: 0;
  transform: translateX(-16px);
}
.router-fade-left-enter-active {
  transition: opacity 0.15s ease-out, transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.router-fade-left-leave-active {
  transition: opacity 0.15s ease-out, transform 0.2s ease-in-out;
  opacity: 0;
  transform: translateX(16px);
}


.router-fade-left-fast-enter {
  opacity: 0;
  transform: translateX(-16px);
}
.router-fade-left-fast-enter-active {
  transition: opacity 0.1s ease-out, transform 0.1s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.router-fade-left-fast-leave-active {
  transition: opacity 0.1s ease-out, transform 0.1s ease-in-out;
  opacity: 0;
  transform: translateX(16px);
}


.router-fade-right-enter {
  opacity: 0;
  transform: translateX(16px);  
}
.router-fade-right-enter-active {
  transition: opacity 0.15s ease-out, transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.router-fade-right-leave-active {
  transition: opacity 0.15s ease-out, transform 0.2s ease-in-out;
  opacity: 0;
  transform: translateX(-16px);
}






</style>

