<template>
  <div>
    <div class="container--content">
      <h1>These are some cool posts!</h1>
      <p>They should come from jsonplaceholder and be rendered in a ListAdvanced component</p>
      <button @click="insertListItem">insert list item</button>
      <button @click="removeListItem">remove list item</button>
      <!-- <ul>
        <li>
          <router-link :to="{name: 'Post', params: {id: '2'}}">asd 2</router-link>
          <router-link :to="{name: 'Post', params: {id: '3'}}">asd 3</router-link>
        </li>
      </ul> -->

      <list-advanced 
        :itemTemplate="itemTemplate" 
        :actions="actions"
        @star="handleStar"
        @delete="handleDelete" 
        :list="listItems" 
        @loadMore="loadMoreItems" 
        @selected="updateSelectedCount"
        @searched="handleSearch"
        @reached_bottom="() => {}"
        @itemClicked="handleItemClicked"
        :isLoading="loadingItems"
        :showLoadButton="true"
        :isAsyncPaginated="true"
        :allDataLoaded="allDataLoaded"
        @updateDisplayMode="useAlternativeList = !useAlternativeList"
        :class="{'list-advanced--alternative': useAlternativeList}"
      >
      </list-advanced>
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
import ListAdvancedItem from '@/components/list/ListAdvancedItem'
import ModalAdvanced from '@/components/modal/ModalAdvanced'

import IconViewModule from '@/components/icons/IconViewModule';
import IconViewList from '@/components/icons/IconViewList';

export default {
  name: 'Posts',
  components: {
    ListAdvanced,
    ModalAdvanced
  },
  data() {
    return {
      listItems: [],
      itemTemplate: ListAdvancedItem,
      page: 1,
      loadingItems: false,
      allDataLoaded: false,
      useAlternativeList: false,
      showModal: false
    }
  },
  computed: {
    actions() {
      return [
        {
          label: 'Favorite selected',
          icon: () => import('@/components/icons/IconStar'),
          emit: 'star',
          type: 'bulk',
          //isPrimary: true
        },
        {
          label: 'Favorite selected',
          icon: () => import('@/components/icons/IconCasino'), // this serves as a fallback for 'states'
          emit: 'togglestar',
          // class: 'action-test action-test-2',
          // class: {
          //   'action-test': true,
          //   'action-test-2': false
          // },
          type: 'single',
          states: { // can be used with type 'single'
            key: 'completed', // the property on the single item that we want to validate against
            values: [ // based on the value of 'key', show corresponding icon
              {
                value: true, 
                icon: () => import('@/components/icons/IconStar') // if we instead import the icons normally, we dont trigger icon animations when they're initially rendered in listAdvancedItemWrapper component
              },
              {
                value: false,
                icon: () => import('@/components/icons/IconStarBorder')
              }
            ]
          }
        },
        {
          label: 'Unfavorite selected',
          icon: () => import('@/components/icons/IconStarBorder'),
          emit: 'unstar',
          type: 'bulk'
        },
        {
          label: 'Delete',
          icon: () => import('@/components/icons/IconDelete'),
          emit: 'delete',
          isPrimary: true // action to emit when swiping all the way to the left. if omitted, it's not possible to swipe all the way
        },
        {
          label: 'test1',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'test1'
        },
        {
          label: 'test2',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'test2'
        },
        {
          label: 'test3',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'test3'
        },
        {
          label: 'test4',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'test4'
        },
        {
          label: 'test5',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'test5'
        },
        {
          label: 'test6',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'test6'
        },
        {
          label: 'test7',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'test7'
        },
        {
          label: 'test8',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'test8'
        },
        {
          label: 'Archive',
          icon: () => import('@/components/icons/IconCasino'),
          emit: 'archive',
          type: 'bulk' // bulk, single, both. If property is omitted, action will be rendered both places
        },
        {
          label: 'Beach boi has a very long name',
          icon: () => import('@/components/icons/IconBeachAccess'),
          emit: 'beach',
          type: 'bulk'
        },
        {
          label: 'Display mode',
          icon: this.useAlternativeList ? () => import('@/components/icons/IconViewModule') : () => import('@/components/icons/IconViewList'),
          emit: 'updateDisplayMode',
          type: 'bulk'
        }
      ]
    }
  },
  methods: {
    loadMoreItems(query) {
      console.log('should load more')
      this.page++;
      this.loadItems(query, true);
    },
    loadItems(query, concatResult) {
      if (this.allDataLoaded) {
        return
      }

      this.loadingItems = true;

      fetch(`https://jsonplaceholder.typicode.com/todos?_page=${this.page}&_limit=30&q=${query || ''}`)
        .then(res => res.json())
        .then(data => {
          this.loadingItems = false;
          this.listItems = concatResult ? this.listItems.concat(data) : data;

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

    },
    insertListItem(index, item) {
      // this.listItems.splice(2,0,{
      //   completed: false,
      //   id: Date.now(),
      //   title: "delectus aut autem",
      //   userId: 1
      // })
      this.listItems.splice(2,0,{
        completed: false,
        id: Date.now(),
        title: "delectus aut autem",
        userId: 1
      })
    },
    removeListItem() {
      this.listItems.splice(2,1)
    },
    handleItemClicked(item) {
      console.log('we doin it', item)
      this.$router.push({name: 'Post', params: {id: item.id}})
    }
  },
  created() {
    this.loadItems();
  }
}
</script>

