<template>
  <div class="list-wrapper" :class="{'list--is-selecting': isSelecting}">
    yo
    <button @click="emitLoadMore">more</button>
    <button @click="toggleSelecting">selecting: {{isSelecting}}</button>
    <button @click="toggleSelectAll">{{ allAreSelected ? 'deselect all' : 'select all'}}</button>
    <button @click="useAlternativeDisplayMode = !useAlternativeDisplayMode">Use alternative mode: {{useAlternativeDisplayMode}}</button>

    <input type="text" v-model="searchQuery" @input="$emit('searched', $event.target.value)">

    <div class="bulk-actions">
      <button v-for="action in actions" :key="action"  @click="$emit(action, selectedItems)">{{action}}</button>
    </div>

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

      <div class="list-loader" v-if="isLoading">
        loading more items
      </div>
      <div class="list-no-results" v-if="!isLoading && filteredList.length === 0">
        <p>no results :(</p>
      </div>
  </div>
</template>

<script>
import ListAdvancedItemTodo from './ListAdvancedItemtodo'

export default {
  name: 'ListAdvanced',
  components: {
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
    }
  },
  data() {
    return {
      selectedItems: [],
      isSelecting: false,
      useAlternativeDisplayMode: false,
      searchQuery: ''
    }
  },
  computed: {
    allAreSelected() {
      return this.list.length === this.selectedItems.length
    },
    filteredList() {
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
      this.$emit('loadMore')
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
    }
  },
  // created() { // https://vuejs.org/v2/guide/migration.html#dispatch-and-broadcast-replaced
  //   this.actions.forEach(action => {
  //     this.$on(action, () => {
  //       console.log(action)
  //     })
  //   });
  // },
  // beforeDestroy() {
  //   this.actions.forEach(action => {
  //     this.$off(action, () => {
  //       console.log(action)
  //     })
  //   });
  // }
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
