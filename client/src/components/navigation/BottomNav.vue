<template>
  <div class="bottom-nav" :class="{ 'bottomnav-hide': hideNav}">
    <div class="container">
      <nav>
        <router-link v-for="route in routes" :key="route.name" :to="route.path" replace>
          <icon-base>
            <component :is="route.meta.icon || fallbackIcon"></component>
          </icon-base>
          <span>{{route.meta.title}}</span>
        </router-link>
        <router-link to="/aa" replace>
          <icon-base iconName="casino" iconColor="#fff" width="24" height="24">
            <icon-casino />
          </icon-base>
          <span>another home here</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
import IconBase from '../icons/IconBase';
import IconCasino from '../icons/IconCasino';
import IconBeachAccess from '../icons/IconBeachAccess';
import IconBusinessCenter from '../icons/IconBusinessCenter';

export default {
  name: 'BottomNav',
  components: {
    IconBase, IconCasino, IconBeachAccess, IconBusinessCenter
  },
  data() {
    return {
      onScreenKeyboardActive: false
    }
  },
  methods: {
    handleKeyboard({type, target}) {
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT' && target.getAttribute('type').match(/password|text|number|search|email|tel|url/i)) {
        if (type === 'focus') {
          this.onScreenKeyboardActive = true;
        } else {
          this.onScreenKeyboardActive = false;
        }
      }
    }
  },
  mounted() {
    document.documentElement.classList.add('has-bottomnav')

    // prevent nav from being attached to the top of on-screen keyboard, by hiding it. 
    document.addEventListener('focus', this.handleKeyboard, true)
    document.addEventListener('blur', this.handleKeyboard, true)
  },
  beforeDestroy() {
    // we never destroy the bottom nav, but just in case we decide to in the future
    document.removeEventListener('focus', this.handleKeyboard, true)
    document.removeEventListener('blur', this.handleKeyboard, true)
  },
  computed: {
    hideNav() {
      return this.$route.meta.enableBack || this.onScreenKeyboardActive //|| !this.$route.meta.isPrimary;
    },
    routes() {
      return this.$router.options.routes.filter(route => route.meta && route.meta.isPrimary)
    },
    fallbackIcon() {
      return IconCasino
    }
  }
}
</script>
