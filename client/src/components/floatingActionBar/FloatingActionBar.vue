<template>
  <div class="floating-action-bar">
    <ul ref="list" class="fab-list">
      <li v-for="(option, index) in slicedOptions" :key="index" @click="option.action" class="fab-list__item" tabindex="0">
        <icon-base :iconName="option.label" width="18" height="18">
          <component :is="option.icon"/>
        </icon-base>
        <span>{{option.label}}</span>
      </li>
      <li v-if="useOverflowMenu" @click="toggleShowMore" class="fab-list__item fab-list__item--more" tabindex="0">
        <icon-base iconName="show more" width="18" height="18">
          <icon-more-vert />
        </icon-base>
        <span>More</span>
        <transition name="slide-up">
          <ul v-if="showingMore" @click.stop="showingMore = false" v-click-outside="toggleShowMore">
            <li v-for="(option, index) in options.slice(sliceIndex - 1)" :key="index" @click="option.action" tabindex="0">{{option.label}}</li>
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