<template>
  <div class="search-page">
    <div class="search-header secondary-header">
      <div class="container">
        <div class="search-input">
          <icon-base class="search-icon" iconName="search" width="24" height="24" aria-hidden="true">
            <icon-search />
          </icon-base>
          <input type="text" placeholder="Search for cool things..">
          <div class="search-loader" aria-hidden="true" v-if="loading"></div>
          <button class="filters-button" aria-label="toggle showing search filters" @click="expandFilters = !expandFilters" :class="{'has-filters': activeFilters.length > 0}">
            <icon-base class="filter-icon" iconName="filter" width="24" height="24" aria-hidden="true">
              <icon-filter-list />
            </icon-base>
            <span class="filters-label">Filters</span>
            <span class="filters-count">{{activeFilters.length}}</span>
          </button>
        </div>
        <transition name="slide-down">
          <div class="search-filters" v-if="expandFilters">
            <div class="filter">
              <ul class="filter-list">
                <li class="filter-list__mobile-header">
                  <div>
                    <b class="filter-label">Filters ({{activeFilters.length}})</b>
                    <button class="clear-filters-btn" @click="clearFilters">Clear all</button>
                  </div>
                  <button class="btn-icon" @click="expandFilters = !expandFilters">
                    <icon-base class="" iconName="close" width="24" height="24" aria-hidden="true">
                      <icon-close />
                    </icon-base>
                  </button>
                </li>
                <filter-group v-for="filterGroup in filters" :key="filterGroup.label" :filterGroup="filterGroup" :activeFilters="activeFilters" v-model="activeFilters"/>
                <li class="filter-actions">
                  <button>Apply filters</button>
                  <button @click="expandFilters = !expandFilters">Cancel</button>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="container--content">
      <div v-if="loading">
        <loader />
      </div>
      <div v-else-if="results.length > 0">
        <div class="results-header">
          <p>{{results.length}} results for <b>{{queryParam}}</b></p>
          <div class="sorting">
            <select v-model="currentSort">
              <option v-for="sort in sorting" :key="sort.value" :value="sort.value">{{sort.label}}</option>
            </select>
          </div>
        </div>
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
import IconClose from '@/components/icons/IconClose';
import IconFilterList from '@/components/icons/IconFilterList';
import FilterGroup from '@/components/search/FilterGroup';

import {getFilters, getData, getSorting} from './dummydata';

export default {
  name: 'Search',
  components: {
    Loader,
    IconBase,
    IconSearch,
    IconClose,
    IconFilterList,
    FilterGroup
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
    },
    clearFilters() {
      this.activeFilters = [];
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

<style lang="scss">
@import '../../styles/base/variables';
@import '../../styles/base/breakpoints';
@import '../../styles/base/z-index';
.search-page {

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

  .results-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .search__results {
    article {
      background-color: #fff;
      padding: $default-spacing;
      margin-bottom: 1600px;
    }
  }

  .search-filters {
    @include breakpoint-max(sm) {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: $gray-lighter;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
      z-index: 5555;
      padding-bottom: 60px;
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
    padding-bottom: 2.5em;

    @media screen and (min-width: 960px) {
      flex-wrap: nowrap;
    }

    @media screen and (min-width: 550px) {
      flex-direction: row;
      flex-wrap: wrap;
    }

    .filter-list__mobile-header {
      display: none;

      @include breakpoint-max(sm) {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: $default-spacing;
        border-bottom: .1rem solid #ccc;
        
        .clear-filters-btn {
          border: 0;
          background: none;
          text-decoration: underline;
          font-size: .8em;
          padding: .2em;
          margin-left: .2em;
        }
      }
      @media screen and (min-width: 550px) {
      }
    }

    .filter-col, .filter-actions {
      button {
        border: 0;
        outline: 0;
        background-color: $gray-light;
        padding: $default-spacing/2;
      }
    }

    .filter-col {
      padding-top: 2.5em;

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

      .filter-expand {
        margin-top: $default-spacing/2;
      }

      .col-filters {
        margin-top: 1em;

        .filter-item {
          margin-bottom: 0.3125em;

          label {
            display: flex;
            align-items: center;
            padding-right: $default-spacing;

            input {
              margin-right: 8px;
            }
          }
        }
      }
    }

    .filter-actions {
      width: 100%;
      margin-top: $default-spacing*2;
    }

    @include breakpoint-max(sm) {
      

      .filter-col {
        padding: 2.8rem $default-spacing 1rem;
        border-bottom: .1rem solid #ccc;
        
        .col-filters {
          display: flex;
          flex-wrap: wrap;

          .filter-item {
            flex: 0 0 50%;
            margin-bottom: .8125em;
          }

          .filter-expand {
            width: 100%;
            margin-top: $default-spacing;

            button {
              padding: $default-spacing/1.5;
              width: 100%;
            }
          }
        }
      }


      .filter-actions {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: $white;
        padding: $default-spacing;
        height: 60px;
      }
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

      @include breakpoint-max(sm) {
        height: 32px;
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
    right: $default-spacing;
    top: 50%;
    transform: translateY(-50%);
    border: 0;
    background-color: $gray-lighter;
    border-radius: $default-border-radius;
    font-size: 1rem;
    letter-spacing: 1.5px;
    line-height: 1;
    padding: 0 .95rem;
    height: calc(70px - #{$default-spacing*2});

    // TODO: make ios friendly
    display: flex;
    align-items: center;

    .filter-icon {
      margin-right: $default-spacing/2;
      opacity: .7;
    }

    .filters-count {
      font-weight: bold;
      margin-left: $default-spacing/2;
      &::before {
        content: "(";
      }
      &::after {
        content: ")";
      }
    }

    @include breakpoint-max(md) {
      height: calc(48px - #{$default-spacing/1.5});
      right: $default-spacing/2.75;
      background-color: $gray-light;

      .filter-icon {
        display: none;
      }

    }

    @include breakpoint-max(sm) {
      height: 100%;
      background-color: transparent;

      .filters-label, .filters-count {
        display: none;
      }
      .filter-icon {
        display: inline-block;
        margin: 0;
      }

      &.has-filters {
        &::after {
          content: "";
          position: absolute;
          top: 4px;
          right: 10px;
          display: block;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: $primary-color;
        }
      }
    }
    
  }
}
</style>
