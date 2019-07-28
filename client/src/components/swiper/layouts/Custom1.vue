<template>
  <swiper-item>
    <b>{{content.id}} {{content.title}}</b>
    <p>{{content.url}}</p>
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
