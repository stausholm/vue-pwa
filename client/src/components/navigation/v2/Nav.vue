<template>
  <div class="app-nav-wrapper">
    <div class="app-nav dark-mode" :class="{'app-nav--expanded': navOpen}">

      <div class="primary-nav" :class="{'primary-nav--scrolled': scrolled}" ref="primaryNav">
        <div class="nav-items" :class="{'nav-items--hide': hidePrimaryNav}">
          <div class="container">
            <nav>
              <router-link to="/">
                <icon-base>
                  <component :is="null || fallbackIcon"></component>
                </icon-base>
                <span class="label">title yo</span>
                <span class="nav-link__badge"></span>
              </router-link>
              <router-link to="/example">
                <icon-base>
                  <component :is="null || fallbackIcon"></component>
                </icon-base>
                <span class="label">another title</span>
              </router-link>
            </nav>
          </div>
        </div>
        <div class="nav-actions" :class="{'nav-actions--scrolled': scrolled}" ref="mobileHeader">
          <span class="page-title" v-if="currentPage">{{currentPage}}</span>
          avatar
        </div>
      </div>

      <div class="dropdown-nav">
        <nav-links :nav="dummyNav" @linkClicked="handleNavClick"/>
      </div>

      <button class="nav-hamburger btn-icon btn-icon--animate" @click="toggleNav">
        <icon-base :iconName="navOpen ? 'close menu': 'open menu'" width="24" height="24">
          <transition name="icon-rotate">
            <icon-close v-if="navOpen"/>
            <icon-menu v-else/>
          </transition>
        </icon-base>
      </button>

    </div>

    <transition name="fade">
      <div v-if="navOpen" class="nav-overlay" @click="toggleNav"></div>
    </transition>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconMenu from '@/components/icons/IconMenu';
import IconClose from '@/components/icons/IconClose';
import IconCasino from '@/components/icons/IconCasino';

import NavLinks from '@/components/navigation/NavLinks';

import dummyNav from '@/pages/error/ErrorPage';

import breakpoints from '@/constants/Breakpoints';

export default {
  name: 'Nav',
  components: {
    IconBase,
    IconMenu,
    IconClose,
    IconCasino,
    NavLinks
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
    fallbackIcon() {
      return IconCasino
    },
    hidePrimaryNav() {
      return this.$route.meta.enableBack || this.onScreenKeyboardActive //|| !this.$route.meta.isPrimary;
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

      if (window.scrollY < headerHeight) {
        // we at the top of the page, so don't hide it 
        return this.scrolled = false;
      }

      if (window.scrollY > this.prevScrollPos) {
        this.scrolled = true;
      } else {
        this.scrolled = false;
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
