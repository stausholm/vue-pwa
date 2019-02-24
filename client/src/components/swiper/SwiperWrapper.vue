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
      default: true
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
  },
  watch: {
    isDown() {
      if (!this.isDown) {
        // dumb fix
        this.$nextTick(() => {
          this.$refs.swiper.scrollBy({top: 0, left:1, behavior:'smooth'})
        })
      }
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

    .swiper__item {
      scroll-snap-align: none;
    }
  }

  &__item {
    scroll-snap-align: start;
    transform: translateZ(0); // prevent repainting entire component

    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
    color: #6a6a6a;
    border-radius: 2px;
    min-width: 40%;
    padding: 20px;

    &:not(:last-child) {
      margin-right: 16px;
    }
  }
}

.hide-scrollbars {
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
