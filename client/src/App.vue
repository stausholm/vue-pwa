<template>
  <div id="app">
    <app-navigation :fixed="true" :hideOnScroll="true"/>
    <bottom-nav />
    <main>
      <transition name="fade">
        <router-view></router-view>
      </transition>
      <!-- <transition :name="transitionName" mode="out-in" @after-leave="afterLeave">
        <keep-alive>
        </keep-alive>
      </transition> -->
    </main>
    <a2hs-overlay v-if="showPWAOverlay"/>
    <notification-small />
  </div>
</template>

<script>
import Navigation from './components/navigation/navigation';
import BottomNav from './components/navigation/bottomnav';
import A2HSOverlay from './components/A2HS/A2HSoverlay';
import NotificationSmall from './components/notifications/NotificationSmall';

import handleOrientationChange from './utils/orientationChange';
import handleLayoutBreakpoint from './utils/layoutBreakpoint';

export default {
  name: 'app',
  components: {
    'app-navigation': Navigation,
    BottomNav,
    'a2hs-overlay': A2HSOverlay,
    NotificationSmall
  },
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  computed: {
    showPWAOverlay() {
      return this.$store.getters.showPWAOverlay
    }
  },
  // methods: {
  //   afterLeave() {
  //     console.log('afterLeave fired')
  //     this.$root.$emit('triggerScroll')
  //   }
  // },
  created() {
    // handle expired token
    this.$http.interceptors.response.use(undefined, function (err) { // intercept axios to see if we get 401 Unauthorized. If so, token has expired and dispatch "logout" action
      return new Promise(function (resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout)
        }
        throw err;
      });
    });


    // fetch('http://localhost:3000/auth/bean')
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(myJson) {
    //     console.log(myJson);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // hide pwa button if launched as pwa
    if(window.location.search.includes('source=pwa')) {
      console.log('app was launched as a pwa')
      this.$store.dispatch('hidePWAButton')
    }

    // viewport orientation change listener
    handleOrientationChange(this);
    // viewport media query layout breakpoint listener
    handleLayoutBreakpoint(this);
  },
  watch: {
    '$route' (to, from) {
      //const toDepth = to.path.split('/').length
      //const fromDepth = from.path.split('/').length
      //this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      // if (to.name == 'Example') {
      //   this.transitionName = 'slide-right';
      // } else {
      //   this.transitionName = 'slide-left'
      // }
    }
  }
}
</script>

<style>
main > div {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
.routerfadepositive-enter {
  opacity: 0;
  transform: translateX(100%);
}
.routerfadenegative-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.routerfadepositive-enter-active, .routerfadenegative-enter-active {
  transition: opacity .2s ease-out, transform .2s ease-out;
}
</style>
