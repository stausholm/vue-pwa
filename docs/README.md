---
home: true
heroImage: /images/spoop.png
actionText: Get Started →
actionLink: /guide/
features:
- title: Simplicity First
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Vue-Powered
  details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
- title: Performant
  details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present MSS
---

# hello there

this is text

::: tip Cool yo
This is tip, warning, danger
:::

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

<img :src="$withBase('/images/spoop.png')" alt="foo">

:ok_hand:
[Markdown-it emojis](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)