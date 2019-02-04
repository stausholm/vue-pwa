<template>
  <div class="page-header" ref="pageheader" :class="{'fixed-header': fixed, 'header-scroll-hide': hide}">
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
          <component :is="navigationLayout" :key="navigationLayout"></component>
        <!-- <transition name="slide-up" mode="out-in">
        </transition> -->
      </div>
    </div>
  </div>
</template>

<script>
import Default from './layouts/Default';
import Stripped from './layouts/Stripped';
import TransparentSimple from './layouts/TransparentSimple';

import IconBase from '../icons/IconBase';
import IconMenu from '../icons/IconMenu';
import IconArrowBack from '../icons/IconArrowBack';

import throttle from '@/utils/throttle';

export default {
  name: 'Navigation',
  components: {
    'navigation-default': Default,
    'navigation-transparent-simple': TransparentSimple,
    'navigation-stripped': Stripped,
    IconBase,
    IconMenu,
    IconArrowBack
  },
  data() {
    return {
      //isMobile: window.matchMedia('(max-width: 1024px)').matches // this check is only performed on created
      hide: false,
      prevScrollPos: null,
      currentScrollPos: null,
      routeChanged: false
    }
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    hideOnScroll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    navigationLinks() {
      //console.log(this.$router.options)
      return this.$router.options.routes
        .filter((route) => { // only show routes where showInNav is not false
          return route.meta ? route.meta.showInNav != false : route;
        })
        .filter((route) => { // only show routes allowed for the userrole
          return route.meta && route.meta.allowedRoles ? route.meta.allowedRoles.includes(this.$store.getters.userRole) : route;
        })
    },
    navigationLayout() {
      const defaultLayout = 'navigation-default'
      let layout = this.$route.meta.navigationLayout;
      layout = layout ? 'navigation-' + layout : defaultLayout;
      this.$nextTick(() => { // $refs is undefined until mounted() hook
        this.$refs.pageheader.setAttribute('data-navigation-layout', layout);
      })
      return layout;
    },
    showBack() { // show back button instead of hamburger
      return this.$route.meta.enableBack;
    },
    overwriteHide() { // page has defined that header should not hide on scroll
      this.hide = false;
      return this.$route.meta.overwriteHide;
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
    },
    scrollHide() {
      this.prevScrollPos = window.scrollY;
      window.onscroll = throttle(() => {
        console.log('scrollhide')
        if (this.overwriteHide) {
          return this.hide = false;
        }
        if (this.routeChanged) {
          console.log('scrollhide routechanged is true')
          this.routeChanged = false;
          return this.hide = false;
        }
        if (window.scrollY < this.$refs.pageheader.offsetHeight) {
          // we at the top of the page, so don't hide it 
          return this.hide = false;
        }
        this.currentScrollPos = window.scrollY;
        if(this.prevScrollPos > this.currentScrollPos) {
          this.hide = false;
        } else {
          this.hide = true;
        }
        this.prevScrollPos = this.currentScrollPos;
      }, 200)
    }
  },
  created() {
    // if(this.fixed) {
    //   document.documentElement.classList.add('has-fixed-header')
    // }

    // if(this.hideOnScroll) {
    //   this.scrollHide();
    // }


    // this.$router.beforeEach((to, from, next) => {
    //   this.routeChanged = true;
    //   next();
    // })
    // this.$router.afterEach((to, from, next) => {
    //   //this.routeChanged = false;
    // })

    // this.$router.beforeEach((to, from, next) => {
    //   this.savedScrollPos = window.scrollY;
    //   next();
    // })
    // this.$router.afterEach((to, from, next) => {
    //   console.log('yo', this.$route.path, window.scrollY)

    //     window.scrollTo(0, window.scrollY - 1)
    //     this.$nextTick(() => {
    //       console.log('nexttick', window.scrollY)
    //     })
    //   setTimeout(() => {
    //     console.log('scrolled', window.scrollY)

    //   }, 1)
    // })
  },
  // watch: {
  //   $route(to, from) {
  //     if(this.hideOnScroll) {
  //       this.$nextTick(() => {
  //       console.log('bababababa')
  //         this.currentScrollPos = 0;
  //       })
  //     }
  //   }
  // },

}
</script>
