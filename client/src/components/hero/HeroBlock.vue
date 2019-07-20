<template>
  <div class="hero">
    <div class="hero-bg" :style="{'background-image': `url('${bgImage}')`}"></div>
    <div class="hero-content container">
      <slot>REPLACE ME</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroBlock',
  props: {
    bgImage: {
      type: String,
      required: true,
      default: 'https://picsum.photos/200/300?image=1062'
    }
  },
  data() {
    return {

    }
  }
}
</script>
