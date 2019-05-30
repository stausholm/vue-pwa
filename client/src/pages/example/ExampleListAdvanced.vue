<template>
  <div>
    <div class="container--content">
      <h1>this is example list advanced</h1>
      <p style="white-space:pre-wrap;">Stuff that should be possible
        - list should be searchable/filterable
        - list items should be selectable (hold down on one or via other button) and should keep track of which items are selected
        - should be possible to select all/ deselect all
        - should allow for toggling between different viewing modes
        - list items should be able to be hooked up to actions through a swipe interface and through vertical dots menu
        - list should remember scroll position
        - list should support ajax by emiting an event when scrolled to the bottom while there is still more results left
        - list should be sortable but not manually rearangeable
        - if you search/filter or sort, selection is cancelled
      </p>
    </div>
    <list-advanced 
      itemTemplate="ListAdvancedItemTodo" 
      :actions="['star', 'delete']"
      @star="handleStar"
      @delete="handleDelete" 
      :list="listItems" 
      @loadMore="loadMoreItems" 
      @selected="updateSelectedCount"
    >
    </list-advanced>
  </div>
</template>

<script>
import ListAdvanced from '@/components/list/ListAdvanced'

export default {
  name: 'ExampleListAdvanced',
  components: {
    ListAdvanced
  },
  data() {
    return {
      listItems: [],
      page: 1
    }
  },
  created() {
    this.loadItems();
  },
  methods: {
    loadMoreItems() {
      console.log('should load more')
      this.page++;
      this.loadItems();
    },
    loadItems() {
      fetch(`https://jsonplaceholder.typicode.com/todos?_page=${this.page}&_limit=30`)
        .then(res => res.json())
        .then(data => {
          this.listItems = this.listItems.concat(data);
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateSelectedCount(selectedItems) {
      console.log(this.listItems.includes(selectedItems[0]))
    },
    handleStar() {
      console.log('handlestar')
    },
    handleDelete() {
      console.log('handledelete')
      this.$store.dispatch('changeNotification', {content: 'deleted', duration: 2000, label: 'Undo', action: () => {console.log('should undo')}})
    }
  }
}
</script>
