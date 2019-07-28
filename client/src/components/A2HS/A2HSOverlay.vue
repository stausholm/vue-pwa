<template>
  <transition name="fade">
    <div class="A2HS-overlay">
      <div class="container--content container--small">

        <div class="icons">
          <div class="icon"></div>
          <div class="icon"></div>
          <div class="icon" style="background-image: url('/static/img/icons/android-chrome-512x512.png')"></div>
          <div class="icon"></div>
          <div class="icon"></div>
        </div>

        <b>Install {{appName}}</b>
        <p>
          Pin the {{appName}} on your homescreen for quick and easy access when you're on the go
        </p>
        <p class="instructions">
          Just tap 
          <icon-base width="18" height="18">
            <component :is="installIcon" />
          </icon-base>
          then '{{installLabel}}'</p>
        <!-- <p>
          Tap your browser's settings icon, and select 'Add to homescreen' to pin the {{appName}} web app and enjoy offline support
        </p> -->
        <button class="btn btn--inverted btn--responsive" @click.stop="toggleOverlay">Got it!</button>
      </div>
    </div>
  </transition>
</template>

<script>
import {OSSpecs} from '@/utils/browserSpecs';

import IconBase from '@/components/icons/IconBase'
import IconMoreVert from '@/components/icons/IconMoreVert'
import IconCasino from '@/components/icons/IconCasino'

export default {
  name: 'A2HSOverlay',
  components: {
    IconBase,
    'icon-android': IconMoreVert,
    'icon-windows': IconMoreVert,
    'icon-ios': IconCasino,

  },
  computed: {
    appName() {
      return this.$store.getters.sitesettings.APPNAME
    },
    installLabel() {
      const OS = OSSpecs();
      switch (OS) {
        case 'windows':
          return `Install ${this.appName}...`
        case 'macos':
          return 'Add to Home Screen'
        case 'linux':
          return 'Add to Home screen'
        default:
          break;
      }
      return 'Add to Home Screen'
    },
    installIcon() {
      const OS = OSSpecs();
      switch (OS) {
        case 'windows':
          return 'icon-windows'
        case 'macos':
          return 'icon-ios'
        case 'linux':
          return 'icon-android'
        default:
          break;
      }
      return 'icon-android'
    }
  },
  methods: {
    toggleOverlay() {
      this.$store.dispatch('togglePWAOverlay');
    }
  },
  mounted() {
    document.body.classList.add('overflow-hide')
  },
  beforeDestroy() {
    document.body.classList.remove('overflow-hide')
  }
}
</script>
