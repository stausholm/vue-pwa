import Example from "@/pages/example/Example";
import ExampleWithAuth from "@/pages/example/ExampleWithAuth";
import ExampleWithAuthRole from "@/pages/example/ExampleWithAuthRole";
import ExampleInputs from "@/pages/example/ExampleInputs";
import ExampleDataList from "@/pages/example/ExampleDataList";
import ExampleGraphs from "@/pages/example/ExampleGraphs";
import ExampleIcons from "@/pages/example/ExampleIcons";
import ExampleListAdvanced from "@/pages/example/ExampleListAdvanced";
import ExampleTopSecret from "@/pages/example/ExampleTopSecret";

export default [
  {
    path: '/example',
    name: "Example",
    component: Example,
    meta: {
      isPrimary: true,
      title: "Example title",
      icon: () => import('@/components/icons/IconBeachAccess')
    },
    children: [
      // {
      //   path: '',
      //   name: 'ExampleDataListqwe',
      //   component: ExampleDataList
      // },
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
          is_role: true,
          allowedRoles: ["admin", "premium", "basic"]
        }
      },
      {
        path: "exampleinputs",
        name: "ExampleInputs",
        component: ExampleInputs
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
  //     is_role: true,
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