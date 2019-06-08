<template>
  <div class="observer-sentinel" style="height:0px;width:0px;"/>
</template>

<script>
export default {
  props: {
    options: {
      type: Object  
    }
  },
  data() {
    return {
      observer: null
    }
  },
  mounted() {
    const options = this.options || {};
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
        console.log('intersect', options)
      }
    }, options);

    this.observer.observe(this.$el);
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
};
</script>