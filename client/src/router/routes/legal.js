export default [
  {
    path: '/licenses',
    component: () => import('@/pages/legal/licenses' /* webpackChunkName: "legal" */),
    meta: {
      enableBack: true,
      //requiresAuth: false
      title: 'Licenses'
    }
  },
  {
    path: '/privacy-policy',
    component: () => import('@/pages/legal/privacyPolicy' /* webpackChunkName: "legal" */),
    meta: {
      enableBack: true,
      //requiresAuth: false
      title: 'Privacy Policy'
    }
  },
  {
    path: '/tos',
    component: () => import('@/pages/legal/tos' /* webpackChunkName: "legal" */),
    meta: {
      enableBack: true,
      //requiresAuth: false
      title: 'Terms of Service'
    }
  }
]