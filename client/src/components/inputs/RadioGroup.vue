<template>
  <fieldset class="input-group" :class="classes">
    <legend class="fieldset-label">{{label}}</legend>
    <div class="fieldset-input-wrapper">
      <label v-for="(option, index) in options" :key="index">
        <input type="radio"
          :disabled="disabled" 
          :name="name" 
          :value="option"
          :checked="value === option" 
          @input="$emit('input', $event.target.value)"
          @focus="classObject.focused = true"
          @blur="blur">
        <span>{{option}}</span>
      </label>
    </div>
    <p class="helper-text">{{helperText}}</p>
  </fieldset>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';

export default {
  name: 'RadioGroup',
  mixins: [formValidation]
}
</script>
