<template>
  <swiper-item @click.native="todo">
    <img :src="content.url" alt="">
    <div class="card__content">
      <div>
        <p>{{content.id}}: {{content.title}}</p>
      </div>
      <button class="btn-icon">
        <icon-base>
          <icon-arrow-right />
        </icon-base>
      </button>
    </div>
  </swiper-item>
</template>

<script>
import SwiperItem from '../SwiperItem'

import IconBase from '@/components/icons/IconBase';
import IconArrowRight from '@/components/icons/IconArrowRight';

export default {
  name: 'Custom2',
  components: {
    SwiperItem,
    IconBase,
    IconArrowRight
  },
  props: {
    content: Object
  },
  methods: {
    todo() {
      this.$store.dispatch('changeNotification', {content: 'trigger something', duration: 4000, label: 'Dismiss'})
    }
  }
}
</script>

<style lang="scss">
@import "../../../styles/base/variables";

.custom-swiper-item-2 {
  .swiper__item-inner {
    padding: 0;

    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-top-left-radius: $default-border-radius;
      border-top-right-radius: $default-border-radius;
    }

    .card__content {
      display: flex;
      justify-content: space-between;
      padding: $default-spacing $default-spacing/2;
    }
  }
}
</style>
