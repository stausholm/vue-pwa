import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import Hello from "@/components/Hello";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";

import ErrorPage from "@/pages/error/ErrorPage";
import Search from "@/pages/search/Search";


import example from './routes/example'
import account from './routes/account'
import onboarding from './routes/onboarding'

Vue.use(Router);

/**
 * Route meta parameters
 * @param guest - This route should only be available to users not logged in
 * @param enableBack - Turn hamburger icon into a back button
 * @param requiresAuth - Requires the user to be logged in, to view this route
 * @param is_role - Could be used as is_admin or is_premium. Should be removed in favor of allowedRoles[]. Prevents anyone who is not this role, to view this route
 * @param allowedRoles - Represent which user roles are allowed to view this route
 * @param title - Value to be shown in browser tab. The title of the route, shown in the frontend
 * @param overwriteScroll - Overwrites navbar to prevent it from hiding on scroll on mobile
 * @param navigationLayout - Define a routebased navigation component to replace the default one
 * @param metaTags - Array of meta tags for the <head> of the document
 * @param showInNav - Define if this route should be rendered in the main navigation. Current implementation should probably rename it to hideFromNav
 * @param hideActions - Hide actions from mobile layout. This is an alternative to using a different navigationLayout if no actions should be visible
 *
 */

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

let router = new Router({
  //mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      // wait for the out transition to complete (if necessary)
      router.app.$root.$once('triggerScroll', () => {
        // if the resolved position is falsy or an empty object,
        // will retain current scroll position.

        //https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js
        //https://github.com/quasarframework/quasar/issues/1466
        if (savedPosition) {
          console.log('savedposition')
          return router.app.$nextTick(() => resolve(savedPosition))
        } else if (to.hash) {
          console.log('to.hash')
          return router.app.$nextTick(() => resolve({selector: to.hash}))
        } else {
          console.log('0,0')
          return router.app.$nextTick(() => resolve({ x: 0, y: 0 }))
        }
      })
    })
  },
  routes: [
    ...example,
    ...account,
    ...onboarding,
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        isPrimary: true,
        title: "Home",
        icon: "IconCasino"
      }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        guest: true,
        enableBack: true,
        navigationLayout: "stripped",
        showInNav: false
      }
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
      meta: {
        guest: true,
        enableBack: true,
        navigationLayout: "transparent-simple", 
        showInNav: false,
        title: "Sign up to the cool thing",
        overwriteScroll: true,
        transparentHeader: true,
        hideActions: true
      }
    },
    {
      path: "/search",
      name: "Search",
      component: Search,
      meta: {
        //navigationLayout: 'stripped',
        title: "Search",
        enableBack: true
      }
    },
    {
      // catch all route
      path: "*",
      name: "ErrorPage",
      component: ErrorPage,
      meta: {
        showInNav: false,
        title: 'oh no'
      }
    }
  ]
});

import handlePageTitle from "./middleware/pageTitle";
import handleMetaTags from "./middleware/metaTags";

router.afterEach((to, from) => {
  handlePageTitle(to, "fallback title");
  handleMetaTags(to);
})

router.beforeEach((to, from, next) => {
  //console.log('inside beforeEach', to)
  if(document.body.classList.contains('modal-advanced-open')) {
    console.log('modal open, back button should not go back', from)
    // this makes the page jump unless history.scrollRestoration is set to 'manual', because a popstate event is fired
    return next(false)
  }

  if (!localStorage.getItem('onBoardingComplete') && !to.path.match(/^\/onboarding/)) {
    next('/onboarding')
    return
  }

  // prevent navigating backwards if slideout menu is open, and close it instead
  // if (store.getters.slideoutIsOpen) {
  //   store.dispatch('changeSlideoutState', false);
  //   next(false);
  // }

  // if (to.matched.some(record => record.meta.is_role)) { // is only for certain role
  //   if (store.getters.userRole)
  // }
  if (to.matched.some(record => record.meta && record.meta.allowedRoles)) {
    // allowed roles have been specified
    if (
      store.getters.isLoggedIn &&
      to.meta.allowedRoles.includes(store.getters.userRole)
    ) {
      // user is logged in and, user's role is allowed on page
      next();
      return;
    } else if (store.getters.isLoggedIn) {
      next(false);
      return;
    }
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
    return;
  }
  if (to.matched.some(record => record.meta && record.meta.requiresAuth)) {
    // auth is required for page
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else if (to.matched.some(record => record.meta && record.meta.guest)) {
    // page should only be shown to guests, such as /register or /login
    if (store.getters.isLoggedIn) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
