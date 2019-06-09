<template>
  <!-- <transition name="slide-up" appear>
  </transition> -->
  <div class="floating-action-bar container">
    <ul ref="list" class="fab-list">
      <li v-for="(option, index) in slicedOptions" :key="index" @click="option.action" class="fab-list__item">
        <icon-base :iconName="option.label" width="18" height="18">
          <component :is="option.icon"/>
        </icon-base>
        <span>{{option.label}}</span>
      </li>
      <li v-if="useOverflowMenu" @click="toggleShowMore" class="fab-list__item fab-list__item--more">
        <icon-base iconName="show more" width="18" height="18">
          <icon-more-vert />
        </icon-base>
        <span>More</span>
        <transition name="slide-up">
          <ul v-if="showingMore" @click.stop="showingMore = false" v-click-outside="toggleShowMore">
            <li v-for="(option, index) in options.slice(sliceIndex - 1)" :key="index" @click="option.action">{{option.label}}</li>
          </ul>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase'
import IconMoreVert from '@/components/icons/IconMoreVert'

// if options is longer than what the current viewport allows, 
// replace the last visible option with VerticalDots which open a list with the rest in
export default {
  name: 'FloatingActionBar',
  components: {
    IconBase,
    IconMoreVert
  },
  props: {
    options: Array
  },
  data() {
    return {
      sliceIndex: this.options.length,
      useOverflowMenu: false,
      showingMore: false
    }
  },
  computed: {
    slicedOptions() {
      if (this.useOverflowMenu) {
        return this.options.slice(0, this.sliceIndex - 1)
      }
      return this.options.slice(0, this.sliceIndex)
    }
  },
  methods: {
    toggleShowMore() {
      this.showingMore = !this.showingMore;
    },
    calculateOverflowingOptions() {
      console.log('calculating overflowing options')
      this.sliceIndex = this.options.length
      let availableWidth = window.innerWidth - 16 - 16 - 8 - 8 // paddings used on stuff
      let optionsWidth = this.options.length * 70 // fixed px size of each option item

      if (availableWidth < optionsWidth) {
        this.useOverflowMenu = true;

        while (availableWidth < optionsWidth) {
          availableWidth += 70;
          this.sliceIndex--;
        }
      } else {
        this.useOverflowMenu = false;
      }
    }
  },
  created() {
    this.calculateOverflowingOptions()
    // TODO: Should be orientationchange instead of resize, if browser implementation and support is consistent
    // resize event is also fired when bringing onscreen keyboard up
    window.addEventListener('resize', this.calculateOverflowingOptions)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateOverflowingOptions)
  }
}
</script>

<style lang="scss" scoped>
.floating-action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  // background-color: red;
  padding: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none;
  z-index: 22222;

  .fab-list {
    height: 100%;
    min-width: 100px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    padding: 8px;
    border-radius: 100px;
    pointer-events: initial;
    box-shadow: 0 2px 6px -3px #000;

    &__item {
      $item-width: 70px;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 8px;
      width: $item-width;
      user-select: none;
      cursor: pointer;
      // overflow: hidden;
      // text-overflow: ellipsis;

      &:hover {
        //background: blue;
      }
      
      span {
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: pre;
        text-align: center;
        font-size: .8rem;
      }

      &--more {
        position: relative;

        ul {
          position: absolute;
          bottom: calc(100% + 16px);
          right: -8px;
          background: #fff;
          border-radius: 4px;
          padding: 0 8px;
          //max-width: calc(100vw - 16px - 16px);
          

          &::after {
            content: '';
            position: absolute;
            top: 100%;
            width: 8px;
            height: 8px;
            background-color: #fff;
            transform: translateY(-4px) rotate(45deg);
            right: $item-width / 2 + 4px;
            z-index: -1;
          }

          li {
            padding: 12px 0;
            white-space: pre;

            &:not(:last-child) {
              border-bottom: 1px solid grey;
            }
          }
        }
      }
    }
  }
}
</style>
