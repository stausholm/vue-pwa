<template>
  <a @click="showPrompt">
    <icon-base iconName="add to home screen" iconColor="#6a6a6a" width="24" height="24">
      <icon-a2-h-s />
    </icon-base>
    Add to home screen
  </a>
</template>

<script>
// this component handles the add to home screen install prompt for your PWA
// https://developers.google.com/web/fundamentals/app-install-banners/
// https://developers.google.com/web/updates/2018/06/a2hs-updates

import IconBase from '../icons/IconBase';
import IconA2HS from '../icons/IconA2HS';

export default {
  name: 'A2HSButton',
  components: {
    IconBase, IconA2HS
  },
  data() {
    return {
      deferredPrompt: null
    }
  },
  methods: {
    showPrompt() {
      if (this.deferredPrompt !== null) {
        this.deferredPrompt.prompt();
  
        this.deferredPrompt.userchoice.then((choice)=> {
          console.log(choice.outcome);
          if (choice.outcome === 'dismissed') {
            console.log('user cancelled installation');
          } else {
            console.log('user added to home screen');
          }
  
          this.deferredPrompt = null;
        })
      } else {
        this.$store.dispatch('togglePWAOverlay')
      }
    }
  },
  mounted() {
    console.log('added event listener for beforeinstallprompt')
    window.addEventListener('beforeinstallprompt', (event)=> {
      event.preventDefault();
      this.deferredPrompt = event;
      return false;
    });
  }
}
</script>
