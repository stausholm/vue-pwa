<template>
  <fieldset class="input-group fieldset-group" :class="classes">
    <legend class="fieldset-label">{{label}}</legend>
    <div class="fieldset-input-wrapper">
      <label v-for="(option, index) in formattedOptions" :key="index">
        <input type="radio"
          :disabled="disabled" 
          :name="name" 
          :value="option.value"
          :checked="value === option.value" 
          @input="$emit('input', $event.target.value)"
          @focus="classObject.focused = true"
          @blur="blur">
        <span>
          {{option.label}}
          <span v-if="option.description">{{option.description}}</span>
        </span>
      </label>
    </div>
    <p class="helper-text">{{helperText}}</p>
  </fieldset>
</template>

<script>
import { formValidation } from '@/mixins/formValidation';
import { formFormatOptions } from '@/mixins/formFormatOptions';

export default {
  name: 'RadioGroup',
  mixins: [formValidation, formFormatOptions]
}
</script>
