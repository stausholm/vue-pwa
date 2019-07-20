<template>
  <div id="app">
    <app-nav />
    <main id="content">
      <transition :name="transitionName" mode="out-in" @after-leave="afterLeave">
        <router-view></router-view>
      </transition>
    </main>
    <offline />
    <a2hs-overlay v-if="showPWAOverlay"/>
    <notification-small />
  </div>
</template>

<script>
import A2HSOverlay from './components/A2HS/A2HSoverlay';
import NotificationSmall from './components/notifications/NotificationSmall';
import offline from '@/components/offline/OfflineNotice';

//import handleOrientationChange from './utils/orientationChange';
import replaceBrokenImagesInit from './utils/handleBrokenImages';
import {setBrowserCompatibilityClasses} from './utils/browserSpecs';

import Nav from './components/navigation/v2/Nav'

export default {
  name: 'app',
  components: {
    'a2hs-overlay': A2HSOverlay,
    NotificationSmall,
    'app-nav': Nav,
    offline
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
    //handleOrientationChange(this); // Currently not used for anything

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

      return this.transitionName = ''
    }
  }
}
</script>
