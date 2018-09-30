<template>
  <div class="input-group" :class="classes">
    <label for="" class="slider-label">{{label}}</label>
    <input type="range" 
      :name="name"
      :value="value || min"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)">
      <span class="slider-result">{{value || 'no value selected'}}</span>
      <p class="helper-text">{{helperText}}</p>
  </div>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'SliderInput',
  mixins: [formValidation],
  props: {
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
