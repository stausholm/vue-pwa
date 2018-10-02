module.exports = {
  title: 'Vue pwa documentation',
  description: 'Seo description',
  base: '/docs/', // base url for deploy
  head: [
    ['link', { rel: 'icon', href: '/images/spoop.png'}],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
  ],
  port: 8081, // dev server port

  themeConfig: {
    repo: 'stausholm/vue-pwa', // assumes GitHub
    repoLabel: 'GitHub repo',
    docsRepo: 'stausholm/vue-pwa',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true, // enable edit links at the bottom of pages
    editLinkText: 'Edit this page on Github',
    nav: [
      { text: 'Home', link: '/'},
      { text: 'Frontend', link: '/frontend/'},
      { text: 'Backend', link: '/backend/'},
      //{ text: 'Github', link: 'https://github.com/stausholm/vue-pwa'},
      //{ text: 'dropdown', items: [{ text: 'item 1', link: '' }, { text: 'item 1', link: '' }]}
    ],
    sidebar: {
      '/frontend/': genSidebarConfig('Guide')
    },
    sidebarDepth: 2, // extract down to h3 headers
    //displayAllHeaders: true, // also display header links for the not currently active pages
    activeHeaderLinks: true, // autoupdate highlighted header and url hash on scroll
    searchMaxSuggestions: 10, // searches for all titles, h2 and h3
    lastUpdated: 'Twas last updated', // enable last updated text on pages and show this prefix

  },
  markdown: {
    lineNumbers: true
  }
}

function genSidebarConfig(title) {
  return [
    {
      title,
      collapsable: false,
      children: [
        '',
        'components',
        'forms',
        'navigation',
        'router',
        'store'
      ]
    }
  ]
}