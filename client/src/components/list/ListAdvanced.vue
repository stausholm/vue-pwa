<template>
  <div class="list-wrapper" :class="{'list--is-selecting': isSelecting}">
    <div class="list__action-header secondary-header" ref="actionsheader">
      <div class="list__search">
        <input type="text" placeholder="Filter..." class="list-search" v-if="!useCustomSearch" v-model="searchQuery" @input="handleSearch">
        <!-- <p v-if="isLoading">loading</p> -->
      </div>

      <div class="list__actions" ref="listactions">
        <p v-if="isSelecting" class="selected-label">selected: <span class="selected-count">{{selectedItems.length}}</span></p>
      
        <transition name="slide-up">
          <div class="bulk-actions" v-if="isSelecting" ref="bulkactions">
            <button v-for="action in slicedBulkActions"
              :key="action.label"
              :disabled="selectedItems.length < 1"
              @click="$emit(action.emit, selectedItems)"
              class="list-btn tooltip"
            >
              <icon-base :iconName="action.label">
                <component :is="action.icon"/>
              </icon-base>
              <span class="tooltip-text">{{action.label}}</span>
            </button>

            <button class="list-btn btn--dropdown" v-if="useOverflowMenu" @click="toggleShowMore">
              <icon-base iconName="more actions">
                <icon-more />
              </icon-base>

              <transition name="slide-up">
                <ul v-if="showingOverflowMenu" @click.stop="showingOverflowMenu = false" v-click-outside="toggleShowMore">
                  <li v-for="(action, index) in bulkActions.slice(sliceIndex - 1)" :key="index" @click="$emit(action.emit, selectedItems)">{{action.label}}</li>
                </ul>
              </transition>
            </button>

            <button v-if="bulkActions.length > 0" @click="toggleSelectAll" class="list-btn btn-icon--animate tooltip list-advanced__select-all-button">
              <icon-base iconName="toogle select all">
                <transition name="icon-scale">
                  <icon-deselect-all v-if="allAreSelected" />
                  <icon-select-all v-else />
                </transition>
              </icon-base>
              <span class="tooltip-text tooltip-text--">{{ allAreSelected ? 'deselect all' : 'select all'}}</span>
            </button>
          </div>
        </transition>


        <button v-if="bulkActions.length > 0" @click="toggleSelecting" class="list-btn btn-icon--animate" :class="{'active': isSelecting}">
          <icon-base :iconName="isSelecting ? 'exit bulk mode' : 'enter bulk mode'">
            <transition name="icon-scale">
              <icon-multimode-off v-if="isSelecting" />
              <icon-multimode-on v-else />
            </transition>
          </icon-base>
        </button>
      </div>

    </div>



    <div class="list__advanced-list" ref="list">
      <transition-group name="yoyo" class="transition-group-el">
        <list-advanced-item-wrapper
          v-for="item in filteredList" 
          :key="item.id" 
          :item="item" 
          :itemTemplate="itemTemplate"
          :itemIsSelected="selectedItems.includes(item)"
          :isSelecting="isSelecting"
          :actions="actions"
          v-on="$listeners"
          @selected_internal_use_only="updateSelected(item)"
          :class="{'list-item--selected': selectedItems.includes(item)}"
        ></list-advanced-item-wrapper>
        </transition-group>
        <observer @intersect="reachedBottom" :options="{rootMargin: '200px'}"/>
    </div>

    <div class="list__loader" v-if="isLoading">
      loading more items
    </div>
    <div class="list__no-results" v-if="!isLoading && filteredList.length === 0">
      <p>no results :(</p>
    </div>
    <div class="list__load-more" v-if="!isLoading && isAsyncPaginated && showLoadButton && !allDataLoaded">
      <button @click="emitLoadMore">more</button>
    </div>
    <div class="list__reached-end" v-if="allDataLoaded">
      <p>You've reached the end!</p>
    </div>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconLibraryBooks from '@/components/icons/IconLibraryBooks';
import IconLibraryBooks2 from '@/components/icons/outline/IconLibraryBooks';
import IconClose from '@/components/icons/IconClose';
import IconEdit from '@/components/icons/IconEdit';
import IconMoreVert from '@/components/icons/IconMoreVert';

import Observer from '@/utils/observer'

import ListAdvancedItemWrapper from './ListAdvancedItemWrapper';

export default {
  name: 'ListAdvanced',
  components: {
    IconBase,
    'icon-select-all': IconLibraryBooks2,
    'icon-deselect-all': IconLibraryBooks,
    'icon-multimode-on': IconEdit,
    'icon-multimode-off': IconClose,
    'icon-more': IconMoreVert,

    Observer,

    ListAdvancedItemWrapper
  },
  props: {
    list: { // the items in the list
      type: Array,
      required: true
    },
    itemTemplate: { // vue component to use for each item in list
      type: Object,
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
      searchQuery: '',
      debounceFunc: null,
      useOverflowMenu: false,
      sliceIndex: this.actions.length, // also includes actions of type 'single'
      showingOverflowMenu: false
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
    },
    bulkActions() {
      return this.actions.filter(action => {
        return !action.type || action.type === 'bulk'
      })
    },
    slicedBulkActions() {
      if (this.useOverflowMenu) {
        return this.bulkActions.slice(0, this.sliceIndex - 1)
      }
      return this.bulkActions.slice(0, this.sliceIndex)
    }
  },
  methods: {
    emitLoadMore() {
      this.$emit('loadMore', this.searchQuery)
    },
    updateSelected(item) {
      console.log(item)
      if (!this.isSelecting && this.bulkActions.length > 0) { // if no bulk actions, we don't update this.isSelecting
        this.isSelecting = true;
        this.updateOverflowMenu();
      }
      this.selectedItems.includes(item) ? this.selectedItems = this.selectedItems.filter(thing => thing != item) : this.selectedItems.push(item)
      this.$emit('selected', this.selectedItems)
    },
    toggleSelecting() {
      this.isSelecting = !this.isSelecting;
      if (!this.isSelecting) {
        this.selectedItems = [];
        this.$emit('selected', this.selectedItems)
      } else {
        this.updateOverflowMenu();
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
    },
    updateOverflowMenu() {
      //console.log('update overflow menu')
      this.sliceIndex = this.bulkActions.length
      this.useOverflowMenu = false;
      this.$nextTick(this.calculateOverflowingActions)
    },
    calculateOverflowingActions() {
      if (!this.$refs.bulkactions) {
        return
      }
      
      const $wrap = this.$refs.listactions;

      let wrapWidth = $wrap.offsetWidth;
      const usedWidth = Array.from($wrap.children).reduce((a,b) => a + b.offsetWidth,0);
      const actionWidth = this.$refs.bulkactions.querySelector('button').offsetWidth;
      
      if (wrapWidth < usedWidth) {
        this.useOverflowMenu = true;
 
        while (wrapWidth < usedWidth) {
          wrapWidth += actionWidth;
          this.sliceIndex--;
        }
      } else {
        this.useOverflowMenu = false;
      }
    },
    toggleShowMore() {
      this.showingOverflowMenu = !this.showingOverflowMenu;
    }
  },
  mounted() {
    //this.calculateOverflowingActions();
    window.addEventListener('resize', this.updateOverflowMenu)
  },
  created() {
    const reservedEmitNames = ['loadMore', 'selected', 'searched', 'reached_bottom', 'itemClicked', 'selected_internal_use_only']
    this.actions.forEach(action => {
      if (reservedEmitNames.indexOf(action.emit) !== -1) {
        console.error(`Reserved emitter name used. "${action.emit}" is a reserved name, used internally by this component. Use a different name for your emitter`)
      }
    })
  },
  beforeDestroy() {
    clearTimeout(this.debounceFunc) // just in case the user decides to leave before debounced func has been called
    window.removeEventListener('resize', this.updateOverflowMenu)
  }
}
</script>

<style lang="scss">
.yoyo-enter {
  opacity: 0;  
}
.yoyo-enter-active {
  animation: yoyo-in 1s ease-out forwards;
  transition: opacity .5s;
}
// .yoyo-leave {
  
// }
.yoyo-leave-active {
  animation: yoyo-out 1s ease-out forwards;
  transition: opacity 1s;
  opacity: 0;
  position: absolute !important;
}

.yoyo-move {
  transition: transform 1s;
}

@keyframes yoyo-in {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes yoyo-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(20px);
  }
}


.list-advanced--alternative {
  .transition-group-el {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
  }
}
</style>
