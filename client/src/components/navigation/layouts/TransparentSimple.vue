<template>
  <div>
    <div class="route-title">
      <b ref="title" v-if="routeTitle != ''">{{routeTitle}}</b>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleEl: null,
      headerEl: null,
      backgroundRGB: '33,150,243'
    }
  },
  computed: {
    routeTitle() {
      return this.$route.meta.title || '';
    }
  },
  methods: {
    scrollHandler() {
      const titleBottom = this.titleEl.offsetTop + this.titleEl.offsetHeight;
      const bottom = titleBottom - this.headerEl.offsetHeight; // point where bottom of header hits bottom of title container

      if (window.pageYOffset <= bottom) {
        this.headerEl.style.backgroundColor = `rgba(${this.backgroundRGB},${window.pageYOffset / bottom})`; // start at 0, go up to 1

        this.$refs.title.style.opacity = `${window.pageYOffset / bottom}`; // start at 0, go up to 1
        this.$refs.title.style.transform = `translateY(${200 - (window.pageYOffset / bottom * 200)}%)`; // start at 200, go down to 0
      } else {
        this.headerEl.style.backgroundColor = `rgba(${this.backgroundRGB},1)`;
        this.$refs.title.style.opacity = '1';
        this.$refs.title.style.transform = "translateY(0)";
      }
    }
  },
  mounted() {
    document.documentElement.classList.add('has-transparent-header');

    this.$nextTick(() => {
      this.titleEl = document.querySelector('main .route-title-container');
      this.headerEl = document.querySelector('[data-navigation-layout]');
      window.addEventListener('scroll', this.scrollHandler);
    })
  },
  beforeDestroy() {
    document.documentElement.classList.remove('has-transparent-header');

    this.headerEl.style.backgroundColor = '';
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>
