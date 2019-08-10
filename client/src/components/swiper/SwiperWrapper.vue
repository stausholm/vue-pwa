<template>
  <div class="swiper-wrapper">
    <button class="swiper-btn swiper-btn--back btn-icon" :disabled="buttonStates.back" @click="back">
      <icon-base iconName="scroll left">
        <icon-arrow-left />
      </icon-base>
    </button>
    <button class="swiper-btn swiper-btn--forward btn-icon" :disabled="buttonStates.forward" @click="forward">
      <icon-base iconName="scroll right">
        <icon-arrow-right />
      </icon-base>
    </button>
    <!-- <div class="swiper" 
      :class="{'hide-scrollbars': noScrollbar, 'grabbing': isDownAndMoving}" 
      ref="swiper"
      @mousedown="handleMouseDown"
      @mouseleave="handleMouseLeave"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove">
      <slot></slot>
      <observer v-if="intersectionRoot" v-on="$listeners" :options="{root: intersectionRoot, rootMargin: intersectionMargin}"/>
    </div> -->

    <!-- <div class="swiper-wrap">
      <div class="edge-fix"></div>
      <div class="scrollswiper scrollable" ref="swiper">
        <div class="perpective-ctr">
          <div class="thumb" ref="thumb" :style="thumbStyles"></div>
          <slot></slot>
        </div>
      </div>
    </div> -->

    <div class="swiper-wrap" v-if="customScrollBar">
      <div class="edge-fix"></div>
      <div class="swiper scrollable perpective-ctr" 
        ref="swiper" 
        :class="{'hide-scrollbars': noScrollbar, 'grabbing': isDownAndMoving || isDraggingScroll, 'custom-scrolling': isDraggingScroll, 'ios': isIOS}"
        @mousedown="handleMouseDown"
        @mouseleave="handleMouseLeave"
        @mouseup="handleMouseUp"
        @mousemove="handleMouseMove"
        @scroll="scrollEvent">
        <div class="thumb" 
          ref="thumb" 
          :style="thumbStyles"
          @mousedown.stop="handleMouseDownBar"></div>
        <slot></slot>
        <observer v-if="intersectionRoot" v-on="$listeners" :options="{root: intersectionRoot, rootMargin: intersectionMargin}"/>
      </div>
    </div>
    <div class="swiper" v-else
      :class="{'hide-scrollbars': noScrollbar, 'grabbing': isDownAndMoving}" 
      ref="swiper"
      @mousedown="handleMouseDown"
      @mouseleave="handleMouseLeave"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      @scroll="scrollEvent">
      <slot></slot>
      <observer v-if="intersectionRoot" v-on="$listeners" :options="{root: intersectionRoot, rootMargin: intersectionMargin}"/>
    </div>

  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconArrowLeft from '@/components/icons/IconArrowLeft';
import IconArrowRight from '@/components/icons/IconArrowRight';

import "../../polyfills/smoothScrollBehavior";

import Observer from '@/utils/observer'

export default {
  name: 'SwiperWrapper',
  components: {
    IconBase,
    IconArrowLeft,
    IconArrowRight,
    Observer
  },
  props: {
    noScrollbar: {
      type: Boolean,
      default: true
    },
    intersectionMargin: {
      type: String,
      default: '200px'
    },
    customScrollBar: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isDown: false,
      isDownAndMoving: false,
      scrollLeft: 0,
      startX: 0,
      scrollDir: 'left',
      // buttonStates: {
      //   back: true,
      //   forward: false
      // },
      intersectionRoot: null,
      thumbStyles: {
        width: '',
        transform: ''
      },
      scrollbarX: 0,
      isDraggingScroll: false,
      thumbScaling: 0,
      swiperScrollLeft: 0,
      componentMounted: false,
      isIOS: false
    }
  },
  computed: {
    buttonStates() {
      if (!this.componentMounted) return {}
      const swiper = this.$refs.swiper;

      return {
        back: this.swiperScrollLeft <= 0 || swiper.scrollWidth <= swiper.offsetWidth,
        forward: this.swiperScrollLeft >= swiper.scrollWidth - swiper.offsetWidth || swiper.scrollWidth <= swiper.offsetWidth
      }
    }
  },
  methods: {
    handleMouseDown(e) {
      //console.log('asdasdasdasd')
      e.preventDefault();
      const Swiper = this.$refs.swiper;
      this.isDown = true;
      this.startX = e.pageX - Swiper.offsetLeft;
      this.scrollLeft = Swiper.scrollLeft;
    },
    handleMouseLeave(e) {
      if (this.isDraggingScroll) return;
      if (e) e.stopPropagation();
      this.isDown = false;
      this.isDownAndMoving = false;
    },
    handleMouseUp(e) {
      if (this.isDraggingScroll) return;
      e.stopPropagation();
      this.isDown = false;
      this.isDownAndMoving = false;
      this.startX = 0;
    },
    handleMouseMove(e) {
      if (this.isDraggingScroll) return;
      //console.log('asdasd')
      if (!this.isDown) return
      e.preventDefault();
      e.stopPropagation();
      this.isDownAndMoving = true;
      const Swiper = this.$refs.swiper;
      const x = e.pageX - Swiper.offsetLeft;
      const walk = (x - this.startX) //* 3;
      const newScrollPos = this.scrollLeft - walk;
      Swiper.scrollLeft = newScrollPos;
      this.scrollDir = newScrollPos > this.scrollLeft ? 'left' : 'right'
      // Swiper.scrollTo({top:0, left:this.scrollLeft - walk, behavior: 'smooth'});
    },


    handleMouseDownBar(e) {
      //console.log('handleMouseDownBar')
      this.handleMouseLeave()
      this.isDraggingScroll = true;

      e.preventDefault();

      const Swiper = this.$refs.swiper;
      this.scrollbarX = e.pageX;
      this.scrollLeft = Swiper.scrollLeft;
    },
    handleMouseLeaveBar(e) {
      //console.log('handleMouseLeaveBar')
      this.isDraggingScroll = false;
    },
    handleMouseUpBar(e) {
      //console.log('handleMouseUpBar')
      this.handleMouseLeave()

      this.isDraggingScroll = false;
    },
    handleMouseMoveBar(e) {
      //console.log('handleMouseMoveBar')
      if (this.isDownAndMoving) { // moved cursor into scrollbar while dragging inside the card area
        return this.handleMouseLeave()
      }
      if (!this.isDraggingScroll) return;

      e.preventDefault();

      const swiper = this.$refs.swiper;
      const clientX = e.pageX;

      const newScrollPos = swiper.scrollLeft + (clientX - this.scrollbarX)/ this.thumbScaling;
      this.scrollDir = newScrollPos > swiper.scrollLeft ? 'left' : 'right'
      swiper.scrollLeft = Math.round(newScrollPos);
      //console.log(clientX, this.scrollbarX, swiper.scrollLeft, Math.round(newScrollPos))
      
      this.scrollbarX = clientX;
      
    },


    back() {
      const swiper = this.$refs.swiper;
      const currScroll = swiper.scrollLeft;
      const width = swiper.offsetWidth;
      const scrollWidth = swiper.scrollWidth;
      swiper.scrollTo({top:0, left:currScroll - width, behavior: 'smooth'});
    },
    forward() {
      const swiper = this.$refs.swiper;
      const currScroll = swiper.scrollLeft;
      const width = swiper.offsetWidth;
      const scrollWidth = swiper.scrollWidth;
      swiper.scrollTo({top:0, left:currScroll + width, behavior: 'smooth'});
      console.log({currScroll, width, scrollWidth, back: currScroll - width, forward: currScroll + width >= scrollWidth})
    },
    updateScrollbarSize() { // TODO: call this method if swiper contents change
      const thumb = this.$refs.thumb;
      const swiper = this.$refs.swiper;
      
      const swiperWidth = swiper.offsetWidth;
      const scrollWidth = swiper.scrollWidth;
      const maxScrollLeft = scrollWidth - swiperWidth;
      const thumbWidth = Math.pow(swiperWidth, 2)/scrollWidth;
      const maxLeftOffset = swiperWidth - thumbWidth;

      const thumbScaling = maxLeftOffset / maxScrollLeft;

      const indentScrollBar = this.customScrollBar === 'indent';

      const thumbStyles = {
        width: `${thumbWidth}px`,
        transform: `
          scale(${1/thumbScaling})
          matrix3d(
            1, 0, 0, 0, 
            0, 1, 0, 0, 
            0, 0, 1, 0, 
            0, 0, 0, -1
          )
          translateZ(${-2 + 1 - 1/thumbScaling}px)
          translateX(-0px)

          ${indentScrollBar ? 'translateX(75%) scale(.5) translateZ(-1px)' : ''}
        `
      }

      // We are on Safari, where we need to use the sticky trick!
      if (getComputedStyle(swiper).webkitOverflowScrolling) {
        console.log('IOS trick')
        this.isIOS = true;
        thumb.nextElementSibling.style.marginLeft = `-${thumbWidth}px`

        const z = 1 - 1/(1+thumbScaling);
        thumbStyles.transform = `translateZ(${z}px) scale(${1-z}) translateX(-0px)`;
      }

      this.thumbStyles = thumbStyles;
      this.thumbScaling = thumbScaling;
    },
    scrollEvent() {
      this.swiperScrollLeft = this.$refs.swiper.scrollLeft;
    },
    handleScrollSnapWhenMouseUp() {
      // hack, as scroll-snap-points will not kick in when mousedown is released
      this.$nextTick(() => {
        const horizontalScroll = this.scrollDir === 'left' ? 1 : -1;
        this.$refs.swiper.scrollBy({top: 0, left: horizontalScroll, behavior:'smooth'})
      })
    }
  },
  mounted() {
    this.intersectionRoot = this.$refs.swiper
    this.componentMounted = true;

    if (this.customScrollBar) {
      // https://developers.google.com/web/updates/2017/03/custom-scrollbar
      this.updateScrollbarSize()
  
      window.addEventListener('resize', this.updateScrollbarSize)
      window.addEventListener('mousemove', this.handleMouseMoveBar);
      window.addEventListener('mouseup', this.handleMouseUpBar, {passive: true});
    }
  },
  render() {
    console.log('render')
  },
  beforeDestroy() {
    if (this.customScrollBar) {
      window.removeEventListener('resize', this.updateScrollbarSize)
      window.removeEventListener('mousemove', this.handleMouseMoveBar);
      window.removeEventListener('mouseup', this.handleMouseUpBar);
    }
  },
  watch: {
    isDownAndMoving() {
      if (!this.isDownAndMoving) {
        this.handleScrollSnapWhenMouseUp()
      }
    },
    isDraggingScroll() {
      if (!this.isDraggingScroll) {
        this.handleScrollSnapWhenMouseUp()
      }
    }
  }
}
</script>

<style lang="scss">
.swiper-wrap { // EDGE fix
  transform: translateZ(0);

  //height: 500px;

  .edge-fix {
    position: fixed;
    top: 0px;
    width: 1px;
    height: 1px;
    z-index: 1;
  }

  .perpective-ctr {
    perspective-origin: left bottom;
    transform-style: preserve-3d;
    height: 100%;
    //position: absolute;
    //pointer-events: none;

    .thumb {
      pointer-events: initial;
      position: absolute;
      transform-origin: left bottom;
      bottom: 0px;
      left: 0px;
    }

    &.ios {
      perspective: 1px;
      height: auto;
      width: auto;
      position: static;

      .thumb {
        left: 100%;
        position: -webkit-sticky;
      }
    }
  }

  .scrollable {
    perspective-origin: left bottom;
    transform-style: preserve-3d;
    perspective: 1px;
  }

  


  .thumb {
    // height: 68px;
    // background-image: linear-gradient(90deg, transparent, magenta, red, yellow, limegreen, turquoise, blue, magenta, transparent);
    // background-repeat: no-repeat;
    // background-size: contain;
    z-index: 1;

    height: 12px;
    background: #333;
    border-radius: 6px;
  }
}

// .scrollswiper {
//   overflow-x: scroll;
//   overflow-y: hidden;
//   background: #EDEDED;
//   width: 100%;
//   height: 100%;
//   position: relative;
//   -webkit-overflow-scrolling: touch;
//   display: block;

//   .perpective-ctr {
//     display: flex;

//     .swiper__item {
//       padding: 40px;
//     }
//   }
// }
</style>