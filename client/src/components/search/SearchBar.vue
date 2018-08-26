<template>
  <div>
    <button class="btn-icon btn-icon--large" @click="openSearch" v-if="!navSearchIsOpen">
      <icon-base iconName="search" iconColor="#fff" width="24" height="24">
        <icon-search />
      </icon-base>
    </button>

    <div class="search-container" v-else>

      <transition name="search-input">
      <div class="search-input">
        <input type="text"
          placeholder="Find stuff..."
          autocomplete="off"
          ref="searchinput"
          v-model="searchVal"
          @input="inputSearch"
          @keydown.enter="suggestionSelected(searchMatchesSliced[searchHighlightIndex])"
          @keydown.up="up"
          @keydown.down="down"
          @keydown.esc="cancelSearch"
          @blur="blurSearch"
          @focus="focusSearch">
          <!-- <button @click="searchForString(searchVal)">
            SEARCH
          </button> -->
          <button class="btn-icon">
            <icon-base iconName="search" iconColor="#000" width="18" height="18">
              <icon-search v-if="showSearch && searchVal == ''"/>
              <icon-close v-else-if="showSearch && searchVal != ''"/>
            </icon-base>
          </button>
      </div>
      </transition>

      <div class="search-suggestions" v-if="showDropdown">
        <ul v-if="searchVal">
          <li v-for="(suggestion, index) in searchMatchesSliced" 
            :key="suggestion.title"
            :class="{'search-highlighted-item': index === searchHighlightIndex}"
            @mousedown.prevent
            @click="suggestionSelected(suggestion)">
            <div class="list-icon">
              <icon-base iconName="search item" iconColor="#000" width="18" height="18">
                <icon-search />
              </icon-base>
            </div>
            <span :inner-html.prop="suggestion.title | highlightmatch(oldVal)"></span>
          </li>
        </ul>
        <ul v-else-if="recentSearches.length > 0 && showRecents">
          <li v-for="query in recentSearches" 
            :key="query"
            @mousedown.prevent
            @click="searchForString(query)">
            <div class="list-icon">
              <icon-base iconName="restore search" iconColor="#000" width="18" height="18">
                <icon-restore />
              </icon-base>
            </div>
            <span>{{query}}</span>
          </li>
          <li @mousedown.prevent @click="clearRecents">Clear recent searches</li>
        </ul>
        <div class="search-show-all" v-if="searchMatches.length > maxResults && searchVal">
          <!-- <button class="button button--dark">Show all results ({{searchMatches.length}})</button> -->
          <p @mousedown.prevent @click="searchForString(oldVal)">And {{searchMatches.length - searchMatchesSliced.length}} more results matching <b>{{oldVal}}</b>... </p>
        </div>
      </div>

      <div class="search-overlay" v-if="showDropdown">

      </div>
    </div>
  </div>
</template>

<script>
import IconBase from '../icons/IconBase';
import IconSearch from '../icons/IconSearch';
import IconClose from '../icons/IconClose';
import IconRestore from '../icons/IconRestore';

export default {
  name: 'SearchBar',
  components: {
    IconBase, IconSearch, IconClose, IconRestore
  },
  data() {
    return {
      showSearch: true,
      searchVal: '',
      oldVal: '',
      showDropdown: false,
      searchHighlightIndex: -1,
      updateSearch: true,
      maxResults: 4,
      showRecents: true,
      maxRecents: 3,
      recentSearches: [],
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
    navSearchIsOpen() {
      return this.$store.getters.navSearchIsOpen
    },
    searchMatches() {
      if (this.updateSearch) {
        return this.dummyData.filter((item) => {
          // return item.title.toUpperCase().match(this.searchVal.toUpperCase()); // simple version
          return item.title.toUpperCase().match(this.searchVal.toUpperCase().replace(/\s+/g, '.+'));
        })
      } else { // user is navigating the list, so don't update the results to match searchVal
        return this.dummyData.filter((item) => {
          // return item.title.toUpperCase().match(this.oldVal.toUpperCase()); // simple version
          return item.title.toUpperCase().match(this.oldVal.toUpperCase().replace(/\s+/g, '.+'));
        })
      }
    },
    searchMatchesSliced() {
      return this.searchMatches.slice(0, this.maxResults);
    }
  },
  filters: {
    highlightmatch(words, query) {
      const queryWords = `(${query.trim().split(' ').join('|')})`; 
      const re = new RegExp(queryWords, 'ig'); // /(ht|m|l)/gi
      return words.toString().replace(re, function(matchedTxt, a, b) {
        return (`<b class="highlight">${matchedTxt}</b>`);
      });

      // simple version
      // const iQuery = new RegExp(query, 'ig');
      // return words.toString().replace(iQuery, function(matchedTxt, a, b) {
      //   return (`<b class="highlight">${matchedTxt}</b>`);
      // });
    }
  },
  methods: {
    openSearch() {
      this.$store.dispatch('changeNavSearchOpenState', true);
      this.$nextTick(() => {
        this.$refs.searchinput.focus();
      })
    },
    // openSearch() {
    //   this.showSearch = true;
    //   this.$nextTick(() => {
    //     this.$refs.searchinput.focus();
    //   });
    // },
    // clearSearch() {
    //   this.searchVal = '';
    //   this.$refs.searchinput.focus();
    // },
    inputSearch() {
      this.searchHighlightIndex = -1;
      this.updateSearch = true;
      this.oldVal = this.searchVal;
    },
    cancelSearch() {
      // this.showSearch = false;
      if (this.searchVal === '') this.$refs.searchinput.blur();
      this.searchVal = '';
      // this.showDropdown = false;
      this.searchHighlightIndex = -1;
      this.updateSearch = true;
    },
    blurSearch() {
      // this.showSearch = false;
      this.showDropdown = false;
      this.$store.dispatch('changeNavSearchOpenState', false);
    },
    focusSearch() {
      this.showDropdown = true;
      //this.openSearch();
    },
    searchForString(value) {
      if (value !== '') {
        if (this.showRecents) {
          this.updateRecents(value);
        }

        this.$emit('searchString', value);
        this.$router.push({ name: 'Search', query: { q: value } })
      }
    },
    suggestionSelected(suggestion) {
      // console.log(suggestion)
      if (this.searchHighlightIndex === -1 && event.type !== 'click') { 
        return this.searchForString(this.searchVal);
      }

      if (this.showRecents) {
        this.updateRecents(suggestion.title);
      }

      // this.showSearch = false;
      this.searchVal = suggestion.title;
      this.$emit('searchterm', suggestion);
    },
    up() {
      event.preventDefault(); // prevent cursor from moving back and forth while using arrow keys

      if (this.searchVal === '') return false;

      if (this.searchHighlightIndex === -1) {
        this.oldVal = this.searchVal; // store searchVal
      }

      if (this.searchHighlightIndex > 0) {
        this.searchHighlightIndex--; // move up one item
      } else if (this.searchHighlightIndex === 0) {
        this.searchHighlightIndex = -1; // move highlight back into the input field
        this.searchVal = this.oldVal; // restore old search value
      } else {
        this.searchHighlightIndex = this.searchMatchesSliced.length - 1; // loop back to the last item in the list
      }

      this.updateSearch = false; // prevent searchVal from being changed while navigating list
      if (this.searchHighlightIndex !== -1) {
        this.searchVal = this.searchMatchesSliced[this.searchHighlightIndex].title; // update searchVal with content from highlighted item
      }
    },
    down() {
      event.preventDefault();

      if (this.searchVal === '') return false;

      if (this.searchHighlightIndex === -1) {
        this.oldVal = this.searchVal;
      }

      if (this.searchHighlightIndex < this.searchMatchesSliced.length - 1) {
        this.searchHighlightIndex++
      }

      this.updateSearch = false;
      this.searchVal = this.searchMatchesSliced[this.searchHighlightIndex].title;
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
    }
  },
  mounted() {
    if (this.showRecents) {
      this.recentSearches = JSON.parse(localStorage.getItem('userRecentSearches')) || [];
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input-enter {
  opacity: 0;
}
.search-input-enter-active {
  transition: opacity .2s ease-out;
}
.search-input-leave-active {
  transition: opacity .2s ease-out;
  opacity: 0;
}
</style>
