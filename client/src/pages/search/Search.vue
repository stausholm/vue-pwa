<template>
  <div>
    <div class="search-header secondary-header">
      <div class="container">
        <div class="search-input">
          <icon-base class="search-icon" iconName="search" width="24" height="24" aria-hidden="true">
            <icon-search />
          </icon-base>
          <input type="text" placeholder="Search for cool things..">
          <div class="search-loader" aria-hidden="true" v-if="loading"></div>
          <button class="filters-button" aria-label="toggle showing search filters" @click="expandFilters = !expandFilters">
            <icon-base class="" iconName="filter" width="24" height="24" aria-hidden="true">
              <icon-casino />
            </icon-base>
            Filters
            <span>{{activeFilters.length}}</span>
          </button>
        </div>
        <div class="search-filters" v-if="expandFilters">
          <div class="filter">
            <ul class="filter-list">
              <li class="filter-col" v-for="filterGroup in filters" :key="filterGroup.label">
                <b class="filter-label">{{filterGroup.label}}</b>
                <ul class="col-filters">
                  <li v-for="filter in filterGroup.values" :key="filter.value">
                    <label>
                      <input type="checkbox" :value="filter.value" v-model="activeFilters">
                      {{filter.label}}
                    </label>
                  </li>
                  <li v-if="filterGroup.values.length > 6">
                    <button>More filters</button>
                  </li>
                </ul>
              </li>
              <li class="filter-actions">
                <button>Apply filters</button>
                <button @click="expandFilters = !expandFilters">Cancel</button>
              </li>
            </ul>
          </div>
          <!-- <div class="sorting">
            <select v-model="currentSort">
              <option v-for="sort in sorting" :key="sort.value" :value="sort.value">{{sort.label}}</option>
            </select>
          </div> -->
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
import IconBase from '@/components/icons/IconBase';
import IconSearch from '@/components/icons/IconSearch';
import IconCasino from '@/components/icons/IconCasino';

import {getFilters, getData, getSorting} from './dummydata';

export default {
  name: 'Search',
  components: {
    Loader,
    IconBase,
    IconSearch,
    IconCasino
  },
  data() {
    return {
      //query: this.$route.query.q,
      loading: true,
      results: [],
      dummyData: getData(),
      filters: getFilters(),
      sorting: getSorting(),
      activeFilters: [],
      currentSort: getSorting()[1].value,
      expandFilters: false
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
@import '../../styles/base/variables';
@import '../../styles/base/breakpoints';
@import '../../styles/base/z-index';

.search-header {
  background-color: $white;
  //padding-top: 2.5em;
  padding: $default-spacing*2 0 $default-spacing;

  @include breakpoint-max(md) {
    padding: $default-spacing/2 0;
    @include z-index(nav);
    box-shadow: 0 0.125rem 0.625rem -6px rgba(90, 97, 105, 0.12);
  }

  > .container {
    padding: 0 $default-spacing; // default-spacing
  }
}

.search__results {
  article {
    background-color: #fff;
    padding: $default-spacing;
    margin-bottom: 1600px;
  }
}

.filter-list {
  height: auto;
  overflow: visible;
    // clear: both;
  display: flex;
  flex-direction: column;
  // height: 0;
  // overflow: hidden;
  padding: 2.5em 0;

  @media screen and (min-width: 960px) {
    flex-wrap: nowrap;
  }

  @media screen and (min-width: 550px) {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .filter-col {
    @media screen and (min-width: 550px) {
      flex: 0 0 50%;
    }

    @media screen and (min-width: 768px) {
      flex: 0 0 33.333333333%;
    }

    @media screen and (min-width: 960px) {
      flex: 0 0 20%;
    }

    .filter-label {
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .col-filters {
      margin-top: 1em;

      li {
        margin-bottom: 0.3125em;
      }
    }
  }

  @include breakpoint-max(sm) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rebeccapurple;
    z-index: 5555;
  }
}

.search-input {
  position: relative;

  .search-icon {
    opacity: .3;
    position: absolute;
    left: 23px;
    top: 50%;
    transform: translateY(-50%);
  }

  input {
    //box-shadow: 0 8px 20px -6px rgba(0,0,0,0.1);
    box-shadow: 0 0 0 1px $gray-lighter;
    outline: none;
    background-color: white;
    height: 70px;
    border-radius: 4px;
    width: 100%;
    border: 0;
    display: block;
    padding: 15px;
    padding-left: 55px;
    color: #444;

    &::placeholder {
      color: #999;
      font-style: italic;
    }

    @include breakpoint-max(md) {
      height: 48px;
      background-color: $gray-lighter;
    }
  }

  .search-loader {
    position: absolute;
    right: 15px;
    top: 0;
    height: 100%;
    width: 40px;

    &::before {
      content: "";
      position: absolute;
      background-color: white;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      @include breakpoint-max(md) {
        background-color: $gray-lighter;
      }
    }

    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      transform: translateY(-50%) translateX(-50%);
      border: 0.2rem solid rgba(0,0,0,0.15);
      border-top-color: rgba(0,0,0,0.5);
      animation: spin .5s infinite linear;
    }
  }
}

@keyframes spin {
  0% {
    transform: translateY(-50%) translateX(-50%) rotate(0deg);
  }

  100% {
    transform: translateY(-50%) translateX(-50%) rotate(360deg);
  }
}

.filters-button {
  font-weight: 600;
  position: absolute;
  right: $default-spacing/2;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background-color: #e4e4e4;
  border-radius: $default-border-radius;
  font-size: 1rem;
  letter-spacing: 1.5px;
  line-height: 1;
  padding: 0 .95rem;
  height: calc(70px - #{$default-spacing});

  @include breakpoint-max(md) {
    height: calc(48px - #{$default-spacing/1.5});
    right: $default-spacing/2.75;

    span {
      display: none;
    }
  }

  // TODO: make ios friendly
  display: flex;
  align-items: center;

  svg {
    margin-right: $default-spacing/2;
  }

  span {
    background-color: $text-primary-color;
    padding: .25em .35em;
    margin-left: $default-spacing/2;
    text-align: center;
    border-radius: $default-border-radius;
    color: $white;
  }
}
</style>
