<template>
  <div class="search-container">
    <div class="search-input">
      <input type="text"
        placeholder="Find stuff..."
        autocomplete="off"
        ref="searchinput"
        aria-label="Search the site"
        title="Search the site"
        v-model="searchVal"
        @input="inputSearch"
        @keydown.enter="selectItem"
        @keydown.up="up"
        @keydown.down="down"
        @keydown.esc="cancelSearch"
        @blur="blurSearch"
        @focus="focusSearch">
        <button class="btn-icon">
          <icon-base iconName="search" iconColor="#000" width="24" height="24">
            <icon-search v-if="searchVal == ''" @click.native="focusInput"/>
            <icon-close v-else-if="searchVal != ''" @mousedown.native.prevent @click.native="cancelSearch"/>
          </icon-base>
        </button>
    </div>

    <div class="search-suggestions" v-if="showDropdown" ref="suggestions">
      <ul v-if="searchVal">
        <li v-if="loading">
          loading...
        </li>
        <li v-for="suggestion in searchMatchesSliced" 
          :key="suggestion[searchableProperty]"
          @mousedown.prevent
          @click="suggestionSelected(suggestion)"
          class="js-fetched-suggestion"
          :data-value="suggestion[searchableProperty]">
          <div class="list-icon">
            <icon-base iconName="search item" iconColor="#000" width="24" height="24">
              <icon-search />
            </icon-base>
          </div>
          <span :inner-html.prop="suggestion[searchableProperty] | highlightmatch(oldVal)"></span>
        </li>
        <li @mousedown.prevent @click="searchForString(oldVal)">
          <p v-if="searchMatches.length > maxResults && searchVal">
            And {{searchMatches.length - searchMatchesSliced.length}} more results matching <b>{{oldVal}}</b>... 
          </p>
          <p v-else>
            show all matching <b>{{oldVal}}</b>...
          </p>
        </li>
      </ul>
      <ul v-else-if="recentSearches.length > 0 && showRecents">
        <li v-if="loading">
          loading...
        </li>
        <li v-for="query in recentSearches" 
          :key="query"
          @mousedown.prevent
          @click="searchForString(query)">
          <div class="list-icon">
            <icon-base iconName="restore search" iconColor="#000" width="24" height="24">
              <icon-restore />
            </icon-base>
          </div>
          <span>{{query}}</span>
        </li>
        <li @mousedown.prevent @click="clearRecents">Clear recent searches</li>
      </ul>
    </div>

    <div class="search-overlay" v-if="showDropdown">

    </div>
  </div>
</template>

<script>
import IconBase from '../icons/IconBase';
import IconSearch from '../icons/IconSearch';
import IconClose from '../icons/IconClose';
import IconRestore from '../icons/IconRestore';

// import {getData} from '@/pages/search/dummydata';

export default {
  name: 'SearchBar',
  components: {
    IconBase, IconSearch, IconClose, IconRestore
  },
  props: {
    focusOnMount: {
      type: Boolean,
      default: false
    },
    searchPageComponentName: {
      type: String,
      default: 'Search'
    },
    searchableProperty: {
      type: String,
      default: 'name'
    }
  },
  data() {
    return {
      searchVal: '',
      oldVal: '',
      showDropdown: false,
      searchHighlightIndex: -1,
      updateSearch: true,
      maxResults: 4,
      showRecents: true,
      maxRecents: 3,
      recentSearches: [],
      loading: false,
      debounceFunc: null,
      searchApi: 'https://jsonplaceholder.typicode.com/comments?q=',
      // results: getData()
      results: []
    }
  },
  computed: {
    searchMatches() {
      if (this.updateSearch) {
        return this.results.filter((item) => {
          return item[this.searchableProperty].toUpperCase().match(this.searchVal.toUpperCase().replace(/\s+/g, '.+'));
        })
      } else { // user is navigating the list, so don't update the results to match searchVal
        return this.results.filter((item) => {
          return item[this.searchableProperty].toUpperCase().match(this.oldVal.toUpperCase().replace(/\s+/g, '.+'));
        })
      }
    },
    searchMatchesSliced() {
      return this.searchMatches.slice(0, this.maxResults);
    }
  },
  filters: {
    highlightmatch(words, query) {
      if (!query) {
        return words;
      }
      const queryWords = `(${query.trim().split(' ').join('|')})`; 
      const re = new RegExp(queryWords, 'ig'); // /(ht|m|l)/gi
      return words.toString().replace(re, function(matchedTxt, a, b) {
        return (`<b class="highlight">${matchedTxt}</b>`);
      });
    }
  },
  methods: {
    focusInput() {
      this.$refs.searchinput.focus();
    },
    blurInput() {
      this.$refs.searchinput.blur();
    },
    inputSearch() {
      // reset active highlight
      this.searchHighlightIndex = -1;
      this.handleActive();

      this.updateSearch = true;
      this.oldVal = this.searchVal;
    },
    cancelSearch() {
      this.searchVal === '' ? this.$refs.searchinput.blur() : this.$refs.searchinput.focus();
      this.searchVal = '';
      this.searchHighlightIndex = -1;
      this.updateSearch = true;
    },
    blurSearch() {
      this.showDropdown = false;
    },
    focusSearch() {
      this.showDropdown = true;
    },
    searchForString(value) {
      if (value !== '') {
        if (this.showRecents) {
          this.updateRecents(value);
        }

        this.$emit('searchString', value);
        this.blurInput();
        this.$router.push({ name: this.searchPageComponentName, query: { q: value } })
      }
    },
    suggestionSelected(suggestion) {
      if (this.showRecents) {
        this.updateRecents(suggestion[this.searchableProperty]);
      }

      this.searchVal = suggestion[this.searchableProperty];
      this.$emit('searchterm', suggestion);
      this.blurInput();
    },
    selectItem() {
      let highlightedItem = this.$refs.suggestions.querySelector('.search-highlighted-item');

      // reset active highlight;
      this.searchHighlightIndex = -1;
      this.handleActive();

      if (highlightedItem != undefined) {
        //simulate click event on highlighted item
        highlightedItem.click();
      } else {
        // clicked enter with no highlighted item
        if (this.searchVal) {
          // input has value, search for that string value
          this.searchForString(this.searchVal);
        } 
        // else do nothing
      }
    },
    up(ev) {
      ev.preventDefault();

      // prevent navigating if results haven't been fetched yet
      if (this.loading) return false;

      // don't do anything if no search value is present or any recent searches are present
      if (this.searchVal === '' && !this.showRecents || this.searchVal === '' && this.recentSearches.length === 0) return false;

      if (this.searchHighlightIndex === -1) {
        this.oldVal = this.searchVal; // store searchVal
        this.searchHighlightIndex = -2;
        return this.handleActive();
      }

      if (this.searchHighlightIndex === 0) {
        this.searchHighlightIndex = -1; // move highlight back into the input field
        this.searchVal = this.oldVal; // restore old search value
      } else {
        this.searchHighlightIndex--; // move up one item
      }

      this.handleActive();

      this.updateSearch = false; // prevent searchVal from being changed while navigating list
    },
    down(ev) {
      ev.preventDefault();

      if (this.loading) return false;

      if (this.searchVal === '' && !this.showRecents || this.searchVal === '' && this.recentSearches.length === 0) return false;

      if (this.searchHighlightIndex === -1) {
        this.oldVal = this.searchVal;
      }

      this.searchHighlightIndex++;

      this.handleActive();

      this.updateSearch = false;
    },
    handleActive() {
      let items = this.$refs.suggestions.querySelectorAll('li');
      
      if (this.searchHighlightIndex > items.length - 1) { 
        // searchHighlightIndex is greater than any element index, so loop back to the first element
        this.searchHighlightIndex = -1;
      }

      if (this.searchHighlightIndex === -2) { 
        // searchHighlightIndex is lower than any element index, so loop around to the last element
        this.searchHighlightIndex = items.length - 1;
      }

      items.forEach((item) => {
        item.classList.remove('search-highlighted-item');
      })
      if (items[this.searchHighlightIndex] != undefined) {
        items[this.searchHighlightIndex].classList.add('search-highlighted-item');
      }

      let item = this.$refs.suggestions.querySelector('.search-highlighted-item');
      if (item && item.classList.contains('js-fetched-suggestion')) {
        // one of the fetched suggestions is highlighted, so update searchVal to contain that value in the input field
        this.searchVal = item.getAttribute('data-value');
      } else if (item){
        // show the original search term 
        this.searchVal = this.oldVal;
      }
      //console.log(items.length, this.searchHighlightIndex)
    },
    updateRecents(value) {
      if (!this.recentSearches.includes(value) && value !== '') {
        this.recentSearches.unshift(value);
        this.recentSearches = this.recentSearches.slice(0, this.maxRecents);
        localStorage.setItem('userRecentSearches', JSON.stringify(this.recentSearches));
      }
    },
    clearRecents() {
      localStorage.removeItem('userRecentSearches');
      this.recentSearches = [];
    },
    fetchSuggestions() {
      if (!this.oldVal) return 

      console.log('fetching new results:', this.oldVal)
      this.loading = true;
      fetch(this.searchApi + this.oldVal)
        .then(res => res.json())
        .then(data => {
          this.loading = false;
          this.results = data;
        })
        .catch(err => {
          console.log('oh no, search api error:', err)
          this.loading = false;
          this.$root.$emit('checkOffline') // perform a manual check to see if we're offline, if online, something is wrong with the searchApi
        })
      
    }
  },
  mounted() {
    if (this.showRecents) {
      this.recentSearches = JSON.parse(localStorage.getItem('userRecentSearches')) || [];
    }

    if (this.focusOnMount) {
      this.$refs.searchinput.focus();
    }
  },
  watch: {
    oldVal(newValue, oldValue) {
      this.results = [];
      clearTimeout(this.debounceFunc);
      this.debounceFunc = setTimeout(this.fetchSuggestions, 300);
    }
  }
}
</script>