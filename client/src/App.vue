<template>
  <div id="app" :class="localSettingsClasses">
    <app-nav />
    <main id="content">
      <transition :name="transitionName" mode="out-in" @after-leave="afterLeave">
        <router-view class="router-view"></router-view>
      </transition>
    </main>
    <offline />
    <a2hs-overlay v-if="showPWAOverlay"/>
    <notification-small />
    <jump-menu :startingTab="2"/>
  </div>
</template>

<script>
import A2HSOverlay from './components/A2HS/A2HSoverlay';
import NotificationSmall from './components/notifications/NotificationSmall';
import offline from '@/components/offline/OfflineNotice';
import JumpMenu from '@/components/jumpMenu/JumpMenu';

//import handleOrientationChange from './utils/orientationChange';
import replaceBrokenImagesInit from './utils/handleBrokenImages';
import {setBrowserCompatibilityClasses} from './utils/browserSpecs';

import Nav from './components/navigation/Nav'

export default {
  name: 'app',
  components: {
    'a2hs-overlay': A2HSOverlay,
    NotificationSmall,
    'app-nav': Nav,
    offline,
    JumpMenu
  },
  data() {
    return {
      transitionName: 'route-primary'
    }
  },
  computed: {
    showPWAOverlay() {
      return this.$store.getters.showPWAOverlay
    },
    localSettingsClasses() {
      const settings = this.$store.getters.localSettings

      if (settings.darkmode) {
        document.documentElement.classList.add('darkmode')
      } else {
        document.documentElement.classList.remove('darkmode')
      }
      if (settings.preferReducedMotion) {
        document.documentElement.classList.add('no-animations')
      } else {
        document.documentElement.classList.remove('no-animations')
      }

      return {
        'darkmode': settings.darkmode,
        'no-animations': settings.preferReducedMotion,
        ['saturate-images--' + settings.imageSaturation]: true
      }
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

      // prevent long press on mobile links, and right click on desktop
      window.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      })

      // not touch device so asume desktop
      if('ontouchstart' in window === false) {
        // prevent middlemouseclick on desktop
        window.addEventListener('auxclick', (e) => {
          e.preventDefault();
        })
  
        // prevent view source and browser devtools
        window.addEventListener('keydown', (e) => {
          if(e.ctrlKey && e.key.toLowerCase() === "u" || e.key === "F12") {
            e.preventDefault()
          }
        })
      }
    }

    // viewport orientation change listener
    //handleOrientationChange(this); // Currently not used for anything
    
    const imageCb = img => {
      const debugObj = {
        url: window.location.href,
        imgPath: img.dataset.brokenImageSrc,
        isContent: !!img.closest('#content') // img is not inside main content area
        //isExternal: check if url is not same as window.location https://stackoverflow.com/a/28054735
      }
      console.log('BROKEN IMAGE:', debugObj)
      // console.log({...img.dataset})
      // console.log(Object.assign({}, img.dataset))
    }
    Object.from
    // add eventlistener to document, for 'error' on images
    replaceBrokenImagesInit('/static/img/wizard.jpg', imageCb);

    // set browser specific css classes on body
    setBrowserCompatibilityClasses();
  },
  watch: {
    '$route' (to, from) {
      // TODO: no need for reactive watching here, if we use nested router-views
      const oneIsPrimary = to.meta.isPrimary || from.meta.isPrimary || to.meta.usePrimaryTransition || from.meta.usePrimaryTransition
      if (oneIsPrimary) {
        return this.transitionName = 'route-primary'
      }

      return this.transitionName = ''
    }
  }
}
</script>
