<template>
  <swiper-item :style="{backgroundImage: content.image}">
    <b>{{content.title}}</b>
    <p>{{content.body}}</p>
  </swiper-item>
</template>

<script>
import SwiperItem from '../SwiperItem'
export default {
  name: 'Custom1',
  components: {
    SwiperItem
  },
  props: {
    content: Object
  }
}
</script>
