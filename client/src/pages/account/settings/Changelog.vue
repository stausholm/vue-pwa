<template>
  <div>
    <div class="container--content">
      <h1>A changelog! it uses mmd for basic markdown parsing</h1>
      <p>
        The codebase is open source and available on <a href="https://github.com/stausholm/vue-pwa">GitHub</a>
      </p>
      <div v-html="content"></div>
      <div v-html="contentRaw"></div>
    </div>
  </div>
</template>

<script>
import mmd from "@/3rd-party/mmd/mmd";
import data from '@/markdown/changelog.md';
// const data = mmd(() => import('@/markdown/changelog.md')) 
//const data = async () => import('@/markdown/changelog.md') 

export default {
  name: 'Changelog',
  components: {
    
  },
  data() {
    return {
      content: mmd(data),
      contentRaw: data
    }
  },
  computed: {

  },
  methods: {
    
  }
}
</script>
