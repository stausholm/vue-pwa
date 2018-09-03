<template>
  <div>
    <div class="route-title">
      <b ref="title" v-if="routeTitle != ''">{{routeTitle}}</b>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    routeTitle() {
      return this.$route.meta.title || '';
    }
  },
  methods: {
    scrollHandler() {
      let title = document.querySelector('main .route-title-container');
      let header = document.querySelector('[data-navigation-layout]');
      let titleBottom = title.offsetTop + title.offsetHeight;
      let bottom = titleBottom - header.offsetHeight;

      if (window.pageYOffset <= bottom) {
        console.log('we smaller', 100 - (window.pageYOffset / bottom * 100))
        header.style.backgroundColor = `rgba(0,0,0,${window.pageYOffset / bottom})`;

        this.$refs.title.style.opacity = `${window.pageYOffset / bottom}`;
        this.$refs.title.style.transform = `translateY(${200 - (window.pageYOffset / bottom * 200)}%)`;
        this.$refs.title.style.display = "block";
      } else {
        header.style.backgroundColor = 'rgba(0,0,0,1)';
        this.$refs.title.style.opacity = '1';
        this.$refs.title.style.display = "block";
        this.$refs.title.style.transform = "translateY(0)";
      }
    },
    throttle(fn, wait) {
      var time = Date.now();
      return function() {
        if ((time + wait - Date.now()) < 0) {
          fn();
          time = Date.now();
        }
      }
    }
  },
  mounted() {
    function throttle (callback, limit) {
        var wait = false;                 // Initially, we're not waiting
        return function () {              // We return a throttled function
            if (!wait) {                  // If we're not waiting
                callback.call();          // Execute users function
                wait = true;              // Prevent future invocations
                setTimeout(function () {  // After a period of time
                    wait = false;         // And allow future invocations
                }, limit);
            }
        }
    }
    //window.addEventListener('scroll', this.throttle(this.scrollHandler, 10))
    window.addEventListener('scroll', this.scrollHandler)
    // window.addEventListener('scroll', () => {
    //   console.log('event still here')
    // })
  },
  beforeDestroy() {
    console.log('BEFORE DESTROY')
    let header = document.querySelector('[data-navigation-layout]');
    header.style.backgroundColor = '';
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>
