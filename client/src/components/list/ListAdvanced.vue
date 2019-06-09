<template>
  <div class="list-wrapper" :class="{'list--is-selecting': isSelecting}">
    <div class="list__action-header" ref="actionsheader">
      <div class="list__search">
        <input type="text" placeholder="Search..." class="list-search" v-if="!useCustomSearch" v-model="searchQuery" @input="handleSearch">

        <button @click="useAlternativeDisplayMode = !useAlternativeDisplayMode" class="list-btn btn-icon--animate">
          <icon-base iconName="toogle view mode">
            <transition name="icon-scale">
              <icon-view-mode-2 v-if="useAlternativeDisplayMode" />
              <icon-view-mode-1 v-else />
            </transition>
          </icon-base>
        </button>

        <p v-if="isLoading">loading</p>
      </div>

      <div class="list__actions" ref="listactions">
        <p v-if="isSelecting" class="selected-label">selected: <span class="selected-count">{{selectedItems.length}}</span></p>
      
        <transition name="slide-up">
          <div class="bulk-actions" v-if="isSelecting" ref="bulkactions">
            <!-- <floating-action-bar :options="actions"/> -->
            <button v-for="action in slicedActions" 
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
            
            <button class="list-btn" v-if="useOverflowMenu" @click="toggleShowMore">
              <icon-base iconName="more actions">
                <icon-more />
              </icon-base>

              <ul v-if="showingOverflowMenu" @click.stop="showingOverflowMenu = false" v-click-outside="toggleShowMore">
                <li v-for="(action, index) in actions.slice(sliceIndex - 1)" :key="index" @click="$emit(action.emit, selectedItems)">{{action.label}}</li>
              </ul>
            </button>
          </div>
        </transition>

        <button v-if="actions.length > 0" @click="toggleSelectAll" class="list-btn btn-icon--animate tooltip">
          <icon-base iconName="toogle select all">
            <transition name="icon-scale">
              <icon-deselect-all v-if="allAreSelected" />
              <icon-select-all v-else />
            </transition>
          </icon-base>
          <span class="tooltip-text tooltip-text--">{{ allAreSelected ? 'deselect all' : 'select all'}}</span>
        </button>

        <button v-if="actions.length > 0" @click="toggleSelecting" class="list-btn btn-icon--animate" :class="{'active': isSelecting}">
          <icon-base :iconName="isSelecting ? 'exit bulk mode' : 'enter bulk mode'">
            <transition name="icon-scale">
              <icon-multimode-off v-if="isSelecting" />
              <icon-multimode-on v-else />
            </transition>
          </icon-base>
        </button>
      </div>

    </div>



    <div class="list__advanced-list" :class="{'list__advanced-list--alternative': useAlternativeDisplayMode}" ref="list">
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
import IconViewModule from '@/components/icons/IconViewModule';
import IconViewList from '@/components/icons/IconViewList';
import IconLibraryBooks from '@/components/icons/IconLibraryBooks';
import IconLibraryBooks2 from '@/components/icons/outline/IconLibraryBooks';
import IconClose from '@/components/icons/IconClose';
import IconEdit from '@/components/icons/IconEdit';
import IconMoreVert from '@/components/icons/IconMoreVert';

import Observer from '@/utils/observer'

import ListAdvancedItemTodo from './ListAdvancedItemtodo'

import FloatingActionBar from '@/components/floatingActionBar/FloatingActionBar'

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
    'icon-more': IconMoreVert,

    Observer,

    ListAdvancedItemTodo,
    FloatingActionBar
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
      debounceFunc: null,
      useOverflowMenu: false,
      sliceIndex: this.actions.length,
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
    slicedActions() {
      if (this.useOverflowMenu) {
        return this.actions.slice(0, this.sliceIndex - 1)
      }
      return this.actions.slice(0, this.sliceIndex)
    }
  },
  methods: {
    emitLoadMore() {
      this.$emit('loadMore', this.searchQuery)
    },
    updateSelected(item) {
      console.log(item)
      if (!this.isSelecting) {
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
      this.sliceIndex = this.actions.length
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
  beforeDestroy() {
    clearTimeout(this.debounceFunc) // just in case the user decides to leave before debounced func has been called
    window.removeEventListener('resize', this.updateOverflowMenu)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/base/variables.scss';
@import '@/styles/base/_breakpoints.scss';
.list-wrapper {
  margin: 0 -$default-spacing;
  padding: $default-spacing;
  overflow-x: hidden;
}

.list__action-header {
  display: flex;
  background-color: #f9f9f9;
  padding: 10px 0;
  justify-content: space-between;
  position: relative;

  > div {
    display: flex;
    height: 40px;
    align-items: center;
  }

  .list-search {
    padding: 8px 12px;
    border-radius: 0.25rem;
    border: none;
    margin-right: 5px;
    height: 40px;
  }

  .list__search {
    @include breakpoint-max(sm) {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);

      .list--is-selecting & {
        z-index: -1;
      }
    }
  }

  .list-btn {
    width: 40px;
    height: 40px;
    min-width: 40px;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    background-color: transparent;
    color: #99a0a3;
    transition: color .2s ease-out, background-color .2s ease-out;
    outline: 0;

    &:hover, &:focus {
      color: #1d1f20;
      background: rgba(255, 255, 255, 0.5);
    }

    &:disabled {
      cursor: not-allowed;
      color: #d2d3d4;
    }

    &.active {
      background-color: #fff;
      color: #f32556;
    }
  }
}

.selected-label {
  padding: 5px;
  white-space: nowrap;

  .selected-count {
    margin-left: 4px;
    padding: 2px 7px;
    background: #99a0a3;
    font-size: .9em;
    border-radius: .25rem;
    font-weight: bold;
  }
}


.list__advanced-list--alternative {
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;

  .list-item {
    width: 49%;
    height: 250px;
  }
}


.list__actions {
  flex: 1;
  justify-content: flex-end;
  flex-flow: row wrap;

  .bulk-actions {
    flex: 1;
    justify-content: flex-end;
    display: flex;
  }
}


// tooltip
.tooltip {
  position: relative;

  .tooltip-text {
    $arrow-size: 5px;
    $tooltip-color: rgba(0,0,0,.6);

    visibility: hidden;
    opacity: 0;
    max-width: 120px;
    width: max-content;
    background-color: $tooltip-color;
    color: #fff;
    text-align: center;
    padding: 8px;
    border-radius: 0.25rem;
    position: absolute;
    z-index: 3;
    word-break: break-word;
    transition: visibility .2s, opacity .2s, transform .2s;

    // default to bottom
    top: 100%;
    left: 50%;
    transform: translateX(-50%); 

    &::after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -$arrow-size;
      border-width: $arrow-size;
      border-style: solid;
      border-color: transparent transparent $tooltip-color transparent;
    }

    &.tooltip-text--left {
      top: 50%;
      right: 105%;
      left: auto;
      transform: translateY(-50%);

      &::after {
        top: 50%;
        left: 100%;
        margin-left: 0;
        margin-top: -$arrow-size;
        border-color: transparent transparent transparent $tooltip-color;
      }
    }

    &.tooltip-text--right {
      top: 50%;
      left: 105%;
      transform: translateY(-50%);

      &::after {
        top: 50%;
        left: auto;
        right: 100%;
        margin-left: 0;
        margin-top: -$arrow-size;
        border-color: transparent $tooltip-color transparent transparent;
      }
    }

    &.tooltip-text--top {
      bottom: 100%;
      left: 50%; 
      top: auto;

      &::after {
        top: 100%;
        bottom: auto;
        border-color: $tooltip-color transparent transparent transparent;
      }
    }
  }

  &:hover {
    .tooltip-text {
      visibility: visible;
      opacity: 1;
      transform: translateX(-50%) translateY(5px);

      &.tooltip-text--top {
        transform: translateX(-50%) translateY(-5px);
      }

      &.tooltip-text--left {
        transform: translateY(-50%) translateX(-5px);
      }

      &.tooltip-text--right {
        transform: translateY(-50%) translateX(5px);
      }
    }
  }
}
</style>
