<template>
  <div>
    <div class="container--content">
      <h1>this is example list advanced</h1>
      <p style="white-space:pre-wrap;">Stuff that should be possible
        - list should be filterable
        - list should be searchable
        - ✅list items should be selectable (hold down on one or via other button) and should keep track of which items are selected
        - ✅should be possible to select all/ deselect all
        - ✅should allow for toggling between different viewing modes
        - list items should be able to be hooked up to actions through a swipe interface and through vertical dots menu
        - list should remember scroll position
        - list should support ajax by emiting an event when scrolled to the bottom while there is still more results left
        - list should be sortable but not manually rearangeable
        - if you search/filter or sort, selection is cancelled
      </p>
    </div>
    <div class="container--content">
      <div class="block-link-wrapper">
        <block-link to="/posts">List has been moved to /posts</block-link>
      </div>
      <!-- <list-advanced 
        itemTemplate="ListAdvancedItemTodo" 
        :actions="actions"
        @star="handleStar"
        @delete="handleDelete" 
        :list="listItems" 
        @loadMore="loadMoreItems" 
        @selected="updateSelectedCount"
        @searched="handleSearch"
        @reached_bottom="() => {}"
        :isLoading="loadingItems"
        :showLoadButton="true"
        :isAsyncPaginated="true"
        :allDataLoaded="allDataLoaded"
      >
      </list-advanced> -->
    </div>

    <modal-advanced 
      v-if="showModal" 
      @close="showModal = false" 
      header="modal header" 
      confirmLabel="label" 
      :confirmIsDestructive="true">
      <p>Sure you want to delete these?</p>
    </modal-advanced>
  </div>
</template>

<script>
import ListAdvanced from '@/components/list/ListAdvanced'
import ModalAdvanced from '@/components/modal/ModalAdvanced'

import BlockLink from '@/components/navigation/BlockLink';

export default {
  name: 'ExampleListAdvanced',
  components: {
    ListAdvanced,
    ModalAdvanced,
    BlockLink
  },
  data() {
    return {
      listItems: [],
      page: 1,
      loadingItems: false,
      allDataLoaded: false,
      actions: [
        {
          label: 'Favorite selected',
          icon: () => import('@/components/icons/IconStar'),
          emit: 'star'
        },
        {
          label: 'Unfavorite selected',
          icon: () => import('@/components/icons/IconStarBorder'),
          emit: 'unstar'
        },
        {
          label: 'Delete',
          icon: () => import('@/components/icons/IconDelete'),
          emit: 'delete'
        },
        {
          label: 'Archive',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'archive'
        },
        {
          label: 'Beach boi has a very long name',
          icon: () => import('@/components/icons/IconBeachAccess'),
          emit: 'beach'
        }
      ],
      showModal: false
    }
  },
  created() {
    this.loadItems();
  },
  methods: {
    loadMoreItems(query) {
      console.log('should load more')
      this.page++;
      this.loadItems(query);
    },
    loadItems(query) {
      if (this.allDataLoaded) {
        return
      }

      this.loadingItems = true;

      fetch(`https://jsonplaceholder.typicode.com/todos?_page=${this.page}&_limit=30&q=${query || ''}`)
        .then(res => res.json())
        .then(data => {
          this.loadingItems = false;
          this.listItems = this.listItems.concat(data);

          if (data.length === 0) {
            this.allDataLoaded = true;
          } 
        })
        .catch(err => {
          console.log(err)
          this.loadingItems = false;
        })
    },
    updateSelectedCount(selectedItems) {
      console.log(this.listItems.includes(selectedItems[0]))
    },
    handleStar(payload) {
      const isBulkAction = Array.isArray(payload)
      console.log('handlestar',isBulkAction)
      if (isBulkAction && payload.length === 0) {
        return console.warn('tried to call action handler without any payload')
      }
    },
    handleDelete(payload) {
      const isBulkAction = Array.isArray(payload)
      console.log('handledelete')
      
      if (isBulkAction && payload.length === 0) {
        return console.warn('tried to call action handler without any payload')
      }

      if(!isBulkAction || isBulkAction && payload.length < 5) {
        this.$store.dispatch('changeNotification', {content: `Deleted ${payload.length || 1} items`, duration: 2000, label: 'Undo', action: () => {console.log('should undo')}})
      } else {
        console.log('should show confirm modal')
        this.showModal = true;
      }
    },
    handleSearch(query) {
      // if search should not clear selected items then don't call this func
      this.page = 1;
      this.listItems = [];
      this.allDataLoaded = false;
      this.loadItems(query);

    }
  }
}
</script>
