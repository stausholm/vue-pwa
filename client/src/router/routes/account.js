// import AccountMain from "@/pages/account/Index";
// import Account from "@/pages/account/Account";
// import Setting1 from "@/pages/account/settings/Setting1";

export default [
  {
    path: "/account",
    // name: "Account",
    // component: AccountMain,
    component: () => import('@/pages/account/Index' /* webpackChunkName: "account" */),
    meta: {
      title: "My user",
      requiresAuth: true
    },
    children: [
      {
        path: "/",
        // component: Account,
        component: () => import('@/pages/account/Account' /* webpackChunkName: "account" */),
        //component: {template:'<div class="ohno"></div>'},
        meta: {
          enableBack: true,
          //overwriteScroll: true,
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
        }
      },
      {
        path: "setting1",
        // component: Setting1,
        component: () => import('@/pages/account/settings/Setting1' /* webpackChunkName: "account" */),
        meta: {
          enableBack: true
        }
      },
      {
        path: "about",
        component: () => import('@/pages/account/settings/About' /* webpackChunkName: "account" */),
        meta: {
          enableBack: true
        }
      },
      {
        path: "delete",
        component: () => import('@/pages/account/settings/Delete' /* webpackChunkName: "account" */),
        meta: {
          enableBack: true
        }
      },
      {
        path: "feedback",
        component: () => import('@/pages/account/settings/Feedback' /* webpackChunkName: "account" */),
        meta: {
          enableBack: true
        }
      },
      {
        path: "changelog",
        component: () => import('@/pages/account/settings/Changelog' /* webpackChunkName: "changelog" */),
        meta: {
          enableBack: true
        }
      }
    ]
  }
]