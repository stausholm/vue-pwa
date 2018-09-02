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
        enableBack: true, 
        overwriteHide: true,
        metaTags: [
          {
            name: 'description',
            content: 'The account page of the app'
          },
          {
            property: 'og:description',
            content: 'the account page of the app yo'
          }
        ]
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        //navigationLayout: 'stripped',
        title: 'Search',
        enableBack: true
      }
    },
    {
      // catch all route
      path: '*',
      name: 'ErrorPage',
      component: ErrorPage,
      meta: {
        showInNav: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // title
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  // If a route with a title was found, set the document (page) title to that value.
  //if(nearestWithTitle) document.title = nearestWithTitle.meta.title;
  document.title = nearestWithTitle ? nearestWithTitle.meta.title : 'no nearest with title';

  //meta tags
  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // there are meta tags
  if(nearestWithMeta) {
    // Turn the meta tag definitions into actual elements in the head.
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
    }).forEach(tag => document.head.appendChild(tag));
  }


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
    next({
      path:'/login',
      query: {redirect: to.fullPath}
    })
    return
  }
  if (to.matched.some(record => record.meta.requiresAuth)) { // auth is required for page
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next({
      path:'/login',
      query: {redirect: to.fullPath}
    }) 
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