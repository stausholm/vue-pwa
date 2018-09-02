<template>
  <div>
    <b class="route-title" v-if="routeTitle != ''">{{routeTitle}}</b>
  </div>
</template>

<script>
export default {
  computed: {
    routeTitle() {
      return this.$route.meta.title || '';
    }
  },
  mounted() {
    
    //console.log({title}, title.offsetTop + title.offsetHeight)

    window.onscroll = () => {
      let title = document.querySelector('main .route-title-container');
    let header = document.querySelector('[data-navigation-layout]');
      if (window.pageYOffset > title.offsetTop + title.offsetHeight - header.offsetHeight) {
        header.style.backgroundColor = "red";
      } else {
        header.style.backgroundColor = "blue";
      }
    }
  }
}
</script>
