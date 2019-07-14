<template>
  <div class="app-nav-wrapper">
    <div class="app-nav dark-mode" :class="{'app-nav--expanded': navOpen}">

      <div class="primary-nav" :class="{'primary-nav--scrolled': scrolled}" ref="primaryNav">
        <div class="nav-items" :class="{'nav-items--hide': hidePrimaryNav}">
          <div class="container">
            <nav>
              <router-link v-for="route in primaryNavRoutes" :key="route.name" :to="route.path" replace>
                <icon-base>
                  <component :is="route.meta.icon || fallbackIcon"></component>
                </icon-base>
                <span class="label">{{route.meta.title}}</span>
              </router-link>
            </nav>
          </div>
        </div>
        <div class="nav-actions" :class="{'nav-actions--scrolled': scrolled}" ref="mobileHeader">
          <span class="page-title" v-if="currentPage">{{currentPage}}</span>
          <component class="actions-wrapper" :is="actionLayout"/>
        </div>
      </div>

      <div class="dropdown-nav">
        <div class="dropdown-nav-header">{{appName}}</div>
        <nav-links :nav="dummyNav" @linkClicked="handleNavClick"/>
      </div>

      <hamburger :navOpen="navOpen" @toggleNav="toggleNav"/>

    </div>

    <transition name="fade">
      <div v-if="navOpen" class="nav-overlay" @click="toggleNav"></div>
    </transition>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconCasino from '@/components/icons/IconCasino';

import Hamburger from '@/components/navigation/v2/Hamburger';
import NavLinks from '@/components/navigation/NavLinks';

import dummyNav from '@/pages/error/ErrorPage';

import breakpoints from '@/constants/Breakpoints';

import ActionsDefault from '@/components/navigation/v2/ActionsDefault';

export default {
  name: 'Nav',
  components: {
    IconBase,
    IconCasino,
    NavLinks,
    Hamburger,
    ActionsDefault
  },
  props: {
    
  },
  data() {
    return {
      navOpen: false,
      onScreenKeyboardActive: false,
      scrolled: false,
      prevScrollPos: null,
      dummyNav: dummyNav.data().nav
    }
  },
  computed: {
    actionLayout() {
      return ActionsDefault;
    },
    fallbackIcon() {
      return IconCasino
    },
    hidePrimaryNav() {
      const shouldHide = this.$route.meta.enableBack || this.onScreenKeyboardActive //|| !this.$route.meta.isPrimary;
      if (shouldHide) {
        document.body.classList.add('hide-bottom-nav')
      } else {
        document.body.classList.remove('hide-bottom-nav')
      }
      return shouldHide
    },
    primaryNavRoutes() {
      return this.$router.options.routes.filter(route => route.meta && route.meta.isPrimary)
    },
    currentPage() {
      const r = this.$route;
      if (r.meta && r.meta.title) {
        return r.meta.title;
      } else if(r.matched && r.matched.length > 0) {
        const match = r.matched.filter(x => x.meta && x.meta.title).slice(-1); // get last match in list
        return match.length > 0 ? match[0].meta.title : null;
      }

      return null;
    },
    appName() {
      return this.$store.getters.sitesettings.APPNAME
    }
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen;

      document.body.classList.toggle('nav-open')
    },
    handleKeyboard({type, target}) {
      if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT' && target.getAttribute('type').match(/password|text|number|search|email|tel|url/i)) {
        if (type === 'focus') {
          this.onScreenKeyboardActive = true;
        } else {
          this.onScreenKeyboardActive = false;
        }
      }
    },
    handleScroll() {
      const headerHeight = this.$refs.primaryNav.offsetHeight || this.$refs.mobileHeader.offsetHeight;
      //console.log(this.$refs.primaryNav.offsetHeight, this.$refs.mobileHeader.offsetHeight, headerHeight)

      if (window.scrollY < headerHeight * 2) {
        // we at the top of the page, so don't hide it 
        document.body.classList.remove('scrolled')
        return this.scrolled = false;
      }

      if (window.scrollY > this.prevScrollPos) {
        this.scrolled = true;
        document.body.classList.add('scrolled')
      } else {
        this.scrolled = false;
        document.body.classList.remove('scrolled')
      }
      this.prevScrollPos = window.scrollY;
    },
    handleNavClick() {
      if (window.innerWidth < breakpoints.md) { // close menu on navclick on mobile and tablet
        setTimeout(() => { // artificial delay as it felt nicer
          this.toggleNav();
        },50)
      }
    }
  },
  created() {

  },
  mounted() {
    // prevent nav from being attached to the top of on-screen keyboard, by hiding it. 
    document.addEventListener('focus', this.handleKeyboard, true)
    document.addEventListener('blur', this.handleKeyboard, true)

    document.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    // we never destroy the bottom nav, but just in case we decide to in the future
    document.removeEventListener('focus', this.handleKeyboard, true)
    document.removeEventListener('blur', this.handleKeyboard, true)

    document.removeEventListener('scroll', this.handleScroll)
  }
}

</script>
