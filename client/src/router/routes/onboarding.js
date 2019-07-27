

export default [
  {
    path: "/onboarding",
    //name: "Onboarding",
    component: () => import('@/pages/onboarding/Index' /* webpackChunkName: "onboarding" */),
    meta: {
      
    },
    children: [
      {
        path: "/",
        name: 'OnboardingStep1',
        component: () => import('@/pages/onboarding/Step1' /* webpackChunkName: "onboarding" */),
        meta: {
          step: 1
        }
      },
      {
        path: "step2",
        name: 'OnboardingStep2',
        component: () => import('@/pages/onboarding/Step2' /* webpackChunkName: "onboarding" */),
        meta: {
          step: 2
        }
      },
      {
        path: "step3",
        name: 'OnboardingStep3',
        component: () => import('@/pages/onboarding/Step3' /* webpackChunkName: "onboarding" */),
        meta: {
          step: 3
        }
      },
      {
        path: "step4",
        name: 'OnboardingStep4',
        component: () => import('@/pages/onboarding/Step4' /* webpackChunkName: "onboarding" */),
        meta: {
          step: 4
        }
      }
    ]
  }
]