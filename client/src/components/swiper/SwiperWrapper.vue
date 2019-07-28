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
      @mousemove="handleMouseMove">
      <slot></slot>
      <observer v-if="intersectionRoot" v-on="$listeners" :options="{root: intersectionRoot, rootMargin: intersectionMargin}"/>
    </div>

  </div>
</template>

<script>
import IconBase from '@/components/icons/IconBase';
import IconArrowLeft from '@/components/icons/IconArrowLeft';
import IconArrowRight from '@/components/icons/IconArrowRight';

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
      buttonStates: {
        back: true,
        forward: false
      },
      intersectionRoot: null
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
      this.isDown = false;
      this.isDownAndMoving = false;
    },
    handleMouseUp(e) {
      this.isDown = false;
      this.isDownAndMoving = false;
      this.startX = 0;
    },
    handleMouseMove(e) {
      if (!this.isDown) return
      e.preventDefault();
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
      //this.calculateButtonState(null, currScroll - width <= 0);
      this.buttonStates.back = currScroll - width <= 0;
      this.buttonStates.forward =  currScroll + width >= scrollWidth;
    },
    forward() {
      const swiper = this.$refs.swiper;
      const currScroll = swiper.scrollLeft;
      const width = swiper.offsetWidth;
      const scrollWidth = swiper.scrollWidth;
      swiper.scrollTo({top:0, left:currScroll + width, behavior: 'smooth'});
      //this.calculateButtonState();
      this.buttonStates.back = currScroll + width <= 0;
      this.buttonStates.forward =  currScroll + width >= scrollWidth;
      console.log({currScroll, width, scrollWidth, back: currScroll - width, forward: currScroll + width >= scrollWidth})
    },
    // calculateButtonState(forward, back) {
    //   const swiper = this.$refs.swiper;
    //   const currScroll = swiper.scrollLeft;
    //   const width = swiper.offsetWidth;
    //   const scrollWidth = swiper.scrollWidth;

    //   this.buttonStates.forward = typeof forward === 'boolean' ? forward : currScroll >= scrollWidth;
    //   this.buttonStates.back = typeof back === 'boolean' ? back : currScroll <= 0;
      
    //   // if (currScroll >= scrollWidth) {
    //   //   this.buttonStates.forward = false;
    //   // } else {
    //   //   this.buttonStates.forward = true;
    //   // }

    //   // if (currScroll <= 0) {
    //   //   this.buttonStates.back = false;
    //   // } else {
    //   //   this.buttonStates.back = false;
    //   // }
    // }
  },
  mounted() {
    this.intersectionRoot = this.$refs.swiper
  },
  watch: {
    isDownAndMoving() {
      if (!this.isDownAndMoving) {
        // this.calculateButtonState();

        // hack, as scroll-snap-points will not kick in when mousedown is released
        this.$nextTick(() => {
          const horizontalScroll = this.scrollDir === 'left' ? 1 : -1;
          this.$refs.swiper.scrollBy({top: 0, left: horizontalScroll, behavior:'smooth'})
        })
      }
    }
  }
}
</script>