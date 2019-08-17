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

    <div class="swiper"
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
    }
  },
  data() {
    return {
      isDown: false,
      isDownAndMoving: false,
      scrollLeft: 0,
      startX: 0,
      scrollDir: 'left',
      intersectionRoot: null,
      swiperScrollLeft: 0,
      componentMounted: false
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
      e.preventDefault();
      const Swiper = this.$refs.swiper;
      this.isDown = true;
      this.startX = e.pageX - Swiper.offsetLeft;
      this.scrollLeft = Swiper.scrollLeft;
    },
    handleMouseLeave(e) {
      if (e) e.stopPropagation();
      this.isDown = false;
      this.isDownAndMoving = false;
    },
    handleMouseUp(e) {
      e.stopPropagation();
      this.isDown = false;
      this.isDownAndMoving = false;
      this.startX = 0;
    },
    handleMouseMove(e) {
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
  },
  watch: {
    isDownAndMoving() {
      if (!this.isDownAndMoving) {
        this.handleScrollSnapWhenMouseUp()
      }
    }
  }
}
</script>