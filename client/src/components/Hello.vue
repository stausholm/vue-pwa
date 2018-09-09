<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="http://chat.vuejs.org/" target="_blank" rel="noopener">Vue Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank" rel="noopener">Docs for This Template</a></li>
    </ul>
    <div v-for="(item, index) in getContent()" :key="index" @click="displayItem(item.id)">
      {{item.title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA',
      content: []
    }
  },
  methods: {
    displayItem(id) {
      this.$router.push({name: 'detail', params: {id: id}});
    },
    getContent() {
      if (navigator.onLine) { // if user is online, get content from db and cache data in localstorage.
        this.saveContentToCache()
        return this.$root.content // return content from vuex store
      } else {
        return JSON.parse(localStorage.getItem('content')) // return cached content from localstorage
      }
    },
    saveContentToCache () {
      // get content from db
      
      //then 
      //let cachedContent = data;
      //localStorage.setItem('content', JSON.stringify(cachedContent)) //save db content to localstorage
    }
  },
  mounted() {
    this.saveContentToCache(); //
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
