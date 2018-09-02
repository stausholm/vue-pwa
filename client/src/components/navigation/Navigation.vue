<template>
  <div class="page-header">
    <div class="container">
      <div class="logo">
        <router-link to="/">LOGO</router-link>
      </div>
      <div class="header-navigation">
        <nav>
          <router-link v-for="link in navigationLinks" :key="link.name" :to="link.path">{{link.name}}</router-link>
        </nav>
        <button class="btn-icon btn-icon--large btn-icon--animate" key="menu" @click="handleHamburger" v-if="layoutSmall">
          <icon-base :iconName="!showBack ? 'Hamburger menu' : 'Go back'" iconColor="#fff" width="24" height="24">
            <transition name="icon-rotate">
              <icon-menu v-if="!showBack"/>
              <icon-arrow-back v-else/>
            </transition>
          </icon-base>
        </button>
        <component :is="navigationLayout"></component>
      </div>
    </div>
  </div>
</template>

<script>
import Default from './layouts/Default';
import Stripped from './layouts/Stripped';

import IconBase from '../icons/IconBase';
import IconMenu from '../icons/IconMenu';
import IconArrowBack from '../icons/IconArrowBack';

export default {
  name: 'Navigation',
  components: {
    'navigation-default': Default,
    'navigation-stripped': Stripped,
    IconBase,
    IconMenu,
    IconArrowBack
  },
  data() {
    return {
      //isMobile: window.matchMedia('(max-width: 1024px)').matches // this check is only performed on created
    }
  },
  props: {

  },
  computed: {
    navigationLinks() {
      return this.$router.options.routes.filter((route) => {
        if (route.meta.allowedRoles) {
          return route.meta.showInNav != false && route.meta.allowedRoles.includes(this.$store.getters.userRole);
        } else {
          return route.meta.showInNav != false;
        }
      });
    },
    navigationLayout() {
      const defaultLayout = 'navigation-default'
      let layout = this.$route.meta.navigationLayout;
      return layout ? 'navigation-' + layout : defaultLayout;
    },
    showBack() { // show back button instead of hamburger
      return this.$route.meta.enableBack;
    },
    layoutSmall() {
      return this.$store.getters.deviceLayoutIsSmall;
    }
  },
  methods: {
    handleHamburger() {
      if(this.showBack) {
        this.$router.go(-1);
      } else {
        console.log('open slideout')
      }
    }
  }
}
</script>
