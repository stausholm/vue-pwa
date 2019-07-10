<template>
  <div>
    <div class="container--content">
      <breadcrumbs />
      <!-- <nav-links :nav="nav"/> -->

      <div class="error-notice">
        <h1>404</h1>
        <h2>Woah.. that wasn't supposed to happen</h2>
        <p>Looks like you requested a page that doesn't exists</p>
        <router-link to="/topsecret" class="btn">Go home!</router-link>
      </div>


    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-notice {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 20vh;
  text-align: center;

  h1 {
    color: #cacedb;
    font-weight: 700;
    font-size: 3.75rem;
    margin-bottom: 1.5625rem;
  }
  h2 {
    font-weight: 500;
    font-size: 2.1875rem;
    margin-bottom: .625rem;
    color: #3d5170;
  }
  p {
    color: #818ea3;
    margin-bottom: 1.75rem;
  }
}
</style>


<script>
import NavLinks from '@/components/navigation/NavLinks';

import Breadcrumbs from '@/components/navigation/Breadcrumbs';

export default {
  components: {
    NavLinks,
    Breadcrumbs
  },
  data() {
    return {
      nav: {
        useRouterLink: true,
        expandAllChildren: false,
        navGroups: [
          {
            groupLabel: 'a label that is quite long oh no dios mio',
            routes: [
              {
                path: '',
                action: () => {console.log('actionenenn')}, // js function to trigger instead of a link
                title: 'test',
                label: 'label 1 which is also a long title oh no not good', // if empty, use title
                class: '', // add specific css class (could be used for icons)
                target: '_self', 
                rel: '',
                //useSecureTargetBlank: true, // if target _blank, rel should be 'noopener noreferrer'. Default to true
                children: [
                  {
                    label: 'label 1.1 is also very long but has a badge',
                    path: '',
                    target: '_blank',
                    badge: {
                      label: 'asd',
                      type: 'info'
                    },
                    children: [
                      {
                        label: 'label 1.1.1',
                        path: '',
                        children: [
                          {
                            label: 'label 1.1.1.1',
                            class: 'cccc bbb',
                            path: '',
                            children: [
                              {
                                label: 'label 1.1.1.1.1',
                                path: ''
                              },
                              {
                                label: 'label 1.1.1.1.2',
                                path: ''
                              }
                            ]
                          }
                        ]
                      },
                      {
                        label: 'label 1.1.2',
                        path: ''
                      }
                    ]
                  },
                  {
                    label: '1.2',
                    path: ''
                  },
                  {
                    label: '1.3',
                    path: ''
                  },
                  {
                    label: '1.4',
                    path: ''
                  },
                  {
                    label: '1.5',
                    path: ''
                  },
                  {
                    label: '1.6',
                    path: ''
                  },
                  {
                    label: '1.7',
                    path: ''
                  },
                  {
                    label: '1.8',
                    path: ''
                  },
                  {
                    label: '1.9',
                    path: ''
                  },
                  {
                    label: '1.10',
                    path: ''
                  },
                  {
                    label: '1.11',
                    path: ''
                  },
                  {
                    label: '1.12',
                    path: ''
                  },
                  {
                    label: '1.13',
                    path: '',
                    children: [
                      {
                        label: '1.13.1',
                        path: ''
                      },
                      {
                        label: '1.13.2',
                        path: ''
                      },
                      {
                        label: '1.13.3',
                        path: ''
                      },
                      {
                        label: '1.13.4',
                        path: ''
                      },
                      {
                        label: '1.13.5',
                        path: ''
                      },
                      {
                        label: '1.13.6',
                        path: ''
                      },
                      {
                        label: '1.13.7',
                        path: ''
                      },
                      {
                        label: '1.13.8',
                        path: ''
                      },
                      {
                        label: '1.13.9',
                        path: ''
                      },
                      {
                        label: '1.13.10',
                        path: ''
                      },
                      {
                        label: '1.13.11',
                        path: ''
                      },
                      {
                        label: '1.13.12',
                        path: ''
                      },
                      {
                        label: '1.13.13',
                        path: ''
                      },
                      {
                        label: '1.13.14',
                        path: ''
                      },
                      {
                        label: '1.13.15',
                        path: ''
                      },
                      {
                        label: '1.13.16',
                        path: ''
                      },
                      {
                        label: '1.13.17',
                        path: ''
                      },
                      {
                        label: '1.13.18',
                        path: ''
                      },
                      {
                        label: '1.13.19',
                        path: ''
                      },
                      {
                        label: '1.13.20',
                        path: ''
                      },
                      {
                        label: '1.13.21',
                        path: ''
                      },
                      {
                        label: '1.13.22',
                        path: ''
                      },
                      {
                        label: '1.13.23',
                        path: ''
                      },
                      {
                        label: '1.13.24',
                        path: ''
                      },
                      {
                        label: '1.13.25',
                        path: ''
                      },
                    ]
                  },
                  {
                    label: '1.14',
                    path: ''
                  }
                ]
              },
              {
                label: 'label 2',
                path: ''
              }
            ]
          },
          {
            groupLabel: 'anotherlabelwithoutspace',
            routes: [
              {
                path: '/example',
                label: 'label3withoutanyspaces coolbeanslongname',
                children: [
                  {
                    label: 'label 3.1',
                    path: ''
                  }
                ]
              },
              {
                path: '/',
                label: 'label 4'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
