<template>
  <div>
    <div class="search-header secondary-header">
      <div class="container">
        <div class="search-input">

        </div>
        <div class="search-filters">
          <div class="filter">

          </div>
          <div class="sorting">
            <select name="" id="">

            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="container--content">
      <div v-if="loading">
        <loader />
      </div>
      <div v-else-if="results.length > 0">
        <p>{{results.length}} results for <b>{{queryParam}}</b></p>
        <div class="search__results-highlighted">
          <b>Other users really like these things when it comes to "{{queryParam}}"</b>
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
        <h1>Sorry, we couldn't find any results matching "{{queryParam}}"</h1>
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
  </div>
</template>

<script>
import Loader from '@/components/loader/Loader.vue';
export default {
  name: 'Search',
  components: {
    Loader
  },
  data() {
    return {
      //query: this.$route.query.q,
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
    },
    queryParam() {
      return this.$route.query.q;
    }
  },
  methods: {
    findMatches() {
      this.results = this.dummyData.filter((item) => {
        return item.title.toUpperCase().match(this.queryParam.toUpperCase().replace(/\s+/g, '.+'));
      })
    }
  },
  created() {
    // if search doesn't come directly from querystring, then search results should be passed over, to avoid an aditional call to db
    if(this.queryParam) {
      this.findMatches();
    } else {
      //this.results = this.dummyData;
    }

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  watch: {
    queryParam() {
      this.findMatches();
    }
  }
};
</script>

<style lang="scss" scoped>
.search-header {
  background-color: gray;
}

.search__results {
  article {
    background-color: #fff;
    padding: 16px;
    margin-bottom: 1600px;
  }
}
</style>
