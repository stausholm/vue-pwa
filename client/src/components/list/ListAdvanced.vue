<template>
  <div class="list-wrapper" :class="{'list--is-selecting': isSelecting}">
    <p v-if="isSelecting">selected: {{selectedItems.length}}</p>

    <button @click="toggleSelecting" class="btn-icon--animate">
      <icon-base :iconName="isSelecting ? 'exit bulk mode' : 'enter bulk mode'">
        <transition name="icon-scale">
          <icon-multimode-off v-if="isSelecting" />
          <icon-multimode-on v-else />
        </transition>
      </icon-base>
    </button>

    <button @click="toggleSelectAll" class="btn-icon--animate">
      <icon-base iconName="toogle select all">
        <transition name="icon-scale">
          <icon-deselect-all v-if="allAreSelected" />
          <icon-select-all v-else />
        </transition>
      </icon-base>
      <span>{{ allAreSelected ? 'deselect all' : 'select all'}}</span>
    </button>

    <button @click="useAlternativeDisplayMode = !useAlternativeDisplayMode" class="btn-icon--animate">
      <icon-base iconName="toogle view mode">
        <transition name="icon-scale">
          <icon-view-mode-2 v-if="useAlternativeDisplayMode" />
          <icon-view-mode-1 v-else />
        </transition>
      </icon-base>
    </button>

    <input type="text" v-if="!useCustomSearch" v-model="searchQuery" @input="handleSearch">

    <div class="bulk-actions" v-if="isSelecting">
      <button v-for="action in actions" :key="action"  @click="$emit(action, selectedItems)">{{action}}</button>
    </div>

    <div ref="list">
      <component 
        v-for="item in filteredList" 
        :key="item.id" 
        :item="item" 
        :is="itemTemplate"
        :itemIsSelected="selectedItems.includes(item)"
        :isSelecting="isSelecting"
        :actions="actions"
        @selected="updateSelected(item, $event)"
        :class="{'list-item--selected': selectedItems.includes(item), 'list-item--alternative': useAlternativeDisplayMode}"/>

        <observer @intersect="reachedBottom" :options="{rootMargin: '200px'}"/>
    </div>

      <div class="list-loader" v-if="isLoading">
        loading more items
      </div>
      <div class="list-no-results" v-if="!isLoading && filteredList.length === 0">
        <p>no results :(</p>
      </div>
      <div class="list-load-more" v-if="!isLoading && isAsyncPaginated && showLoadButton && !allDataLoaded">
        <button @click="emitLoadMore">more</button>
      </div>
      <div v-if="allDataLoaded">
        <p>You've reached the end!</p>
      </div>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconViewModule from '@/components/icons/IconViewModule';
import IconViewList from '@/components/icons/IconViewList';
import IconLibraryBooks from '@/components/icons/IconLibraryBooks';
import IconLibraryBooks2 from '@/components/icons/outline/IconLibraryBooks';
import IconClose from '@/components/icons/IconClose';
import IconEdit from '@/components/icons/IconEdit';

import Observer from '@/utils/observer'

import ListAdvancedItemTodo from './ListAdvancedItemtodo'

export default {
  name: 'ListAdvanced',
  components: {
    IconBase,
    'icon-select-all': IconLibraryBooks2,
    'icon-deselect-all': IconLibraryBooks,
    'icon-view-mode-1': IconViewList,
    'icon-view-mode-2': IconViewModule,
    'icon-multimode-on': IconEdit,
    'icon-multimode-off': IconClose,

    Observer,

    ListAdvancedItemTodo
  },
  props: {
    list: { // the items in the list
      type: Array,
      required: true
    },
    itemTemplate: { // name of .vue file to use for each item in list
      type: String,
      required: true
    },
    actions: { // custom events that we should emit, which the parent will then handle 
      type: Array,
      default: () => []
    },
    searchProperties: { // optional list of whitelisted properties to search from. If none are provided it defaults to search all item properties
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    disableDebounce: { // debounce search input value emition
      type: Boolean,
      default: true
    },
    debounceWaitTime: {
      type: Number,
      default: 700 // ms
    },
    isAsyncPaginated: { // inform if list potentially does not show all results 
      type: Boolean,
      default: false
    },
    showLoadButton: { // show load button or use infinite scroll
      type: Boolean,
      default: false
    },
    allDataLoaded: {
      type: Boolean,
      default: true
    },
    useCustomSearch: { // completely disable search box, and let parent handle filtering this.list
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedItems: [],
      isSelecting: false,
      useAlternativeDisplayMode: false,
      searchQuery: '',
      debounceFunc: null
    }
  },
  computed: {
    allAreSelected() {
      return this.list.length === this.selectedItems.length
    },
    filteredList() {
      if(this.useCustomSearch) {
        return this.list;
      }

      const filterKey = this.searchQuery && this.searchQuery.toLowerCase(); // make filter lowercase
      const hasPropertyWhitelist = this.searchProperties.length > 0;

      if (filterKey && !hasPropertyWhitelist) { // search input has value, so filter based on this.searchQuery
        return this.list.filter((item) => {
          return Object.keys(item).some((key) => {
            return String(item[key]).toLowerCase().indexOf(filterKey) > -1;
          })
        })
      } else if (filterKey) {
        return this.list.filter((item) => {
          return this.searchProperties.some((key) => {
            return String(item[key]).toLowerCase().indexOf(filterKey) > -1;
          })
        })
      }
      
      return this.list;
    }
  },
  methods: {
    emitLoadMore() {
      this.$emit('loadMore', this.searchQuery)
    },
    updateSelected(item) {
      console.log(item)
      this.isSelecting = true;
      this.selectedItems.includes(item) ? this.selectedItems = this.selectedItems.filter(thing => thing != item) : this.selectedItems.push(item)
      this.$emit('selected', this.selectedItems)
    },
    toggleSelecting() {
      this.isSelecting = !this.isSelecting;
      if (!this.isSelecting) {
        this.selectedItems = [];
        this.$emit('selected', this.selectedItems)
      }
    },
    toggleSelectAll() {
      if (this.allAreSelected) {
        this.selectedItems = []
      } else {
        this.selectedItems = this.list
      }
      this.isSelecting = true;
      this.$emit('selected', this.selectedItems)
    },
    handleSearch() {
      if (this.disableDebounce) {
        return this.$emit('searched', this.searchQuery)
      }

      clearTimeout(this.debounceFunc)
      this.debounceFunc = setTimeout(() => {
        this.$emit('searched', this.searchQuery)
      }, this.debounceWaitTime)
    },
    reachedBottom() {
      this.$emit('reached_bottom')
    }
  },
  beforeDestroy() {
    clearTimeout(this.debounceFunc) // just in case the user decides to leave before debounced func has been called
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base/variables.scss';
.list-wrapper {
  margin: 0 -$default-spacing;
  padding: $default-spacing;
  overflow: hidden;
}
</style>
