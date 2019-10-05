<template>
  <div>
    <div class="container--content">
      <h1>A changelog!</h1>
      <p>
        The codebase is open source and available on <a href="https://github.com/stausholm/vue-pwa">GitHub</a>
      </p>
      <div class="md-changelog" v-html="content"></div>
    </div>
  </div>
</template>

<script>
//import mmd from "@/3rd-party/mmd/mmd";
import data from '@/markdown/changelog.md';
// const data = mmd(() => import('@/markdown/changelog.md')) 
//const data = async () => import('@/markdown/changelog.md') 

export default {
  name: 'Changelog',
  components: {
    
  },
  data() {
    return {
      //content: mmd(data),
      content: data
    }
  },
  computed: {

  },
  methods: {
    
  }
}
</script>

<style lang="scss">
@import "@/styles/base/variables.scss";

.md-changelog {
  padding: 50px 0;

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.3em;
    margin-bottom: 0.4em;
  }
  p, ul, ol {
    margin-bottom: 20px;
  }
  h1 {
    margin: 10px 0 20px;
    color: $primary-color;

    em {
      display: block;
      font-size: .4em;
      font-weight: bold;
      letter-spacing: 1.2px;
      opacity: .7;
      font-style: normal;
      padding-top: 10px;
      margin-bottom: 6px;
      line-height: 0;
      color: $primary-color-light;
    }
  }

  hr {
    margin: 30px 0 50px;
  }

  blockquote {
    margin: 0 0 20px;
    padding: 10px 20px;
    color: #b8c3c9;
    font-size: 1.28rem;
    font-style: italic;
    font-weight: lighter;
    border-left: 5px solid #eaeeef;

    >:last-child {
      margin-bottom: 0;
    }
    >:first-child {
      margin-top: 0;
    }
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;

    ul {
      list-style-type: circle;
    }
  }

  code {
    padding: .2em .4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27,31,35,.05);
    border-radius: 3px;
  }

  pre {
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    background-color: rgba(27,31,35,.05);
    border-radius: 3px;
    
    code {
      display: inline;
      max-width: auto;
      padding: 0;
      margin: 0;
      overflow: visible;
      line-height: inherit;
      word-wrap: normal;
      border: 0;
      font-size: 100%;
      word-break: normal;
      white-space: pre;
      background: transparent;
    }
  }
}
</style>