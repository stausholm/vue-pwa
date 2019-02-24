<template>
  <div class="swiper" 
    :class="{'hide-scrollbars': noScrollbar, 'grabbing': isDown}" 
    ref="swiper"
    @mousedown="handleMouseDown"
    @mouseleave="handleMouseLeave"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SwiperWrapper',
  props: {
    noScrollbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDown: false,
      scrollLeft: 0,
      startX: 0
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
    },
    handleMouseUp(e) {
      this.isDown = false;
      this.startX = 0;
    },
    handleMouseMove(e) {
      if (!this.isDown) return
      e.preventDefault();
      const Swiper = this.$refs.swiper;
      const x = e.pageX - Swiper.offsetLeft;
      const walk = (x - this.startX) //* 3;
      Swiper.scrollLeft = this.scrollLeft - walk;
      // Swiper.scrollTo({top:0, left:this.scrollLeft - walk, behavior: 'smooth'});
    }
  }
}
</script>

<style lang="scss">
.swiper {
  -webkit-overflow-scrolling: touch;
  display: flex;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  height: 200px;
  background-color: lightgray;
  cursor: grab;
  scroll-snap-type: x mandatory;

  &:not(.grabbing) {
    // scroll-snap-type: x mandatory;
  }

  &.grabbing {
    cursor: grabbing;
    // scroll-snap-type: x;

    // .swiper__item {
    //   scroll-snap-align: none;
    // }
  }

  &__item {
    scroll-snap-align: center;
  }
}

.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
