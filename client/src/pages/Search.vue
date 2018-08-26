<template>
  <div class="container--content">
    <div v-if="loading">
      <loader />
    </div>
    <div v-else-if="results.length > 0">
      <div class="search-header">
        <p>{{results.length}} results for <b>{{query}}</b></p>
        <div class="search-header__filters">
          <p>sorting and filtering controls here</p>
        </div>
      </div>
      <div class="search__results-highlighted">
        <b>Other users really like these things when it comes to "{{query}}"</b>
        <div>
          <div class="card" v-for="(result, index) in highlightedResults" :key="index">
            <p>{{result.title}}</p>
          </div>
        </div>
      </div>
      <div class="search__results">
        <article v-for="(result, index) in results" :key="index">
          <b>{{result.title}}</b>
          <p>{{result.taste}}</p>
        </article>
      </div>
      <p>Can't find what you're looking for? Try adjusting your search, or explore our extensive list of <router-link to="/explore">categories</router-link></p>
    </div>
    <div v-else>
      <h1>Sorry, we couldn't find any results matching "{{query}}"</h1>
      <p>You can also explore the extensive list of <router-link to="/explore">categories</router-link></p>
      <p>Try adjusting your search using these suggestions:</p>
      <ul>
        <li>Make sure that all words are spelled correctly.</li>
        <li>Try different keywords.</li>
        <li>Try more general keywords.</li>
        <li>Try fewer keywords.</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loader from '../components/loader/Loader.vue';
export default {
  name: 'Search',
  components: {
    Loader
  },
  data() {
    return {
      query: this.$route.query.q,
      loading: true,
      results: [],
      dummyData: [
        {
          title: 'Apple',
          taste: 'sweet'
        },
        {
          title: 'Banana',
          taste: 'sweet'
        },
        {
          title: 'Blueberry',
          taste: 'bad'
        },
        {
          title: 'Kiwi',
          taste: 'yum'
        },
        {
          title: 'Pear',
          taste: 'sweet'
        },
        {
          title: 'Pineapple',
          taste: 'sour'
        },
        {
          title: 'Water melon',
          taste: 'sweet'
        },
        {
          title: 'How to pineapple',
          taste: 'paper'
        }
      ]
    }
  },
  computed: {
    highlightedResults() {
      return this.results.filter((item) => {
        return item.taste === 'sweet';
      }).slice(0, 6);
    }
  },
  created() {
    // if search doesn't come directly from querystring, then search results should be passed over, to avoid an aditional call to db

    this.results = this.dummyData.filter((item) => {
      return item.title.toUpperCase().match(this.query.toUpperCase().replace(/\s+/g, '.+'));
    })

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>