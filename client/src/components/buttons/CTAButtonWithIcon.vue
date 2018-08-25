<template>
  <div class="btn btn--cta">
    <span>
      <slot name="text">replace me</slot>
    </span>
    <i :class="{'btn--cta-pulse': pulse}">
      <slot name="icon"></slot>
    </i>
  </div>  
</template>

<script>
export default {
  name: 'CTAWithIcon',
  props: {
    pulse: {
      type: Boolean,
      default: true
    }
  }
}
</script>

