<template>
  <div class="input-group">
    <input type="range" 
      :name="name"
      :value="value"
      :min="min"
      :max="max"
      :step="step"
      @input="$emit('input', $event.target.value)">
      {{value}}
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'SliderInput',
  mixins: [formValidation],
  props: {
    // value: {
    //   type: Number,
    //   default: 0
    // },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      
    }
  }
}
</script>
