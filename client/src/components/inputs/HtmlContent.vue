<template>
  <div class="input-group form-text-content" v-html="html"></div>
</template>

<script>


export default {
  name: 'HtmlContent',
  props: {
    html: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  methods: {
    
  }
}
</script>
