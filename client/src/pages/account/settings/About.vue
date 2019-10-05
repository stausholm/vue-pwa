<template>
  <div>
    <div class="container--content">
      <h1>About</h1>
      <p><b>{{appName}}</b> is all about Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui 
        officia deserunt mollit anim id est laborum.
      </p>
      <p>
        <b>{{appName}}</b> is a <i>progressive web application</i> built with <b>Vue.js</b>
      </p>
      <p>
        The codebase is open source and available on <a href="https://github.com/stausholm/vue-pwa">GitHub</a>
      </p>
      <nav class="block-link-wrapper">
        <block-link to="/licenses">Licenses</block-link>
        <block-link to="/privacy-policy">Privacy Policy</block-link>
        <block-link to="/tos">Terms of Service</block-link>
      </nav>
      <router-view></router-view>
      <p class="footnote">
        Version: {{appVersion}}
      </p>
    </div>
  </div>
</template>

<script>
import BlockLink from '@/components/navigation/BlockLink';
export default {
  name: 'About',
  components: {
    BlockLink
  },
  data() {
    return {
      
    }
  },
  computed: {
    appName() {
      return this.$store.getters.sitesettings.APPNAME
    },
    appVersion() {
      return this.$store.getters.sitesettings.APP_VERSION
    }
  },
  methods: {
    
  }
}
</script>
