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
import ModalAdvanced from '@/components/modal/ModalAdvanced'

export default {
  name: 'Posts',
  components: {
    ListAdvanced,
    ModalAdvanced
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
    }
  },
  created() {
    this.loadItems();
  }
}
</script>

