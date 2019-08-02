<template>
  <component :is="tag" @keyup.enter.space="handleKeyboard" @click="showPrompt" tabindex="0" class="A2HS-button" role="button">
    <slot>
      <icon-base iconName="add to home screen" width="24" height="24">
        <icon-a2-h-s />
      </icon-base>
      <span class="A2HS-label">Add to home screen</span>
    </slot>
  </component>
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
  props: {
    tag: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    deferredPrompt() {
      return this.$store.getters.deferredPrompt
    }
  },
  methods: {
    showPrompt() {
      //console.log('showprompt')
      if (this.deferredPrompt !== null) {
        this.deferredPrompt.prompt();
  
        this.deferredPrompt.userChoice.then((choice)=> {
          console.log(choice.outcome);
          if (choice.outcome === 'dismissed') {
            console.log('user cancelled installation');
          } else {
            console.log('user added to home screen');
          }

          // this.$store.dispatch('setDeferredPrompt', event)
        })
      } else {
        this.$store.dispatch('togglePWAOverlay')
      }
    },
    handleKeyboard() {
      if (this.tag.toLowerCase() !== 'button') { // if tag is not button, we loose out on native browser clicks with keyboard. if this.tag is a button, we don't want to call this.showprompt twice
        this.showPrompt();
      }
    }
  },
  created() {
    if (this.deferredPrompt) return 

    console.log('added event listener for beforeinstallprompt')
    window.addEventListener('beforeinstallprompt', (event)=> {
      event.preventDefault();
      //console.log('beforeinstallprompt event!', event)
      this.$store.dispatch('setDeferredPrompt', event)
      return false;
    });

    window.addEventListener('appinstalled', (event) => {
      this.$store.dispatch('hidePWAButton');
    })
  }
}
</script>
