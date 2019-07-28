import Index from "@/pages/example/Index";
import Example from "@/pages/example/Example";
import ExampleWithAuth from "@/pages/example/ExampleWithAuth";
import ExampleWithAuthRole from "@/pages/example/ExampleWithAuthRole";
import ExampleInputs from "@/pages/example/ExampleInputs";
import ExampleDataList from "@/pages/example/ExampleDataList";
import ExampleGraphs from "@/pages/example/ExampleGraphs";
import ExampleIcons from "@/pages/example/ExampleIcons";
import ExampleListAdvanced from "@/pages/example/ExampleListAdvanced";
import ExampleTopSecret from "@/pages/example/ExampleTopSecret";
import ExampleButtons from "@/pages/example/ExampleButtons";
import ExampleNotifications from "@/pages/example/ExampleNotifications";
import ExampleSwiper from "@/pages/example/ExampleSwiper";

export default [
  {
    path: '/example',
    //name: "Example",
    component: Index,
    meta: {
      isPrimary: true,
      title: "Example title",
      icon: () => import('@/components/icons/IconBeachAccess')
    },
    children: [
      {
        path: '',
        name: 'Example',
        component: Example,
        meta: {
          usePrimaryTransition: true
        }
      },
      {
        path: "examplewithauth",
        name: "ExampleWithAuth",
        component: ExampleWithAuth,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "examplewithauthrole",
        name: "ExampleWithAuthRole",
        component: ExampleWithAuthRole,
        meta: {
          requiresAuth: true,
          allowedRoles: ["admin", "premium", "basic"]
        }
      },
      {
        path: "exampleinputs",
        name: "ExampleInputs",
        component: ExampleInputs,
        meta: {
          title: 'oh wow, inputs'
        }
      },
      {
        path: "exampledatalist",
        name: "ExampleDataList",
        component: ExampleDataList
      },
      {
        path: "examplegraphs",
        name: "ExampleGraphs",
        component: ExampleGraphs
      },
      {
        path: "exampleicons",
        name: "ExampleIcons",
        component: ExampleIcons
      },
      {
        path: "examplelistadvanced",
        name: "ExampleListAdvanced",
        component: ExampleListAdvanced
      },
      {
        path: "examplebuttons",
        name: "ExampleButtons",
        component: ExampleButtons
      },
      {
        path: "examplenotifications",
        name: "ExampleNotifications",
        component: ExampleNotifications
      },
      {
        path: "exampleswiper",
        name: "ExampleSwiper",
        component: ExampleSwiper
      }
    ]
  },
  {
    path: "/topsecret",
    name: "TopSecret",
    component: ExampleTopSecret
  }
  // {
  //   path: "/examplewithauth",
  //   name: "ExampleWithAuth",
  //   component: ExampleWithAuth,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  // {
  //   path: "/examplewithauthrole",
  //   name: "ExampleWithAuthRole",
  //   component: ExampleWithAuthRole,
  //   meta: {
  //     requiresAuth: true,
  //     allowedRoles: ["admin", "premium", "basic"]
  //   }
  // },
  // {
  //   path: "/exampleinputs",
  //   name: "ExampleInputs",
  //   component: ExampleInputs
  // },
  // {
  //   path: "/exampledatalist",
  //   name: "ExampleDataList",
  //   component: ExampleDataList
  // },
  // {
  //   path: "/examplegraphs",
  //   name: "ExampleGraphs",
  //   component: ExampleGraphs
  // },
  // {
  //   path: "/exampleicons",
  //   name: "ExampleIcons",
  //   component: ExampleIcons
  // }
]