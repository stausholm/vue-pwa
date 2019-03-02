import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import Hello from "@/components/Hello";
import Home from "@/pages/home/Home";
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import Example from "@/pages/example/Example";
import ExampleWithAuth from "@/pages/example/ExampleWithAuth";
import ExampleWithAuthRole from "@/pages/example/ExampleWithAuthRole";
import ExampleInputs from "@/pages/example/ExampleInputs";
import ExampleDataList from "@/pages/example/ExampleDataList";
import ExampleGraphs from "@/pages/example/ExampleGraphs";
import ExampleIcons from "@/pages/example/ExampleIcons";
import ErrorPage from "@/pages/error/ErrorPage";
import Search from "@/pages/search/Search";

import AccountMain from "@/pages/account/Index";
import Account from "@/pages/account/Account";
import Setting1 from "@/pages/account/settings/Setting1";

Vue.use(Router);

/**
 * Route meta parameters
 * @param guest - This route should only be available to users not logged in
 * @param enableBack - Turn hamburger icon into a back button
 * @param requiresAuth - Requires the user to be logged in, to view this route
 * @param is_role - Could be used as is_admin or is_premium. Should be removed in favor of allowedRoles[]. Prevents anyone who is not this role, to view this route
 * @param allowedRoles - Represent which user roles are allowed to view this route
 * @param title - Value to be shown in browser tab. The title of the route, shown in the frontend
 * @param overwriteHide - Overwrites toolbar to prevent it from hiding on scroll, if hideOnScroll is enabled. This needs refactoring
 * @param navigationLayout - Define a routebased navigation component to replace the default one
 * @param metaTags - Array of meta tags for the <head> of the document
 * @param showInNav - Define if this route should be rendered in the main navigation. Current implementation should probably rename it to hideFromNav
 *
 */

let router = new Router({
  //mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    console.log('inside scrollbehavior')
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };

    //console.log('inside scrollBehaviour')
    //console.log('is back or forwards button? ', to.meta.fromHistory = savedPosition !== null)
    // https://github.com/quasarframework/quasar/issues/1466
    // https://github.com/vuejs/vue-router/blob/dev/examples/scroll-behavior/app.js
    // return new Promise((resolve) => {
    //   const position = savedPosition || {};
    //   console.log(position)
    //   if (!savedPosition) {
    //     if (to.hash) {
    //       position.selector = to.hash;
    //     }
    //   }
    //   router.app.$root.$once('triggerScroll', () => {
    //     router.app.$nextTick(() => resolve(position));
    //   });
    // })
    // if (savedPosition) {
    //   return savedPosition;
    // }
    // if (to.hash) {
    //   return {selector: to.hash};
    // }
    // return {x: 0, y: 0}
    // https://github.com/vuejs/vue-router/pull/1758
    // https://router.vuejs.org/guide/advanced/scroll-behavior.html
    // return new Promise((resolve, reject) => {
    //   //setTimeout(() => {
    //     if (savedPosition) {
    //       setTimeout(() => {
    //         //console.log('savedPosition',savedPosition)
    //         resolve(savedPosition);
    //       }, 200)
    //     } else if (to.hash) { // TODO: This works?
    //       //console.log('hash', to.hash)
    //       resolve({selector: to.hash});
    //     } else {
    //       //console.log('none')
    //       resolve({ x: 0, y: 0 })
    //     }
    //   //}, 200)
    // })
  },
  routes: [
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
        navigationLayout: "transparent-simple", // requires fixed header and overwriteHide for best effect
        overwriteHide: true,
        showInNav: false,
        title: "Sign up"
      }
    },
    {
      path: "/example",
      name: "Example",
      component: Example,
      meta: {
        isPrimary: true,
        title: "Example title",
        icon: "IconBeachAccess"
      }
    },
    {
      path: "/examplewithauth",
      name: "ExampleWithAuth",
      component: ExampleWithAuth,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/examplewithauthrole",
      name: "ExampleWithAuthRole",
      component: ExampleWithAuthRole,
      meta: {
        requiresAuth: true,
        is_role: true,
        allowedRoles: ["admin", "premium", "basic"]
      }
    },
    {
      path: "/exampleinputs",
      name: "ExampleInputs",
      component: ExampleInputs
    },
    {
      path: "/exampledatalist",
      name: "ExampleDataList",
      component: ExampleDataList
    },
    {
      path: "/examplegraphs",
      name: "ExampleGraphs",
      component: ExampleGraphs
    },
    {
      path: "/exampleicons",
      name: "ExampleIcons",
      component: ExampleIcons
    },
    {
      path: "/account",
      // name: "Account",
      component: AccountMain,
      meta: {
        title: "My user",
        enableBack: true,
        overwriteHide: true,
        metaTags: [
          {
            name: "description",
            content: "The account page of the app"
          },
          {
            property: "og:description",
            content: "the account page of the app yo"
          }
        ]
      },
      children: [
        {
          path: "/",
          component: Account,
          meta: {
            enableBack: true
          }
        },
        {
          path: "setting1",
          component: Setting1,
          meta: {
            enableBack: true
          }
        }
      ]
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
        showInNav: false
      }
    }
  ]
});

import handlePageTitle from "./middleware/pageTitle";
import handleMetaTags from "./middleware/metaTags";

router.beforeEach((to, from, next) => {
  //console.log('inside beforeEach', to)
  handlePageTitle(to, "fallback title");
  handleMetaTags(to);
  if(document.body.classList.contains('modal-advanced-open')) {
    // if ('scrollRestoration' in history) {
    //   // this fixes the jumping issue, but has not been tested if it breaks anything else
    //   history.scrollRestoration = 'manual';
    // }
    console.log('modal open, back button should not go back', from)
    // why does this make the page jump..
    return next(false)
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
