<template>
  <div class="list-wrapper">
    yo
    <button @click="emitLoadMore">more</button>
    <button @click="toggleSelecting">selecting: {{isSelecting}}</button>
    <button @click="toggleSelectAll">{{ allAreSelected ? 'deselect all' : 'select all'}}</button>
    <button @click="useAlternativeDisplayMode = !useAlternativeDisplayMode">Use alternative mode: {{useAlternativeDisplayMode}}</button>

    <div class="bulk-actions">
      <button v-for="action in actions" :key="action"  @click="$emit(action, selectedItems)">{{action}}</button>
    </div>
    <!-- <ul>
      <li v-for="item in list" :key="item.id">{{item.id}}</li>
    </ul> -->
    <component 
      v-for="item in list" 
      :key="item.id" 
      :item="item" 
      :is="itemTemplate"
      :itemIsSelected="selectedItems.includes(item)"
      :isSelecting="isSelecting"
      :actions="actions"
      @selected="updateSelected(item, $event)"
      :class="{'list-item--selected': selectedItems.includes(item), 'list-item--alternative': useAlternativeDisplayMode}"/>

      <div class="list-loader" v-if="1>2">
        loading more items
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
    list: {
      type: Array,
      required: true
    },
    // skal det være en template i examplelistadvanced eller en component :is="prop" i denne fil
    itemTemplate: {
      type: String,
      required: true
    },
    actions: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedItems: [],
      isSelecting: false,
      useAlternativeDisplayMode: false
    }
  },
  computed: {
    allAreSelected() {
      return this.list.length === this.selectedItems.length
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
