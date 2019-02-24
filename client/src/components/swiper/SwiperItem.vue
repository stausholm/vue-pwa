<template>
  <div class="swiper__item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SwiperItem',
  created(){
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  }
}
</script>
