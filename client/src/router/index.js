import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Hello from '@/components/Hello'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import Example from '@/pages/example/Example'
import ExampleWithAuth from '@/pages/example/ExampleWithAuth'
import ExampleWithAuthRole from '@/pages/example/ExampleWithAuthRole'
import Account from '@/pages/account/Account'
import ErrorPage from '@/pages/error/ErrorPage'
import Search from '@/pages/search/Search'

Vue.use(Router)

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
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {

      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { 
        guest: true,
        enableBack: true,
        navigationLayout: 'stripped',
        showInNav: false
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { 
        guest: true,
        enableBack: true,
        navigationLayout: 'stripped',
        showInNav: false,
        title: 'Sign up'
      }
    },
    {
      path: '/example',
      name: 'Example',
      component: Example,
      meta: {

      }
    },
    {
      path: '/examplewithauth',
      name: 'ExampleWithAuth',
      component: ExampleWithAuth,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/examplewithauthrole',
      name: 'ExampleWithAuthRole',
      component: ExampleWithAuthRole,
      meta: { 
        requiresAuth: true,
        is_role: true,
        allowedRoles: ['admin', 'premium', 'basic']
      }
    },
    {
      path: '/account',
      name: 'Account',
      component: Account,
      meta: {
        title: 'My user',
        enableBack: true, //enables backbutton instead of hamburger
        overwriteHide: true //overwrites toolbar to prevent it from hiding on scroll
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      // catch all route
      path: '*',
      name: 'ErrorPage',
      component: ErrorPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  // if (to.matched.some(record => record.meta.is_role)) { // is only for certain role
  //   if (store.getters.userRole)
  // }
  if (to.matched.some(record => record.meta.allowedRoles)) { // allowed roles have been specified
    if (store.getters.isLoggedIn && to.meta.allowedRoles.includes(store.getters.userRole)) { // user is logged in and, user's role is allowed on page
      next();
      return
    } else if (store.getters.isLoggedIn) {
      next(false);
      return
    }
    next('/login')
    return
  }
  if (to.matched.some(record => record.meta.requiresAuth)) { // auth is required for page
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else if (to.matched.some(record => record.meta.guest)) { // page should only be shown to guests, such as /register or /login
    if (store.getters.isLoggedIn) {
      next('/')
      return
    }
    next();
  } else {
    next();
  }
})

export default router;