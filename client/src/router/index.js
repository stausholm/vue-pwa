import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/store'
import Hello from '@/components/Hello'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Example from '@/pages/Example'
import ExampleWithAuth from '@/pages/ExampleWithAuth'
import ExampleWithAuthRole from '@/pages/ExampleWithAuthRole'
import Account from '@/pages/Account'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { 
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { 
        guest: true
      }
    },
    {
      path: '/example',
      name: 'Example',
      component: Example
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
      component: Account
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