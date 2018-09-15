<template>
  <div class="hero-split">
    <div class="hero-split-bg" v-for="item in backgrounds" :key="item" :class="'hero-split-bg--' + item"></div>
    <div class="hero-split-content container" :class="{'hero-split-content--flipped': pullImageLeft}">
      <div class="hero-split-content__image">
        <img :src="image" alt="promotional image">
      </div>
      <div class="hero-split-content__text">
        <slot>
          <h1>Overskrift lige her.</h1>
          <b>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis veniam ut esse neque ea nostrum voluptates magnam velit tempore earum, laudantium voluptas. Ex alias nam id dolor saepe porro labore.</b>
          <div>
            <button class="btn btn--responsive">En knap!</button>
            <button class="btn btn--responsive">En knap!</button>
          </div>
          <p class="footnote">Tekst med småt</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeroBlockSplit',
  props: {
    pullImageLeft: {
      type: Boolean,
      default: false
    },
    background: {
      type: [String, Array],
      default: ''
    },
    image: {
      type: String,
      default: '/static/img/icons/android-chrome-512x512.png'
    }
  },
  data() {
    return {
      backgrounds: []
    }
  },
  created() {
    if (Array.isArray(this.background)) {
      this.backgrounds = this.background;
    } else if (this.background !== ''){
      this.backgrounds.push(this.background);
    }
  }
}
</script>
