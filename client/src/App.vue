<template>
  <div id="app">
    <!-- <app-navigation :fixed="true" :hideOnScroll="true"/>
    <bottom-nav /> -->
    <app-nav />
    <main id="content">
      <transition :name="transitionName" mode="out-in" @after-leave="afterLeave">
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
import replaceBrokenImagesInit from './utils/handleBrokenImages';
import {setBrowserCompatibilityClasses} from './utils/browserSpecs';

import Nav from './components/navigation/v2/Nav'

export default {
  name: 'app',
  components: {
    'app-navigation': Navigation,
    BottomNav,
    'a2hs-overlay': A2HSOverlay,
    NotificationSmall,
    'app-nav': Nav
  },
  data() {
    return {
      transitionName: 'route-primary'
    }
  },
  computed: {
    showPWAOverlay() {
      return this.$store.getters.showPWAOverlay
    }
  },
  methods: {
    afterLeave() {
      console.log('afterLeave fired')
      this.$root.$emit('triggerScroll')
    },
    isInstalled() {
      if (navigator.standalone) {
        return true;  // iOS
      }
      if (window.matchMedia('(display-mode: standalone)').matches) {
        return true;  // Android with "display": "standalone" in Manifest
      }
      // if (new URL(window.location).searchParams.has('homescreen')) {
      //   return true;  // fallback to check for "?homescreen=1"
      // }
      if (window.location.search.includes('source=pwa')) {
        return true;
      }
      return false;
    }
  },
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
    if(this.isInstalled()) {
      console.log('app was launched as a pwa')
      this.$store.dispatch('hidePWAButton')
    }

    // viewport orientation change listener
    handleOrientationChange(this);
    // viewport media query layout breakpoint listener
    handleLayoutBreakpoint(this);

    // add eventlistener to document, for 'error' on images
    replaceBrokenImagesInit('/static/img/wizard.jpg');

    // set browser specific css classes on body
    setBrowserCompatibilityClasses('dummy--');
  },
  watch: {
    '$route' (to, from) {
      // TODO: no need for reactive watching here, if we use nested router-views
      const oneIsPrimary = to.meta.isPrimary || from.meta.isPrimary
      if (oneIsPrimary) {
        return this.transitionName = 'route-primary'
      }

      //const toDepth = to.path.split('/').length
      //const fromDepth = from.path.split('/').length
      //this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      // if (to.name == 'Example') {
      //   this.transitionName = 'slide-right';
      // } else {
      //   this.transitionName = 'slide-left'
      // }

      return this.transitionName = ''
    }
  }
}
</script>

<style>
/* main > div {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background: #fff;
} */
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
